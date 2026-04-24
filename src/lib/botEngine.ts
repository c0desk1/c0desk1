import type { CollectionEntry } from "astro:content";


/* ================================
   TYPES
================================ */

type BlogPost = CollectionEntry<"blog">;
type Portfolio = CollectionEntry<"portfolio">;

/* ================================
   BLOG SCORING ENGINE
================================ */

export function scoreBlogRelation(
  source: BlogPost,
  target: BlogPost
): number {

  let score = 0;

  // CATEGORY MATCH
  if (source.data.category === target.data.category) {
    score += 6;
  }

  // TAG OVERLAP
  const sourceTags = source.data.tags || [];
  const targetTags = target.data.tags || [];

  const overlap = sourceTags.filter((tag) =>
    targetTags.includes(tag)
  ).length;

  score += overlap * 4;

  // FEATURED BOOST
  if (target.data.featured) {
    score += 2;
  }

  // RECENCY BOOST
  const sourceDate = new Date(source.data.pubDate).getTime();
  const targetDate = new Date(target.data.pubDate).getTime();

  const diffDays =
    Math.abs(sourceDate - targetDate) /
    (1000 * 60 * 60 * 24);

  if (diffDays <= 30) score += 2;
  if (diffDays <= 7) score += 3;

  // KEYWORD SOFT MATCH
  const sourceText =
    (source.data.title + " " +
      source.data.description).toLowerCase();

  const targetText =
    (target.data.title + " " +
      target.data.description).toLowerCase();

  const keywords = sourceText
    .split(" ")
    .slice(0, 8);

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

  // TECH STACK OVERLAP
  const sourceTech = source.data.techStack || [];
  const targetTech = target.data.techStack || [];

  const overlap = sourceTech.filter((t) =>
    targetTech.includes(t)
  ).length;

  score += overlap * 5;

  // FEATURED BOOST
  if (target.data.featured) score += 2;

  // CLIENT MATCH
  if (
    source.data.client &&
    source.data.client === target.data.client
  ) {
    score += 3;
  }

  // ROLE MATCH
  if (
    source.data.role &&
    source.data.role === target.data.role
  ) {
    score += 2;
  }

  // RECENCY
  const sourceDate = new Date(source.data.date).getTime();
  const targetDate = new Date(target.data.date).getTime();

  const diffDays =
    Math.abs(sourceDate - targetDate) /
    (1000 * 60 * 60 * 24);

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
      score: scorePortfolioRelation(
        source,
        target
      )
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.project);
}

/* ================================
   AUTO INTERNAL LINK ENGINE
================================ */

export function injectInternalLinks(
  content: string,
  allPosts: BlogPost[]
): string {
  const MAX_TOTAL_LINKS = 10;
  const MAX_PER_KEYWORD = 2;
  let totalLinks = 0;
  let lastIndex = -1000;

  const keywordMap: Record<string, string> = {};

  for (const post of allPosts) {
    const slug = `/blog/${post.id}/`;
    
    const words = post.data.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length >= 4);

    for (const word of words) {
      if (!keywordMap[word]) {
        keywordMap[word] = slug;
      }
    }
  }

  const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);

  console.log("=== LINK ENGINE DEBUG ===");
  console.log("Total Kata Kunci Terdaftar:", sortedKeywords.length);

  const codeBlocks: string[] = [];
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  const links: string[] = [];
  content = content.replace(/\[.*?\]\(.*?\)/g, (match) => {
    links.push(match);
    return `__LINK_${links.length - 1}__`;
  });

  const headings: string[] = [];
  content = content.replace(/^#{1,6} .*/gm, (match) => {
    headings.push(match);
    return `__HEADING_${headings.length - 1}__`;
  });

  for (const keyword of sortedKeywords) {
    const url = keywordMap[keyword];
    const regex = new RegExp(`\\b(${keyword})\\b`, "gi");

    content = content.replace(regex, (match, p1, offset) => {
    
      if (totalLinks >= MAX_TOTAL_LINKS) return match;
      if (offset - lastIndex < 80) return match;

      totalLinks++;
      lastIndex = offset;
      return `[♠ ${match}](${url})`;
    });
  }
  
  content = content.replace(/__HEADING_(\d+)__/g, (_, i) => headings[Number(i)]);
  content = content.replace(/__LINK_(\d+)__/g, (_, i) => links[Number(i)]);
  content = content.replace(/__CODE_BLOCK_(\d+)__/g, (_, i) => codeBlocks[Number(i)]);

  console.log("Link berhasil disuntikkan:", totalLinks);
  return content;
}
