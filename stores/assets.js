
function assets (state, emitter) {
  state.assets = state.assets || {
    js: [],
    css: []
  }

  emitter.on('assets:loadModule', path => {
    if (!state.assets.js.includes(path)) { 
      state.assets = Object.assign({}, state.assets, {
        js: [
          ...state.assets.js,
          path
        ]
      })
      emitter.emit('render', 'assets:loadModule')
    }
  })

  emitter.on('assets:loadCSS', path => {
    if (!state.assets.css.includes(path)) { 
      state.assets = Object.assign({}, state.assets, {
        css: [
          ...state.assets.css,
          path
        ]
      })
      emitter.emit('render', 'assets:loadCSS')
    }
  })
}

module.exports = assets
