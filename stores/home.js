function home (state, emitter) {
  state.home = state.home || []
  
  emitter.on('home:load', payload => {
    state.home = payload
    emitter.emit('render', 'home:load')
  })
}

module.exports = home
