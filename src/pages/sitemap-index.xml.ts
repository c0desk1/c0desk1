// src/pages/sitemap-index.xml.ts
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

export const GET: APIRoute = () => {
  const sitemaps = [
    { url: `${siteUrl}/sitemap-pages.xml`, lastmod: new Date().toISOString() },
    { url: `${siteUrl}/sitemap-blog.xml`, lastmod: new Date().toISOString() },
    { url: `${siteUrl}/sitemap-portfolio.xml`, lastmod: new Date().toISOString() },
    { url: `${siteUrl}/sitemap-author.xml`, lastmod: new Date().toISOString() },
    { url: `${siteUrl}/sitemap-category.xml`, lastmod: new Date().toISOString() },
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps.map(sitemap => `  <sitemap>
        <loc>${sitemap.url}</loc>
        <lastmod>${sitemap.lastmod}</lastmod>
    </sitemap>`).join('\n')}
    </sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};