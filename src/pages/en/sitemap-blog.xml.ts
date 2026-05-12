import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

export const GET: APIRoute = async () => {
  const siteUrl = siteConfig.siteUrl;

  const posts = await getCollection('blog', (post: CollectionEntry<"blog">) => {
    const lang = (post.data as any).lang || 'id';
    return !post.data.draft && lang === 'en';
  });
  
  const sortedPosts = posts.sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) => 
    b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const postsSitemap = sortedPosts.map((post: CollectionEntry<"blog">) => {
    const lastModDate = post.data.updatedDate || post.data.pubDate;
    
    return `
  <url>
    <loc>${new URL(`en/blog/${post.id}/`, siteUrl).toString()}</loc>
    <lastmod>${lastModDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('');

  const latestPost = sortedPosts[0];
  const indexLastMod = latestPost 
    ? (latestPost.data.updatedDate || latestPost.data.pubDate).toISOString()
    : new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL('en/blog/', siteUrl).toString()}</loc>
    <lastmod>${indexLastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${postsSitemap}
</urlset>`;

  return new Response(sitemap, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
};