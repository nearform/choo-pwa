const getDataFactory = require('../data')

const getNewestData = getDataFactory('new')

const newest = app => async (state, emit) => {
  const page = Number(state.params.page || 1)
  const [ bundle, data ] = await Promise.all([
    app.bundles.load('./components/stories'),
    app.data.load('newest', getNewestData, page)
  ])
  return bundle(data, 'newest', `/newest/page/${page + 1}`)
}

module.exports = newest
