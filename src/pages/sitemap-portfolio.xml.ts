// src/pages/sitemap-portfolio.xml.ts
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

export const GET: APIRoute = async () => {
  const projects = await getCollection('portfolio', ({ data }) => !data.draft);
  
  const projectsSitemap = projects.map(project => `
  <url>
    <loc>${siteUrl}/portfolio/${project.id}/</loc>
    <lastmod>${project.data.updatedDate?.toISOString() || project.data.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${project.data.featured ? 0.8 : 0.6}</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${siteUrl}/portfolio/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    ${projectsSitemap}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};