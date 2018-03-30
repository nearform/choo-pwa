const fetch = require('node-fetch')
const { onChange } = require('../plugins/choo-data/utils')

const getHomeData = async params => {
  const categories = ['business', 'culture', 'gear']
  const promises = categories.map(category => fetch(`https://choo-pwa.xyz/api/articles/${category}`).then(response => response.json()))
  return await Promise.all(promises)
}

function home (app) {
  return async (state, emit) => {
    const [ bundle, data ] = await Promise.all([
      app.bundles.load('./home'),
      app.data.load('home', getHomeData, onChange(state.params), { blocking: true })
    ])
    return bundle(data)
  }
}

module.exports = home
