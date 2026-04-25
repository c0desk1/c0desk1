import { siteConfig } from "@/config/site";
import { getCollection } from "astro:content";

export type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SitemapItem = {
  url: string;
  lastmod?: Date | string;
  changefreq?: ChangeFreq;
  priority?: number;
};

export type ImageItem = {
  url: string;
  images: string[];
};

const baseUrl = siteConfig.url.replace(/\/$/, "");

export const normalizeUrl = (path: string) =>
  `${baseUrl}/${path.replace(/^\/+/, "")}`;

const escapeXml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const toXml = (item: SitemapItem) => {
  return `<url>
  <loc>${escapeXml(normalizeUrl(item.url))}</loc>
  ${item.lastmod ? `<lastmod>${new Date(item.lastmod).toISOString()}</lastmod>` : ""}
  ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ""}
  ${typeof item.priority === "number" ? `<priority>${item.priority}</priority>` : ""}
</url>`;
};

export const toImageXml = (item: ImageItem) => {
  return `<url>
  <loc>${escapeXml(normalizeUrl(item.url))}</loc>
  ${item.images
    .map(
      (img) => `<image:image>
    <image:loc>${escapeXml(normalizeUrl(img))}</image:loc>
  </image:image>`
    )
    .join("")}
</url>`;
};

export const getStatic = (): SitemapItem[] => [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/blog/", changefreq: "daily", priority: 0.8 },
  { url: "/portfolio/", changefreq: "weekly", priority: 0.8 },
];

export async function getBlog(): Promise<SitemapItem[]> {
  const posts = await getCollection("blog", (p) => !p.data.draft);

  return posts.map((p) => ({
    url: `/blog/${p.id}/`,
    lastmod: p.data.updatedDate ?? p.data.pubDate,
    changefreq: "weekly",
    priority: p.data.featured ? 0.9 : 0.7,
  }));
}

export async function getPortfolio(): Promise<SitemapItem[]> {
  const items = await getCollection("portfolio", (p) => !p.data.draft);

  return items.map((p) => ({
    url: `/portfolio/${p.id}/`,
    lastmod: p.data.updatedDate ?? p.data.date,
    changefreq: "monthly",
    priority: p.data.featured ? 0.9 : 0.8,
  }));
}

export async function getAll(): Promise<SitemapItem[]> {
  const [blog, portfolio] = await Promise.all([
    getBlog(),
    getPortfolio(),
  ]);

  return [...getStatic(), ...blog, ...portfolio];
}

export async function getSitemapChunks(): Promise<SitemapItem[][]> {
  const all = await getAll();

  const chunkSize = 50;
  const chunks: SitemapItem[][] = [];

  for (let i = 0; i < all.length; i += chunkSize) {
    chunks.push(all.slice(i, i + chunkSize));
  }

  return chunks;
}

export const wrapXml = (body: string, extraNs?: string) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${extraNs ? " " + extraNs : ""}>
${body}
</urlset>`;