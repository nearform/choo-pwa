const fetch = require('node-fetch')

const getArticleData = async params => {
  const response = await fetch(`https://choo-pwa.xyz/api/article/${params.slug}`)
  return response.json()
}

function article (app) {
  return async (state, emit) => {
    const [ bundle, data ] = await Promise.all([
      app.bundles.load('./article'),
      app.data.load('article', getArticleData, state.params)
    ])
    return bundle(data)
  }
}

module.exports = article
