/* Service worker de Parcellaire : tout est mis en cache au premier chargement, l'application marche ensuite hors-ligne.
   Pour publier une nouvelle version, incrémentez VERSION : les anciens caches sont supprimés et les fichiers retéléchargés. */
const VERSION = 'parcellaire-v1';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './fonts/bricolage-latin.woff2', './fonts/bricolage-latin-ext.woff2', './fonts/jbmono-500.woff2', './fonts/jbmono-700.woff2',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.mode === 'navigate') {
    /* page : réseau d'abord (pour recevoir les mises à jour), cache si hors-ligne */
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', cp)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  /* le reste : cache d'abord, rafraîchi en arrière-plan */
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
