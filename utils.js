const nanorouter = require('nanorouter')

/**
 * Router
 */
function router (routes, loading) {
  const _router = nanorouter()

  for (const [ path, component ] of Object.entries(routes)) {
    _router.on(path, params => component(params))
  }

  return (state, emit) => {
    const component = _router.emit(window.location.pathname) // state.router.url)
    return component(state, emit)
  }
}

/**
 * Resolves async component
 */
function async (component, loading) {
  let _resolved
  let _loading

  return (state, emit) => {
    if (_resolved) {
      const result = _resolved
      _resolved = null
      return result
    } else {
      component(state, emit).then(resolved => {
        _resolved = resolved
        _loading = resolved
        emit('render')
      })
      return _loading || loading(state, emit)
    }
  }
}

function loader (...fns) {
  return (...args) => (state, emit) => {
    const components = fns.map(fn => fn(...args))
    const results = components.map(component => component(state, emit))
    return results[0]
  }
}

function loadComponent (getComponent) {
  return (...args) => async (state, emit) => {
    const component = await getComponent(...args)
    return component(state, emit)
  }
}

function loadModule (path, getModule) {
  return (...args) => async (state, emit) => {
    const component = await getModule(...args)
    emit('router:loadModule', path)
    return component(state, emit)
  }
}

function loadCSS (path) {
  return (...args) => (state, emit) => {
    emit('router:loadCSS', path)
  }
}

/**
 * Decorates `fn` so that it's only called when args are different from last call
 */
function loadData (fn, noop = () => {}) {
  let _lastHash
  return (...args) => {
    const hash = JSON.stringify(args)
    if (hash !== _lastHash) {
      _lastHash = hash
      return fn(...args)
    }
    return noop
  }
}

module.exports = {
  router,
  async,
  loader,
  loadCSS,
  loadData,
  loadModule,
  loadComponent
}
