// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import { siteConfig } from "@/config/site";

export async function GET(context: any) {
  const site = context.site ?? siteConfig.url;

  const posts = await getCollection("blog", ({ data }) => !data.draft);
  
  const sorted = posts
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, 30);

  const response = await rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site,
    items: await Promise.all(sorted.map(async (post) => {
      const url = new URL(`blog/${post.id}/`, site).toString();
      
      const authorEntry = await getEntry(post.data.author);
      const authorName = authorEntry?.data.name || siteConfig.author.name;
      
      const categoryId = post.data.category.id;
      const tags = post.data.tags ?? [];
      
      const imageUrl = post.data.image?.src 
        ? new URL(post.data.image.src, site).toString() 
        : null;

      return {
        title: post.data.title,
        link: url,
        pubDate: post.data.pubDate,
        description: post.data.description,
        categories: [categoryId, ...tags].filter(Boolean),
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