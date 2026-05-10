export const navConfig = {
  navItems: [
    { href: "/blog", labelKey: "blog", isExternal: false },
    { href: "/portfolio", labelKey: "portfolio", isExternal: false },
    { href: "/about", labelKey: "about", isExternal: false },
    { href: "https://dev-adogen.bimasaktiakbarr.workers.dev", labelKey: "adogen", isExternal: true },
  ],

  // mobileNav + footer pake struktur yg sama, beda grouping doang
  footerSections: [
    { titleKey: "navigation", links: ["/blog", "/portfolio", "/about"] },
    { titleKey: "tools", links: ["https://dev-adogen.bimasaktiakbarr.workers.dev"] },
    { titleKey: "legal", links: ["/privacy-policy", "/terms-of-service", "/disclaimer", "/cookie-policy", "/dmca"] },
    { titleKey: "contact", links: ["mailto:hallo@c0desk1.my.id", "/contact"] },
  ]
} as const;