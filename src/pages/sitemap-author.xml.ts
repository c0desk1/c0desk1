// src/pages/sitemap-author.xml.ts
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const latestPost = posts.sort((a, b) =>
    b.data.pubDate.getTime() - a.data.pubDate.getTime()
  )[0];

  const authorLastMod = latestPost
    ? (latestPost.data.updatedDate || latestPost.data.pubDate).toISOString()
    : new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL(`author/${siteConfig.author.slug}/`, siteUrl).toString()}</loc>
    <lastmod>${authorLastMod}</lastmod>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    },
  });
};
