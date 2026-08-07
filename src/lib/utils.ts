const CDN_ORIGIN = "https://cdn.c0desk1.my.id";

function ensureDate(date: Date | string | number): Date {
  if (date instanceof Date) return date;
  return new Date(date);
}

export function isCdnUrl(src: string): boolean {
  return typeof src === "string" && src.startsWith(CDN_ORIGIN);
}

export function cdnImage(
  src: string,
  options?: {
    w?: number;
    h?: number;
    q?: number;
    f?: "webp" | "avif" | "jpeg" | "auto";
  },
): string {
  if (!isCdnUrl(src)) return src;
  const url = new URL(src);
  if (options?.w) url.searchParams.set("w", String(options.w));
  if (options?.h) url.searchParams.set("h", String(options.h));
  url.searchParams.set("q", String(options?.q ?? 85));
  url.searchParams.set("f", options?.f ?? "auto");
  return url.toString();
}

export function formatDate(date: Date | string | number, locale: string = 'id-ID'): string {
  const d = ensureDate(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateCompact(date: Date | string | number, locale: string = 'id-ID'): string {
  const d = ensureDate(date);
  return d.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateISO(date: Date | string | number): string {
  const d = ensureDate(date);
  return d.toISOString().split('T')[0];
}

export function stripMarkdown(content: string): string {
  if (!content?.trim()) return '';

  let text = content;

  text = text.replace(/^\s*---[\s\S]*?---\s*/, '');

  const lines = text.split('\n');

  text = lines
    .filter((line) => {
      const trimmed = line.trim();

      return (
        !trimmed.startsWith('import ') &&
        !trimmed.startsWith('// ') &&
        !trimmed.startsWith('/*')
      );
    })
    .join('\n');

  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  text = text.replace(/<[^>]*>/g, ' ');
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/[#*`>_\-+]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export function truncate(text: string, length: number = 100): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  return truncate(stripMarkdown(content), maxLength);
}

export function getReadingTime(content?: string): string {
  const suffix = 'menit baca';

  if (!content?.trim()) return `1 ${suffix}`;
  const cleanText = generateExcerpt(content, Infinity);
  const words = cleanText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} ${suffix}`;
}

function initTabs(root: HTMLElement) {
  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>(
      '[data-tab-trigger][role="tab"]',
    ),
  );

  const panels = Array.from(
    root.querySelectorAll<HTMLElement>(
      '[role="tabpanel"]',
    ),
  );

  if (!buttons.length || !panels.length) {
    return;
  }

  function activate(index: number, focus = false) {
    buttons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;

      button.setAttribute(
        "aria-selected",
        active ? "true" : "false",
      );

      button.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel, panelIndex) => {
      const active = panelIndex === index;

      if (active) {
        panel.removeAttribute("hidden");
        panel.tabIndex = 0;
      } else {
        panel.setAttribute("hidden", "");
        panel.tabIndex = -1;
      }
    });

    if (focus) {
      buttons[index]?.focus();
    }
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      activate(index);
    });

    button.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % buttons.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex =
          (index - 1 + buttons.length) %
          buttons.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = buttons.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      activate(nextIndex, true);
    });
  });

  const activeIndex = buttons.findIndex(
    (button) =>
      button.getAttribute("aria-selected") === "true",
  );

  activate(activeIndex >= 0 ? activeIndex : 0);
}

document
  .querySelectorAll<HTMLElement>("[data-tabs]")
  .forEach(initTabs);
