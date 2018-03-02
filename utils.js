const nanorouter = require('nanorouter')

/**
 * Router
 */
function router (routes, loading) {
  const _router = nanorouter()

  for (const [ path, fn ] of Object.entries(routes)) {
    _router.on(path, params => fn(params))
  }

  return (state, emit) => {
    const component = _router.emit(state.router.href)
    return component(state, emit)
  }
}

/**
 * Resolves async component
 */

let asyncID = 0

function async (component, loading) {
  let _resolved
  let _promise
  let _loading
  const id = asyncID++

  return (state, emit) => {
    if (_resolved) {
      const result = _resolved
      _resolved = null
      _promise = null
      console.log(`async :: cleared ${id}`)
      return result
    } else {
      if (!_promise) {
        console.log(`async :: resolving component ${id}`)
        _promise = component(state, emit).then(resolved => {
          console.log(`async :: component resolved ${id}`)
          _resolved = resolved
          _loading = resolved
          emit('render', 'async')
        })
        emit('async:promise', _promise)
      } else {
        console.log(`async :: still resolving component ${id}`)
      }
      return _loading || loading(state, emit)
    }
  }
}

function loader (...fns) {
  return (...args) => async (state, emit) => {
    const components = fns.map(fn => fn(...args))
    const promises = components.map(component => component(state, emit))
    const results = await Promise.all(promises)
    return results[0]
  }
}

// function asyncRoute (moduleFn, ...waitsFn) {
//   return (...args) => async (state, emit) => {
//     const component = moduleFn(...args)
//     const waits = waitsFn.map(fn => fn(...args)(state, emit))
//     await Promise.all(waits)
//     await component(state, emit)
//   }
// }

// asyncRoute(
//   params => import('./foo'),
//   params => async (state, emit) => await emit('loadData')
//   params => async (state, emit) => await emit('loadCSS')
// )

function loadModule (path, getModule) {
  return (...args) => async (state, emit) => {
    if (!state.assets.js.includes(path)) { 
      console.log(`loadModule :: loading module ${path}`)
      emit('assets:loadModule', path)
    }
    const component = await getModule(...args)
    return await component(state, emit)
  }
}

function loadCSS (path) {
  return (...args) => async (state, emit) => {
    if (!state.assets.css.includes(path)) { 
      console.log(`loadCSS :: loading CSS ${path}`)
      emit('assets:loadCSS', path)
    }
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
  loadModule
}
