// src/const.ts

type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
};

type FooterSection = {
  items: NavItem[];
};

const LOGO = "/org/c0desk1-logo.svg"
const OGIMAGE = "/org/c0desk1-og.webp"

// SITE BASE
export const SITE = {
  name:        "Unloyd",
  tagline:     "Beyond the Void",
  description: "Platform kuratif untuk pop culture, game, anime, tutorial, dan modding. Konten yang dipilih dengan cermat, bukan sekadar ramai.",
  url:         "https://unloyd.web.id",
  ogImage:      OGIMAGE,
  locale:      "id_ID",
  lang:        "id",
  dir:         "ltr",
  charset:     "utf-8",
  themeColor:  "#0a0a09",
  bgColor:     "#0a0a09",
  email:       "hello@unloyd.web.id",
  foundingYear: 2025,
} as const;

// AUTHOR / ORGANIZATION
export const AUTHOR = {
  name:    SITE.name,
  url:     "/admin",
  role:    "Editor",
  bio:     SITE.description,
  email:   SITE.email,
  avatar:  LOGO,
  twitter: "@unloyd",
} as const;

export const ORG = {
  name:        "Unloyd",
  url:         SITE.url,
  logo:        LOGO,
  sameAs: [
    "https://twitter.com/unloyd",
    "https://instagram.com/unloyd",
    "https://youtube.com/@unloyd",
    "https://tiktok.com/@unloyd",
  ],
} as const;

// ROUTES
export const ROUTES = {
  home:       "/",
  blog:       "/blog",
  news:       "/news",
  game:       "/game",
  anime:      "/anime",
  tutorial:   "/tutorial",
  modding:    "/modding",
  tech:       "/tech",
  about:      "/about",
  contact:    "/contact",
  privacy:    "/privacy-policy",
  cookie:     "/cookie-policy",
  terms:      "/terms-of-service",
  search:     "/search",
  sitemap:    "/sitemap-index.xml",
  feed:       "/feed.xml",
  feedAtom:   "/feed.atom",
  feedJson:   "/feed.json",
  rss:        "/rss.xml",
  robots:     "/robots.txt",
} as const;

export const NAV = {
  navBar: [
    { label: "Blog", href: ROUTES.blog, isExternal: false },
    { label: "Community", 
      children: [
        { label: "About", href: ROUTES.about, isExternal: false },
        { label: "Contact Us", href: ROUTES.contact, isExternal: false },
      ]
    },
    { 
      label: "Tools", 
      children: [ 
        { label: "Adogen", href: "https://dev-adogen.bimasaktiakbarr.workers.dev", isExternal: true }
      ]
    },
    {
      label: "Legal",
      children: [
        { label: "Privacy Policy", href: ROUTES.privacy, isExternal: false },
        { label: "Terms of Service", href: ROUTES.terms, isExternal: false },
        { label: "Cookie Policy", href: ROUTES.cookie, isExternal: false }
      ]
    },
  ] as NavItem[],
  footerSections: [
    {
      items: [
        { label: "About", href: ROUTES.about, isExternal: false },
        { label: "Contact Us", href: ROUTES.contact, isExternal: false },
        { label: "Privacy Policy", href: ROUTES.privacy, isExternal: false },
        { label: "Terms of Service", href: ROUTES.terms, isExternal: false },
        { label: "Cookie Policy", href: ROUTES.cookie, isExternal: false },
      ]
    }
  ] as FooterSection[],
} as const;

export const CATEGORIES = [
  { slug: "news",     label: "News",     description: "Berita terbaru dari dunia pop culture, game, dan anime."       },
  { slug: "game",     label: "Game",     description: "Review, preview, dan segala hal tentang video game."           },
  { slug: "anime",    label: "Anime",    description: "Ulasan, rekomendasi, dan berita seputar anime."                },
  { slug: "tutorial", label: "Tutorial", description: "Panduan langkah demi langkah untuk berbagai skill digital."    },
  { slug: "modding",  label: "Modding",  description: "Dunia modding game — dari cara mulai hingga mod terbaik."      },
  { slug: "tech",     label: "Tech",     description: "Teknologi yang relevan untuk gamer dan kreator konten."        },
] as const;

export type CategorySlug = typeof CATEGORIES[number]["slug"];

export const SEO = {
  titleDefault:    SITE.name,
  titleTemplate:   `%s | ${SITE.name}`,
  titleMaxLength:  60,
  description:     SITE.description,
  descriptionMaxLength: 160,
  canonical:       SITE.url,
  ogImage:         OGIMAGE,
  ogImageWidth:    1200,
  ogImageHeight:   630,
  ogImageAlt:      `${SITE.name} — ${SITE.tagline}`,

  twitterCard:     "summary_large_image" as const,
  twitterSite:     "@unloyd",
  twitterCreator:  "@unloyd",

  robots: {
    index:            true,
    follow:           true,
    googleBot: {
      index:          true,
      follow:         true,
      noimageindex:   false,
      maxVideoPreview: -1,
      maxImagePreview: "large" as const,
      maxSnippet:      -1,
    },
  },

  verification: {
    google:  "",
    bing:    "",
    yandex:  "",
  },
} as const;

export const OG = {
  type:        "website" as const,
  siteName:    SITE.name,
  locale:      SITE.locale,
  image:       SEO.ogImage,
  imageWidth:  SEO.ogImageWidth,
  imageHeight: SEO.ogImageHeight,
  imageAlt:    SEO.ogImageAlt,
} as const;

export const TWITTER = {
  card:    SEO.twitterCard,
  site:    SEO.twitterSite,
  creator: SEO.twitterCreator,
} as const;

export const schemaWebSite = {
  "@context":     "https://schema.org",
  "@type":        "WebSite",
  name:           SITE.name,
  url:            SITE.url,
  description:    SITE.description,
  inLanguage:     SITE.lang,
  potentialAction: {
    "@type":       "SearchAction",
    target: {
      "@type":     "EntryPoint",
      urlTemplate: `${SITE.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

export const schemaOrganization = {
  "@context":    "https://schema.org",
  "@type":       "Organization",
  name:          ORG.name,
  url:           ORG.url,
  logo: {
    "@type":     "ImageObject",
    url:         ORG.logo,
    width:       512,
    height:      512,
  },
  sameAs:        ORG.sameAs,
  contactPoint: {
    "@type":            "ContactPoint",
    email:              SITE.email,
    contactType:        "customer support",
    availableLanguage:  ["Indonesian", "English"],
  },
} as const;

export function schemaBreadcrumb(
  items: { name: string; url: string }[]
) {
  return {
    "@context":   "https://schema.org",
    "@type":      "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       item.name,
      item:       item.url,
    })),
  };
}

export function schemaArticle(opts: {
  title:         string;
  description:   string;
  url:           string;
  image:         string;
  datePublished: string;
  dateModified:  string;
  authorName:    string;
  category?:     string;
  tags?:         string[];
  wordCount?:    number;
  readingTime?:  number;
}) {
  return {
    "@context":        "https://schema.org",
    "@type":           "Article",
    headline:          opts.title,
    description:       opts.description,
    url:               opts.url,
    image: {
      "@type":         "ImageObject",
      url:             opts.image,
      width:           1200,
      height:          630,
    },
    datePublished:     opts.datePublished,
    dateModified:      opts.dateModified,
    author: {
      "@type":         "Person",
      name:            opts.authorName,
      url:             `${SITE.url}/author/${opts.authorName.toLowerCase().replace(/\s+/g, "-")}`,
    },
    publisher: {
      "@type":         "Organization",
      name:            ORG.name,
      url:             ORG.url,
      logo: {
        "@type":       "ImageObject",
        url:           ORG.logo,
      },
    },
    mainEntityOfPage: {
      "@type":         "WebPage",
      "@id":           opts.url,
    },
    inLanguage:        SITE.lang,
    ...(opts.category  ? { articleSection: opts.category } : {}),
    ...(opts.tags      ? { keywords: opts.tags.join(", ") } : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount }    : {}),
  };
}

export function schemaNewsArticle(opts: {
  title:         string;
  description:   string;
  url:           string;
  image:         string;
  datePublished: string;
  dateModified:  string;
  authorName:    string;
  keywords?:     string[];
}) {
  return {
    "@context":        "https://schema.org",
    "@type":           "NewsArticle",
    headline:          opts.title,
    description:       opts.description,
    url:               opts.url,
    image: {
      "@type":         "ImageObject",
      url:             opts.image,
      width:           1200,
      height:          630,
    },
    datePublished:     opts.datePublished,
    dateModified:      opts.dateModified,
    author: {
      "@type":         "Person",
      name:            opts.authorName,
    },
    publisher: {
      "@type":         "Organization",
      name:            ORG.name,
      url:             ORG.url,
      logo: {
        "@type":       "ImageObject",
        url:           ORG.logo,
      },
    },
    mainEntityOfPage: {
      "@type":         "WebPage",
      "@id":           opts.url,
    },
    inLanguage:        SITE.lang,
    ...(opts.keywords  ? { keywords: opts.keywords.join(", ") } : {}),
  };
}

export function schemaHowTo(opts: {
  name:          string;
  description:   string;
  url:           string;
  image?:        string;
  totalTime?:    string;
  steps: {
    name:        string;
    text:        string;
    image?:      string;
    url?:        string;
  }[];
  tools?:        string[];
  supply?:       string[];
}) {
  return {
    "@context":    "https://schema.org",
    "@type":       "HowTo",
    name:          opts.name,
    description:   opts.description,
    url:           opts.url,
    inLanguage:    SITE.lang,
    ...(opts.image      ? { image: opts.image }           : {}),
    ...(opts.totalTime  ? { totalTime: opts.totalTime }   : {}),
    ...(opts.tools ? {
      tool: opts.tools.map(t => ({ "@type": "HowToTool", name: t })),
    } : {}),
    ...(opts.supply ? {
      supply: opts.supply.map(s => ({ "@type": "HowToSupply", name: s })),
    } : {}),
    step: opts.steps.map((step, i) => ({
      "@type":    "HowToStep",
      position:   i + 1,
      name:       step.name,
      text:       step.text,
      ...(step.image ? { image: step.image } : {}),
      ...(step.url   ? { url: step.url }     : {}),
    })),
  };
}

export function schemaFAQ(
  items: { question: string; answer: string }[]
) {
  return {
    "@context":   "https://schema.org",
    "@type":      "FAQPage",
    mainEntity:   items.map(item => ({
      "@type":           "Question",
      name:              item.question,
      acceptedAnswer: {
        "@type":         "Answer",
        text:            item.answer,
      },
    })),
  };
}

export function schemaVideo(opts: {
  name:          string;
  description:   string;
  thumbnailUrl:  string;
  uploadDate:    string;
  duration?:     string;
  contentUrl?:   string;
  embedUrl?:     string;
}) {
  return {
    "@context":      "https://schema.org",
    "@type":         "VideoObject",
    name:            opts.name,
    description:     opts.description,
    thumbnailUrl:    opts.thumbnailUrl,
    uploadDate:      opts.uploadDate,
    publisher: {
      "@type":       "Organization",
      name:          ORG.name,
      url:           ORG.url,
    },
    ...(opts.duration   ? { duration: opts.duration }     : {}),
    ...(opts.contentUrl ? { contentUrl: opts.contentUrl } : {}),
    ...(opts.embedUrl   ? { embedUrl: opts.embedUrl }     : {}),
  };
}

export function schemaWebPage(opts: {
  title:       string;
  description: string;
  url:         string;
  type?:       "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  dateModified?: string;
}) {
  return {
    "@context":      "https://schema.org",
    "@type":         opts.type ?? "WebPage",
    name:            opts.title,
    description:     opts.description,
    url:             opts.url,
    inLanguage:      SITE.lang,
    isPartOf: {
      "@type":       "WebSite",
      name:          SITE.name,
      url:           SITE.url,
    },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export function schemaCollectionPage(opts: {
  title:       string;
  description: string;
  url:         string;
}) {
  return schemaWebPage({ ...opts, type: "CollectionPage" });
}

export function buildMeta(opts: {
  title?:        string;
  description?:  string;
  canonical?:    string;
  ogImage?:      string;
  ogImageAlt?:   string;
  ogType?:       "website" | "article";
  noindex?:      boolean;
  nofollow?:     boolean;
  datePublished?: string;
  dateModified?:  string;
  authorName?:    string;
  keywords?:      string[];
}) {
  const title       = opts.title
    ? SEO.titleTemplate.replace("%s", opts.title).slice(0, SEO.titleMaxLength + 20)
    : SEO.titleDefault;

  const description = (opts.description ?? SEO.description).slice(0, SEO.descriptionMaxLength);
  const canonical   = opts.canonical   ?? SEO.canonical;
  const ogImage     = opts.ogImage     ?? SEO.ogImage;
  const ogImageAlt  = opts.ogImageAlt  ?? SEO.ogImageAlt;
  const ogType      = opts.ogType      ?? OG.type;
  const noindex     = opts.noindex     ?? !SEO.robots.index;
  const nofollow    = opts.nofollow    ?? !SEO.robots.follow;

  const robotsContent = [
    noindex  ? "noindex"  : "index",
    nofollow ? "nofollow" : "follow",
    "max-snippet:-1",
    "max-image-preview:large",
    "max-video-preview:-1",
  ].join(", ");

  return {
    title,
    description,
    canonical,
    robots:          robotsContent,
    keywords:        opts.keywords?.join(", ") ?? "",
    og: {
      title,
      description,
      url:            canonical,
      type:           ogType,
      siteName:       OG.siteName,
      locale:         OG.locale,
      image:          ogImage,
      imageWidth:     OG.imageWidth,
      imageHeight:    OG.imageHeight,
      imageAlt:       ogImageAlt,
      ...(opts.datePublished ? { publishedTime: opts.datePublished } : {}),
      ...(opts.dateModified  ? { modifiedTime:  opts.dateModified  } : {}),
      ...(opts.authorName    ? { author:         opts.authorName   } : {}),
    },
    twitter: {
      card:           TWITTER.card,
      site:           TWITTER.site,
      creator:        TWITTER.creator,
      title,
      description,
      image:          ogImage,
      imageAlt:       ogImageAlt,
    },
  };
}

export const SOCIAL = [
  { name: "Twitter / X",  url: "https://twitter.com/unloyd",        handle: "@unloyd" },
  { name: "Instagram",    url: "https://instagram.com/unloyd",      handle: "@unloyd" },
  { name: "YouTube",      url: "https://youtube.com/@unloyd",       handle: "@unloyd" },
  { name: "TikTok",       url: "https://tiktok.com/@unloyd",        handle: "@unloyd" },
] as const;

export const PAGINATION = {
  postsPerPage:    12,
  postsPerFeed:    20,
  postsPerSitemap: 1000,
} as const;

export const IMAGE = {
  og: {
    width:   1200,
    height:  630,
  },
  thumbnail: {
    width:   800,
    height:  450,
    quality: 80,
  },
  avatar: {
    width:   96,
    height:  96,
    quality: 80,
  },
  logo: {
    width:   512,
    height:  512,
  },
  placeholder: `${SITE.url}/images/placeholder.jpg`,
} as const;

export const READING = {
  wordsPerMinute: 200,
} as const;

export function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / READING.wordsPerMinute));
}

export const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year:  "numeric",
  month: "long",
  day:   "numeric",
} as const;

export const DATE_FORMAT_SHORT: Intl.DateTimeFormatOptions = {
  month: "short",
  day:   "numeric",
} as const;

export function formatDate(date: Date | string, short = false): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(
    SITE.locale.replace("_", "-"),
    short ? DATE_FORMAT_SHORT : DATE_FORMAT
  );
}

export function toISOString(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString();
}
