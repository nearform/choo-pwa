const https = require('https')
const fetch = require('node-fetch')
const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadModule } = require('../utils')

const agent = new https.Agent({
  rejectUnauthorized: false
})

function home() {
  const getHomeData = () => async (state, emit) => {
    console.log(`getHomeData :: loading data`)
    const categories = ['startups', 'apps', 'tc']
    const promises = categories.map(category => fetch(`https://localhost:3000/api/articles/${category}`, { agent }).then(response => response.json()))
    const data = await Promise.all(promises)
    console.log(`getHomeData :: data loaded`)
    emit('home:load', data)
  }

  return loader(
    loadModule('/assets/home.js', () => new Promise(resolve => splitRequire('./home', (err, result) => resolve(result)))),
    loadCSS('/assets/home.css'),
    loadData(getHomeData),
  )
}

module.exports = home

// // module.exports = withData(getHomeData, home)

// function loadComponent(path) {
//   const _component = null

//   return async (state, emit) => {
//     if (!_component) {
//       emit('assets:loadModule', path, component => _component = component)
//       return 'loading'
//     }
//     return _component(state, emit)
//   }
// }

// module.exports = params => {
//   return loadComponent('./home')
// }
