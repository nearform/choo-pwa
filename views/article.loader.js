const https = require('https')
const fetch = require('node-fetch')
const splitRequire = require('split-require')

const { onChange } = require('../plugins/choo-data/utils')

const agent = new https.Agent({
  rejectUnauthorized: false
})

const getArticleData = async params => {
  const response = await fetch(`https://choo-pwa.xyz/api/article/${params.slug}`, { agent })
  return await response.json()
}

const importArticle = () => new Promise((resolve, reject) => splitRequire('./article', (err, bundle) => err ? reject(err) : resolve(bundle)))

function article (app) {
  return async (state, emit) => {
    const [ bundle, data ] = await Promise.all([
      app.bundles.load('./article', importArticle),
      app.data.load('article', getArticleData, onChange(state.params))
    ])
    return bundle(data)
  }
}

module.exports = article
