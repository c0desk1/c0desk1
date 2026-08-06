// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, ROUTES } from '@/consts';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.href || SITE.url).replace(/\/$/, '');

  const blog = await getCollection('blog', ({ data }) => !data.draft && !data.seo?.noIndex);
  const docs = await getCollection('docs', ({ data }) => !data.draft && !data.seo?.noIndex);
  const legal = await getCollection('legal', ({ data }) => !data.draft && !data.seo?.noIndex);

  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: number }[] = [];

  const staticRoutes = [
    { path: ROUTES.home, priority: 1.0, changefreq: 'daily' },
    { path: ROUTES.docs, priority: 0.9, changefreq: 'weekly' },
    { path: ROUTES.blog, priority: 0.8, changefreq: 'weekly' },
    { path: ROUTES.archive, priority: 0.5, changefreq: 'monthly' },
  ];

  staticRoutes.forEach(({ path, priority, changefreq }) => {
    const loc = path === '/' ? `${baseUrl}/` : `${baseUrl}${path}/`;
    urls.push({ loc, priority, changefreq });
  });

  blog.forEach((post) => {
    const slug = post.data.slug || post.id.replace(/\.(md|mdx)$/, '');
    const date = post.data.lastUpdated || post.data.pubDate;
    
    urls.push({
      loc: `${baseUrl}${ROUTES.blog}/${slug}/`,
      lastmod: date ? new Date(date).toISOString() : undefined,
      changefreq: 'weekly',
      priority: 0.7,
    });
  });

  docs.forEach((doc) => {
    const slug = doc.data.slug || doc.id.replace(/\.(md|mdx)$/, '');
    const date = doc.data.lastUpdated || doc.data.pubDate;
    
    urls.push({
      loc: `${baseUrl}${ROUTES.docs}/${slug}/`,
      lastmod: date ? new Date(date).toISOString() : undefined,
      changefreq: 'weekly',
      priority: 0.9,
    });
  });

  legal.forEach((item) => {
    const slug = item.data.slug || item.id.replace(/\.(md|mdx)$/, '');
    const date = item.data.lastUpdated || item.data.pubDate;
    
    urls.push({
      loc: `${baseUrl}/${slug}/`, 
      lastmod: date ? new Date(date).toISOString() : undefined,
      changefreq: 'yearly',
      priority: 0.2,
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>${
      url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''
    }${
      url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : ''
    }${
      url.priority ? `\n    <priority>${url.priority}</priority>` : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
