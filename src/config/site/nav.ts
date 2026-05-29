//config/site/nav.ts

type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
};

type MobileNavItem = {
  label: string;
  href?: string;
  isExternal?: boolean;
  children?: MobileNavItem[];
};

type FooterSection = {
  title: string;
  items: NavItem[];
};

export const navConfig = {
  navItems: [
    { label: "Blog", href: "/blog", isExternal: false },
    { label: "Community", 
      children: [
        { label: "About", href: "/about", isExternal: false },
        { label: "Contact Us", href: "/contact", isExternal: false },
      ]
    },
    { 
      label: "Tools", 
      children: [ 
        { label: "Adogen", href: "https://dev-adogen.bimasaktiakbarr.workers.dev", isExternal: true }
      ]
    },
    {
      label: "Legal",
      children: [
        { label: "Privacy Policy", href: "/privacy-policy", isExternal: false },
        { label: "Terms of Service", href: "/terms-of-service", isExternal: false },
        { label: "Disclaimer", href: "/disclaimer", isExternal: false },
        { label: "Cookie Policy", href: "/cookie-policy", isExternal: false },
        { label: "DMCA", href: "/dmca", isExternal: false }
      ]
    },
  ] as NavItem[],

  MobileNavItems: [
    { label: "Home", href: "/", isExternal: false },
    { label: "Blog", href: "/blog", isExternal: false },
    { label: "Community", 
      children: [
        { label: "About", href: "/about", isExternal: false },
        { label: "Contact Us", href: "/contact", isExternal: false },
      ]
    },
    { label: "Tools",
      children: [ 
        { label: "Adogen", href: "https://dev-adogen.bimasaktiakbarr.workers.dev", isExternal: true }
      ]
    },
    { label: "Legal",
      children: [
        { label: "Privacy Policy", href: "/privacy-policy", isExternal: false },
        { label: "Terms of Service", href: "/terms-of-service", isExternal: false },
        { label: "Disclaimer", href: "/disclaimer", isExternal: false },
        { label: "Cookie Policy", href: "/cookie-policy", isExternal: false },
        { label: "DMCA", href: "/dmca", isExternal: false }
      ]
    }
  ] as MobileNavItem[],

  footerSections: [
    {
      title: "Get in touch",
      items: [
        { label: "About", href: "/about", isExternal: false },
        { label: "Contact Us", href: "/contact", isExternal: false },
      ]
    },
    {
      title: "Legal",
      items: [
        { href: "/privacy-policy", label: "Privacy Policy", isExternal: false },
        { href: "/terms-of-service", label: "Terms of Service", isExternal: false },
        { href: "/cookie-policy", label: "Cookie Policy", isExternal: false },
      ]
    },
  ] as FooterSection[],
} as const;