// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site';

import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkCallout from './src/lib/mdx/remark-callout.ts';
import remarkBlockquoteAuthor from './src/lib/mdx/remark-blockquote.ts';
import remarkHeading from './src/lib/mdx/remark-heading.ts';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: "always",
  output: 'server',
  adapter: cloudflare(),
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
      remarkBlockquoteAuthor
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    }
  },
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.c0desk1.my.id' }
    ],
  },
});
