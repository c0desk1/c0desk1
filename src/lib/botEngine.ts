import type { CollectionEntry } from "astro:content";


import { visit } from "unist-util-visit";

/* ================================
   TYPES
================================ */

type BlogPost = CollectionEntry<"blog">;
type Portfolio = CollectionEntry<"portfolio">;

export function remarkInternalLinks(allPosts) {

  const keywordMap = {};

  for (const post of allPosts) {

    const slug =
      `/blog/${post.id}/`;

    const words =
      post.data.title
        .toLowerCase()
        .split(" ")
        .filter(w => w.length >= 5)
        .slice(0, 3);

    for (const word of words) {

      if (!keywordMap[word]) {

        keywordMap[word] = slug;

      }

    }

  }

  return function transformer(tree) {

    visit(tree, "text", (node) => {

      let value = node.value;

      for (const keyword in keywordMap) {

        const url =
          keywordMap[keyword];

        const regex =
          new RegExp(
            `\\b(${keyword})\\b`,
            "gi"
          );

        value =
          value.replace(
            regex,
            `[${keyword}](${url})`
          );

      }

      node.value = value;

    });

  };

}

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

  const MAX_TOTAL_LINKS = 8;
  const MAX_PER_KEYWORD = 2;

  let totalLinks = 0;
  let lastIndex = -1000;

  /* =============================
     BUILD KEYWORD MAP
  ============================= */

  const keywordMap: Record<string, string> = {};

  for (const post of allPosts) {

    const slug = `/blog/${post.id}/`;

    const title = post.data.title.toLowerCase();

    const words = title
      .split(" ")
      .filter((w) => w.length >= 5)
      .slice(0, 3);

    for (const word of words) {

      if (!keywordMap[word]) {
        keywordMap[word] = slug;
      }

    }

  }

  const sortedKeywords = Object
    .keys(keywordMap)
    .sort((a, b) => b.length - a.length);

  const keywordUsage: Record<
    string,
    number
  > = {};

  /* =============================
     PROTECT CODE BLOCKS
  ============================= */

  const codeBlocks: string[] = [];

  content = content.replace(
    /```[\s\S]*?```/g,
    (match) => {
      codeBlocks.push(match);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    }
  );

  /* =============================
     PROTECT EXISTING LINKS
  ============================= */

  const links: string[] = [];

  content = content.replace(
    /\[.*?\]\(.*?\)/g,
    (match) => {
      links.push(match);
      return `__LINK_${links.length - 1}__`;
    }
  );

  /* =============================
     PROTECT HEADINGS
  ============================= */

  const headings: string[] = [];

  content = content.replace(
    /^#{1,6} .*/gm,
    (match) => {
      headings.push(match);
      return `__HEADING_${headings.length - 1}__`;
    }
  );

  /* =============================
     LINK INJECTION
  ============================= */

  for (const keyword of sortedKeywords) {

    keywordUsage[keyword] = 0;

    const url = keywordMap[keyword];

    const regex = new RegExp(
      `\\b(${keyword})\\b`,
      "gi"
    );

    content = content.replace(
      regex,
      (match, offset) => {

        if (totalLinks >= MAX_TOTAL_LINKS)
          return match;

        if (
          keywordUsage[keyword] >=
          MAX_PER_KEYWORD
        )
          return match;

        if (offset - lastIndex < 120)
          return match;

        keywordUsage[keyword]++;

        totalLinks++;

        lastIndex = offset;

        return `[♠ ${match}](${url})`;

      }
    );
  }

  /* =============================
     RESTORE BLOCKS
  ============================= */

  content = content.replace(
    /__HEADING_(\d+)__/g,
    (_, i) => headings[Number(i)]
  );

  content = content.replace(
    /__LINK_(\d+)__/g,
    (_, i) => links[Number(i)]
  );

  content = content.replace(
    /__CODE_BLOCK_(\d+)__/g,
    (_, i) => codeBlocks[Number(i)]
  );

  return content;
}