// src/lib/share.ts
// Generates social share URLs for various platforms

export interface ShareData {
  url: string;       // Full canonical URL of the article
  title: string;     // Article title
  description?: string; // Short excerpt / description
  hashtags?: string[];  // Optional tags (Twitter/X uses these)
  via?: string;         // Twitter/X username without @
}

export interface ShareLink {
  id: string;
  label: string;
  href: string;
  /** Whether this platform supports Web Share API (native sheet) */
  native?: boolean;
}

/**
 * Build share URL for each platform.
 * All params are URL-encoded here so callers don't need to.
 */
export function buildShareLinks(data: ShareData): ShareLink[] {
  const { url, title, description = "", hashtags = [], via = "" } = data;

  const enc  = encodeURIComponent;
  const tags = hashtags.join(",");

  return [
    {
      id:    "x",
      label: "X / Twitter",
      href:  `https://x.com/intent/tweet?text=${enc(title)}&url=${enc(url)}${tags ? `&hashtags=${enc(tags)}` : ""}${via ? `&via=${enc(via)}` : ""}`,
    },
    {
      id:    "facebook",
      label: "Facebook",
      href:  `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      id:    "linkedin",
      label: "LinkedIn",
      href:  `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      id:    "whatsapp",
      label: "WhatsApp",
      href:  `https://wa.me/?text=${enc(`${title} ${url}`)}`,
    },
    {
      id:    "telegram",
      label: "Telegram",
      href:  `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`,
    },
    {
      id:    "threads",
      label: "Threads",
      href:  `https://www.threads.net/intent/post?text=${enc(`${title} ${url}`)}`,
    },
    {
      id:    "reddit",
      label: "Reddit",
      href:  `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title)}`,
    },
    {
      id:    "email",
      label: "Email",
      href:  `mailto:?subject=${enc(title)}&body=${enc(`${description ? description + "\n\n" : ""}${url}`)}`,
    },
  ];
}

/**
 * Attempt native Web Share API, returns true if successful.
 * Falls back silently — callers should show the fallback UI if this returns false.
 */
export async function nativeShare(data: ShareData): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.share) return false;
  try {
    await navigator.share({ title: data.title, text: data.description, url: data.url });
    return true;
  } catch {
    return false;
  }
}