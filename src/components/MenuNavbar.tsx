// src/components/MobileNav.tsx
import { useState, useEffect, type ReactNode } from 'react';
import { NAV, ROUTES } from '@/consts';
import IconReact from '@/components/ui/icons/IconReact';

interface NavChild {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface NavItem {
  label: string;
  href?: string;
  isExternal?: boolean;
  children?: NavChild[];
}

export default function MenuNavbar({ children }: { children?: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navItems: NavItem[] = NAV.MobileBar;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOpenSubmenu(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mq.addEventListener('change', handleResize);
    return () => mq.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Buka Menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="inline-flex lg:hidden shrink-0 h-8 w-8 p-1.5 items-center justify-center rounded-full border border-(--border) text-strong hover:bg-subtle active:bg-subtle focus:outline-none focus:ring-2 focus:ring-(--border-strong)"
      >
        <IconReact name="menu" className="w-full h-full transition-colors" />
      </button>

      <div
        className={`fixed inset-0 z-50 bg-base flex flex-col transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <header className="flex items-center justify-between px-4 h-(--header-height) shrink-0 border-b border-(--border)/50">
          <span className="inline-flex shrink-0 items-center justify-center text-strong"></span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex lg:hidden shrink-0 h-8 w-8 p-1.5 items-center justify-center rounded-full border border-(--border) text-strong hover:bg-subtle active:bg-subtle focus:outline-none focus:ring-2 focus:ring-(--border-strong)"
            aria-label="Tutup menu"
          >
            <IconReact name="close" className="w-full h-full transition-colors" />
          </button>
        </header>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="grid grid-cols-1 gap-2 px-2">
            {[
              { label: 'Beranda', href: ROUTES.home, icon: 'home' as const },
              { label: 'Guide', href: ROUTES.guide, icon: 'brain' as const },
              { label: 'Blog', href: ROUTES.blog, icon: 'blog' as const },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex justify-between items-center gap-2 py-3 px-4 text-body-14 text-(--fg) hover:text-strong rounded-lg active:bg-subtle hover:bg-subtle transition-colors"
              >
                <span className="text-body-14 font-medium text-strong">{link.label}</span>
                <IconReact name={link.icon} className="w-4.5 h-4.5 opacity-70" />
              </a>
            ))}

            <div className="flex items-center justify-between py-3 px-4 mt-2 border-t border-(--border)/50">
              <span className="text-body-14 font-medium text-strong">Tema</span>
              {children} 
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-6 px-4">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                const isSubOpen = openSubmenu === item.label;
                return (
                  <div key={item.label} className="rounded-xl border border-(--border)/60 bg-base/50 hover:border-strong transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full text-left flex items-center justify-between px-4 py-3"
                    >
                      <h3 className="text-body-14 font-medium text-strong">{item.label}</h3>
                      <IconReact 
                        name="chevron-down" 
                        className={`w-4 h-4 text-muted transition-transform duration-200 ${isSubOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        isSubOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col px-5 pb-5 pt-0">
                          {item.children!.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              target={child.isExternal ? "_blank" : undefined}
                              rel={child.isExternal ? "noopener noreferrer" : undefined}
                              onClick={() => setIsOpen(false)}
                              className="block border-l border-(--border) py-2.5 px-4 text-body-14 text-muted hover:text-strong hover:bg-subtle active:text-strong active:bg-subtle transition-colors"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href || '#'}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl border border-(--border)/60 bg-base/50 hover:bg-base/80 hover:border-strong transition-all duration-300 no-underline"
                >
                  <h3 className="text-body-14 font-semibold text-strong">{item.label}</h3>
                  <IconReact name="arrow-right" className="w-4 h-4 text-muted" />
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}