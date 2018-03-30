function about (app) {
  return async (state, emit) => {
    const bundle = await app.bundles.load('./about')
    return bundle(state, emit)
  }
}

module.exports = about
