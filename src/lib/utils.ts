import {type  ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==================== DATE UTILITIES ====================

function ensureDate(date: Date | string | number): Date {
  if (date instanceof Date) return date;
  return new Date(date);
}

export function formatDate(date: Date | string | number, locale: string = 'id-ID'): string {
  const d = ensureDate(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateCompact(date: Date | string | number, locale: string = 'id-ID'): string {
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

export function formatRelativeTime(date: Date | string | number): string {
  const d = ensureDate(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;
  if (weeks < 4) return `${weeks} minggu lalu`;
  if (months < 12) return `${months} bulan lalu`;
  return `${years} tahun lalu`;
}

// ==================== CDN IMAGE UTILITIES ====================

const CDN_ORIGIN = 'https://cdn.c0desk1.my.id';

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

export function generateExcerpt(content: string, maxLength: number = 160): string {
  if (!content?.trim()) return '';

  let text = content;

  text = text.replace(/^\s*---[\s\S]*?---\s*/, '');
  
  const lines = text.split('\n');
  const filteredLines = lines.filter(line => {
    const trimmed = line.trim();
    return !trimmed.startsWith('import ') && !trimmed.startsWith('// ') && !trimmed.startsWith('/*');
  });
  text = filteredLines.join('\n');
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  text = text.replace(/<[^>]*>/g, ' ');
  text = text.replace(/<\/[^>]*>/g, ' ');
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

  return truncate(text, maxLength);
}

// ==================== READING TIME ====================

export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): string {
  if (!content?.trim()) return '1 menit baca';

  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return minutes === 1
    ? '1 menit baca'
    : `${minutes} menit baca`;
}

export function getReadingTime(
  content?: string,
  locale: 'id' | 'en' = 'id'
): string {
  const suffix = locale === 'id' ? 'menit baca' : 'min read';

  if (!content?.trim()) {
    return `1 ${suffix}`;
  }

  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return minutes === 1
    ? `1 ${suffix}`
    : `${minutes} ${suffix}`;
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
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// ==================== RELATED CONTENT ====================

export function getRelatedPosts<T extends { id: string; data: { tags?: string[] } }>(
  currentPost: T,
  allPosts: T[],
  limit: number = 3
): T[] {
  const currentTags = currentPost.data.tags || [];
  const currentId = currentPost.id;
  
  let related = allPosts.filter(p => p.id !== currentId);
  
  if (currentTags.length > 0) {
    const taggedPosts = related.filter(p => 
      p.data.tags?.some(tag => currentTags.includes(tag))
    );
    
    if (taggedPosts.length > 0) {
      return taggedPosts.slice(0, limit);
    }
  }
  
  return related.slice(0, limit);
}

export function getRelatedProjects<T extends { data: { techStack?: string[] } }>(
  currentProject: T,
  allProjects: T[],
  limit: number = 2
): T[] {
  const currentTechStack = currentProject.data.techStack || [];
  
  return allProjects
    .filter(p => p !== currentProject)
    .filter(p => hasCommonTechStack(currentTechStack, p.data.techStack || []))
    .slice(0, limit);
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

// ==================== SORT & FILTER UTILITIES ====================

export function sortByDate<T extends { data: { pubDate?: Date | string | number; date?: Date | string | number } }>(
  items: T[],
  dateField: 'pubDate' | 'date' = 'pubDate'
): T[] {
  return [...items].sort((a, b) => {
    const dateA = a.data[dateField];
    const dateB = b.data[dateField];
    if (!dateA || !dateB) return 0;
    
    const dA = ensureDate(dateA);
    const dB = ensureDate(dateB);
    return dB.getTime() - dA.getTime();
  });
}

// ==================== SHARE ====================

export function getShareUrls(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
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

// ==================== UTILITIES ====================

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
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}

export function toggleTheme(): 'dark' | 'light' {
  const current = getCurrentTheme();
  const newTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
}

// ==================== SLUG UTILITIES ====================

const cyrillicToLatinMap: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
  'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  // Kapital
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
  'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
  'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
  'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
  'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
};

export function slugify(text: string): string {
  return text
   .split('')
   .map(char => cyrillicToLatinMap[char] || char) // ← transliterate dulu
   .join('')
   .toLowerCase()
   .trim()
   .normalize('NFD')
   .replace(/[\u0300-\u036f]/g, '')
   .replace(/[^a-z0-9\s-]/g, '') // ← sekarang aman, udah jadi latin
   .replace(/\s+/g, '-')
   .replace(/-+/g, '-')
   .replace(/^-+|-+$/g, '');
}