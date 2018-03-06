const fs = require('fs')
const path = require('path')
const mime = require('mime')

const main = require('../index')

function getFile (filepath) {
  const filePath = path.join(__dirname, '../public', filepath)
  
  try {
    const content = fs.openSync(filePath, 'r');
    const contentType = mime.getType(filePath);
    return {
      content,
      headers: {
        'content-type': contentType
      }
    };
  } catch (e) {
    console.log(e)
    return null;
  }
}

async function routes (fastify, options) {
  
  fastify.get('/favicon.ico', async () => {
    return null
  })

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../public/assets'),
    prefix: '/assets/'
  })

  fastify.get('/sw.js', async (request, reply) => {
    reply.type('application/javascript; charset=UTF-8')
    return fs.createReadStream('public/sw.js')
  })

  fastify.get('/workbox-sw.prod.v2.1.3.js', async (request, reply) => {
    reply.type('application/javascript; charset=UTF-8')
    return fs.createReadStream('public/workbox-sw.prod.v2.1.3.js')
  })

  // --

  const http2 = require('http2')

  const { HTTP2_HEADER_PATH } = http2.constants

  // The files are pushed to stream here
  function push(stream, path) {
    const file = getFile(path)
    if (!file) {
      return
    }

    stream.pushStream({ [HTTP2_HEADER_PATH]: path }, (pushStream) => {
      pushStream.respondWithFD(file.content, file.headers)
    })
  }

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
    // return html
    
    state.assets.js.forEach(file => push(reply.res.stream, file))
    state.assets.css.forEach(file => push(reply.res.stream, file))
    reply.res.stream.end(html)
  })
}

module.exports = routes
