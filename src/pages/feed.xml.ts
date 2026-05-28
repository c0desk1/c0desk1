// src/pages/feed.xml.ts
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { 
  SITE, 
  AUTHOR, 
  CATEGORIES,
  PAGINATION 
} from "@/consts";
import { slugify } from "@/lib/utils";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const sorted = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, PAGINATION.postsPerFeed);

  const items: string[] = [];

  for (const post of sorted) {
    const slug = post.data.slug || slugify(post.data.title);
    const url = `${SITE.url}/blog/${slug}`;

    let authorName = `${SITE.email} (${AUTHOR.name})`;
    if (post.data.author) {
      try {
        const authorEntry = await getEntry(post.data.author);
        
        if (authorEntry?.data?.name) {
          const authorEmail = authorEntry.data.mail || SITE.email;
          authorName = `${authorEmail} (${authorEntry.data.name})`;
        }
      } catch {}
    }

    const pubDate = post.data.pubDate.toUTCString();

    const imageSrc =
      post.data.heroImage?.src ||
      post.data.seo?.ogImage ||
      SITE.ogImage;

    const coverImg = imageSrc
      ? `<enclosure url="${new URL(imageSrc, SITE.url).href}" type="image/jpeg" length="0"/>`
      : "";

    let categoryName = "General";
    const rawCategory = post.data.category;

    if (rawCategory) {
      if (typeof rawCategory === "object" && "collection" in rawCategory) {
        try {
          const catEntry = await getEntry(rawCategory);
          const slugToFind = catEntry?.data?.slug || catEntry?.id;
          const matched = CATEGORIES.find(c => c.slug === slugToFind);
          categoryName = matched ? matched.label : (slugToFind || "General");
        } catch {}
      } else {
        const categorySlug = String(rawCategory);
        const matched = CATEGORIES.find(c => c.slug === categorySlug);
        
        categoryName = matched 
          ? matched.label 
          : categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
      }
    }


    const itemXml = `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${authorName}</author>
      <category>${categoryName}</category>
      ${
        post.data.tags
          ?.map((t: string) => `<category>${t}</category>`)
          .join("\n      ") || ""
      }
      ${coverImg}
    </item>`;
    
    items.push(itemXml);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org"
  xmlns:atom="http://w3.org"
  xmlns:media="http://yahoo.com">
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
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
