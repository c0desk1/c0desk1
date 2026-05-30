// @ts-check
import { defineConfig, fontProviders, passthroughImageService } from 'astro/config';
import { SITE } from './src/consts';
import sitemap, {ChangeFreqEnum } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';


import { satteriHeading } from './src/lib/mdx/satteri-heading';
import { satteriCallout } from './src/lib/mdx/satteri-callout';
import { satteriQuote } from './src/lib/mdx/satteri-blockquote';
import { satteriSteps } from './src/lib/mdx/satteri-steps';
import { satteriTimeline } from './src/lib/mdx/satteri-timeline';
import { satteriChangelog } from './src/lib/mdx/satteri-changelog';
import { satteriDetails } from './src/lib/mdx/satteri-details';
import { satteriBadge } from './src/lib/mdx/satteri-badge';
import { satteriKbd } from './src/lib/mdx/satteri-kbd';
import { satteriCodeBlock } from './src/lib/mdx/satteri-code-block';
import { satteriBanner } from './src/lib/mdx/satteri-banner';
import { satteriFigure } from './src/lib/mdx/satteri-figure';
import { satteriFileTree } from './src/lib/mdx/satteri-filetree';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  base: "/",
  trailingSlash: "never",
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [
    sitemap({
      filter: (page) => !page.match(/\/(401|403|404|500)$/),
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname === '/') {
          item.changefreq = ChangeFreqEnum.DAILY;
          item.priority = 1.0;
        } 
        else if (url.pathname.startsWith('/blog')) {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.8;
        }
        else {
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = 0.5;
        }
        return item;
      },
    }),

    mdx(), 
    react(),
  ],
  markdown: {
    processor: satteri({
      features: { 
        directive: true,
        gfm: true,
        math: true,
        frontmatter: true,
      },
      mdastPlugins: [
        satteriHeading,
        satteriFigure,
        satteriQuote,
        satteriCodeBlock,
        satteriKbd,
        satteriCallout,
        satteriSteps,
        satteriTimeline,
        satteriChangelog,
        satteriDetails,
        satteriBadge,
        satteriBanner,
        satteriFileTree,
      ]
      
    }),
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
    {
      provider: fontProviders.local(),
      name: 'Geist',
      cssVariable: '--font-Geist',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Geist.woff2'],
            weight: "100 800",
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'GeistMono',
      cssVariable: '--font-GeistMono',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/GeistMono.woff2'],
            weight: "100 800",
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
