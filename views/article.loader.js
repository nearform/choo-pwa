const fetch = require('node-fetch')
const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadModule } = require('../utils')

function article() {
  const getArticleData = ({ slug }) => async (state, emit) => {
    console.log(`getArticleData :: loading data [slug = ${slug}]`)
    const response = await fetch(`http://localhost:3000/api/article/${slug}`)
    const data = await response.json()
    console.log(`getArticleData :: data loaded [slug = ${slug}]`)
    emit('article:load', data)
  }

  return loader(
    loadModule('/assets/article.js', () => new Promise(resolve => splitRequire('./article', (err, result) => resolve(result)))),
    loadCSS('/assets/article.css'),
    loadData(getArticleData)
  )
}

module.exports = article
