import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";

export async function GET(context: any) {
  const siteData = siteConfig;
  const site = context.site ?? siteData.siteUrl;

  const allPosts = await getCollection("blog", (post: CollectionEntry<"blog">) => {
    const lang = (post.data as any).lang || 'id';
    return !post.data.draft && lang === 'id';
  });

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

  if (sorted.length === 0) {
    throw new Error("Tidak ada artikel blog valid untuk RSS bahasa Indonesia");
  }

  const items = await Promise.all(sorted.map(async (post: CollectionEntry<"blog">) => {
    const autoSlug = slugify(post.data.title);
    const url = new URL(`blog/${autoSlug}/`, site).toString();

    let authorName: string = siteData.siteName;
    if (post.data.author) {
      try {
        const authorEntry = await getEntry(post.data.author);
        if (authorEntry?.data?.name) authorName = authorEntry.data.name;
      } catch {}
    }

    let categoryName = "Uncategorized";
    if (post.data.category) {
      try {
        const categoryEntry = await getEntry(post.data.category);
        if (categoryEntry?.data?.name) {
          const name = categoryEntry.data.name;
          categoryName = typeof name === 'string' ? name : (name as any)?.id || (name as any)?.en || "Uncategorized";
        }
      } catch {}
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
    title: siteData.siteName as string,
    description: siteData.defaultSeo?.id?.description ?? '',
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