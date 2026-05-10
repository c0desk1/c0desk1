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
      privacyPolicy: "Kebijakan Privasi",
      termsOfService: "Ketentuan Layanan",
      disclaimer: "Disclaimer",
      cookiePolicy: "Kebijakan Cookie",
      dmca: "DMCA",
      email: "Email",
      contactUs: "Hubungi Kami"
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
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      disclaimer: "Disclaimer",
      cookiePolicy: "Cookie Policy",
      dmca: "DMCA",
      email: "Email",
      contactUs: "Contact Us"
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
      privacyPolicy: "Политика конфиденциальности",
      termsOfService: "Условия использования",
      disclaimer: "Отказ от ответственности",
      cookiePolicy: "Политика использования cookie",
      dmca: "DMCA",
      email: "Email",
      contactUs: "Связаться с нами"
    }
  }
} as const;

export type Locale = typeof i18nConfig.locales[number];
export type LabelKey = keyof typeof i18nConfig.labels.id;