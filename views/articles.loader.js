const https = require('https')
const fetch = require('node-fetch')
const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadModule } = require('../utils')

const agent = new https.Agent({
  rejectUnauthorized: false
})

function articles() {
  const getArticlesData = ({ category = 'all', page = 0 }) => async (state, emit) => {
    console.log(`getArticlesData :: loading data [category = ${category}, page = ${page}]`)
    const response = await fetch(`https://localhost:3000/api/articles/${category}?page=${page}`, { agent })
    const data = await response.json()
    console.log(`getArticlesData :: data loaded [category = ${category}, page = ${page}]`)
    emit('articles:load', data)
  }

  return loader(
    loadModule('/assets/articles.js', () => new Promise(resolve => splitRequire('./articles', (err, result) => resolve(result)))),
    loadCSS('/assets/articles.css'),
    loadData(getArticlesData)
  )
}

module.exports = articles

