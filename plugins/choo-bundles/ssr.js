const fs = require('fs')
const path = require('path')
const mime = require('mime')
const http2 = require('http2')

function plugin(options) {
  function getFile (filepath) {
    const filePath = path.join(options.public, filepath)

    try {
      const content = fs.openSync(filePath, 'r')
      const contentType = mime.getType(filePath)
      return {
        content,
        headers: {
          'content-type': contentType
        }
      }
    } catch (e) {
      console.log(e)
      return null
    }
  }

  const { HTTP2_HEADER_PATH } = http2.constants

  // The files are pushed to stream here
  function push (stream, path) {
    const file = getFile(path)
    if (!file) {
      return
    }

    stream.pushStream({ [HTTP2_HEADER_PATH]: path }, pushStream => {
      pushStream.respondWithFD(file.content, file.headers)
    })
  }

  return {
    pre(state) {
      state = Object.assign(state, {
        bundles: {
          js: ['/assets/index.js'],
          css: ['/assets/index.css'],
          manifest: {
            './home': {
              js: '/assets/home.js',
              css: '/assets/home.css'
            },
            './about': {
              js: '/assets/about.js',
              css: '/assets/about.css'
            },
            './article': {
              js: '/assets/article.js',
              css: '/assets/article.css'
            },
            './category': {
              js: '/assets/article.js',
              css: '/assets/article.css'
            }
          }
        }
      })
    },
    post(html, state, reply) {
      state.bundles.js.forEach(file => push(reply.res.stream, file))
      state.bundles.css.forEach(file => push(reply.res.stream, file))
    }
  }
}

module.exports = plugin
