// src/pages/sitemap-category.xml.ts
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() ?? siteConfig.siteUrl;

  const categories = await getCollection("categories");

  const sorted = categories.sort((a, b) => {
    const aName = typeof a.data.name === "string" ? a.data.name : String(a.data.name);
    const bName = typeof b.data.name === "string" ? b.data.name : String(b.data.name);
    return aName.localeCompare(bName);
  });

  const now = new Date().toISOString();

  const urls = sorted
    .map((cat) => {
      const rawName = typeof cat.data.name === "string" ? cat.data.name : String(cat.data.name);
      const slug = slugify(rawName) || cat.id;

      return `
  <url>
    <loc>${new URL(`blog/category/${slug}/`, siteUrl).toString()}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};