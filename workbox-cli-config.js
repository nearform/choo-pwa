module.exports = {
  clientsClaim: true,
  skipWaiting: true,
  importWorkboxFrom: 'disabled',
  swDest: 'public/sw.js',
  globDirectory: 'public/',
  globPatterns: [
    'assets/*.js',
    'assets/*.css'
  ],
  navigateFallback: '/app-shell',
  navigateFallbackWhitelist: [
    /^\/$/,
    /^\/about/,
    /^\/article/,
    /^\/category/
  ],
  templatedUrls: {
    'app-shell': [
      'assets/common.js',
      'assets/common.css'
    ]
  },
  runtimeCaching: [{
    urlPattern: '/images',
    handler: 'cacheFirst',
    options: {
      cacheName: 'images',
      cacheExpiration: {
        maxEntries: 30
      }
    }
  }, {
    urlPattern: '/api/*',
    handler: 'staleWhileRevalidate',
    options: {
      cacheName: 'api',
      cacheExpiration: {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 // 1 day
      }
    }
  }]
}
