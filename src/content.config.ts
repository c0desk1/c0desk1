// src/content.config.ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const seoSchema = z.object({
  title: z.string().max(100, "Judul terlalu panjang untuk SEO maksimal").optional(),
  description: z.string().min(10, "Deskripsi terlalu pendek").max(160, "Deskripsi terlalu panjang untuk SEO").optional(),
  ogImage: z.string().url("OG Image harus URL valid").optional(),
  canonical: z.string().url("Canonical URL harus valid").optional(),
  noIndex: z.boolean().default(false),
});

const authorSchema = z.object({
  name: z.string().default("C0desk1"),
  avatar: z.string().url("Avatar URL harus valid").optional(),
  title: z.string().optional(),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string()
      .min(3, "Title minimal 3 karakter")
      .max(100, "Title maksimal 100 karakter untuk SEO"),
    
    description: z.string()
      .min(10, "Description minimal 10 karakter")
      .max(160, "Description maksimal 160 karakter untuk SEO"),
    
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    
    tags: z.array(z.string().max(30, "Tag maksimal 30 karakter"))
      .max(5, "Maksimal 5 tags")
      .default([]),
    
    categories: z.array(z.string().max(30, "Category maksimal 30 karakter"))
      .max(3, "Maksimal 3 categories")
      .default([])
      .optional(),
    
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    
    author: authorSchema.optional(),
    seo: seoSchema.optional(),
    
    pinned: z.boolean().default(false),
  }),
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/portfolio" }),
  schema: ({ image }) => z.object({
    title: z.string()
      .min(3, "Title minimal 3 karakter")
      .max(80, "Title maksimal 80 karakter"),
    
    description: z.string()
      .min(20, "Description minimal 20 karakter")
      .max(200, "Description maksimal 200 karakter"),
    
    techStack: z.array(z.string().max(40, "Tech stack maksimal 40 karakter"))
      .min(1, "Minimal 1 tech stack")
      .max(10, "Maksimal 10 tech stack"),
    
    demoUrl: z.string().url({ message: "Demo URL harus valid" }).optional(),
    repoUrl: z.string().url({ message: "Repo URL harus valid" }).optional(),
    
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    
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
    
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
    }).optional(),
  }),
});

const settingsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: "./src/content/settings" }),
  schema: z.object({
    siteName: z.string(),
    siteDescription: z.string(),
    socialLinks: z.object({
      github: z.string().url({ message: "GitHub URL harus valid" }).optional(),
      twitter: z.string().url({ message: "Twitter URL harus valid" }).optional(),
      linkedin: z.string().url({ message: "LinkedIn URL harus valid" }).optional(),
    }).optional(),
    seo: seoSchema.optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'portfolio': portfolioCollection,
  'settings': settingsCollection,
};