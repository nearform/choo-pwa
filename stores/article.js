const https = require('https')
const fetch = require('node-fetch')

const agent = new https.Agent({
  rejectUnauthorized: false
})

function article (state, emitter) {
  state.article = state.article || {}

  emitter.on('article:load', async slug => {
    state.article = {}
    const response = await fetch(`https://localhost:3000/api/article/${slug}`, { agent })
    const data = await response.json()
    state.article = data
    emitter.emit('render', 'article:load')
  })
}

module.exports = article
