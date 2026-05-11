import { getRelativeLocaleUrl } from 'astro:i18n';
import { siteConfig } from '@/config/site';
import type { Locale, LabelKey } from '@/config/site';

export function getCurrentLocale(Astro: any): Locale {
  const locale = Astro.params.locale || Astro.currentLocale || siteConfig.defaultLocale;
  if (siteConfig.locales.includes(locale)) return locale as Locale;
  return siteConfig.defaultLocale;
}

export function localizePath(path: string, locale: string) {
  const safeLocale = locale || siteConfig.defaultLocale;
  return getRelativeLocaleUrl(safeLocale, path);
}

export function getLocalizedUrl(locale: Locale, path: string) {
  return getRelativeLocaleUrl(locale, path);
}

export function getLabel(locale: Locale, key: LabelKey): string {
  return siteConfig.labels[locale]?.[key] || siteConfig.labels[siteConfig.defaultLocale][key];
}

export function getSeo(locale: Locale) {
  return siteConfig.defaultSeo[locale] || siteConfig.defaultSeo[siteConfig.defaultLocale];
}

export function getAvailableLocales(postId: string, allPosts: any[]) {
  return siteConfig.locales.filter(loc =>
    allPosts.some(post => post.id === postId && (post.data.lang || 'id') === loc)
  );
}