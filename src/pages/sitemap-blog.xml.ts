// src/pages/sitemap-blog.xml.ts
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  
  const sortedPosts = posts.sort((a, b) => 
    b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const postsSitemap = sortedPosts.map(post => `
  <url>
    <loc>${new URL(`blog/${post.id}/`, siteUrl).toString()}</loc>
    <lastmod>${post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString()}</lastmod>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL('blog/', siteUrl).toString()}</loc>
    <lastmod>${sortedPosts[0]?.data.pubDate.toISOString()}</lastmod>
  </url>
  ${postsSitemap}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};