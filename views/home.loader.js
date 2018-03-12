const https = require('https')
const fetch = require('node-fetch')
const splitRequire = require('split-require')

const agent = new https.Agent({
  rejectUnauthorized: false
})

const getHomeData = async (params) => {
  const categories = ['startups', 'apps', 'tc']
  const promises = categories.map(category => fetch(`https://localhost:3000/api/articles/${category}`, { agent }).then(response => response.json()))
  return await Promise.all(promises)
}

const importHome = () => new Promise((resolve, reject) => splitRequire('./home', (err, bundle) => err ? reject(err) : resolve(bundle)))

function home (app) {
  return async (state, emit) => {
    const [ bundle, data ] = await Promise.all([
      app.bundles.loadBundle('./home', importHome),
      app.data.loadData('home', getHomeData, state.params, { blocking: true })
    ])
    return bundle(data)
  }
}

module.exports = home
