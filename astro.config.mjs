// @ts-check
import { defineConfig, fontProviders, passthroughImageService } from 'astro/config';
import { siteConfig } from './src/config/site';

import tailwindcss from '@tailwindcss/vite';
import sitemap, {ChangeFreqEnum } from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

import remarkCallout from './src/lib/mdx/remark-callout.ts';
import remarkBlockquoteAuthor from './src/lib/mdx/remark-blockquote.ts';
import remarkHeading from './src/lib/mdx/remark-heading.ts';
import remarkDetails from './src/lib/mdx/remark-details.ts';
import remarkSteps from './src/lib/mdx/remark-steps.ts';
import remarkTimeline from './src/lib/mdx/remark-timeline.ts';
import remarkBadge from './src/lib/mdx/remark-badge.ts';
import remarkKbd from './src/lib/mdx/remark-kbd.ts';
import remarkChangelog from './src/lib/mdx/remark-changelog.ts';
import remarkCodeBlock from './src/lib/mdx/remark-code-block.ts';
import remarkBanner from './src/lib/mdx/remark-banner.ts';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  base: "/",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/401') &&
        !page.includes('/403') &&
        !page.includes('/404') &&
        !page.includes('/500'),
      serialize(item) {
        if (/\/blog\//.test(item.url)) {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.8;
        }
        if (item.url === 'https://c0desk1.my.id') {
          item.changefreq = ChangeFreqEnum.DAILY;
          item.priority = 1.0;
        }
        return item;
      },
    }),
    mdx(), 
    react(),
  ],
  markdown: {
    remarkPlugins: [
      remarkHeading,
      remarkCallout,
      remarkDetails,
      remarkTimeline,
      remarkChangelog,
      remarkSteps,
      remarkBlockquoteAuthor,
      remarkBadge,
      remarkKbd,
      remarkCodeBlock,
      remarkBanner
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    }
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Syne',
      cssVariable: '--font-Syne',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Syne-Regular.woff2'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/Syne-Medium.woff2'],
            weight: 500,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/Syne-SemiBold.woff2'],
            weight: 600,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/Syne-Bold.woff2'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/Syne-ExtraBold.woff2'],
            weight: 800,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
  image: {
    domains: ["cdn.c0desk1.my.id", "play-lh.googleusercontent.com", "avatars.githubusercontent.com", "next.nexusmods.com"],
    remotePatterns: [{ protocol: "https" }],
    service: passthroughImageService()
  },
});
