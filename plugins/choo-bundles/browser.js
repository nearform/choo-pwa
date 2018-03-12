const path = require('path')
const resolvePath = require('resolve')
const callsites = require('callsites')
const factory = require('./common')
const load = require('./lib/load.browser')

module.exports = factory({
  loadBundle: (state, emitter, app) => async filename => {
    emitter.emit('bundles:load', filename)
    const manifest = state.bundles.manifest[filename]
    if (!manifest) {
      throw new Error(`bundle ${filename} not found in manifest`)
    }
    const bundle = await load(manifest.js)
    return bundle
  }
})
