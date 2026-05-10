import { seoConfig } from './seo';
import { authorConfig } from './author';
import { navConfig } from './nav';
import { i18nConfig } from './i18n';
import { analyticsConfig } from './analytics';

export const siteConfig = {
 ...seoConfig,
 ...authorConfig,
 ...navConfig,
 ...i18nConfig,
 ...analyticsConfig,

  social: [
    { label: "github", href: "https://github.com/c0desk1" },
    { label: "sitemap", href: "https://c0desk1.my.id/sitemap-index.xml" },
    { label: "rss", href: "https://c0desk1.my.id/rss.xml" }
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type { Locale } from './i18n';