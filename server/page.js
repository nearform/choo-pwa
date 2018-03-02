const fs = require('fs')
const path = require('path')

const main = require('../index')

async function routes (fastify, options) {
  
  fastify.get('/favicon.ico', async () => {
    return null
  })

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../dist'),
    prefix: '/assets/'
  })

  fastify.get('*', async (request, reply) => {
    const { url } = request.raw

    const state = {
      router: { href: url },
      assets: {
        js: ['/assets/index.js'],
        css: ['/assets/index.css']
      }
    }

    const app = main()
    let html

    try {
      html = await app.toString(state)
    } catch (e) {
      console.log(e)
    }

    reply.type('text/html; charset=utf-8')
    return html
  })
}

module.exports = routes
