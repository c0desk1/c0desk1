// src/pages/feed.atom.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { 
  SITE, 
  ROUTES, 
  PAGINATION 
} from '@/consts';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

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
        updated: post.data.lastUpdated || post.data.pubDate || new Date(0),
        cover: post.data.cover,
        author: post.data.author?.name || SITE.name,
        authorEmail: post.data.author?.email || SITE.email,
        type: 'blog',
        slug: slug,
      };
    }),
    ...docs.map((doc) => {
      const slug = doc.data.slug || doc.id.replace(/\.(md|mdx)$/, '');
      return {
        ...doc.data,
        url: `${baseUrl}${ROUTES.docs}/${slug}/`,
        date: doc.data.pubDate || doc.data.lastUpdated || new Date(0),
        updated: doc.data.lastUpdated || doc.data.pubDate || new Date(0),
        cover: doc.data.cover,
        author: doc.data.author?.name || SITE.name,
        authorEmail: doc.data.author?.email || SITE.email,
        type: 'docs',
        slug: slug,
      };
    }),
  ];

  const sortedItems = rawItems
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, PAGINATION.postsPerFeed);

  const feedYear = "2026"; 
  const feedId = `tag:${baseUrl.replace(/^https?:\/\//, '')},${feedYear}:feed`;

  const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://w3.org">
  <title>${escapeXml(SITE.name)}</title>
  <subtitle>${escapeXml(SITE.description)}</subtitle>
  <link href="${baseUrl}${ROUTES.feedAtom}" rel="self" type="application/atom+xml"/>
  <link href="${baseUrl}/" rel="alternate" type="text/html"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${feedId}</id>
  <rights>&#xA9; ${new Date().getFullYear()} ${escapeXml(SITE.name)}</rights>
  <generator uri="${baseUrl}" version="1.0">Astro</generator>
  
  <author>
    <name>${escapeXml(SITE.name)}</name>
    <email>${escapeXml(SITE.email)}</email>
  </author>

  ${sortedItems
    .map((item) => {
      const coverUrl = getCoverUrl(item.cover, baseUrl);
      const escapedTitle = escapeXml(item.title);
      const escapedDescription = escapeXml(item.description || `Baca ${item.title} di ${SITE.name}.`);

      let rawContent = `<p>${escapedDescription}</p>`;
      if (coverUrl) {
        rawContent = `<p><img src="${coverUrl}" alt="${escapedTitle}" style="max-width:100%;margin-bottom:10px;border-radius:4px;"></p>\n${rawContent}`;
      }

      const imageType = coverUrl ? getImageType(coverUrl) : 'image/jpeg';
      const enclosure = coverUrl
        ? `    <link rel="enclosure" href="${coverUrl}" length="0" type="${imageType}" />\n`
        : '';

      const entryYear = new Date(item.date).getFullYear();
      const entryId = `tag:${baseUrl.replace(/^https?:\/\//, '')},${entryYear}:${item.type}:${item.slug}`;

      return `  <entry>
    <title>${escapedTitle}</title>
    <link href="${item.url}" rel="alternate" type="text/html"/>
    <id>${entryId}</id>
    <updated>${new Date(item.updated).toISOString()}</updated>
    <published>${new Date(item.date).toISOString()}</published>
    <summary type="text">${escapedDescription}</summary>
    <content type="html"><![CDATA[${rawContent.trim()}]]></content>
    <author>
      <name>${escapeXml(item.author)}</name>
      <email>${escapeXml(item.authorEmail)}</email>
    </author>
    <category term="${escapeXml(item.type)}" />
    ${item.category ? `    <category term="${escapeXml(item.category)}" />\n` : ''}
    ${enclosure}
  </entry>`;
    })
    .join('\n')}
</feed>`;

  return new Response(atomFeed.trim(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
