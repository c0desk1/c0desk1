// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.ts';
import tailwindcss from '@tailwindcss/vite';
// import sitemap from '@astrojs/sitemap';
// import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: "always",
  output: 'server',
  adapter: cloudflare({
    runtime: { mode: 'local' }
  }),
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [
    // sitemap(), 
    mdx(),
  ],
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'c0desk1-cdn.dev-c0desk1.workers.dev' }
    ],
  },
});
