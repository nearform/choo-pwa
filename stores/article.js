const fetch = require('node-fetch')

function article (state, emitter) {
  state.article = state.article || {}

  emitter.on('article:load', async slug => {
    state.article = {}
    const response = await fetch(`http://localhost:3000/api/article/${slug}`)
    const data = await response.json()
    state.article = data
    emitter.emit('render', 'article:load')
  })
}

module.exports = article
