const html = require('choo-async/html')
const raw = require('choo/html/raw')
const css = require('sheetify')

const river = require('./components/river')

const prefix = css`
  :host {
    word-break: break-all;
  }
`

const placeholder = {
  category: html`
    <span class="${prefix} moon-gray">
      ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
    </span>
  `,
  data: [{
    hed: html`
      <span class="${prefix} moon-gray">
        ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      </span>
    `,
    dek: html`
      <span class="${prefix} moon-gray">
        ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      </span>
    `,
    contributor: html`
      <span class="${prefix} moon-gray">
        ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      </span>
    `,
    tout: {
      src: 'https://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png'
    }
  }]
}

const category = (category = placeholder, loadMore) => html`
  <section class="mw7 center avenir">
    <h2 class="baskerville fw1 ph3 ph0-l ttc">${category.category}</h2>
    ${river(category.data)}
    <a class="f6 link dim br1 ba ph3 pv2 mv3 db tc near-black" onclick=${() => loadMore()}>More</a>
  </section>
`

module.exports = category
