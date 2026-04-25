// src/pages/sitemap-pages.xml.ts
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

const pages = [
  { url: '/', priority: 1.0, changefreq: 'daily', lastmod: new Date().toISOString() },
  { url: '/about/', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString() },
  { url: '/blog/', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString() },
  { url: '/portfolio/', priority: 0.8, changefreq: 'weekly', lastmod: new Date().toISOString() },
];

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `  <url>
        <loc>${siteUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('\n')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};