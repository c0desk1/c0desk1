// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';
import { 
  SITE, 
  ROUTES, 
  SEO 
} from '@/consts';

export const GET: APIRoute = ({ site }) => {
  const isIndexable = SEO.robots.index;
  const baseUrl = (site?.href || SITE.url).replace(/\/$/, '');
  const sitemapUrl = `${baseUrl}${ROUTES.sitemap}`;
  const pureHost = baseUrl.replace(/^https?:\/\//, '');

  const robotsTxt = `
User-agent: *
${isIndexable ? 'Allow: /' : 'Disallow: /'}

Disallow: /api/
# Disallow: /_astro/

Disallow: /*?*

Disallow: /*.json$

Sitemap: ${sitemapUrl}

Host: ${pureHost}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
