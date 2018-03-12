const splitRequire = require('split-require')


function about() {
  const getAboutData = () => (state, emit) => {
    console.log(`getAboutData :: DONE`)
  }

  // return loader(
  //   loadModule('/assets/about.js', () => new Promise(resolve => splitRequire('./about', (err, result) => resolve(result)))),
  //   loadCSS('/assets/about.css'),
  //   loadData(getAboutData),
  // )
}

module.exports = about