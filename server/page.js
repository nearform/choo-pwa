const app = require('../index')

async function routes (fastify, options) {
  fastify.get('/*', (request, reply) => {
    const { url } = request.raw

    const state = {
      assets: {
        js: [{
          src: '/dist/index.js',
          preload: true
        }],
        css: []
      },
      router: { url }
    }

    const string = app.toString('/', state)
    reply
      .type('text/html; charset=utf-8')
      .send(string)
  })
}

module.exports = routes
