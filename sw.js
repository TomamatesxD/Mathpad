// ============================================
// MathPad - Service Worker
// ============================================


// Versión de caché v57: íconos válidos
const CACHE_NAME = 'mathpad-v64'; // Versión de caché v64: tabla de valores compacta y service worker reparado
const CORE_URLS = [
  './',
  './index.html',
  './app.min.js',
  './registro-sw.js',
  './fabric.min.js',
  './math.min.js',
  './dexie.min.js',
  './manifest.json'
];

const OPTIONAL_URLS = [
  './jspdf.umd.min.js',
  './tex-svg.js',
  './favicon.svg',
  './icono-192.png',
  './icono-512.png',
  './icono-512-maskable.png',
  './apple-touch-icon.png'
];


// Instalación: los archivos críticos son obligatorios; los opcionales (íconos, jsPDF, MathJax) no frenan la instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        CORE_URLS.map(url => cache.add(new Request(url, { cache: 'reload' })))
      ).then(() =>
        Promise.allSettled(
          OPTIONAL_URLS.map(url =>
            cache.add(new Request(url, { cache: 'reload' }))
              .catch(err => console.warn('No se pudo cachear (opcional):', url, err))
          )
        )
      )
    ).then(() => self.skipWaiting())
  );
});


// Activación: limpia cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.allSettled(
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
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // stale-while-revalidate: actualizar en segundo plano dentro de waitUntil
        event.waitUntil(
          fetch(event.request).then(response => {
            if (response && response.status === 200 && response.type === 'basic') {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, response.clone());
              });
            }
            return response;
          }).catch(() => {})
        );
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
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});