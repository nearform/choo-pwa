const h = require('../plugins/choo-async/html')
const css = require('sheetify')

const river = require('./components/river')

const home = (categories = []) => h`
  <section class="mw7 center avenir">
    ${categories.map(articles => h`
      <section>
        <h2 class="baskerville fw1 ph3 ph0-l ttc">${articles.category}</h2>
        ${river(articles.data)}
      </section>
    `)}
  </section>
`

module.exports = home
