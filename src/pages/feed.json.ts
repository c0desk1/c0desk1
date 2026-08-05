// src/pages/feed.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { 
  SITE, 
  ROUTES, 
  PAGINATION 
} from '@/consts';

function getCoverUrl(cover: any, baseUrl: string): string | null {
  if (!cover) return null;
  if (typeof cover === 'string') {
    return cover.startsWith('http') ? cover : `${baseUrl}${cover}`;
  }
  if (typeof cover === 'object' && cover.src) {
    return cover.src.startsWith('http') ? cover.src : `${baseUrl}${cover.src}`;
  }
  return null;
}

function getImageType(url: string): string {
  const ext = url.split('.').pop()?.toLowerCase() || '';
  const types: Record<string, string> = {
    png: 'image/png',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    gif: 'image/gif',
    avif: 'image/avif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
  };
  return types[ext] || 'image/jpeg';
}

export const GET: APIRoute = async (context) => {
  const baseUrl = (context.site?.toString() ?? SITE.url).replace(/\/$/, '');

  const blog = await getCollection('blog', ({ data }) => !data.draft && !data.seo?.noIndex);
  const docs = await getCollection('docs', ({ data }) => !data.draft && !data.seo?.noIndex);

  const rawItems = [
    ...blog.map((post) => {
      const slug = post.data.slug || post.id.replace(/\.(md|mdx)$/, '');
      return {
        ...post.data,
        url: `${baseUrl}${ROUTES.blog}/${slug}/`,
        date: post.data.pubDate || post.data.lastUpdated || new Date(0),
        cover: post.data.cover,
        author: post.data.author,
        tags: post.data.tags || [],
        type: 'blog',
      };
    }),
    ...docs.map((doc) => {
      const slug = doc.data.slug || doc.id.replace(/\.(md|mdx)$/, '');
      return {
        ...doc.data,
        url: `${baseUrl}${ROUTES.docs}/${slug}/`,
        date: doc.data.pubDate || doc.data.lastUpdated || new Date(0),
        cover: doc.data.cover,
        author: doc.data.author,
        tags: doc.data.tags || [],
        type: 'docs',
      };
    }),
  ];

  const sortedItems = rawItems
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, PAGINATION.postsPerFeed);

  const firstItem = sortedItems[0];
  const authorName = firstItem?.author?.name || SITE.name;
  const authorEmail = firstItem?.author?.email || SITE.email;
  const authorUrl = firstItem?.author?.url || SITE.url;

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: SITE.name,
    home_page_url: `${baseUrl}/`,
    feed_url: `${baseUrl}${ROUTES.feedJson}`,
    description: SITE.description,
    authors: [
      {
        name: authorName,
      },
    ],
    language: SITE.lang,
    items: sortedItems.map((item) => {
      const coverUrl = getCoverUrl(item.cover, baseUrl);
      const tags = item.tags.length > 0 ? item.tags : (item.category ? [item.category] : []);
      const authorObj = item.author
        ? {
            name: item.author.name || SITE.name,
            ...(item.author.url && { url: item.author.url }),
            ...(item.author.avatar && { avatar: item.author.avatar }),
          }
        : undefined;

      const feedItem: any = {
        id: item.url,
        url: item.url,
        title: item.title,
        summary: item.description || `Baca ${item.title} di ${SITE.name}.`,
        date_published: new Date(item.date).toISOString(),
        tags: tags,
      };

      if (item.description) {
        feedItem.content_html = `<p>${item.description}</p>`;
      }

      if (authorObj) {
        feedItem.author = authorObj;
      }

      if (coverUrl) {
        feedItem.image = coverUrl;
      }

      if (coverUrl) {
        feedItem.attachments = [
          {
            url: coverUrl,
            mime_type: getImageType(coverUrl),
            title: `Cover for ${item.title}`,
          },
        ];
      }

      return feedItem;
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};