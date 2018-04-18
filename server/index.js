const fs = require('fs')
const path = require('path')
const cors = require('cors')
const http = require('http')

var PUBLIC_DIR = path.join(__dirname, '../public')
var ASSETS_DIR = path.join(PUBLIC_DIR, 'assets')

var MANIFEST = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'manifest.json')))

const fastify = require('fastify')({
  logger: true,
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync(path.join(__dirname, '../https', 'fastify.key'), 'ascii'),
    cert: fs.readFileSync(path.join(__dirname, '../https', 'fastify.crt'), 'ascii')
  }
})

fastify.use(cors())

fastify.register(require('./api'))
fastify.register(require('./images'))

fastify.get('/favicon.ico', async () => {
  return null
})

// fastify.register(require('fastify-compress'), { threshold: 0 })

fastify.register(require('fastify-static'), {
  root: ASSETS_DIR,
  prefix: '/assets/'
})

fastify.register(require('../plugins/choo-sw/fastify'), {
  public: PUBLIC_DIR
})

fastify.register(require('choo-ssr/fastify'), {
  app: require('../index'),
  plugins: [[
    require('choo-bundles/ssr'), {
      http2: true,
      public: PUBLIC_DIR,
      manifest: MANIFEST,
      bundles: [{
        name: 'common',
        js: '/assets/common.js',
        css: '/assets/common.css'
      }]
    }
  ]]
})

fastify.listen(8443, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`server listening on ${fastify.server.address().port}`)
})

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url })
  res.end()
}).listen(8080)
