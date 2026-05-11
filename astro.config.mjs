// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: "always",
  output: 'server',
  adapter: cloudflare(),
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en", "ru"],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      en: "id",
      ru: "id"
    },
  },
  experimental: {
    advancedRouting: true,
  },
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [mdx(), react()],
  markdown: {
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
