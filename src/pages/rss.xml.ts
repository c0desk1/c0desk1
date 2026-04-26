// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
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
    items: sorted.map((post) => {
      const url = new URL(`blog/${post.id}/`, site).toString();
      const authorName = post.data.author?.name || siteConfig.author.name;
      const category = post.data.category;
      const tags = post.data.tags ?? [];
      const imageUrl = post.data.image ? new URL(post.data.image, site).toString() : null;

      return {
        title: post.data.title,
        link: url,
        pubDate: post.data.pubDate,
        description: post.data.description,
        categories: [category, ...tags].filter(Boolean),
        customData: `
          <dc:creator>${authorName}</dc:creator>
          ${imageUrl ? `<media:content url="${imageUrl}" medium="image" />` : ''}
        `,
        guid: url
      };
    }),
    customData: `
      <language>id-ID</language>
      <lastBuildDate>${sorted[0]?.data.pubDate.toUTCString() || new Date().toUTCString()}</lastBuildDate>
      <generator>${siteConfig.name} RSS Engine</generator>
      <atom:link href="${new URL('rss.xml', site).toString()}" rel="self" type="application/rss+xml" />
    `,
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/"
    }
  });

  response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

  return response;
}