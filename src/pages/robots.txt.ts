// src/pages/robots.txt.ts
import type { APIRoute } from "astro";
import { SITE, ROUTES } from "@/consts";

export const GET: APIRoute = () => {
  const sitemapUrl = ROUTES.sitemap.startsWith('/') ? ROUTES.sitemap : `/${ROUTES.sitemap}`;
  
  const content = `
User-agent: *
Allow: /

Disallow: ${ROUTES.search}
Disallow: /api/

Sitemap: ${SITE.url}${sitemapUrl}
`.trim();

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
