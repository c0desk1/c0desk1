import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// ==========================================
// 1. SHARED UTILITIES
// ==========================================

const seoSchema = z.object({
  title: z.string().max(100).optional(),
  description: z.string().min(10).max(160).optional(),
  ogImage: z.string().optional(),
  canonical: z.string().url().optional(),
  noIndex: z.boolean().default(false),
});

const metadataSchema = z.object({
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

// ==========================================
// 2. CORE ENTITIES
// ==========================================

const authors = defineCollection({
  loader: glob({ pattern: "**/*.{json,md}", base: "./src/content/authors" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string(),
    bio: z.string(),
    organization: reference('organizations').optional(),
    social: z.object({
      github: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
    }).optional(),
  }),
});


const categories = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/categories" }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
  }),
});


const organizations = defineCollection({
  loader: glob({ pattern: "**/site.json", base: "./src/content/settings" }),
  schema: z.object({
    name: z.string(),
    legalName: z.string(),
    url: z.string().url(),
    logo: z.string(),
    contactEmail: z.string().email(),
    socialLinks: z.array(z.string().url()),
    analyticsId: z.string().optional(),
    adsenseId: z.string().optional(),
  }),
});

// ==========================================
// 3. CONTENT COLLECTIONS
// ==========================================

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().min(10).max(100),
    description: z.string().min(50).max(160),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),

    author: reference("authors"),
    category: reference("categories"),
    tags: z.array(z.string()).default([]),
    
    ...metadataSchema.shape,
    seo: seoSchema.optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(50).max(200),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    techStack: z.array(z.string()),
    client: z.string().optional(),
    role: z.string().optional(),
    duration: z.string().optional(),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    metrics: z.object({
      performance: z.number().optional(),
      accessibility: z.number().optional(),
      seo: z.number().optional(),
    }).optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    
    ...metadataSchema.shape,
    seo: seoSchema.optional(),
  }),
});

export const collections = {
  blog,
  portfolio,
  authors,
  categories,
  organizations,
};