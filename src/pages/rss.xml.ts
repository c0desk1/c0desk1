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

      const author = post.data.author?.name || siteConfig.author.name;

      return {
        title: post.data.title,
        link: url,
        pubDate: post.data.pubDate,
        description: post.data.description,

        categories: [
          post.data.category,
          ...(post.data.tags ?? [])
        ].filter(Boolean),
        author,
        guid: url,
        customData: `
          <author>${author}</author>
          <category>${post.data.category ?? ""}</category>
        `
      };
    }),

    customData: `
      <language>id-ID</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>${siteConfig.name} RSS Feed</generator>
      <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
    `
  });
}