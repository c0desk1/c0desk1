// src/pages/robots.txt.ts
import type { APIRoute } from "astro";
import { SITE, ROUTES } from "@/consts";

export const GET: APIRoute = () => {
  const content = `
User-agent: *
Allow: /

Disallow: ${ROUTES.search}
Disallow: /api/

Crawl-delay: 1

Sitemap: ${SITE.url}${ROUTES.sitemap}
`.trim();

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
