// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: "https://c0desk1.my.id",
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
