const CACHE_NAME = 'c0desk1-v1';
const OFFLINE_URL = '/offline';

// Cache halaman penting, termasuk varian offline untuk semua bahasa
const urlsToCache = [
  '/',
  '/offline',
  '/en/offline',
  '/ru/offline',
  '/jp/offline',
  '/favicon.svg',
  '/site.webmanifest',
];

// ---------- INSTALL ----------
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

// ---------- ACTIVATE ----------
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

// ---------- FETCH ----------
self.addEventListener('fetch', (event) => {
  // Hanya tangani permintaan navigasi (halaman HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Coba ambil dari cache sesuai URL yang diminta
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback terakhir: tampilkan halaman offline universal
          return caches.match(OFFLINE_URL);
        });
      })
    );
  }
});