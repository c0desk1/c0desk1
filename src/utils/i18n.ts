import { getRelativeLocaleUrl } from 'astro:i18n';
import { siteConfig } from '@/config/site';
import type { Locale, LabelKey } from '@/config/site';

export function getLocalizedUrl(locale: Locale, path: string) {
  return getRelativeLocaleUrl(locale, path);
}

export function getLabel(locale: Locale, key: LabelKey): string {
  return siteConfig.labels[locale][key];
}

export function getSeo(locale: Locale) {
  return siteConfig.defaultSeo[locale];
}

export function getCurrentLocale(Astro: any): Locale {
  return Astro.currentLocale || siteConfig.defaultLocale;
}

export function localizePath(path: string, locale: string) {
  return getRelativeLocaleUrl(locale, path);
}

export function getAvailableLocales(postId: string, allPosts: any[]) {
  return siteConfig.locales.filter(loc =>
    allPosts.some(post => post.id === postId && (post.data.lang || 'id') === loc)
  );
}
