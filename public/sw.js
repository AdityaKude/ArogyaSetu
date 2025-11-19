const CACHE_STATIC = 'arogyasetu-static-v1';
const CACHE_PAGES = 'arogyasetu-pages-v1';
const CACHE_IMAGES = 'arogyasetu-images-v1';
const CORE_ASSETS = [
  '/',
  '/favicon.ico',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => (![CACHE_STATIC, CACHE_PAGES, CACHE_IMAGES].includes(k) ? caches.delete(k) : null))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Images: cache-first
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_IMAGES).then((cache) =>
        cache.match(request).then((cached) =>
          cached || fetch(request).then((res) => {
            cache.put(request, res.clone());
            return res;
          })
        )
      )
    );
    return;
  }

  // Pages (same-origin): stale-while-revalidate
  if (url.origin === self.location.origin && request.mode === 'navigate') {
    event.respondWith(
      caches.open(CACHE_PAGES).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((res) => {
              cache.put(request, res.clone());
              return res;
            })
            .catch(() => cached || caches.match('/'));
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Default: network-first with cache fallback
  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_STATIC).then((cache) => cache.put(request, copy));
        return res;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
  );
});


