const fetch = require('node-fetch')
const { onChangeWith } = require('../plugins/choo-data/utils')

const getCategoryData = async ([ params, page ], oldData) => {
  const response = await fetch(`https://choo-pwa.xyz/api/articles/${params.category}?page=${page}`)
  const data = await response.json()
  if (!oldData || oldData.category !== params.category) {
    return data
  } else {
    return Object.assign({}, data, {
      data: [...oldData.data, ...data.data]
    })
  }
}

function category (app) {
  return async (state, emit) => {
    const [ bundle, data ] = await Promise.all([
      app.bundles.load('./category'),
      app.data.load('category', getCategoryData, onChangeWith(state.params, page => page || 0))
    ])

    const loadMore = () => app.data.load('category', getCategoryData, onChangeWith(state.params, page => page + 1))

    return bundle(data, loadMore)
  }
}

module.exports = category
