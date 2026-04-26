// src/pages/sitemap-pages.xml.ts
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

const pages = [
  { url: '' },
  { url: 'about/' },
  { url: 'blog/' },
  { url: 'portfolio/' },
];

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => ` <url>
    <loc>${new URL(page.url, siteUrl).toString()}</loc>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};