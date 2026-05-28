// src/pages/robots.txt.ts
import type { APIRoute } from "astro";
import { SITE } from "@/consts";

export const GET: APIRoute = () => {
  const content = `
User-agent: *
Allow: /

# Block search & draft pages from indexing
Disallow: /search
Disallow: /api/

# Crawl delay for courtesy
Crawl-delay: 1

# Sitemaps
Sitemap: ${SITE.url}/sitemap-index.xml
Sitemap: ${SITE.url}/sitemap-0.xml
`.trim();

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};