const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadComponent } = require('../utils')

const getArticlesData = ({ category = 'all', page = 0 }) => async (state, emit) => {
  const response = await fetch(`http://localhost:3000/api/articles/${category}?page=${page}`)
  const data = await response.json()
  emit('articles:load', data)
}

module.exports = loader(
  loadComponent(params => new Promise(resolve => splitRequire('./articles', (err, result) => resolve(result)))),
  loadData(getArticlesData),
  loadCSS('articles.css')
)
