// src/pages/feed.xml.ts
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE, AUTHOR, PAGINATION, CATEGORIES } from "@/consts";
import { slugify } from "@/lib/utils";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const sorted = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, PAGINATION.postsPerFeed);

  const items = sorted
    .map((post) => {
      const slug = post.data.slug || slugify(post.data.title);

      const url = `${SITE.url}/blog/${slug}`;

      const authorName =
        typeof post.data.author === "string"
          ? post.data.author
          : (post.data.author as any)?.name || AUTHOR.name;

      const pubDate = post.data.pubDate.toUTCString();

      const coverImg = post.data.heroImage?.src
        ? `<enclosure url="${post.data.heroImage.src}" type="image/jpeg" length="0"/>`
        : "";

      let categoryName = "Uncategorized";
      const rawCat = post.data.category as any;
      if (rawCat) {
        const catSlug =
          typeof rawCat === "string" ? rawCat : rawCat.slug || rawCat.id || "";
        const matched = CATEGORIES.find((c) => c.slug === catSlug);
        categoryName = matched?.label || catSlug || "Uncategorized";
      }

      return `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${SITE.email} (${authorName})</author>
      <category>${categoryName}</category>
      ${
        post.data.tags
          ?.map((t: string) => `<category>${t}</category>`)
          .join("\n      ") || ""
      }
      ${coverImg}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>${SITE.lang}</language>
    <copyright>© ${new Date().getFullYear()} ${SITE.name}</copyright>
    <managingEditor>${SITE.email} (${SITE.name})</managingEditor>
    <webMaster>${SITE.email}</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE.url}/favicon/favicon-96x96.png</url>
      <title>${SITE.name}</title>
      <link>${SITE.url}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};