// src/content.config.ts
import { 
  defineCollection
} from "astro:content";

import { glob } from "astro/loaders";
import { z } from "astro/zod";

const METADATA = z.object({
  slug: z.string().optional(),
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date().optional(),
  lastUpdated: z.coerce.date().optional(),
  cover: z.object({
    src: z.string(),
    alt: z.string(),
  }).optional(),
});

const SEO = z.object({
  title: z.string(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().default(false).optional(),
});

const AUTHOR = z.object({
  author: z.object({
    name: z.string(),
    role: z.string().optional(),
    avatar: z.string().optional(),
    url: z.url().optional(),
  }).optional()
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}", deferRender: true }),
  schema: z.object({
    ...METADATA.shape,
    ...AUTHOR.shape,
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    seo: SEO,
  }),
});

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}", deferRender: true }),
  schema: z.object({
    ...METADATA.shape,
    ...AUTHOR.shape,
    category: z.string().optional(),
    order: z.number().optional(),
    draft: z.boolean().default(false),
    seo: SEO,
  }),
});

const legal = defineCollection({
  loader: glob({ base: "./src/content/legal", pattern: "**/*.{md,mdx}", deferRender: true }),
  schema: z.object({
  ...METADATA.shape,
  seo: SEO,
  }),
});

export const collections = {
  blog,
  docs,
  legal
};
