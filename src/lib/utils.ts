// src/lib/utils.ts

// ==================== DATE UTILITIES ====================

/**
 * Helper untuk memastikan value adalah Date object
 */
function ensureDate(date: Date | string | number): Date {
  if (date instanceof Date) return date;
  return new Date(date);
}

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
    year: 'numeric',
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

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  return `${years} year${years > 1 ? 's' : ''} ago`;
}


export function isToday(date: Date | string | number): boolean {
  const d = ensureDate(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

export function isYesterday(date: Date | string | number): boolean {
  const d = ensureDate(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

// ==================== STRING UTILITIES ====================

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
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

export function generateExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content.replace(/<[^>]*>/g, '').replace(/[#*`>]/g, '');
  return truncate(plainText, maxLength);
}

// ==================== READING TIME UTILITIES ====================

export function calculateReadingTime(content: string, wordsPerMinute: number = 200): string {
  if (!content) return '1 min read';
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}

export function getReadingTime(
  customReadingTime?: number,
  pluginReadingTime?: number,
  content?: string,
  locale: 'en' | 'id' = 'en'
): string {
  const suffix = locale === 'id' ? 'min baca' : 'min read';
  const oneMinute = locale === 'id' ? '1 min baca' : '1 min read';
  
  if (customReadingTime) {
    return customReadingTime === 1 ? oneMinute : `${customReadingTime} ${suffix}`;
  }
  if (pluginReadingTime) {
    return pluginReadingTime === 1 ? oneMinute : `${pluginReadingTime} ${suffix}`;
  }
  if (content) {
    return calculateReadingTime(content);
  }
  return `3 ${suffix}`;
}

// ==================== TAG & TECH STACK UTILITIES ====================

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

// ==================== BREADCRUMB UTILITIES ====================

export function getBreadcrumbFromPath(path: string): Array<{ name: string; href: string }> {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'home', href: '/' }];
  
  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: segment,
      href: currentPath,
    });
  }
  
  return breadcrumbs;
}

// ==================== TABLE OF CONTENT UTILITIES ====================

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
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

// ==================== RELATED CONTENT UTILITIES ====================

export function getRelatedPosts<T extends { data: { tags?: string[] } }>(
  currentPost: T,
  allPosts: T[],
  limit: number = 2
): T[] {
  const currentTags = currentPost.data.tags || [];
  
  return allPosts
    .filter(p => p !== currentPost)
    .filter(p => hasCommonTags(currentTags, p.data.tags || []))
    .slice(0, limit);
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

export function filterByYear<T extends { data: { pubDate?: Date | string | number; date?: Date | string | number } }>(
  items: T[],
  year: number,
  dateField: 'pubDate' | 'date' = 'pubDate'
): T[] {
  return items.filter(item => {
    const date = item.data[dateField];
    if (!date) return false;
    const d = ensureDate(date);
    return d.getFullYear() === year;
  });
}

export function groupByYear<T extends { data: { pubDate?: Date; date?: Date } }>(
  items: T[],
  dateField: 'pubDate' | 'date' = 'pubDate'
): Record<number, T[]> {
  return items.reduce((acc, item) => {
    const date = item.data[dateField];
    if (date) {
      const year = date.getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
    }
    return acc;
  }, {} as Record<number, T[]>);
}

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

export function getArchiveCounts<T extends { data: { pubDate?: Date; date?: Date } }>(
  items: T[],
  dateField: 'pubDate' | 'date' = 'pubDate'
): Record<number, number> {
  const grouped = groupByYear(items, dateField);
  const counts: Record<number, number> = {};
  
  for (const [year, posts] of Object.entries(grouped)) {
    counts[Number(year)] = posts.length;
  }
  
  return counts;
}

// ==================== SEARCH UTILITIES ====================

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function searchItems<T extends Record<string, any>>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  if (!query.trim()) return items;
  
  const lowerQuery = query.toLowerCase();
  return items.filter(item =>
    fields.some(field => {
      const value = item[field];
      if (Array.isArray(value)) {
        return value.some((v: string) => v.toLowerCase().includes(lowerQuery));
      }
      return String(value).toLowerCase().includes(lowerQuery);
    })
  );
}

// ==================== URL & SHARE UTILITIES ====================

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

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ==================== NUMBER UTILITIES ====================

export function formatNumberCompact(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
}

// ==================== COLOR UTILITIES ====================

export function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// ==================== VALIDATION UTILITIES ====================

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

// ==================== ARRAY UTILITIES ====================

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
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