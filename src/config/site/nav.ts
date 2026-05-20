//config/site/nav.ts

type NavItem = {
  href: string;
  label: string;
  isExternal?: boolean;
};

type MobileNavSection = {
  title: string;
  items: NavItem[];
};

type FooterSection = {
  title: string;
  items: NavItem[];
};

export const navConfig = {
  navItems: [
    { label: "Blog", href: "/blog/", isExternal: false },
    { label: "Portfolio", href: "/portfolio/", isExternal: false },
    { label: "About", href: "/about/", isExternal: false },
    {
      label: "Legal",
      children: [
        { label: "Privacy Policy", href: "/privacy-policy/", isExternal: false },
        { label: "Terms of Service", href: "/terms-of-service/", isExternal: false },
        { label: "Disclaimer", href: "/disclaimer/", isExternal: false },
        { label: "Cookie Policy", href: "/cookie-policy/", isExternal: false },
        { label: "DMCA", href: "/dmca/", isExternal: false }
      ]
    },
    { 
      label: "Tools", 
      children: [ 
        { label: "Adogen", href: "https://dev-adogen.bimasaktiakbarr.workers.dev", isExternal: true }
      ]
    }
  ] as NavItem[],

  mobileNavItems: [
    {
      title: "Navigation",
      items: [
        { href: "/blog/", label: "Blog", isExternal: false },
        { href: "/portfolio/", label: "Portfolio", isExternal: false },
        { href: "/about/", label: "About", isExternal: false },
      ]
    },
    {
      title: "Legal",
      items: [
        { href: "/privacy-policy/", label: "Privacy Policy", isExternal: false },
        { href: "/terms-of-service/", label: "Terms of Service", isExternal: false },
        { href: "/disclaimer/", label: "Disclaimer", isExternal: false },
        { href: "/cookie-policy/", label: "Cookie Policy", isExternal: false },
        { href: "/dmca/", label: "DMCA", isExternal: false },
      ]
    },
    {
      title: "Contact",
      items: [
        { href: "/contact/", label: "Contact Us", isExternal: false },
      ]
    }
  ] as MobileNavSection[],

  footerSections: [
    {
      title: "Navigation",
      items: [
        { href: "/blog/", label: "Blog", isExternal: false },
        { href: "/portfolio/", label: "Portfolio", isExternal: false },
        { href: "/about/", label: "About", isExternal: false },
      ]
    },
    {
      title: "Tools",
      items: [
        { href: "https://dev-adogen.bimasaktiakbarr.workers.dev", label: "Adogen", isExternal: true }
      ]
    },
    {
      title: "Legal",
      items: [
        { href: "/privacy-policy/", label: "Privacy Policy", isExternal: false },
        { href: "/terms-of-service/", label: "Terms of Service", isExternal: false },
        { href: "/disclaimer/", label: "Disclaimer", isExternal: false },
        { href: "/cookie-policy/", label: "Cookie Policy", isExternal: false },
        { href: "/dmca/", label: "DMCA", isExternal: false },
      ]
    },
    {
      title: "Contact",
      items: [
        { href: "mailto:hallo@c0desk1.my.id", label: "Email", isExternal: true },
        { href: "/contact/", label: "Contact Us", isExternal: false },
      ]
    }
  ] as FooterSection[],
} as const;