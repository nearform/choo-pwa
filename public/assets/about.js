(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"entry100":[function(require,module,exports){
require("split-require").l(100, require("a"));
},{"a":100,"split-require":75}],100:[function(require,module,exports){
const css = 0
const html = require('choo/html')

const prefix = ((null || true) && "_4e37ddd1")

const about = (state, emit) => html`
  <section class=${prefix}>
    <h1>ABOUT</h1>
  </section>
`

module.exports = about

},{"choo/html":1,"sheetify/insert":74}]},{},["entry100"]);
