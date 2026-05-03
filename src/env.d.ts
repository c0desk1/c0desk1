/// <reference types="astro/client" />

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
