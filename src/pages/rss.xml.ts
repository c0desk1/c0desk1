// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import {
  SITE,
  ROUTES,
  PAGINATION,
} from "@/consts";

function getCoverUrl(cover: any, baseUrl: string): string | null {
  if (!cover) return null;

  if (typeof cover === "string") {
    return cover.startsWith("http")
      ? cover
      : `${baseUrl}${cover}`;
  }

  if (typeof cover === "object" && cover.src) {
    return cover.src.startsWith("http")
      ? cover.src
      : `${baseUrl}${cover.src}`;
  }

  return null;
}

function getImageType(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase() || "";

  const types: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
    avif: "image/avif",
  };

  return types[ext] ?? "image/jpeg";
}

function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const GET: APIRoute = async (context) => {
  const baseUrl = (context.site?.toString() ?? SITE.url).replace(/\/$/, "");

  const blog = await getCollection(
    "blog",
    ({ data }) => !data.draft && !data.seo?.noIndex,
  );

  const docs = await getCollection(
    "docs",
    ({ data }) => !data.draft && !data.seo?.noIndex,
  );

  const items = [
    ...blog.map((post) => ({
      ...post.data,
      url: `${ROUTES.blog}/${post.data.slug || post.id.replace(/\.(md|mdx)$/, "")}/`,
      date:
        post.data.pubDate ??
        post.data.lastUpdated ??
        new Date(0),
    })),

    ...docs.map((doc) => ({
      ...doc.data,
      url: `${ROUTES.docs}/${doc.data.slug || doc.id.replace(/\.(md|mdx)$/, "")}/`,
      date:
        doc.data.pubDate ??
        doc.data.lastUpdated ??
        new Date(0),
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, PAGINATION.postsPerFeed);

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: baseUrl,
    trailingSlash: true,

    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      content: "http://purl.org/rss/1.0/modules/content/",
      media: "http://search.yahoo.com/mrss/",
    },

    customData: `
      <language>${SITE.lang}</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link
        href="${baseUrl}${ROUTES.rss}"
        rel="self"
        type="application/rss+xml"
      />
    `.trim(),

    items: items.map((item) => {
      const coverUrl = getCoverUrl(item.cover, baseUrl);
      const authorName = item.author?.name || SITE.name;
      const authorEmail = item.author?.email || SITE.email;
      const safeTitle = escapeHtmlAttr(item.title);
      const html = `
        ${
          coverUrl
            ? `<p><img src="${coverUrl}" alt="${safeTitle}" /></p>`
            : ""
        }
        <p>${item.description ?? ""}</p>
        <p>
          <a href="${new URL(item.url, baseUrl)}">
            Baca selengkapnya →
          </a>
        </p>
      `.trim();

      return {
        title: item.title,
        link: new URL(item.url, baseUrl).toString(),
        pubDate: item.date,
        description:
          item.description ??
          `Baca ${item.title} di ${SITE.name}.`,
        author: `${authorEmail} (${authorName})`,
        categories: item.category
          ? [item.category]
          : [],
        enclosure: undefined,
        customData: `
          ${
            coverUrl
              ? `<media:content
                    url="${coverUrl}"
                    medium="image"
                    type="${getImageType(coverUrl)}"
                 />`
              : ""
          }
          <content:encoded><![CDATA[
            ${html}
          ]]></content:encoded>
        `,
      };
    }),
  });
};
