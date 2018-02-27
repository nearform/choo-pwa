function router (state, emitter) {
  state.assets = {
    script: ['/index.js'],
    css: ['/bundle.css']
  }

  emitter.on('router:loadModule', path => {
    state.assets = Object.assign({}, state.assets, {
      script: [
        ...state.assets.script,
        path
      ]
    })
  })

  emitter.on('router:loadCSS', path => {
    state.assets = Object.assign({}, state.assets, {
      css: [
        ...state.assets.css,
        path
      ]
    })
  })
}

module.exports = router
