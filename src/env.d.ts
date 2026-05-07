/// <reference types="astro/client" />

interface Window {
  __YANDEX_FLOOR_LOADED__?: boolean;
  __YANDEX_IMAGE_LOADED__?: boolean;
  yaContextCb: Array<() => void>;
}

interface Window {
  toast: {
    show: (message: string, options?: { duration?: number; type?: 'success' | 'error' | 'info' }) => void;
  };
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
