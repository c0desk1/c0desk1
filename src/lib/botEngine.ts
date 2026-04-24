import type { CollectionEntry } from "astro:content";

import { contentGraph } from "./contentGraph";

/* ================================
   TYPES
================================ */
type BlogPost = CollectionEntry<"blog">;
type Portfolio = CollectionEntry<"portfolio">;

type GraphNode = {
  topic: string;
  keywords: string[];
  urls: string[];
};

/* ================================
   BLOG SCORING ENGINE
================================ */
export function scoreBlogRelation(
  source: BlogPost,
  target: BlogPost
): number {
  let score = 0;

  // 1. CATEGORY MATCH
  if (source.data.category === target.data.category) {
    score += 6;
  }

  // 2. TAG OVERLAP (STRONG SIGNAL)
  const sourceTags = source.data.tags || [];
  const targetTags = target.data.tags || [];

  const overlap = sourceTags.filter((tag) =>
    targetTags.includes(tag)
  ).length;

  score += overlap * 4;

  // 3. FEATURED BOOST
  if (target.data.featured) {
    score += 2;
  }

  // 4. RECENCY BOOST
  const sourceDate = new Date(source.data.pubDate).getTime();
  const targetDate = new Date(target.data.pubDate).getTime();

  const diffDays =
    Math.abs(sourceDate - targetDate) / (1000 * 60 * 60 * 24);

  if (diffDays <= 30) score += 2;
  if (diffDays <= 7) score += 3;

  // 5. DESCRIPTION KEYWORD SOFT MATCH
  const sourceText =
    (source.data.title + " " + source.data.description).toLowerCase();

  const targetText =
    (target.data.title + " " + target.data.description).toLowerCase();

  const keywords = sourceText.split(" ").slice(0, 8);

  const keywordHits = keywords.filter((k) =>
    k.length > 4 && targetText.includes(k)
  ).length;

  score += keywordHits;

  return score;
}

/* ================================
   RELATED BLOG POSTS
================================ */
export function getSmartRelatedPosts(
  source: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  return allPosts
    .filter((post) => post.id !== source.id)
    .map((target) => ({
      post: target,
      score: scoreBlogRelation(source, target)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

/* ================================
   PORTFOLIO SCORING ENGINE
================================ */
export function scorePortfolioRelation(
  source: Portfolio,
  target: Portfolio
): number {
  let score = 0;

  // 1. TECH STACK OVERLAP
  const sourceTech = source.data.techStack || [];
  const targetTech = target.data.techStack || [];

  const overlap = sourceTech.filter((t) =>
    targetTech.includes(t)
  ).length;

  score += overlap * 5;

  // 2. FEATURED BOOST
  if (target.data.featured) score += 2;

  // 3. CLIENT / ROLE SIMILARITY
  if (source.data.client && source.data.client === target.data.client) {
    score += 3;
  }

  if (source.data.role && source.data.role === target.data.role) {
    score += 2;
  }

  // 4. RECENCY
  const sourceDate = new Date(source.data.date).getTime();
  const targetDate = new Date(target.data.date).getTime();

  const diffDays =
    Math.abs(sourceDate - targetDate) / (1000 * 60 * 60 * 24);

  if (diffDays <= 60) score += 2;

  return score;
}

/* ================================
   RELATED PORTFOLIO
================================ */
export function getSmartRelatedProjects(
  source: Portfolio,
  allProjects: Portfolio[],
  limit = 2
): Portfolio[] {
  return allProjects
    .filter((p) => p.id !== source.id)
    .map((target) => ({
      project: target,
      score: scorePortfolioRelation(source, target)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.project);
}

export function findRelevantLinks(content: string) {
  const lowerContent = content.toLowerCase();

  const matches: {
    keyword: string;
    url: string;
    score: number;
  }[] = [];

  for (const node of contentGraph as any) {
    for (const keyword of node.keywords) {
      if (lowerContent.includes(keyword.toLowerCase())) {
        matches.push({
          keyword,
          url: node.urls[0],
          score: keyword.length
        });
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}

export function injectInternalLinks(content: string): string {
  const matches = findRelevantLinks(content);

  let result = content;
  const used = new Set<string>();

  for (const match of matches) {
    if (used.has(match.keyword)) continue;

    const regex = new RegExp(`\\b(${match.keyword})\\b`, "i");

    result = result.replace(regex, (text) => {
      used.add(match.keyword);

      return `<a href="${match.url}" class="text-emerald-500 hover:underline">${text}</a>`;
    });
  }

  return result;
}