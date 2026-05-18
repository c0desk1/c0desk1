<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/"
  exclude-result-prefixes="atom dc media">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><xsl:value-of select="/rss/channel/title" /> — RSS Feed</title>
        <style><![CDATA[
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          :root {
            --bg: #fafafa;
            --bg-muted: #f4f4f5;
            --bg-subtle: #e4e4e7;
            --border: #e4e4e7;
            --fg: #09090b;
            --fg-muted: #52525b;
            --fg-subtle: #71717a;
            --accent: #18181b;
            --accent-fg: #fafafa;
            --radius: 8px;
            --font-sans: ui-sans-serif, system-ui, -apple-system, sans-serif;
            --font-mono: ui-monospace, "Cascadia Code", "Fira Code", monospace;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #09090b;
              --bg-muted: #18181b;
              --bg-subtle: #27272a;
              --border: #27272a;
              --fg: #fafafa;
              --fg-muted: #a1a1aa;
              --fg-subtle: #71717a;
              --accent: #fafafa;
              --accent-fg: #09090b;
            }
          }

          body {
            background: var(--bg);
            color: var(--fg);
            font-family: var(--font-sans);
            font-size: 15px;
            line-height: 1.6;
            min-height: 100vh;
          }

          a { color: inherit; text-decoration: none; }
          a:hover { text-decoration: underline; text-underline-offset: 3px; }

          /* ── Layout ── */
          .page-wrap {
            max-width: 720px;
            margin: 0 auto;
            padding: 0 1.25rem 4rem;
          }

          /* ── Header ── */
          .feed-header {
            border-bottom: 1px solid var(--border);
            padding: 2.5rem 0 2rem;
            margin-bottom: 2rem;
          }

          .feed-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--fg-subtle);
            background: var(--bg-muted);
            border: 1px solid var(--border);
            border-radius: 999px;
            padding: 0.25rem 0.75rem;
            margin-bottom: 1.25rem;
          }

          .feed-badge svg {
            width: 12px; height: 12px;
            fill: #f97316;
            flex-shrink: 0;
          }

          .feed-title {
            font-size: 1.75rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.2;
            margin-bottom: 0.5rem;
          }

          .feed-title a:hover { text-decoration: none; opacity: 0.8; }

          .feed-desc {
            color: var(--fg-muted);
            font-size: 0.9rem;
            max-width: 540px;
            margin-bottom: 1.5rem;
          }

          .feed-meta {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem 1.25rem;
            font-size: 0.8rem;
            font-family: var(--font-mono);
            color: var(--fg-subtle);
          }

          .feed-meta-item {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
          }

          .feed-meta-item svg {
            width: 13px; height: 13px;
            opacity: 0.7;
            flex-shrink: 0;
          }

          /* ── Subscribe CTA ── */
          .subscribe-box {
            background: var(--bg-muted);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 1.25rem 1.5rem;
            margin-bottom: 2.5rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
          }

          .subscribe-box svg {
            width: 18px; height: 18px;
            flex-shrink: 0;
            margin-top: 2px;
            color: var(--fg-subtle);
          }

          .subscribe-box p {
            font-size: 0.85rem;
            color: var(--fg-muted);
            line-height: 1.5;
          }

          .subscribe-box p strong {
            display: block;
            color: var(--fg);
            font-weight: 600;
            margin-bottom: 0.2rem;
            font-size: 0.875rem;
          }

          .subscribe-url {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            margin-top: 0.6rem;
            font-family: var(--font-mono);
            font-size: 0.775rem;
            color: var(--fg);
            background: var(--bg-subtle);
            border: 1px solid var(--border);
            border-radius: 5px;
            padding: 0.3rem 0.6rem;
            word-break: break-all;
          }

          /* ── Posts list ── */
          .posts-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
          }

          .posts-label {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--fg-subtle);
          }

          .posts-count {
            font-family: var(--font-mono);
            font-size: 11px;
            color: var(--fg-subtle);
            background: var(--bg-muted);
            border: 1px solid var(--border);
            border-radius: 999px;
            padding: 0.15rem 0.6rem;
          }

          .post-list {
            list-style: none;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            overflow: hidden;
          }

          .post-item {
            border-bottom: 1px solid var(--border);
          }

          .post-item:last-child { border-bottom: none; }

          .post-link {
            display: block;
            padding: 1.1rem 1.25rem;
            transition: background 0.12s ease;
          }

          .post-link:hover {
            background: var(--bg-muted);
            text-decoration: none;
          }

          .post-link:hover .post-title { text-decoration: underline; text-underline-offset: 3px; }

          .post-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 0.3rem;
          }

          .post-title {
            font-size: 0.9375rem;
            font-weight: 600;
            line-height: 1.35;
            color: var(--fg);
          }

          .post-date {
            font-family: var(--font-mono);
            font-size: 0.725rem;
            color: var(--fg-subtle);
            white-space: nowrap;
            flex-shrink: 0;
            padding-top: 2px;
          }

          .post-desc {
            font-size: 0.825rem;
            color: var(--fg-muted);
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 0.5rem;
          }

          .post-meta {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.3rem;
          }

          .post-tag {
            font-family: var(--font-mono);
            font-size: 10px;
            letter-spacing: 0.04em;
            color: var(--fg-subtle);
            background: var(--bg-subtle);
            border: 1px solid var(--border);
            border-radius: 4px;
            padding: 0.1rem 0.45rem;
          }

          .post-author {
            font-size: 0.75rem;
            color: var(--fg-subtle);
            margin-left: auto;
            font-family: var(--font-mono);
          }

          /* ── Footer ── */
          .feed-footer {
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            text-align: center;
            font-size: 0.775rem;
            font-family: var(--font-mono);
            color: var(--fg-subtle);
          }

          .feed-footer a { color: var(--fg-muted); }
          .feed-footer a:hover { color: var(--fg); }
        ]]></style>
      </head>
      <body>
        <div class="page-wrap">

          <!-- Header -->
          <header class="feed-header">
            <div class="feed-badge">
              <!-- RSS icon -->
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
              </svg>
              RSS Feed
            </div>

            <h1 class="feed-title">
              <a href="{/rss/channel/link}">
                <xsl:value-of select="/rss/channel/title" />
              </a>
            </h1>

            <p class="feed-desc">
              <xsl:value-of select="/rss/channel/description" />
            </p>

            <div class="feed-meta">
              <span class="feed-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Updated: <xsl:value-of select="/rss/channel/lastBuildDate" />
              </span>
              <span class="feed-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 5h12M3 8h9m-9 3h6m4 0l4-4 4 4m-4-4v12"/>
                </svg>
                <xsl:value-of select="/rss/channel/language" />
              </span>
            </div>
          </header>

          <!-- Subscribe hint -->
          <div class="subscribe-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
            </svg>
            <p>
              <strong>Subscribe to this feed</strong>
              Copy the URL below into your RSS reader (Feedly, NetNewsWire, Reeder, etc.) to stay updated automatically.
              <br />
              <span class="subscribe-url">
                <xsl:value-of select="/rss/channel/atom:link/@href" />
              </span>
            </p>
          </div>

          <!-- Posts -->
          <div class="posts-header">
            <span class="posts-label">Latest Posts</span>
            <span class="posts-count">
              <xsl:value-of select="count(/rss/channel/item)" /> items
            </span>
          </div>

          <ul class="post-list">
            <xsl:for-each select="/rss/channel/item">
              <li class="post-item">
                <a class="post-link" href="{link}">
                  <div class="post-top">
                    <span class="post-title">
                      <xsl:value-of select="title" />
                    </span>
                    <span class="post-date">
                      <xsl:value-of select="substring(pubDate, 1, 16)" />
                    </span>
                  </div>
                  <p class="post-desc">
                    <xsl:value-of select="description" />
                  </p>
                  <div class="post-meta">
                    <xsl:for-each select="category">
                      <span class="post-tag">
                        <xsl:value-of select="." />
                      </span>
                    </xsl:for-each>
                    <xsl:if test="dc:creator">
                      <span class="post-author">
                        <xsl:value-of select="dc:creator" />
                      </span>
                    </xsl:if>
                  </div>
                </a>
              </li>
            </xsl:for-each>
          </ul>

          <footer class="feed-footer">
            <a href="{/rss/channel/link}">
              ← Back to <xsl:value-of select="/rss/channel/title" />
            </a>
            <span style="margin: 0 0.75rem; opacity: 0.4;">·</span>
            Built with Astro
          </footer>

        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
