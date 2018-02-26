const splitRequire = require('split-require')
const { loader, loadCSS, loadData, loadComponent } = require('../utils')

const getAboutData = () => (state, emit) => {
  console.log(`getAboutData :: DONE`)
}

module.exports = loader(
  loadComponent(() => new Promise(resolve => splitRequire('./about', (err, result) => resolve(result)))),
  loadData(getAboutData),
  loadCSS('about.css')
)
