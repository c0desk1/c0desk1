// src/content.config.ts
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

import { categories } from "@/config/blog";


const createSeoSchema = () => z.object({
  title: z.string().max(100).optional(),
  description: z.string().min(10).max(160).optional(),
  ogImage: z.string().optional(),
  canonical: z.string().url().optional(),
  noIndex: z.boolean().default(false),
});

const createAuthorSchema = () => z.object({
  name: z.string().default("C0desk1"),
  avatar: z.string().optional(),
  title: z.string().optional(),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    category: z
      .enum(categories)
      .default("general"),
    tags: z.array(z.string().max(30)).max(5).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    author: createAuthorSchema().optional(),
    seo: createSeoSchema().optional(),
  }),
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string().min(3).max(80),
    description: z.string().min(20).max(200),
    techStack: z.array(z.string().max(40)).min(1).max(10),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    gallery: z.array(z.string()).optional(),
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
    seo: createSeoSchema().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  portfolio: portfolioCollection,
};