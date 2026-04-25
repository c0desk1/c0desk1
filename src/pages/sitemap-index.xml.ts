import type { APIContext } from "astro";
import { getSitemapChunks } from "@/lib/sitemap";
import { siteConfig } from "@/config/site";

export async function GET({}: APIContext) {
  const chunks = await getSitemapChunks();

  const base = siteConfig.url.replace(/\/$/, "");

  const body = chunks
    .map((_, i) => {
      const url = `${base}/sitemap-${i + 1}.xml`;

      return `<sitemap>
  <loc>${url}</loc>
</sitemap>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}