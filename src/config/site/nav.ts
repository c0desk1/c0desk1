import type { LabelKey } from './i18n';

type NavItem = {
  href: string;
  labelKey: LabelKey;
  isExternal?: boolean;
};

export const navConfig = {
  navItems: [
    { href: "/blog", labelKey: "blog" },
    { href: "/portfolio", labelKey: "portfolio" },
    { href: "/about", labelKey: "about" },
    { href: "https://dev-adogen.bimasaktiakbarr.workers.dev", labelKey: "adogen", isExternal: true },
  ] as NavItem[],

  mobileNavItems: [
    {
      titleKey: "navigation" as LabelKey,
      items: [
        { href: "/blog", labelKey: "blog" as LabelKey },
        { href: "/portfolio", labelKey: "portfolio" as LabelKey },
        { href: "/about", labelKey: "about" as LabelKey },
      ]
    },
    {
      titleKey: "tools" as LabelKey,
      items: [
        { href: "https://dev-adogen.bimasaktiakbarr.workers.dev", labelKey: "adogen" as LabelKey, isExternal: true }
      ]
    },
    {
      titleKey: "legal" as LabelKey,
      items: [
        { href: "/privacy-policy", labelKey: "privacyPolicy" as LabelKey },
        { href: "/terms-of-service", labelKey: "termsOfService" as LabelKey },
        { href: "/disclaimer", labelKey: "disclaimer" as LabelKey },
        { href: "/cookie-policy", labelKey: "cookiePolicy" as LabelKey },
        { href: "/dmca", labelKey: "dmca" as LabelKey },
      ]
    },
    {
      titleKey: "contact" as LabelKey,
      items: [
        { href: "mailto:hallo@c0desk1.my.id", labelKey: "email" as LabelKey, isExternal: true },
        { href: "/contact", labelKey: "contactUs" as LabelKey },
      ]
    }
  ],

  footerSections: [
    {
      titleKey: "navigation" as LabelKey,
      items: [
        { href: "/blog", labelKey: "blog" as LabelKey },
        { href: "/portfolio", labelKey: "portfolio" as LabelKey },
        { href: "/about", labelKey: "about" as LabelKey },
      ]
    },
    {
      titleKey: "tools" as LabelKey,
      items: [
        { href: "https://dev-adogen.bimasaktiakbarr.workers.dev", labelKey: "adogen" as LabelKey, isExternal: true }
      ]
    },
    {
      titleKey: "legal" as LabelKey,
      items: [
        { href: "/privacy-policy", labelKey: "privacyPolicy" as LabelKey },
        { href: "/terms-of-service", labelKey: "termsOfService" as LabelKey },
        { href: "/disclaimer", labelKey: "disclaimer" as LabelKey },
        { href: "/cookie-policy", labelKey: "cookiePolicy" as LabelKey },
        { href: "/dmca", labelKey: "dmca" as LabelKey },
      ]
    },
    {
      titleKey: "contact" as LabelKey,
      items: [
        { href: "mailto:hallo@c0desk1.my.id", labelKey: "email" as LabelKey, isExternal: true },
        { href: "/contact", labelKey: "contactUs" as LabelKey },
      ]
    }
  ],
} as const;