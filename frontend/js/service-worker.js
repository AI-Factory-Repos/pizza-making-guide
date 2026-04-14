/* ============================================================
   Service Worker — Pizza Making Guide
   Provides offline caching of core content
   ============================================================ */

const CACHE_NAME = 'pizza-guide-v1';

// Core assets to pre-cache on install
const PRE_CACHE_URLS = [
  '/',
  '/frontend/index.html',
  '/frontend/css/styles.css',
  '/frontend/css/print.css',
  '/frontend/js/main.js',
  '/frontend/js/qr-codes.js'
];

/* --- Install: pre-cache core assets ----------------------- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRE_CACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

/* --- Activate: clean up old caches ------------------------ */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

/* --- Fetch: cache-first for same-origin, network-first for cross-origin --- */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // For navigation requests, serve index.html as fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache with fresh response
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match('/frontend/index.html'))
    );
    return;
  }

  // Cache-first strategy for static assets
  if (
    url.pathname.match(/\.(css|js|html|png|jpg|jpeg|gif|svg|ico|woff2?|ttf)$/i)
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return response;
        });
      })
    );
    return;
  }

  // Network-first strategy for everything else
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
