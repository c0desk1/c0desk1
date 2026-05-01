import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// ==========================================
// 1. SHARED UTILITIES
// ==========================================

const seoSchema = z.object({
  title: z.string().max(100).optional(),
  description: z.string().min(10).max(200).optional(),
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

const socialSchema = z.object({
  github: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  whatsapp: z.string().optional(),
  tiktok: z.string().optional(),
  linkedIn: z.string().optional(),
}).optional();

// ==========================================
// 2. CORE ENTITIES
// ==========================================

const settings = defineCollection({
  loader: glob({ pattern: "**/site.json", base: "./src/content/settings" }),
  schema: z.object({
    siteName: z.string(),
    siteDescription: z.string().max(200),
    siteUrl: z.string(),
    siteLogo: z.string(),
    siteMail: z.string(),
    social: socialSchema,
    defaultSeo: seoSchema.optional(),
    googleSiteVerification: z.string().optional(),
    googleAdsenseId: z.string().optional(),
    googleAnalyticsId: z.string().optional(),
    yandexVerification: z.string().optional(),
    navItems: z.array(z.object({
      href: z.string(),
      label: z.string(),
    })),
    footerSections: z.array(z.object({
      title: z.string(),
      items: z.array(z.object({
        href: z.string(),
        label: z.string(),
        isExternal: z.boolean().default(false),
      })),
    })),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.{json,md}", base: "./src/content/authors" }),
  schema: z.object({
    slug: z.string().optional(),
    name: z.string(),
    role: z.string(),
    avatar: z.string(),
    bio: z.string(),
    organization: reference('organizations').optional(),
    social: socialSchema,
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
  loader: glob({ pattern: "**/*.json", base: "./src/content/organizations" }),
  schema: z.object({
    name: z.string(),
    legalName: z.string().optional(),
    url: z.string(),
    logo: z.string(),
    contactEmail: z.string().optional(),
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
      caption: z.string().optional(),
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
    title: z.string(),
    description: z.string().optional(),
    lastUpdated: z.coerce.date(),
    seo: seoSchema.optional(),
  }),
});

export const collections = {
  settings,
  blog,
  portfolio,
  authors,
  categories,
  organizations,
  legal
};