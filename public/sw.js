importScripts('workbox-sw.prod.v2.1.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "assets/about.js",
    "revision": "db916fbc8e4c29a1c5de07e61fab5dc2"
  },
  {
    "url": "assets/article.js",
    "revision": "1b217d53164e38843c6be0f397a2b9ae"
  },
  {
    "url": "assets/articles.js",
    "revision": "063896d7f3a80a411a2464335cc5273b"
  },
  {
    "url": "assets/home.js",
    "revision": "c8425429bb864e4a350b62c1675618e2"
  },
  {
    "url": "assets/index.js",
    "revision": "b8b152807f3dbfd97ac5be5e54f57ef9"
  },
  {
    "url": "assets/about.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/article.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/articles.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/home.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/index.css",
    "revision": "b412335e25c4bc69577ddf70655f392a"
  },
  {
    "url": "app-shell",
    "revision": "8b98d279bf264cc1a4b8c078d3a7ea71"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
workboxSW.router.registerNavigationRoute("/app-shell");
workboxSW.router.registerRoute('/images', workboxSW.strategies.cacheFirst({
  "cacheName": "images",
  "cacheExpiration": {
    "maxEntries": 30
  }
}), 'GET');
workboxSW.router.registerRoute('/api/*', workboxSW.strategies.staleWhileRevalidate({
  "cacheName": "api",
  "cacheExpiration": {
    "maxEntries": 50,
    "maxAgeSeconds": 86400
  }
}), 'GET');
