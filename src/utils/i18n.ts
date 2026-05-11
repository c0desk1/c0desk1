---
import { getRelativeLocaleUrl } from 'astro:i18n';
import { siteConfig } from '@/config/site';
import { getCurrentLocale } from '@/utils/i18n';

interface Props {
  alternateSlugs?: Record<string, string>; // ← terima dari page
}

const { alternateSlugs } = Astro.props;
const locale = getCurrentLocale(Astro);
const currentPath = Astro.url.pathname;

// Deteksi blog post: /blog/ atau /en/blog/ atau /ru/blog/
const blogMatch = currentPath.match(/^\/(?:(en|ru)\/)?blog\/(.+?)\/?$/);
const isBlogPost = !!blogMatch;
---

<div class="flex gap-2">
  {siteConfig.locales.map(loc => {
    let targetPath = currentPath.replace(/^\/(en|ru)/, '') || '/';

    // ← Kalau blog post + ada alternateSlugs, ganti slugnya
    if (isBlogPost && alternateSlugs?.[loc]) {
      targetPath = `/blog/${alternateSlugs[loc]}/`;
    }

    const href = getRelativeLocaleUrl(loc, targetPath);

    return (
      <a
        href={href}
        class={`px-3 py-1 rounded text-sm ${
          loc === locale
            ? 'bg-(--bg) text-(--fg) font-bold'
            : 'bg-(--bg-subtle) text-(--fg) hover:bg-(--bg-muted)'
        }`}
      >
        {loc.toUpperCase()}
      </a>
    );
  })}
</div>