const h = require('../plugins/choo-async/html')
const raw = require('choo/html/raw')
const css = require('sheetify')

const river = require('./components/river')

const prefix = css`
  :host {
    word-break: break-all;
  }
`

async function loadMore (state, emit) {
  const { category, page } = state.articles
  const response = await fetch(`http://localhost:3000/api/articles/${category}?page=${page + 1}`)
  const data = await response.json()
  emit('articles:loadMore', data)
}

const placeholder = {
  category: h`
    <span class="${prefix} moon-gray">
      ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
    </span>
  `,
  data: [{
    hed: h`
      <span class="${prefix} moon-gray">
        ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      </span>
    `,
    dek: h`
      <span class="${prefix} moon-gray">
        ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      </span>
    `,
    contributor: h`
      <span class="${prefix} moon-gray">
        ${raw('&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;&lhblk;')}
      </span>
    `,
    tout: {
      src: 'https://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png'
    },
  }]
}

const category = (category = placeholder, loadMore) => h`
  <section class="mw7 center avenir">
    <h2 class="baskerville fw1 ph3 ph0-l ttc">${category.category}</h2>
    ${river(category.data)}
    <a class="f6 link dim br1 ba ph3 pv2 mv3 db tc near-black" onclick=${() => loadMore()}>More</a>
  </section>
`

module.exports = category
