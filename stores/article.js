function article (state, emitter) {
  state.article = {}
  emitter.on('article:load', data => {
    state.article = data
    emitter.emit('render')
  })
}

module.exports = article

