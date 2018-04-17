const html = require('choo-async/html')
const raw = require('choo/html/raw')

const css = require('sheetify')

const prefix = css`
  :host {
    word-break: break-all;
  }
`

const placeholder = {
  hed: html`
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
  },
  body: html`
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

function crop (url, aspect, width) {
  return url.replace('/master/', `/${aspect}/`).replace('/pass/', `/w_${width}/`)
}

const article = (article = placeholder) => html`
  <article class="mw7 center avenir">
    <div class="pb4 bb mb4 tc">
      <h1 class="f3 f2-m f1-l lh-title baskerville">${article.hed}</h1>
      <cite class="f6 ttu fs-normal">By: ${article.contributor}</cite>
    </div>
    <div class="aspect-ratio aspect-ratio--16x9 mb4">
      <div class="aspect-ratio--object cover" style="background:url(${crop(article.tout.src, '6:4', '768')}) center;"></div>
    </div>
    <p class="lh-copy">
      ${article.body}
    </p>
  </article>
`

module.exports = article
