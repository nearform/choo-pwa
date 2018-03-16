const fs = require('fs')
const path = require('path')
const cors = require('cors')

const fastify = require('fastify')({
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.crt'))
  }
})

fastify.use(cors())

fastify.register(require('./db'))
fastify.register(require('./api'))
fastify.register(require('./images'))
// fastify.register(require('./page'))

fastify.get('/favicon.ico', async () => {
  return null
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../public/assets'),
  prefix: '/assets/'
})

fastify.register(require('../plugins/choo-sw/fastify'), {
  public: path.join(__dirname, '../public'),
})

fastify.register(require('../plugins/choo-ssr/fastify'), {
  app: require('../index'),
  public: path.join(__dirname, '../public'),
  plugins: [
    require('../plugins/choo-bundles/ssr')
  ]
})

fastify.listen(3000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  // const db = fastify.db
  // const articles = db.getCollection('articles')
  // console.log(articles.find())

  console.log(`server listening on ${fastify.server.address().port}`)
})
