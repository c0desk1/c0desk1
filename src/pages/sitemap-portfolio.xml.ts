import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() ?? siteConfig.siteUrl;

  const projects = await getCollection("portfolio", (project) => {
    return !project.data.draft;
  });

  const sorted = projects.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const urls = sorted
    .map((project) => {
      const slug = slugify(project.data.title);

      const lastmod =
        project.data.updatedDate?.toISOString() ??
        project.data.pubDate.toISOString();

      return `
  <url>
    <loc>${new URL(`portfolio/${slug}/`, siteUrl).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("");

  const latest = sorted[0];

  const indexLastmod =
    latest?.data.updatedDate?.toISOString() ??
    latest?.data.pubDate.toISOString() ??
    new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL("portfolio/", siteUrl).toString()}</loc>
    <lastmod>${indexLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};