import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

export const GET: APIRoute = async () => {
  const siteUrl = siteConfig.siteUrl;

  const authors = await getCollection('authors');
  const allPosts = await getCollection('blog', (post: CollectionEntry<"blog">) => {
    const lang = (post.data as any).lang || 'id';
    return !post.data.draft && lang === 'jp';
  });

  const authorsSitemap = authors.map((author: CollectionEntry<"authors">) => {
    const authorPosts = allPosts
      .filter((post: CollectionEntry<"blog">) => post.data.author?.id === author.id)
      .sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) => 
        b.data.pubDate.getTime() - a.data.pubDate.getTime()
      );

    const latestPost = authorPosts[0];
    
    const lastModDate = latestPost 
      ? (latestPost.data.updatedDate || latestPost.data.pubDate).toISOString()
      : new Date().toISOString();

    return `
  <url>
    <loc>${new URL(`jp/author/${author.id}/`, siteUrl).toString()}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${authorsSitemap}
</urlset>`;

  return new Response(sitemap, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
};