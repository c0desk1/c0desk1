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

  const projectsSitemap = sortedProjects.map(project => {
    const lastModDate = project.data.updatedDate || project.data.date;
    return `
  <url>
    <loc>${new URL(`portfolio/${project.id}/`, siteUrl).toString()}</loc>
    <lastmod>${lastModDate.toISOString()}</lastmod>
  </url>`;
  }).join('');

  const latestProject = sortedProjects[0];
  const indexLastMod = latestProject 
    ? (latestProject.data.updatedDate || latestProject.data.date).toISOString()
    : new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL('portfolio/', siteUrl).toString()}</loc>
    <lastmod>${indexLastMod}</lastmod>
  </url>${projectsSitemap}
</urlset>`;

  return new Response(sitemap, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    },
  });
};
