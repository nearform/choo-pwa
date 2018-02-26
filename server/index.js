const cors = require('cors')
const fastify = require('fastify')()

fastify.register(require('./db'))
fastify.register(require('./api'))
fastify.register(require('./images'))
fastify.register(require('./page'))

fastify.use(cors())

fastify.listen(3000, function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  // const db = fastify.db
  // const articles = db.getCollection('articles')
  // console.log(articles.find())

  console.log(`server listening on ${fastify.server.address().port}`)
})
