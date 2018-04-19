const getDataFactory = require('../data')

const getShowData = getDataFactory('show')

const show = app => async (state, emit) => {
  const page = Number(state.params.page || 1)
  const [ bundle, data ] = await Promise.all([
    app.bundles.load('./components/stories'),
    app.data.load('show', getShowData, page)
  ])
  return bundle(data, 'Show', `/show/page/${page + 1}`)
}

module.exports = show
