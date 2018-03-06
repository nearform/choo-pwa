(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"entry104":[function(require,module,exports){
require("split-require").l(104, require("a"));
},{"a":104,"split-require":75}],104:[function(require,module,exports){
const css = 0
const html = require('choo/html')

const river = require('./components/river')

// const prefix = css`
//   :host {
//     background-color: blue;
//   }
// `

async function loadMore (state, emit) {
  const { category, page } = state.articles
  const response = await fetch(`http://localhost:3000/api/articles/${category}?page=${page + 1}`)
  const data = await response.json()
  emit('articles:loadMore', data)
}

const articles = (state, emit) => html`
  <section class="mw7 center avenir">
    <h2 class="baskerville fw1 ph3 ph0-l ttc">${state.articles.category}</h2>
    ${river(state.articles.data)}
    <a class="f6 link dim br1 ba ph3 pv2 mv3 db tc near-black" onclick=${() => loadMore(state, emit)}>More</a>
  </section>
`

module.exports = articles

},{"./components/river":106,"choo/html":1}],106:[function(require,module,exports){
const css = 0
const html = require('choo/html')

const river = (articles = []) => html`
  <div>
    ${articles.map(article => html`
      <article class="bt bb b--black-10">
        <a class="db pv4 ph3 ph0-l no-underline black dim" href="/article/${article.slug}">
          <div class="flex flex-column flex-row-ns">
            <div class="pr3-ns mb4 mb0-ns w-100 w-40-ns">
              <div class="aspect-ratio aspect-ratio--6x4">
                <div class="aspect-ratio--object cover" style="background:url(${article.tout.src}) center;"></div>
              </div>
            </div>
            <div class="w-100 w-60-ns pl3-ns">
              <h1 class="f3 fw1 baskerville mt0 lh-title">${article.hed}</h1>
              <p class="f6 f5-l lh-copy">
                ${article.dek}
              </p>
              <p class="f6 lh-copy mv0 ttu tracked">By ${article.contributor}</p>
            </div>
          </div>
        </a>
      </article>
    `)}
  </div>
`

module.exports = river

},{"choo/html":1}]},{},["entry104"]);
