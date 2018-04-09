const html = require('choo-async/html')

function crop(url, aspect, width) {
  return url.replace('/master/', `/${aspect}/`).replace('/pass/', `/w_${width}/`)
}

const river = (articles = []) => html`
  <div>
    ${articles.map(article => html`
      <article class="bt bb b--black-10">
        <a class="db pv4 ph3 ph0-l no-underline black dim" href="/article/${article.slug}">
          <div class="flex flex-column flex-row-ns">
            <div class="pr3-ns mb4 mb0-ns w-100 w-40-ns">
              <div class="aspect-ratio aspect-ratio--6x4">
                <div class="aspect-ratio--object cover" style="background:url(${crop(article.tout.src, '6:4', '291')}) center;"></div>
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
