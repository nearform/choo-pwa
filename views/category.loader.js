const https = require('https')
const fetch = require('node-fetch')
const splitRequire = require('split-require')

const agent = new https.Agent({
  rejectUnauthorized: false
})

const getCategoryData = async (params, data) => {
  const response = await fetch(`https://localhost:3000/api/articles/${params.category}?page=${params.page || 0}`, { agent })
  return await response.json()
}

const importCategory = () => new Promise((resolve, reject) => splitRequire('./category', (err, bundle) => err ? reject(err) : resolve(bundle)))

function category (app) {
  return async (state, emit) => {
    const [ bundle, data ] = await Promise.all([
      app.bundles.loadBundle('./category', importCategory),
      app.data.loadData('category', getCategoryData, state.params)
    ])
    const loadMore = () => {} // app.data.createLoader('category', getCategoryData, () => )
    return bundle(data, loadMore)
  }
}

module.exports = category
