function about (app) {
  return async (state, emit) => {
    const bundle = await app.bundles.load('./about')
    throw new Error('something went wrong')
    return bundle(state, emit)
  }
}

module.exports = about
