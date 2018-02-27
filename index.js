const css = require('sheetify')
const choo = require('choo')
const html = require('choo/html')

css('tachyons')

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

const homeStore = require('./stores/home')
const routerStore = require('./stores/router')
const articleStore = require('./stores/article')
const articlesStore = require('./stores/articles')

app.use(homeStore)
app.use(routerStore)
app.use(articleStore)
app.use(articlesStore)

// --

const layout = require('./layout')
const { router, async } = require('./utils')

const routes = {
  '/': require('./views/home.loader'),
  '/about/:id': require('./views/about.loader'),
  '/category/:category': require('./views/articles.loader'),
  '/article/:slug': require('./views/article.loader')
}

app.route('*',
  layout(
    async(
      router(routes),
      () => html`<h3>Loading app</h3>`
    )
  )
)

if (module.parent) {
  module.exports = app
} else {
  app.mount('html')

  // Register service worker
  if (window.navigator && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('SW registered:', registration)
      } catch (error) {
        console.log('SW registration failed:', error)
      }
    })
  }
}
