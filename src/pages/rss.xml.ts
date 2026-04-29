// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/config/site";

export async function GET(context: any) {
  // Ambil settings dengan fallback
  let settings;
  try {
    settings = await getEntry('settings', 'site');
  } catch (error) {
    console.warn('Settings not found, using siteConfig fallback');
  }
  const siteData = settings?.data || siteConfig;
  const site = context.site ?? siteData.siteUrl;

  // Ambil semua post yang tidak draft
  const allPosts = await getCollection("blog", (post: CollectionEntry<"blog">) => !post.data.draft);

  // 🔥 HANYA post yang memiliki title, description, dan pubDate valid yang diproses
  const validPosts = allPosts.filter((post: CollectionEntry<"blog">) => {
    return post.data.title &&
           post.data.description &&
           post.data.pubDate instanceof Date &&
           !isNaN(post.data.pubDate.getTime());
  });

  const sorted = validPosts
    .sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
      b.data.pubDate.getTime() - a.data.pubDate.getTime()
    )
    .slice(0, 30);

  // Jika tidak ada post valid, beri array kosong (RSS akan tetap error, tapi lebih baik di-handle)
  if (sorted.length === 0) {
    // Kembalikan respons error atau RSS kosong? Saya sarankan return 404 agar build gagal secara jelas
    throw new Error("Tidak ada artikel blog yang valid untuk RSS (minimal harus ada title, description, pubDate)");
  }

  const items = await Promise.all(sorted.map(async (post: CollectionEntry<"blog">) => {
    const url = new URL(`blog/${post.id}/`, site).toString();

    // Author - aman dengan fallback
    let authorName = siteData.siteName;
    if (post.data.author) {
      try {
        const authorEntry = await getEntry(post.data.author);
        if (authorEntry?.data?.name) authorName = authorEntry.data.name;
      } catch (e) { /* ignore */ }
    }

    // Category - aman dengan fallback
    let categoryName = "Uncategorized";
    if (post.data.category) {
      try {
        const categoryEntry = await getEntry(post.data.category);
        if (categoryEntry?.data?.name) categoryName = categoryEntry.data.name;
      } catch (e) { /* ignore */ }
    }

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
      guid: url,
    };
  }));

  const rssResponse = await rss({
    title: siteData.siteName || siteConfig.siteName,
    description: siteData.siteDescription || siteConfig.siteDescription,
    site,
    items,
    customData: `
      <language>id-ID</language>
      <lastBuildDate>${sorted[0]?.data.pubDate.toUTCString() || new Date().toUTCString()}</lastBuildDate>
      <generator>Astro Content Engine</generator>
      <atom:link href="${new URL('rss.xml', site).toString()}" rel="self" type="application/rss+xml" />
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