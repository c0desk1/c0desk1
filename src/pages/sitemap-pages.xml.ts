// src/pages/sitemap-pages.xml.ts
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';
import { getEntry } from 'astro:content';

let settings;
try {
  settings = await getEntry('settings', 'site');
} catch (error) {
  console.warn('Settings not found, using siteConfig fallback');
}
const siteData = settings?.data || siteConfig;
let siteUrl = siteData.siteUrl;
if (!siteUrl.endsWith('/')) siteUrl += '/';

const pages = [
  { url: '', priority: 1.0, changefreq: 'daily' },
  { url: 'about/', priority: 0.8, changefreq: 'monthly' },
  { url: 'contact/', priority: 0.8, changefreq: 'monthly' },
  { url: 'disclaimer/', priority: 0.7, changefreq: 'monthly' },
  { url: 'dmca/', priority: 0.7, changefreq: 'monthly' },
  { url: 'privacy-policy/', priority: 0.7, changefreq: 'monthly' },
  { url: 'terms-of-service/', priority: 0.7, changefreq: 'monthly' },
  { url: 'cookie-policy/', priority: 0.7, changefreq: 'monthly' },
];

export const GET: APIRoute = () => {
  const buildDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${new URL(page.url, siteUrl).toString()}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};