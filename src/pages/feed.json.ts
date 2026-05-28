// src/pages/feed.json.ts
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { 
  SITE, 
  AUTHOR, 
  CATEGORIES,
  ROUTES,
  PAGINATION 
} from "@/consts";
import { slugify } from "@/lib/utils";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const sorted = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, PAGINATION.postsPerFeed);

  const items = await Promise.all(
    sorted.map(async (post) => {
      const slug = post.data.slug || slugify(post.data.title);
      const url = new URL(`${ROUTES.blog}/${slug}`, SITE.url).href;

      let itemAuthor: { name: string; url: string } = {
        name: String(AUTHOR.name),
        url: new URL(AUTHOR.url || "/", SITE.url).href 
      };

      if (post.data.author) {
        try {
          const authorEntry = await getEntry(post.data.author);
          if (authorEntry?.data?.name) {
            const authorSlug = authorEntry.id || slugify(authorEntry.data.name);
            itemAuthor = {
              name: authorEntry.data.name,
              url: new URL(`/author/${authorSlug}`, SITE.url).href
            };
          }
        } catch {}
      }

      const imageSrc = post.data.heroImage?.src || post.data.seo?.ogImage || SITE.ogImage;
      const coverImgUrl = imageSrc ? new URL(imageSrc, SITE.url).href : "";

      const categorySlug = post.data.category || "uncategorized";
      const matchedCategory = CATEGORIES.find(c => c.slug === categorySlug);
      const categoryName = matchedCategory ? matchedCategory.label : categorySlug;

      const cleanedTags = post.data.tags
        ?.map((t: string) => t.trim().toLowerCase().replace(/-/g, ' '))
        .filter(t => t !== categorySlug.toLowerCase() && t !== categoryName.toLowerCase() && t !== "") || [];

      return {
        id: url,
        url: url,
        title: post.data.title,
        summary: post.data.description,
        content_html: post.body, 
        date_published: post.data.pubDate.toISOString(),
        image: coverImgUrl,
        authors: [itemAuthor],
        tags: [categoryName, ...cleanedTags]
      };
    })
  );

  const jsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE.name,
    description: SITE.description,
    home_page_url: SITE.url,
    feed_url: new URL("/feed.json", SITE.url).href,
    language: SITE.lang,
    favicon: new URL("/favicon/favicon-96x96.png", SITE.url).href,
    items: items
  };

  return new Response(JSON.stringify(jsonFeed, null, 2), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
};
