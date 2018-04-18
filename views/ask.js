const getDataFactory = require('../data')

const getAskData = getDataFactory('ask')

const ask = app => async (state, emit) => {
  const page = Number(state.params.page || 1)
  const [ bundle, data ] = await Promise.all([
    app.bundles.load('./components/stories'),
    app.data.load('ask', getAskData, page)
  ])
  return bundle(data, 'Ask', `/ask/page/${page + 1}`)
}

module.exports = ask
