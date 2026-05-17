import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

export const GET: APIRoute = () => {
  const siteUrl = siteConfig.siteUrl;

  const sitemaps = [
    'sitemap-pages.xml',
    'sitemap-blog.xml',
    'sitemap-portfolio.xml',
    'sitemap-author.xml',
    'sitemap-category.xml',
    'en/sitemap-pages.xml',
    'en/sitemap-blog.xml',
    'en/sitemap-portfolio.xml',
    'en/sitemap-author.xml',
    'en/sitemap-category.xml',
    'ru/sitemap-pages.xml',
    'ru/sitemap-blog.xml',
    'ru/sitemap-portfolio.xml',
    'ru/sitemap-author.xml',
    'ru/sitemap-category.xml',
    'jp/sitemap-pages.xml',
    'jp/sitemap-blog.xml',
    'jp/sitemap-portfolio.xml',
    'jp/sitemap-author.xml',
    'jp/sitemap-category.xml',
  ];

  const buildDate = new Date().toISOString();

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${new URL(sitemap, siteUrl).toString()}</loc>
    <lastmod>${buildDate}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
};