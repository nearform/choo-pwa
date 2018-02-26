const nanorouter = require('nanorouter')

function router(routes, loading) {
  const _router = nanorouter()

  for (const [path, component] of Object.entries(routes)) {
    _router.on(path, params => component(params))
  }

  return (state, emit) => {
    const component = _router.emit(state.router.url)
    return component(state, emit)
  }
}

module.exports = router
