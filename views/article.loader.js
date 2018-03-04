const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadModule } = require('../utils')

const isBrowser = typeof window !== 'undefined'

function article () {
  const getArticleData = ({ slug }) => (state, emit) => {
    if (isBrowser) {
      emit('article:load', slug)
    } else {
      return emit('article:load', slug)
    }
  }

  return loader(
    loadModule('/assets/article.js', () => new Promise(resolve => splitRequire('./article', (err, result) => resolve(result)))),
    loadCSS('/assets/article.css'),
    loadData(getArticleData)
  )
}

module.exports = article

// --

// function article () {
//   const article = loadModule('/assets/article.js', () => new Promise(resolve => splitRequire('./article', (err, result) => resolve(result)))),
//   const loadArticleData = params => (state, emit) => emit('article:load', params.slug)
//   return withData(loadArticleData, article)
// }

// module.exports = article

// const isBrowser = typeof window !== 'undefined'

// function different(fn, noop = () => {}) {
//   let _lastHash
//   return (...args) => {
//     const hash = JSON.stringify(args)
//     if (hash !== _lastHash) {
//       _lastHash = hash
//       return fn(...args)
//     }
//     return noop
//   }
// }

// function withData(component, ...loaders) {
//   loaders = loaders.map(loader => different(loader))

//   return (...args) => async (state, emit) => {
//     const promises = [
//       component(...args)(state, emit)
//       loader(...args)(state, emit)
//     ]]

//     if (isBrowser) {
//       return await promises[0]
//     }

//     const results = await Promise.all(promises)
//     return results[0]
//   }
// }
