// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.ts';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: "always",
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [
    mdx(),
  ],
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.c0desk1.my.id' }
    ],
  },
});
