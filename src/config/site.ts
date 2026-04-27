// src/config/site.ts

export const siteConfig = {
  siteName: "c0desk1",
  siteDescription: "Music producer, Adobe Stock contributor, dan developer. Bahas teknologi, game, anime, dan apapun yang gue anggap unik.",
  siteUrl: "https://c0desk1.my.id/",
  siteLogo: "/org/logo.svg",
  siteMail: "hallo@c0desk1.my.id",
  
  ogImage: "/org/c0desk1-og.webp",
  
  author: {
    name: "Bima Akbar",
    title: "Author",
    avatar: "/org/author.jpg",
    bio: "Music producer, Adobe Stock contributor, dan developer.",
    slug: "bima-akbar",
  },
  
  social: {
    github: "https://github.com/dev-c0desk1",
    twitter: "https://twitter.com/c0desk1",
  },
  
  navItems: [
    { href: "/blog/", label: "Blog" },
    { href: "/portfolio/", label: "Portfolio" },
    { href: "/about/", label: "Tentang" },
  ],
  
  googleSiteVerification: "ZxoHYWipAMoGhvwVi5nxolWsZOntrYkNkVcG9HTfFZQ",
  googleAdsenseId: "ca-pub-4943136052113535",
  googleAnalyticsId: "G-2TKFP229HJ",
  yandexVerification: "1878480c0d7b5510",
  yandexMetrikaId: "108731154",
  
  defaultSeo: {
    title: "c0desk1",
    description: "Music producer, Adobe Stock contributor, dan developer. Bahas teknologi, game, anime, dan apapun yang gue anggap unik.",
    ogImage: "/org/c0desk1-og.webp",
  },
};

export type SiteConfig = typeof siteConfig;