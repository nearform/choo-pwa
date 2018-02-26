const budo = require('budo')
const sheetify = require('sheetify')
const splitRequire = require('split-require')

budo('./index.js', {
  live: true,
  cors: true,
  port: 8000,
  pushstate: true,
  base: '/',
  browserify: {
    transform: [
      sheetify
    ],
    plugin: [
      [splitRequire, { public: '/' }]
    ]
  }
}).on('connect', function (ev) {
  console.log('Server running on %s', ev.uri)
  console.log('LiveReload running on port %s', ev.livePort)
  require('./server')
}).on('update', function (buffer) {
  console.log('bundle - %d bytes', buffer.length)
})
