// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';
import { SITE, ROUTES, SEO } from '@/consts';

export const GET: APIRoute = ({ site }) => {
  const isIndexable = SEO.robots.index;
  const baseUrl = (site?.href || SITE.url).replace(/\/$/, '');
  const sitemapUrl = `${baseUrl}${ROUTES.sitemap}`;
  const pureHost = baseUrl.replace(/^https?:\/\//, '');

  const robotsTxt = `
# ============================================================
# ROBOTS.TXT — ${SITE.name}
# ============================================================

User-agent: *
${isIndexable ? 'Allow: /' : 'Disallow: /'}

# Hindari Crawling pada Direktori Internal & Error
Disallow: /api/
Disallow: /404/
Disallow: /_astro/

# Cegah Indexing URL dengan Parameter (hindari duplicate content)
Disallow: /*?*

# Blokir file JSON
Disallow: /*.json$

# (Opsional) Batasi kecepatan crawl
Crawl-delay: 1

# ============================================================
# BLOKIR AI CRAWLERS (Opsional)
# ============================================================
# User-agent: GPTBot
# Disallow: /
# User-agent: ChatGPT-User
# Disallow: /
# User-agent: CCBot
# Disallow: /
# User-agent: anthropic-ai
# Disallow: /
# User-agent: Google-Extended
# Disallow: /

# ============================================================
# SITEMAP
# ============================================================
Sitemap: ${sitemapUrl}

# ============================================================
# KHUSUS YANDEX
# ============================================================
Host: ${pureHost}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};