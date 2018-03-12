const path = require('path')
const factory = require('./common')
const load = require('./lib/load.node')

const h = require('choo/html')

const isBrowser = typeof window !== 'undefined'

function bundles() {
  return factory({
    loadBundle: (state, emitter, app) => async filename => {
      emitter.emit('bundles:load', filename)
      const basedir = path.dirname(callsites()[1].getFileName())
      const bundle = await load(filename, basedir)
      return bundle
    }
  })
}

bundles.head = () => (state, emit) => isBrowser
  ? Promise.all([
    ...state.bundles.js.map(script => h`<script src="${script}" defer></script>`),
    ...state.bundles.css.map(link => h`<link href="${link}" rel="stylesheet">`)
  ])
  : h`${state.bundles.js.map(script => h`<script src="${script}" defer></script>`)}${state.bundles.css.map(link => h`<link href="${link}" rel="stylesheet">`)}`


module.exports = bundles
