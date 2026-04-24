// src/pages/rss.xml.ts

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site";

export async function GET(context: any) {
  const site = context.site ?? siteConfig.url;
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site,

    items: sorted.map((post) => {
      const url = new URL(`blog/${post.id}/`, site).toString();
      return {
        title: post.data.title,
        link: url,
        pubDate: post.data.pubDate,
        description: post.data.description,
        categories: [
          post.data.category,
          ...(post.data.tags ?? [])
        ],
        guid: url
      };
    }),

    customData: `
      <language>id-ID</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro RSS 10/10</generator>
    `
  });
}