// src/pages/sitemap-index.xml.ts
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

export const GET: APIRoute = () => {
  const sitemaps = [
    'sitemap-pages.xml',
    'sitemap-author.xml',
    'sitemap-blog.xml',
    'sitemap-portfolio.xml',
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${new URL(sitemap, siteUrl).toString()}</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: { 'Content-Type': 'application/xml' },
  });
};