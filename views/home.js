const getDataFactory = require('../data')

const getHomeData = getDataFactory('top')

const home = app => async (state, emit) => {
  const page = Number(state.params.page || 1)
  const [ bundle, data ] = await Promise.all([
    app.bundles.load('./components/stories'),
    app.data.load('home', getHomeData, page)
  ])
  return bundle(data, null, `/page/${page + 1}`)
}

module.exports = home
