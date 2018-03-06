(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"entry102":[function(require,module,exports){
require("split-require").l(102, require("a"));
},{"a":102,"split-require":75}],102:[function(require,module,exports){
const h = require('choo/html')
const raw = require('choo/html/raw')

const css = 0

const prefix = ((null || true) && "_336d8585")

const placeholder = {
  hed: h`
    <span class="${prefix} moon-gray">
      ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
    </span>
  `,
  contributor: h`
    <span class="${prefix} moon-gray">
      ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
    </span>
  `,
  img: 'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png',
  body: h`
    <div class="${prefix} moon-gray">
      ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      <br />
      ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      <br />
      ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      <br />
      ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
    </div>
  `
}

const article = ({ article: { hed, contributor, tout = {}, body } = {} }, emit) => h`
  <article class="mw7 center avenir">
    <div class="pb4 bb mb4 tc">
      <h1 class="f3 f2-m f1-l lh-title baskerville">${hed || placeholder.hed}</h1>
      <cite class="f6 ttu fs-normal">By: ${contributor || placeholder.contributor}</cite>
    </div>
    <div class="aspect-ratio aspect-ratio--16x9 mb4">
      <div class="aspect-ratio--object cover" style="background:url(${tout.src || placeholder.img}) center;"></div>
    </div>
    <p class="lh-copy">
      ${body || placeholder.body}
    </p>
  </article>
`

module.exports = article

},{"choo/html":1,"choo/html/raw":2,"sheetify/insert":74}],2:[function(require,module,exports){
module.exports = require('bel/raw')

},{"bel/raw":7}],7:[function(require,module,exports){
function rawCreateElement (tag) {
  if (typeof window !== 'undefined') {
    return browser()
  } else {
    return server()
  }

  function browser () {
    var el = document.createElement('div')
    el.innerHTML = tag
    return toArray(el.childNodes)
  }

  function server () {
    var wrapper = new String(tag) // eslint-disable-line no-new-wrappers
    wrapper.__encoded = true
    return wrapper
  }
}

function toArray (arr) {
  return Array.isArray(arr) ? arr : [].slice.call(arr)
}

module.exports = rawCreateElement

},{}]},{},["entry102"]);
