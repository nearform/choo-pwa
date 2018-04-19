const fs = require('fs')
const path = require('path')
const cors = require('cors')

var PUBLIC_DIR = path.join(__dirname, '../public')
var ASSETS_DIR = path.join(PUBLIC_DIR, 'assets')

var MANIFEST = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'manifest.json')))

const fastify = require('fastify')({
  logger: true,
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync(path.join(__dirname, '../https', 'choo-pwa.nearform.com.key'), 'ascii'),
    cert: fs.readFileSync(path.join(__dirname, '../https', 'choo-pwa.nearform.com.crt'), 'ascii')
  }
})

fastify.use(cors())
fastify.register(require('fastify-compress'))

fastify.register(require('./api'))
fastify.register(require('./images'))

fastify.get('/favicon.ico', async () => {
  return null
})

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
      http2push: true,
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

fastify.listen(3000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`server listening on ${fastify.server.address().port}`)
})
