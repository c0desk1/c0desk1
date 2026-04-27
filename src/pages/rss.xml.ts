// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/config/site";

let settings;
  try {
    settings = await getEntry('settings', 'site');
  } catch (error) {
    console.warn('Settings not found, using siteConfig fallback');
  }

const siteData = settings?.data || siteConfig;

export async function GET(context: any) {
  const site = context.site ?? siteData.siteUrl;

  const posts = await getCollection("blog", (post: CollectionEntry<"blog">) => !post.data.draft);
  
  const sorted = posts
    .sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) => 
      b.data.pubDate.getTime() - a.data.pubDate.getTime()
    )
    .slice(0, 30);

  const response = await rss({
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    site,
    items: await Promise.all(sorted.map(async (post: CollectionEntry<"blog">) => {
      const url = new URL(`blog/${post.id}/`, site).toString();
      
      const authorEntry = await getEntry(post.data.author);
      const authorName = authorEntry?.data.name || siteConfig.siteName;
      
      const categoryEntry = await getEntry(post.data.category);
      const categoryName = categoryEntry?.data.name || "Uncategorized";
      const tags = post.data.tags ?? [];
      
      const imageUrl = post.data.image?.src 
        ? new URL(post.data.image.src, site).toString() 
        : null;

      return {
        title: post.data.title,
        link: url,
        pubDate: post.data.pubDate,
        description: post.data.description,
        categories: [categoryName, ...tags].filter(Boolean),
        customData: `
          <dc:creator>${authorName}</dc:creator>
          ${imageUrl ? `<media:content url="${imageUrl}" medium="image" />` : ''}
        `,
        guid: url
      };
    })),
    customData: `
      <language>id-ID</language>
      <lastBuildDate>${sorted[0]?.data.pubDate.toUTCString() || new Date().toUTCString()}</lastBuildDate>
      <generator>Astro Content Engine</generator>
      <atom:link href="${new URL('rss.xml', site).toString()}" rel="self" type="application/rss+xml" />
    `,
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/"
    }
  });

  response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  response.headers.set('Content-Type', 'application/xml');

  return response;
}