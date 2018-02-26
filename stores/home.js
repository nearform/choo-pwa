function home (state, emitter) {
  state.home = []
  
  emitter.on('home:load', payload => {
    state.home = payload
    emitter.emit('render')
  })
}

module.exports = home
