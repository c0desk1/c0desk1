// public/pwa.js
const CACHE_NAME = 'c0desk1';
const urlsToCache = [
  '/',
  '/offline',
  '/favicon.svg',
  '/site.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const results = await Promise.allSettled(
        urlsToCache.map(url => cache.add(url))
      );
      results.forEach((result, idx) => {
        if (result.status === 'rejected') {
          console.warn(`Failed to cache ${urlsToCache[idx]}:`, result.reason);
        }
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
