const choo = require('./choo')

function async() {
  return (state, emitter, app) => {
    app.start = choo.start.bind(app)
    app.mount = choo.mount.bind(app)
    app.toString = choo.toString.bind(app)
    app._prerender = choo._prerender.bind(app)
  }
}

module.exports = async
