// src/pages/api/search.json.ts
import { getCollection } from "astro:content";
import { CATEGORIES, SERIES } from "@/consts";
import { slugify } from "@/lib/utils";

export async function GET() {
  const allBlogs = await getCollection("blog", ({ data }) => !data.draft);
  const allGuides = await getCollection("guide", ({ data }) => !data.draft);

  const catMap = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.label]));
  const seriesMap = Object.fromEntries(SERIES.map((s) => [s.slug, s.label]));

  const results = [...allBlogs, ...allGuides].map((item) => {
    const isBlog = item.collection === "blog";
    
    const groupSlug = isBlog ? (item.data.category ?? CATEGORIES[0].slug) : (item.data.series ?? 'general');
    const groupLabel = isBlog ? (catMap[groupSlug] ?? groupSlug) : (seriesMap[groupSlug] ?? groupSlug);

    const finalSlug = item.data.slug || slugify(item.data.title) || item.id;

    return {
      title: item.data.title,
      description: item.data.description || "",
      category: groupLabel,
      type: item.collection,

      url: isBlog ? `/blog/${finalSlug}` : `/guide/${finalSlug}`, 
    };
  });

  return new Response(JSON.stringify(results), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=86400", 
    },
  });
}