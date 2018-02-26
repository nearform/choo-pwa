const css = require('sheetify')
const html = require('choo/html')

const river = require('./components/river')

const home = (state, emit) => html`
  <section class="mw7 center avenir">
    ${state.home.map(articles => html`
      <section>
        <h2 class="baskerville fw1 ph3 ph0-l ttc">${articles.category}</h2>
        ${river(articles.data)}
      </section>
    `)}
  </section>
`

module.exports = home
