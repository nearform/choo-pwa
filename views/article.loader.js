const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadComponent } = require('../utils')

const getArticleData = ({ slug }) => async (state, emit) => {
  const response = await fetch(`http://localhost:3000/api/article/${slug}`)
  const article = await response.json()
  emit('article:load', article)
}

module.exports = loader(
  loadComponent(() => new Promise(resolve => splitRequire('./article', (err, result) => resolve(result)))),
  loadData(getArticleData),
  loadCSS('article.css')
)
