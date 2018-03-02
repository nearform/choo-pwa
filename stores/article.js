function article (state, emitter) {
  state.article = state.article || {}

  emitter.on('article:load', data => {
    state.article = data
    emitter.emit('render', 'article:load')
  })
}

module.exports = article

