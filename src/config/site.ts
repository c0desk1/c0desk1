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
    avatar: "https://c0desk1-api.dev-c0desk1.workers.dev/img/AgACAgUAAxkBAAMIae4rCILWne6NI4IwUwABigyHvpiqAAIdFGsbXxxwV5IOkWnp4HhKAQADAgADeAADOwQ",
    title: "Author",
    bio: "Music producer FL Studio, Adobe Stock contributor, dan developer. Suka ngulik teknologi, game, anime, dan hal-hal unik lainnya. Semua gue tuangin jadi musik, visual, atau tools biar workflow kreator lebih autopilot."
  } satisfies Author,

  description: "Music producer, Adobe Stock contributor, dan developer. Bahas teknologi, game, anime, dan apapun yang gue anggap unik. Bikin audio, visual, dan sistem otomasi buat kreator.",
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
