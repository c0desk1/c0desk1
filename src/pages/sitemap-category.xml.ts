import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';
import { slugify } from '@/lib/utils';

export const GET: APIRoute = async () => {
  const siteUrl = siteConfig.siteUrl;
  const categories = await getCollection('categories');
  const sorted = categories.sort((a, b) => a.data.name.id.localeCompare(b.data.name.id));
  const now = new Date().toISOString();

  const urls = sorted.map(cat => {
    const slug = slugify(cat.data.name.id) || cat.id;
    return `
  <url>
    <loc>${new URL(`category/${slug}/`, siteUrl).toString()}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls || '<!-- No categories found -->'}
</urlset>`;

  return new Response(sitemap, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
};