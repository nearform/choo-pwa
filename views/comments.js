const getDataFactory = require('../data')

const getCommentsData = getDataFactory('comments')

const comments = app => async (state, emit) => {
  const page = Number(state.params.page || 1)
  const [ bundle, data ] = await Promise.all([
    app.bundles.load('./components/comments'),
    app.data.load('comments', getCommentsData, page)
  ])
  return bundle(data, 'Comments', `/comments/page/${page + 1}`)
}

module.exports = comments
