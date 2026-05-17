import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slug from 'limax';

const CDN_ORIGIN = 'https://cdn.c0desk1.my.id';

function ensureDate(date: Date | string | number): Date {
  if (date instanceof Date) return date;
  return new Date(date);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==================== DATE UTILITIES ====================

export function formatDate(date: Date | string | number, locale: string = 'en-US'): string {
  const d = ensureDate(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateCompact(date: Date | string | number, locale: string = 'en-US'): string {
  const d = ensureDate(date);
  return d.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateISO(date: Date | string | number): string {
  const d = ensureDate(date);
  return d.toISOString().split('T')[0];
}

// ==================== CDN IMAGE UTILITIES ====================

export function isCdnUrl(src: string): boolean {
  return typeof src === 'string' && src.startsWith(CDN_ORIGIN);
}

export function cdnImage(
  src: string,
  options?: {
    w?: number;
    h?: number;
    q?: number;
    f?: 'webp' | 'avif' | 'jpeg' | 'auto';
  }
): string {
  if (!isCdnUrl(src)) return src;
  const url = new URL(src);
  if (options?.w) url.searchParams.set('w', String(options.w));
  if (options?.h) url.searchParams.set('h', String(options.h));
  url.searchParams.set('q', String(options?.q ?? 85));
  url.searchParams.set('f', options?.f ?? 'auto');
  return url.toString();
}

// ==================== STRING UTILITIES ====================

export function stripMarkdown(content: string): string {
  if (!content?.trim()) return '';

  let text = content;

  text = text.replace(/^\s*---[\s\S]*?---\s*/, '');

  const lines = text.split('\n');

  text = lines
    .filter((line) => {
      const trimmed = line.trim();

      return (
        !trimmed.startsWith('import ') &&
        !trimmed.startsWith('// ') &&
        !trimmed.startsWith('/*')
      );
    })
    .join('\n');

  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  text = text.replace(/<[^>]*>/g, ' ');
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/[#*`>_\-+]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export function truncate(text: string, length: number = 100): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  return truncate(stripMarkdown(content), maxLength);
}

// ==================== READING TIME ====================

export function getReadingTime(content?: string): string {
  const suffix = 'min read';

  if (!content?.trim()) return `1 ${suffix}`;
  const cleanText = generateExcerpt(content, Infinity);
  const words = cleanText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} ${suffix}`;
}

// ==================== TAG & TECH STACK ====================

export function hasCommonTags(tags1: string[] = [], tags2: string[] = []): boolean {
  return tags1.some(tag => tags2.includes(tag));
}

export function hasCommonTechStack(techStack1: string[] = [], techStack2: string[] = []): boolean {
  return techStack1.some(tech => techStack2.includes(tech));
}

export function getAllTags<T extends { data: { tags?: string[] } }>(items: T[]): string[] {
  const tagsSet = new Set<string>();
  items.forEach(item => {
    item.data.tags?.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

export function getAllTechStacks<T extends { data: { techStack?: string[] } }>(items: T[]): string[] {
  const techSet = new Set<string>();
  items.forEach(item => {
    item.data.techStack?.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}

export function groupByTag<T extends { data: { tags?: string[] } }>(
  items: T[]
): Record<string, T[]> {
  const grouped: Record<string, T[]> = {};
  items.forEach(item => {
    item.data.tags?.forEach(tag => {
      if (!grouped[tag]) grouped[tag] = [];
      grouped[tag].push(item);
    });
  });
  return grouped;
}

// ==================== TABLE OF CONTENT ====================

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export function filterHeadingsForTOC(headings: Heading[], maxDepth: number = 3): Heading[] {
  return headings.filter(h => h.depth <= maxDepth);
}

export function generateHeadingId(text: string): string {
  return slugify(text, 80);
}

// ==================== FILTER UTILITIES ====================

export function filterByDraft<T extends { data: { draft?: boolean } }>(
  items: T[],
  showDrafts: boolean = false
): T[] {
  if (showDrafts) return items;
  return items.filter(item => !item.data.draft);
}

export function filterByFeatured<T extends { data: { featured?: boolean } }>(items: T[]): T[] {
  return items.filter(item => item.data.featured);
}

// ==================== SORT UTILITIES ====================

export function sortByDate<T extends { data: { updatedDate?: Date | string | number; date?: Date | string | number } }>(
  items: T[],
  dateField: 'updatedDate' | 'date' = 'updatedDate'
): T[] {
  return [...items].sort((a, b) => {
    const dateA = a.data[dateField];
    const dateB = b.data[dateField];
    if (!dateA || !dateB) return 0;
    return ensureDate(dateB).getTime() - ensureDate(dateA).getTime();
  });
}

// ==================== SHARE ====================

export function getShareUrls(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    twitter:  `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email:    `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };
}

// ==================== CLIPBOARD ====================

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ==================== VALIDATION ====================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ==================== BROWSER UTILITIES ====================

export const isBrowser = typeof window !== 'undefined';

export function getCurrentTheme(): 'dark' | 'light' {
  if (!isBrowser) return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme: 'dark' | 'light'): void {
  if (!isBrowser) return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}

export function toggleTheme(): 'dark' | 'light' {
  const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
}

// ==================== SLUG UTILITIES ====================

export function slugify(text: string, maxLength = 50): string {
  let result = slug(text, {
    tone: false,
  });

  if (result.length <= maxLength) {
    return result;
  }

  const truncated = result.slice(0, maxLength);

  const lastDash = truncated.lastIndexOf('-');

  result =
    lastDash > 0
      ? truncated.slice(0, lastDash)
      : truncated;

  return result.replace(/-+$/, '');
}

export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';

  return path
    .replace(/\/+$/, '')
    .concat('/');
}

export function getPageUrl(num: number): string {
  return num <= 1
    ? '/blog/'
    : `/blog/${num}/`;
}

export function getPageNums(cur: number, last: number): (number | '…')[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  const r: (number | '…')[] = [1];
  if (cur > 3) r.push('…');
  const s = Math.max(2, cur - 1);
  const e = Math.min(last - 1, cur + 1);
  for (let i = s; i <= e; i++) r.push(i);
  if (cur < last - 2) r.push('…');
  r.push(last);
  return r;
}
