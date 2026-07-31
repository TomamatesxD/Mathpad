// ============================================
// MathPad - Service Worker
// ============================================

const CACHE_NAME = 'mathpad-v2';
const urlsToCache = [
  './index.html',
  './mathpad.html',
  './mathpad.css',
  './mathpad.js',
  './fabric.min.js',
  './math.min.js',
  './jspdf.umd.min.js',
  './dexie.min.js',
  './tex-svg.js',
  './manifest.json',
  './icono-192.png',
  './icono-512.png'
];

// Instalación: precarga la caché con los recursos del proyecto
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Usamos addAll con tolerancia a fallos individuales (iconos pueden faltar)
        return Promise.allSettled(
          urlsToCache.map(url =>
            cache.add(url).catch(err => console.warn('No se pudo cachear:', url, err))
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: limpia cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: estrategia cache-first con fallback a red
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Actualiza en segundo plano (stale-while-revalidate suave)
        fetch(event.request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, response.clone());
            });
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => caches.match('./mathpad.html'));
    })
  );
});