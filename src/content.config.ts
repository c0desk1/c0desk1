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
  canonical: z.string().optional(),
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

const settings = defineCollection({
  loader: glob({ pattern: "**/site.json", base: "./src/content/settings" }),
  schema: z.object({
    siteName: z.string(),
    siteDescription: z.string().max(200),
    siteUrl: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL"),
    siteLogo: z.string(),
    siteMail: z.string().regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, "Must be a valid email"),
    social: z.object({
      github: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      facebook: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      instagram: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      youtube: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      twitter: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      telegram: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      whatsapp: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      tiktok: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
    }).optional(),
    defaultSeo: z.object({
      title: z.string().optional(),
      description: z.string().max(200).optional(),
      ogImage: z.string().optional(),
    }).optional(),
    googleSiteVerification: z.string().optional(),
    googleAdsenseId: z.string().optional(),
    googleAnalyticsId: z.string().optional(),
    yandexVerification: z.string().optional(),
    navItems: z.array(z.object({
      href: z.string(),
      label: z.string(),
    })).default([
      { href: "/blog/", label: "Blog" },
      { href: "/portfolio/", label: "Portfolio" },
      { href: "/about/", label: "Tentang" },
    ]),
    footerSections: z.array(
      z.object({
        title: z.string(),
        items: z.array(
          z.object({
            href: z.string(),
            label: z.string(),
            isExternal: z.boolean().default(false),
          })
        ),
      })
    ).default([
      {
        title: "Navigasi",
        items: [
          { href: "/blog/", label: "Blog", isExternal: false },
          { href: "/portfolio/", label: "Portfolio", isExternal: false },
          { href: "/about/", label: "Tentang", isExternal: false },
        ],
      },
      {
        title: "Legal",
        items: [
          { href: "/privacy-policy/", label: "Kebijakan Privasi", isExternal: false },
          { href: "/terms-of-service/", label: "Ketentuan Layanan", isExternal: false },
          { href: "/disclaimer/", label: "Disclaimer", isExternal: false },
          { href: "/cookie-policy/", label: "Kebijakan Cookie", isExternal: false },
          { href: "/dmca/", label: "DMCA", isExternal: false },
        ],
      },
      {
        title: "Social",
        items: [
          { href: "https://github.com/c0desk1", label: "GitHub", isExternal: true },
          { href: "https://twitter.com/c0desk1", label: "Twitter", isExternal: true },
          { href: "https://linkedin.com/in/c0desk1", label: "LinkedIn", isExternal: true },
        ],
      },
    ])
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
    social: z.object({
      github: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      facebook: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      instagram: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      youtube: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      twitter: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      telegram: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      whatsapp: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      tiktok: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
      linkedIn: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL").optional(),
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
  loader: glob({ pattern: "**/*.json", base: "./src/content/organizations" }),
  schema: z.object({
    name: z.string(),
    legalName: z.string().optional(),
    url: z.string().regex(/^https?:\/\/.+\..+/, "Must be a valid URL"),
    logo: z.string(),
    contactEmail: z.string().email().optional(),
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
