// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { siteConfig } from './src/config/site';

import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkCallout from './src/lib/mdx/remark-callout.ts';
import remarkBlockquoteAuthor from './src/lib/mdx/remark-blockquote.ts';
import remarkHeading from './src/lib/mdx/remark-heading.ts';
import remarkDetails from './src/lib/mdx/remark-details.ts';
import remarkSteps from './src/lib/mdx/remark-steps.ts';
import remarkTimeline from './src/lib/mdx/remark-timeline.ts';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: "always",

  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [mdx(), react()],
  markdown: {
    remarkPlugins: [
      remarkHeading,
      remarkCallout, 
      remarkBlockquoteAuthor,
      remarkDetails,
      remarkSteps,
      remarkTimeline
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
      name: "Geist",
      cssVariable: "--font-GeistSans",
      provider: fontProviders.local(),
      options: {
        variants: [{
          src: ['./src/assets/fonts/Geist.woff2'],
          weight: '100 900',
          style: 'normal'
        }]
      }
    },
    {
      name: "Geist Mono",
      cssVariable: "--font-GeistMono",
      provider: fontProviders.local(),
      options: {
        variants: [{
          src: ['./src/assets/fonts/GeistMono.woff2'],
          weight: '100 900',
          style: 'normal'
        }]
      }
    }
  ],
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.c0desk1.my.id' }
    ],
  },
});
