// src/pages/sitemap-portfolio.xml.ts
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

const siteUrl = siteConfig.url;

export const GET: APIRoute = async () => {
  const projects = await getCollection('portfolio', ({ data }) => !data.draft);
  
  const sortedProjects = projects.sort((a, b) => 
    b.data.date.getTime() - a.data.date.getTime()
  );

  const projectsSitemap = sortedProjects.map(project => `
  <url>
    <loc>${new URL(`portfolio/${project.id}/`, siteUrl).toString()}</loc>
    <lastmod>${project.data.updatedDate?.toISOString() || project.data.date.toISOString()}</lastmod>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL('portfolio/', siteUrl).toString()}</loc>
    <lastmod>${sortedProjects[0]?.data.updatedDate?.toISOString() || sortedProjects[0]?.data.date.toISOString()}</lastmod>
  </url>
  ${projectsSitemap}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};