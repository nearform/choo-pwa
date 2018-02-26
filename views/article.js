const css = require('sheetify')
const html = require('choo/html')

const prefix = css`
  :host {
    background-color: blue;
  }
`

const article = ({ article = {} }, emit) => html`
  <article class="mw7 center avenir">
    <div class="pb4 bb mb4 tc">
      <h1 class="f3 f2-m f1-l lh-title baskerville">${article.hed}</h1>
      <cite class="f6 ttu tracked fs-normal">By: ${article.contributor}</cite>
    </div>
    <div class="aspect-ratio aspect-ratio--16x9 mb4">
      <div class="aspect-ratio--object cover" style="background:url(${article.tout.src}) center;"></div>
    </div>
    <p class="lh-copy">
      ${article.body}
    </p>
  </article>
`

module.exports = article
