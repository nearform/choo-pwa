const https = require('https')

async function routes (fastify, options) {
  const opts = {
    schema: {
      querystring: {
        url: { type: 'string' },
      }
    }
  }

  fastify.get('/images', opts, async (request, reply) => {
    const { url } = request.query
    https.get(decodeURIComponent(url), res => reply
      .type(res.headers['content-type'])
      .send(res))
  })
}

module.exports = routes
