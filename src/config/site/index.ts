//config/site/index.ts

import { seoConfig } from './seo';
import { authorConfig } from './author';
import { navConfig } from './nav';
import { analyticsConfig } from './analytics';
import { labels } from './labels';

export const siteConfig = {
 ...seoConfig,
 ...authorConfig,
 ...navConfig,
 ...analyticsConfig,
 ...labels,
} as const;

export type SiteConfig = typeof siteConfig;