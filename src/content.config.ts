import { 
  defineCollection, 
  reference 
} from "astro:content";

import { glob } from "astro/loaders";
import { z } from 'astro/zod';

import { CATEGORIES } from './consts';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const seoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
  noIndex: z.boolean().default(false),
});

const metadataSchema = z.object({
  lang: z.string().optional(),
	title: z.string(),
	description: z.string(),
	slug: z.string().optional(),
  pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
});

const socialSchema = z.array(z.object({
    href: z.string(),
    label: z.string(),
})).optional();

const authors = defineCollection({
  loader: glob({ base: './src/content/authors', pattern: '**/*.{json, md}' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    role: z.string().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    mail: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    social: socialSchema,
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...metadataSchema.shape,
    heroImage: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    draft: z.boolean().default(false),
	  featured: z.boolean().default(false),
    author: reference("authors"),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    overview: z.array(z.string()).optional(),
    appDetails: z.object({
      operatingSystem: z.string().optional(),
      applicationCategory: z.string().optional(),
      price: z.string().optional(),
      priceCurrency: z.string().optional(),
    }).optional(),
    seo: seoSchema,
  }),
});

const legal = defineCollection({
  loader: glob({ base: './src/content/legal', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    lang: z.string().optional(),
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    lastUpdated: z.coerce.date().optional(),
    seo: seoSchema,
  }),
});

export const collections = {
  blog,
  authors,
  legal
};