// src/config/site.ts

export const siteConfig = {
  name: "C0desk1",
  author: "C0desk1",
  description: "Digital garden dan portofolio profesional yang berfokus pada pengembangan web modern, sistem minimalis, dan efisiensi kode.",
  url: "https://bimaakbar.my.id",
  ogImage: "/og-image.png",
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
  // Tambahkan navigation items
  navItems: [
    { href: "/blog", label: "Blog" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" }
  ],
  // Social media untuk footer
  social: {
    github: "https://github.com/c0desk1",
    twitter: "https://twitter.com/c0desk1",
    linkedin: "https://linkedin.com/in/c0desk1"
  }
}

export type SiteConfig = typeof siteConfig;