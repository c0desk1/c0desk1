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
  
  navItems: [
    { href: "/blog/", label: "Blog" },
    { href: "/portfolio/", label: "Portfolio" },
    { href: "/about/", label: "Tentang" },
  ],

  footerSections: [
    {
      title: "Navigasi",
      items: [
        { href: "/blog", label: "Blog" },
        { href: "/portfolio", label: "Portfolio" },
        { href: "/about", label: "Tentang" },
      ]
    },
    {
      title: "Legal",
      items: [
        { href: "/privacy-policy", label: "Kebijakan Privasi" },
        { href: "/terms-of-service", label: "Ketentuan Layanan" },
        { href: "/disclaimer", label: "Disclaimer" },
        { href: "/cookie-policy", label: "Kebijakan Cookie" },
        { href: "/dmca", label: "DMCA" },
      ]
    },
    {
      title: "Kontak",
      items: [
        { href: `mailto:hallo@c0desk1.my.id`, label: "Email", isExternal: true },
        { href: "/contact", label: "Hubungi Kami" },
      ]
    }
  ],
  
  social: {
    github: "https://github.com/c0desk1",
    twitter: "https://twitter.com/c0desk1",
    linkedin: "https://linkedin.com/in/c0desk1",
    sitemap: "https://c0desk1.my.id/sitemap-index.xml",
rss: "https://c0desk1.my.id/rss.xml",
  },
  
  googleSiteVerification: "ZxoHYWipAMoGhvwVi5nxolWsZOntrYkNkVcG9HTfFZQ",
  googleAnalyticsId: "G-2TKFP229HJ",
  googleAdsenseId: "ca-pub-4943136052113535",
  googleAdsenseEnabled: false,
  
  yandexVerification: "1878480c0d7b5510",
  yandexMetricaId: "108731154",
  yandexPubId: "R-A-19179231",
  yandexAdsEnabled: true,
  
  // Priority router: "yandex" | "adsense" | "both"
  adPriority: "yandex",
  
  defaultSeo: {
    title: "c0desk1",
    description: "Music producer, Adobe Stock contributor, dan developer. Bahas teknologi, game, anime, dan apapun yang gue anggap unik.",
    ogImage: "/org/c0desk1-og.webp",
  },
};

export type SiteConfig = typeof siteConfig;
