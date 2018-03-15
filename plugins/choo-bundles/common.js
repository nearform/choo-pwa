'use strict'

function factory(impl) {
  return function bundles (state, emitter, app) {
    // State
    state.bundles = state.bundles || {
      js: [],
      css: [],
      manifest: {}
    }

    // Events
    emitter.on('bundles:load', filename => {
      const bundle = state.bundles.manifest[filename]
      if (!bundle) {
        throw new Error(`bundle ${filename} not found in manifest`)
      }
      if (!state.bundles.js.includes(bundle.js)) {
        state.bundles.js.push(bundle.js)
      }
      if (!state.bundles.css.includes(bundle.css)) {
        state.bundles.css.push(bundle.css)
      }
    })

    // Enhancements
    app.bundles = {
      //loadBundle: impl.loadBundle(state, emitter, app)
      load: async (filename, load) => {
        emitter.emit('bundles:load', filename)
        const bundle = await load(filename)
        return bundle
      }
    }
  }
}

module.exports = factory
