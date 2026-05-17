import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() ?? siteConfig.siteUrl;

  const posts = await getCollection("blog", (post) => !post.data.draft);

  const sorted = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const urls = sorted
    .map((post) => {
      const slug = slugify(post.data.title);
      const lastmod = (post.data.updatedDate ?? post.data.pubDate).toISOString();

      return `
  <url>
    <loc>${new URL(`blog/${slug}/`, siteUrl).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("");

  const indexLastmod =
    sorted[0]?.data.updatedDate?.toISOString() ??
    sorted[0]?.data.pubDate?.toISOString() ??
    new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL("blog/", siteUrl).toString()}</loc>
    <lastmod>${indexLastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};