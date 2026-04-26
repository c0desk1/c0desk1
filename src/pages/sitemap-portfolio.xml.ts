// src/pages/sitemap-portfolio.xml.ts
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

export const GET: APIRoute = async () => {
  const projects = await getCollection('portfolio', ({ data }) => !data.draft);
  

  const sortedProjects = projects.sort((a, b) => 
    b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const projectsSitemap = sortedProjects.map(project => {
    const lastModDate = project.data.updatedDate || project.data.pubDate;
    
    return `
  <url>
    <loc>${new URL(`portfolio/${project.id}/`, siteUrl).toString()}</loc>
    <lastmod>${lastModDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('');

  const latestProject = sortedProjects[0];
  const indexLastMod = latestProject 
    ? (latestProject.data.updatedDate || latestProject.data.pubDate).toISOString()
    : new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL('portfolio/', siteUrl).toString()}</loc>
    <lastmod>${indexLastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>${projectsSitemap}
</urlset>`;

  return new Response(sitemap, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
};