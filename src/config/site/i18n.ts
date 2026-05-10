export const i18nConfig = {
  locales: ['id', 'en', 'ru'] as const,
  defaultLocale: 'id' as const,

  labels: {
    id: {
      blog: "Blog",
      portfolio: "Portfolio",
      about: "Tentang",
      adogen: "Adogen",
      navigation: "Navigasi",
      tools: "Alat",
      legal: "Legal",
      contact: "Kontak",
      //... tambah semua label UI
    },
    en: {
      blog: "Blog",
      portfolio: "Portfolio",
      about: "About",
      adogen: "Adogen",
      navigation: "Navigation",
      tools: "Tools",
      legal: "Legal",
      contact: "Contact",
    },
    ru: {
      blog: "Блог",
      portfolio: "Портфолио",
      about: "О нас",
      adogen: "Adogen",
      navigation: "Навигация",
      tools: "Инструменты",
      legal: "Правовая информация",
      contact: "Контакты",
    }
  }
} as const;

export type Locale = typeof i18nConfig.locales[number];