const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadComponent } = require('../utils')

const getHomeData = () => async (state, emit) => {
  const categories = ['tc', 'apps', 'startups']
  const promises = categories.map(category => fetch(`http://localhost:3000/api/articles/${category}`).then(response => response.json()))
  const data = await Promise.all(promises)
  emit('home:load', data)
}

module.exports = loader(
  loadComponent(() => new Promise(resolve => splitRequire('./home', (err, result) => resolve(result)))),
  loadData(getHomeData),
  loadCSS('home.css')
)
