import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from 'astro/zod';

const seoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
  noIndex: z.boolean().default(false),
});

const metadataSchema = z.object({
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

const socialSchema = z.array(z.object({
    href: z.string(),
    label: z.string(),
})).optional();

const authors = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{json,md}", base: "./src/content/authors" }),
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    role: z.string().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    social: socialSchema,
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    description: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    lang: z.string().optional(),
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }).optional(),
    author: reference("authors"),
    category: reference("categories"),
    tags: z.array(z.string()).default([]),
    overview: z.array(z.string()).optional(),
    ...metadataSchema.shape,
    seo: seoSchema.optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: z.object({
    lang: z.string().optional(),
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    techStack: z.array(z.string()),
    client: z.string().optional(),
    role: z.string().optional(),
    duration: z.string().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    metrics: z.object({
      performance: z.number().min(0).max(100).optional(),
      accessibility: z.number().min(0).max(100).optional(),
      seo: z.number().min(0).max(100).optional(),
    }).optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    ...metadataSchema.shape,
    seo: seoSchema.optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/legal" }),
  schema: z.object({
    lang: z.string().optional(),
    title: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
    lastUpdated: z.coerce.date().optional(),
    seo: seoSchema.optional(),
  }),
});

export const collections = {
  blog,
  portfolio,
  authors,
  categories,
  legal
};
