function articles (state, emitter) {
  state.articles = state.articles || []

  emitter.on('articles:load', payload => {
    state.articles = payload
    emitter.emit('render', 'articles:load')
  })

  emitter.on('articles:loadMore', payload => {
    if (state.articles.category !== payload.category) {
      console.log('something weird happened')
    }
    state.articles = Object.assign({}, state.articles, {
      data: [
        ...state.articles.data,
        ...payload.data
      ],
      page: payload.page
    })
    emitter.emit('render', 'articles:loadMore')
  })
}

module.exports = articles
