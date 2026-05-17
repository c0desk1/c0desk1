import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() ?? siteConfig.siteUrl;

  const authors = await getCollection("authors");
  const allPosts = await getCollection("blog", (post) => !post.data.draft);

  const urls = authors
    .map((author) => {
      const authorPosts = allPosts
        .filter((post) => post.data.author?.id === author.id)
        .sort(
          (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
        );

      const latest = authorPosts[0];

      const lastmod =
        latest?.data.updatedDate?.toISOString() ??
        latest?.data.pubDate?.toISOString() ??
        new Date().toISOString();

      return `
  <url>
    <loc>${new URL(`author/${author.id}/`, siteUrl).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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