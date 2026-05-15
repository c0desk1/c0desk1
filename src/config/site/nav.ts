import type { LabelKey } from './i18n';

type NavItem = {
  href: string;
  labelKey: LabelKey;
  isExternal?: boolean;
};

export const navConfig = {
  navItems: [
    { href: "/blog", labelKey: "blog", isExternal: false },
    { href: "/portfolio", labelKey: "portfolio", isExternal: false },
    { href: "/about", labelKey: "about", isExternal: false },
    { href: "https://dev-adogen.bimasaktiakbarr.workers.dev", labelKey: "adogen" as LabelKey, isExternal: true },
  ] as NavItem[],

  mobileNavItems: [
    {
      titleKey: "navigation" as LabelKey,
      items: [
        { href: "/blog", labelKey: "blog" as LabelKey, isExternal: false },
        { href: "/portfolio", labelKey: "portfolio" as LabelKey, isExternal: false },
        { href: "/about", labelKey: "about" as LabelKey, isExternal: false },
      ]
    },
    {
      titleKey: "legal" as LabelKey,
      items: [
        { href: "/privacy-policy", labelKey: "privacyPolicy" as LabelKey, isExternal: false },
        { href: "/terms-of-service", labelKey: "termsOfService" as LabelKey, isExternal: false },
        { href: "/disclaimer", labelKey: "disclaimer" as LabelKey, isExternal: false },
        { href: "/cookie-policy", labelKey: "cookiePolicy" as LabelKey, isExternal: false },
        { href: "/dmca", labelKey: "dmca" as LabelKey, isExternal: false },
      ]
    },
    {
      titleKey: "contact" as LabelKey,
      items: [
        { href: "/contact", labelKey: "contactUs" as LabelKey, isExternal: false },
      ]
    }
  ],

  footerSections: [
    {
      titleKey: "navigation" as LabelKey,
      items: [
        { href: "/blog", labelKey: "blog" as LabelKey, isExternal: false },
        { href: "/portfolio", labelKey: "portfolio" as LabelKey, isExternal: false },
        { href: "/about", labelKey: "about" as LabelKey, isExternal: false },
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
        { href: "/privacy-policy", labelKey: "privacyPolicy" as LabelKey, isExternal: false },
        { href: "/terms-of-service", labelKey: "termsOfService" as LabelKey, isExternal: false },
        { href: "/disclaimer", labelKey: "disclaimer" as LabelKey, isExternal: false },
        { href: "/cookie-policy", labelKey: "cookiePolicy" as LabelKey, isExternal: false },
        { href: "/dmca", labelKey: "dmca" as LabelKey, isExternal: false },
      ]
    },
    {
      titleKey: "contact" as LabelKey,
      items: [
        { href: "mailto:hallo@c0desk1.my.id", labelKey: "email" as LabelKey, isExternal: true },
        { href: "/contact", labelKey: "contactUs" as LabelKey, isExternal: false },
      ]
    },
   {
    titleKey: "∅",
    items: [{}]
   }
  ],
} as const;