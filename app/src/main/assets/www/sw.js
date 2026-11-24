// Service worker de la version web (iPhone, navigateur) : l'appli fonctionne hors ligne
// et se met à jour toute seule. Il n'est pas utilisé dans l'appli Android (pages en file://).
var CACHE = 'toeic-grammaire';
var FILES = [
  './', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest',
  'data/questions.js', 'data/tenses.js', 'data/content.js', 'data/games.js', 'data/part7.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

// Réseau d'abord, pour toujours avoir la dernière version ; le cache sert quand il n'y a pas de réseau.
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req.url, { cache: 'no-cache' }).then(function (res) {
    if (res.ok) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) {
      return hit || caches.match('index.html');
    });
  }));
});
