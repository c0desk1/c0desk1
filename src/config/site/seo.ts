//config/site/seo.ts

export const seoConfig = {
  siteName: "c0desk1",
  siteUrl: "https://c0desk1.my.id",
  siteMail: "hello@c0desk1.my.id",
  siteLogo: "/org/c0desk1-logo.svg",
  ogImage: "./src/assets/images/c0desk1-og.webp",

  defaultSeo: {
    title: "c0desk1",
    description: "A creative portal exploring digital workflows, AI tools, music, anime, and games through the lens of a modern creator in the age of automation.",
  },

  social: [
    { label: "Facebook", icon: 'facebook', href: "https://facebook.com/c0desk1Page" },
    { label: "WhatsApp", icon: 'whatsapp', href: "https://whatsapp.com/channel/0029VaxZggiFnSzHLKybx42h" },
    { label: "Github", icon: 'github', href: "https://github.com/c0desk1" }
  ],
} as const;
