const nanohref = require('nanohref')
const nanoquery = require('nanoquery')
const nanolocation = require('nanolocation')

const EVENTS = {
  DOMCONTENTLOADED: 'DOMContentLoaded',
  DOMTITLECHANGE: 'DOMTitleChange',
  REPLACESTATE: 'replaceState',
  PUSHSTATE: 'pushState',
  NAVIGATE: 'navigate',
  POPSTATE: 'popState',
  RENDER: 'render'
}

var HISTORY_OBJECT = {}

const isBrowser = typeof window !== 'undefined'

function router (state, emitter) {
  state.router = state.router || {
    // href: nanolocation()
  }

  emitter.prependListener(EVENTS.NAVIGATE, function () {
    state.router = {
      href: nanolocation()
    }
    emitter.emit('render', 'router:navigate')
  })

  emitter.prependListener(EVENTS.POPSTATE, function () {
    emitter.emit(EVENTS.NAVIGATE)
  })

  emitter.prependListener(EVENTS.PUSHSTATE, function (href) {
    window.history.pushState(HISTORY_OBJECT, null, href)
    emitter.emit(EVENTS.NAVIGATE)
  })

  emitter.prependListener(EVENTS.REPLACESTATE, function (href) {
    window.history.replaceState(HISTORY_OBJECT, null, href)
    emitter.emit(EVENTS.NAVIGATE)
  })

  if (isBrowser) {
    window.onpopstate = function () {
      emitter.emit(EVENTS.POPSTATE)
    }

    nanohref(location => {
      const href = location.href
      const currHref = window.location.href
      if (href === currHref) return
      emitter.emit(EVENTS.PUSHSTATE, href)
    })
  }
}

module.exports = router
