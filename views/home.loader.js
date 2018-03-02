const fetch = require('node-fetch')
const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadModule } = require('../utils')

function home() {
  const getHomeData = () => async (state, emit) => {
    console.log(`getHomeData :: loading data`)
    const categories = ['startups', 'apps', 'tc']
    const promises = categories.map(category => fetch(`http://localhost:3000/api/articles/${category}`).then(response => response.json()))
    const data = await Promise.all(promises)
    console.log(`getHomeData :: data loaded`)
    emit('home:load', data)
  }

  return loader(
    loadModule('/assets/home.js', () => new Promise(resolve => splitRequire('./home', (err, result) => resolve(result)))),
    loadCSS('/assets/home.css'),
    loadData(getHomeData),
  )
}

module.exports = home
