import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";

import type { CollectionEntry } from "astro:content";
import type { APIContext } from "astro";

import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";

const escapeXml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET(context: APIContext) {
  const siteData = siteConfig;

  const site = new URL(context.site ?? siteData.siteUrl);

  const allPosts = await getCollection("blog", ({ data }) => !data.draft);

  const validPosts = allPosts.filter(
    (post: CollectionEntry<"blog">) =>
      Boolean(post.data.title) &&
      Boolean(post.data.description) &&
      post.data.pubDate instanceof Date &&
      !isNaN(post.data.pubDate.getTime())
  );

  const sorted = [...validPosts]
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, 30);

  if (sorted.length === 0) {
    throw new Error("No valid blog posts found for RSS feed");
  }

  const items = await Promise.all(
    sorted.map(async (post) => {
      const autoSlug = slugify(post.data.title);
      const url = new URL(`blog/${autoSlug}/`, site).toString();

      let authorName: string = siteData.siteName;
      if (post.data.author) {
        try {
          const authorEntry = await getEntry(post.data.author);
          if (authorEntry?.data?.name) {
            authorName = authorEntry.data.name;
          }
        } catch {}
      }

      let categoryName = "Uncategorized";
      if (post.data.category) {
        try {
          const categoryEntry = await getEntry(post.data.category);
          if (categoryEntry?.data?.name && typeof categoryEntry.data.name === "string") {
            categoryName = categoryEntry.data.name;
          }
        } catch {}
      }

      const tags = (post.data.tags ?? []).filter((tag): tag is string => Boolean(tag));

      const imageUrl = post.data.image?.src
        ? new URL(post.data.image.src, site).toString()
        : null;

      return {
        title: post.data.title,
        link: url,
        pubDate: post.data.pubDate,
        description: post.data.description,
        categories: [categoryName, ...tags],
        guid: url,
        customData: `
          <dc:creator>${escapeXml(authorName)}</dc:creator>
          ${imageUrl ? `<media:content url="${imageUrl}" medium="image" />` : ""}
        `,
      };
    })
  );

  const rssResponse = await rss({
    title: siteData.siteName,
    description: siteData.defaultSeo?.description ?? "",
    site: site.toString(),
    items,
    customData: `
      <language>en-US</language>
      <lastBuildDate>${sorted[0]?.data.pubDate.toUTCString() ?? new Date().toUTCString()}</lastBuildDate>
      <generator>Astro Content Engine</generator>
      <atom:link href="${new URL("rss.xml", site).toString()}" rel="self" type="application/rss+xml" />
    `,
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
    },
  });

  rssResponse.headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
  rssResponse.headers.set("Content-Type", "application/xml");

  return rssResponse;
}
