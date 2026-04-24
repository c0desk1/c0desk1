import { visit } from "unist-util-visit";

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

export function remarkInternalLinks(allPosts: any[]) {
  const keywordMap: Record<string, string> = {};
  allPosts.forEach((post) => {
    const slug = `/blog/${post.id}/`;
    const words = post.data.title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length >= 4);

    words.forEach((word) => {
      if (!keywordMap[word]) keywordMap[word] = slug;
    });
  });

  const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);
  return (tree: any) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || ["link", "code", "inlineCode", "heading"].includes(parent.type)) {
        return;
      }

      let value = node.value;
      let hasChange = false;

      for (const keyword of sortedKeywords) {
        const url = keywordMap[keyword];       
        const regex = new RegExp(`\\b(${keyword})\\b`, "gi");

        if (regex.test(value)) {
          value = value.replace(regex, `<a href="${url}" class="internal-link">〄 $1</a>`);
          hasChange = true;
        }
      }

      if (hasChange) {
        node.type = "html";
        node.value = value;
      }
    });
  };
}

export function getPostTopicGraph(
  post: CollectionEntry<"blog">,
  allPosts: CollectionEntry<"blog">[]
) {
  const tags = post.data.tags ?? [];
  const category = post.data.category;

  const related = allPosts
    .filter((p) => p.id !== post.id)
    .map((p) => {
      const sharedTags =
        (p.data.tags ?? []).filter((t) => tags.includes(t)).length;

      const sameCategory =
        p.data.category === category ? 2 : 0;

      const score = sharedTags + sameCategory;

      return {
        post: p,
        score
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return related.slice(0, 5).map((r) => r.post);
}