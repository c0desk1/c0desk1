import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

let siteUrl = siteConfig.siteUrl;
if (!siteUrl.endsWith('/')) siteUrl += '/';

const pages = [
  { url: 'jp/', priority: 1.0, changefreq: 'daily' },
  { url: 'jp/about/', priority: 0.8, changefreq: 'monthly' },
  { url: 'jp/contact/', priority: 0.8, changefreq: 'monthly' },
  { url: 'jp/disclaimer/', priority: 0.7, changefreq: 'monthly' },
  { url: 'jp/dmca/', priority: 0.7, changefreq: 'monthly' },
  { url: 'jp/privacy-policy/', priority: 0.7, changefreq: 'monthly' },
  { url: 'jp/terms-of-service/', priority: 0.7, changefreq: 'monthly' },
  { url: 'jp/cookie-policy/', priority: 0.7, changefreq: 'monthly' },
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