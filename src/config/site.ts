// src/config/site.ts

export type Author = {
  name: string;
  slug: string;
  avatar: string;
  title: string;
  bio: string;
};

export const siteConfig = {
  name: "c0desk1",

  author: {
    name: "Bima Akbar",
    slug: "bima-akbar",
    avatar: "/images/author/author.jpg",
    title: "Author",
    bio: "Hanya seorang amatiran yang menyukai hal-hal baru."
  } satisfies Author,

  description: "Eksplorasi workflow digital, AI tools, musik, anime, dan game dari perspektif kreator modern yang membangun di era otomatisasi.",
  url: "https://c0desk1.my.id/",
  ogImage: "/images/c0desk1-og.webp",
  keywords: [
    "Web Developer",
    "Astro v6",
    "Tailwind CSS v4",
    "Frontend Engineer",
    "Minimalist Design",
    "Portfolio",
    "C0desk1"
  ],
  
  links: {
    github: "https://github.com/c0desk1",
    twitter: "https://twitter.com/c0desk1",
    mail: "hello@c0desk1.com"
  },
  
  navItems: [
    { href: "/blog/", label: "Blog" },
    { href: "/portfolio/", label: "Portfolio" },
    { href: "/about/", label: "Tentang" }
  ],
  
  social: {
    github: "https://github.com/c0desk1",
    twitter: "https://twitter.com/c0desk1",
    linkedin: "https://linkedin.com/in/c0desk1"
  }
}

export type SiteConfig = typeof siteConfig;
