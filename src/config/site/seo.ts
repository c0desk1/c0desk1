//config/site/seo.ts

export const seoConfig = {
  siteName: "c0desk1",
  siteUrl: "https://c0desk1.my.id/",
  siteMail: "hello@c0desk1.my.id",
  siteLogo: "/org/c0desk1-logo.svg",
  ogImage: "/org/c0desk1-og.webp",

  defaultSeo: {
    title: "c0desk1",
    description: "A creative portal exploring digital workflows, AI tools, music, anime, and games through the lens of a modern creator in the age of automation.",
  },

  social: [
    { label: "facebook", href: "https://facebook.com/c0desk1Page" },
    { label: "github", href: "https://github.com/c0desk1" },
    { label: "sitemap", href: "https://c0desk1.my.id/sitemap-index.xml" },
    { label: "rss", href: "https://c0desk1.my.id/rss.xml" }
  ],
} as const;
