// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

import mdx from '@astrojs/mdx';

import { siteConfig } from '@/config/site';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap(), 
    mdx(), 
    partytown({
      config: {
        forward: ['dataLayer', 'gtag', 'ym'],
      },
    }),
  ]
});
