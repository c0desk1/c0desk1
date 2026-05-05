// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.ts';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: "always",
  output: 'static',
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    routing: {
        prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [mdx(), react()],
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.c0desk1.my.id' }
    ],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dim',
      },
      wrap: true,
    }
  },
});