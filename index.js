const choo = require('choo')
const css = require('sheetify')

const html = require('./views/html')
const layout = require('./layout')
const { router, async } = require('./utils')

css('tachyons')

const isBrowser = typeof window !== 'undefined'

// --

const home = require('./views/home.loader')
const about = require('./views/about.loader')
const article = require('./views/article.loader')
const category = require('./views/articles.loader')

function loader(child) {
  let _resolved = null
  let _loading = 'loading'

  if (!isBrowser) {
    return child
  }

  return async (state, emit) => {
    if (_resolved) {
      const result = _resolved
      _resolved = null
      return result
    } else {
      child(state, emit).then(resolved => {
        _resolved = resolved
        _loading = resolved
        emit('render', 'loader')
      })
      return _loading
    }
  }
}

function main() {
  const app = choo()

  if (process.env.NODE_ENV !== 'production') {
    app.use(require('choo-devtools')())
  }

  app.use(require('./stores/router'))
  app.use(require('./stores/assets'))

  app.use(require('./stores/home'))
  app.use(require('./stores/article'))
  app.use(require('./stores/articles'))

  app.use((state, emiiter) => emiiter.on('render', payload => console.log('RENDER', payload)))

  const body = layout(
    // loader(
      router({
        '/': home(),
        '/about': about(),
        '/article/:slug': article(),
        '/category/:category': category()
      })
    // )
  )
  
  app.render(html(body))

  return app
}

if (isBrowser) {
  console.log(window.__initialState__)
  const app = main()
  app.mount('html', window.__initialState__)

  // Register service worker
  if (window.navigator && 'serviceWorker' in navigator) {
    // window.addEventListener('load', async () => {
    //   try {
    //     const registration = await navigator.serviceWorker.register('/sw.js')
    //     console.log('SW registered:', registration)
    //   } catch (error) {
    //     console.log('SW registration failed:', error)
    //   }
    // })
  }
}

module.exports = main


