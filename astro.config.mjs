// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.ts';
import tailwindcss from '@tailwindcss/vite';
// import sitemap from '@astrojs/sitemap';
// import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  trailingSlash: "always",
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
    domains: [
		'c0desk1-api.dev-c0desk1.workers.dev',
		'api.telegram.org'
	],
  },
});