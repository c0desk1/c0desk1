// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, ROUTES, PAGINATION } from '@/consts';
import type { APIRoute } from 'astro';

const getCoverUrl = (cover: any, baseUrl: string): string | null => {
  if (!cover) return null;
  
  if (typeof cover === 'string') {
    return cover.startsWith('http') ? cover : `${baseUrl}${cover}`;
  }
  
  if (typeof cover === 'object' && cover.src) {
    return cover.src.startsWith('http') ? cover.src : `${baseUrl}${cover.src}`;
  }
  
  return null;
};

export const GET: APIRoute = async (context) => {
  const baseUrl = (context.site?.toString() ?? SITE.url).replace(/\/$/, '');
  
  const blog = await getCollection('blog', ({ data }) => !data.draft && !data.seo?.noIndex);
  const docs = await getCollection('docs', ({ data }) => !data.seo?.noIndex);
  
  const feedItems = [
    ...blog.map((post) => {
      const slug = post.data.slug || post.id.replace(/\.(md|mdx)$/, '');
      return {
        ...post.data,
        url: `${ROUTES.blog}/${slug}/`,
        date: post.data.pubDate || post.data.lastUpdated || new Date(0),
        cover: post.data.cover,
        author: post.data.author,
      };
    }),
    ...docs.map((doc) => {
      const slug = doc.data.slug || doc.id.replace(/\.(md|mdx)$/, '');
      return {
        ...doc.data,
        url: `${ROUTES.docs}/${slug}/`,
        date: doc.data.pubDate || doc.data.lastUpdated || new Date(0),
        cover: doc.data.cover,
        author: doc.data.author,
      };
    }),
  ];
  
  const sortedItems = feedItems
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, PAGINATION.postsPerFeed);

  return rss({
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    site: baseUrl,
    trailingSlash: true,
    
    customData: `
      <language>${SITE.lang}</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro via Unloyd Engine</generator>
      <atom:link href="${baseUrl}${ROUTES.rss}" rel="self" type="application/rss+xml" />
    `,
    
    items: sortedItems.map((item) => {
      const coverUrl = getCoverUrl(item.cover, baseUrl);
      const coverHtml = coverUrl 
        ? `<img src="${coverUrl}" alt="${item.title}" style="max-width:100%;margin-bottom:10px;border-radius:4px;" />`
        : '';
      
      const description = `
        ${coverHtml}
        <p>${item.description || `Baca ${item.title} di ${SITE.name}.`}</p>
      `.trim();
      
      const authorName = item.author?.name || SITE.name;
      const authorEmail = SITE.email;
      const author = `${authorEmail} (${authorName})`;
      
      return {
        title: item.title,
        pubDate: item.date,
        description: description,
        link: new URL(item.url, baseUrl).toString(),
        author: author,
        categories: item.category ? [item.category] : [],
        enclosure: coverUrl ? {
          url: coverUrl,
          length: 0,
          type: 'image/jpeg',
        } : undefined,
      };
    }),
  });
};