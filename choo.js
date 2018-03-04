var documentReady = require('document-ready')
var nanotiming = require('nanotiming')
var nanomorph = require('nanomorph')
var nanoraf = require('nanoraf')
var nanobus = require('./nanobus')
var assert = require('assert')

module.exports = Choo

function Choo (opts) {
  if (!(this instanceof Choo)) return new Choo(opts)
  opts = opts || {}

  assert.equal(typeof opts, 'object', 'choo: opts should be type object')

  this.events = {
    DOMCONTENTLOADED: 'DOMContentLoaded',
    DOMTITLECHANGE: 'DOMTitleChange',
    REPLACESTATE: 'replaceState',
    PUSHSTATE: 'pushState',
    NAVIGATE: 'navigate',
    POPSTATE: 'popState',
    RENDER: 'render'
  }

  // properties for internal use only
  this._stores = []
  this._render = null
  this._tree = null
}

Choo.prototype.render = function (render) {
  assert.equal(typeof render, 'function', 'choo.render: render should be type function')
  this._render = render
}

Choo.prototype.use = function (cb) {
  assert.equal(typeof cb, 'function', 'choo.use: cb should be type function')
  this._stores.push(cb)
}

Choo.prototype.start = async function (state = {}) {
  assert.equal(typeof window, 'object', 'choo.start: window was not found. .start() must be called in a browser, use .toString() if running in Node')
  assert.equal(typeof this._render, 'function', 'choo.render: should exist and be type function')

  var self = this
  var emitter = nanobus('choo.emit')
  var emit = emitter.emit.bind(emitter)

  this._stores.forEach(function (store) {
    var msg = 'choo.use'
    msg = store.storeName ? msg + '(' + store.storeName + ')' : msg
    var endTiming = nanotiming(msg)
    store(state, emitter, this)
    endTiming()
  })

  this._tree = await this._render(state, emit)
  assert.ok(this._tree, 'choo.start: no valid DOM node returned')

  emitter.prependListener(this.events.RENDER, nanoraf(async function () {
    var renderTiming = nanotiming('choo.render')
    var newTree = await self._render(state, emit)
    assert.ok(newTree, 'choo.render: no valid DOM node returned')

    assert.equal(self._tree.nodeName, newTree.nodeName, 'choo.render: The target node <' +
      self._tree.nodeName.toLowerCase() + '> is not the same type as the new node <' +
      newTree.nodeName.toLowerCase() + '>.')

    var morphTiming = nanotiming('choo.morph')
    nanomorph(self._tree, newTree)
    morphTiming()

    renderTiming()
  }))

  documentReady(function () {
    emitter.emit(self.events.DOMCONTENTLOADED)
  })

  return this._tree
}

Choo.prototype.mount = function mount (selector, initialState) {
  if (typeof window !== 'object') {
    assert.ok(typeof selector === 'string', 'choo.mount: selector should be type String')
    this.selector = selector
    return this
  }

  assert.ok(typeof selector === 'string' || typeof selector === 'object', 'choo.mount: selector should be type String or HTMLElement')

  var self = this

  documentReady(async function () {
    var renderTiming = nanotiming('choo.render')
    var newTree = await self.start(initialState)
    if (typeof selector === 'string') {
      self._tree = document.querySelector(selector)
    } else {
      self._tree = selector
    }

    assert.ok(self._tree, 'choo.mount: could not query selector: ' + selector)
    assert.equal(self._tree.nodeName, newTree.nodeName, 'choo.mount: The target node <' +
      self._tree.nodeName.toLowerCase() + '> is not the same type as the new node <' +
      newTree.nodeName.toLowerCase() + '>.')

    var morphTiming = nanotiming('choo.morph')
    nanomorph(self._tree, newTree)
    morphTiming()

    renderTiming()
  })
}

Choo.prototype.toString = async function (state = {}) {
  assert.notEqual(typeof window, 'object', 'choo.mount: window was found. .toString() must be called in Node, use .start() or .mount() if running in the browser')

  var emitter = nanobus('choo.emit')
  var emit = emitter.emit.bind(emitter)

  this._stores.forEach(function (store) {
    var msg = 'choo.use'
    msg = store.storeName ? msg + '(' + store.storeName + ')' : msg
    var endTiming = nanotiming(msg)
    store(state, emitter, this)
    endTiming()
  })

  let html
  let retry = true

  emitter.prependListener(this.events.RENDER, () => retry = true)

  while (retry) {
    retry = false
    html = await this._render(state, emit)
  }

  assert.ok(html, 'choo.toString: no valid value returned')
  return html.toString()
}
