import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro:loaders";

const createSeoSchema = (image: any) => z.object({
  title: z.string().max(100).optional(),
  description: z.string().min(10).max(160).optional(),
  ogImage: image().optional(), 
  canonical: z.string().url().optional(),
  noIndex: z.boolean().default(false),
});

const createAuthorSchema = (image: any) => z.object({
  name: z.string().default("C0desk1"),
  avatar: image().optional(),
  title: z.string().optional(),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3).max(100),
      description: z.string().min(10).max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageCaption: z.string().optional(),

      tags: z.array(z.string().max(30)).max(5).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      author: createAuthorSchema(image).optional(),
      seo: createSeoSchema(image).optional(),
    }),
});

const portfolioCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/portfolio",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3).max(80),
      description: z.string().min(20).max(200),
      techStack: z.array(z.string().max(40)).min(1).max(10),
      demoUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageCaption: z.string().optional(),
      gallery: z.array(image()).optional(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      archived: z.boolean().default(false),
      client: z.string().optional(),
      role: z.string().optional(),
      duration: z.string().optional(),
      metrics: z.object({
        performance: z.number().min(0).max(100).optional(),
        accessibility: z.number().min(0).max(100).optional(),
        seo: z.number().min(0).max(100).optional(),
      }).optional(),
      challenge: z.string().optional(),
      solution: z.string().optional(),
      result: z.string().optional(),
      seo: createSeoSchema(image).optional(),
    }),
});

export const collections = {
  blog: blogCollection,
  portfolio: portfolioCollection,
};
