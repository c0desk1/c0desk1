// src/pages/sitemap-blog.xml.ts
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  
  const postsSitemap = posts.map(post => `
  <url>
    <loc>${siteUrl}/blog/${post.id}/</loc>
    <lastmod>${post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${post.data.featured ? 0.9 : 0.7}</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${siteUrl}/blog/</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    ${postsSitemap}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};