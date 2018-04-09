const html = require('choo-async/html')
const css = require('sheetify')

const river = require('./components/river')

const home = (categories = []) => html`
  <section class="mw7 center avenir">
    ${categories.map(articles => html`
      <section>
        <h2 class="baskerville fw1 ph3 ph0-l ttc">${articles.category}</h2>
        ${river(articles.data)}
      </section>
    `)}
  </section>
`

module.exports = home
