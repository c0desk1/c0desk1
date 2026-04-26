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

  const postsSitemap = sortedPosts.map(post => {
    const lastModDate = post.data.updatedDate || post.data.pubDate;
    return `
  <url>
    <loc>${new URL(`blog/${post.id}/`, siteUrl).toString()}</loc>
    <lastmod>${lastModDate.toISOString()}</lastmod>
  </url>`;
  }).join('');

  const latestPost = sortedPosts[0];
  const indexLastMod = latestPost 
    ? (latestPost.data.updatedDate || latestPost.data.pubDate).toISOString()
    : new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL('blog/', siteUrl).toString()}</loc>
    <lastmod>${indexLastMod}</lastmod>
  </url>${postsSitemap}
</urlset>`;

  return new Response(sitemap, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    },
  });
};