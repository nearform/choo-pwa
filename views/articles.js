const css = require('sheetify')
const html = require('choo/html')

const river = require('./components/river')

const prefix = css`
  :host {
    background-color: blue;
  }
`

async function loadMore(state, emit) {
  const { category, page } = state.articles
  const response = await fetch(`http://localhost:3000/api/articles/${category}?page=${page+1}`)
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
