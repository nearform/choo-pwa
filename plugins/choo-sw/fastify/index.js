const fs = require('fs')
const path = require('path')

async function routes (fastify, options) {
  fastify.get('/sw.js', async (request, reply) => {
    reply.type('application/javascript; charset=UTF-8')
    return fs.createReadStream(path.join(options.public, 'sw.js'))
  })
  fastify.get('/workbox-sw.prod.v2.1.3.js', async (request, reply) => {
    reply.type('application/javascript; charset=UTF-8')
    return fs.createReadStream(path.join(options.public, 'workbox-sw.prod.v2.1.3.js'))
  })
}

module.exports = routes
