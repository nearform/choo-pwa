const choo = require('choo')
const css = require('sheetify')

const sw = require('./plugins/choo-sw')
const ssr = require('./plugins/choo-ssr')
const data = require('./plugins/choo-data')
const async = require('./plugins/choo-async')
const bundles = require('./plugins/choo-bundles')
const devtools = require('choo-devtools')

const html = require('./views/components/html')
const head = require('./views/components/head')
const body = require('./views/components/body')
const layout = require('./views/components/layout')

const home = require('./views/home.loader')
const about = require('./views/about.loader')
const article = require('./views/article.loader')
const category = require('./views/category.loader')

css('tachyons')

function main () {
  const app = choo()

  app.use(async())

  app.use(sw())
  app.use(ssr())
  app.use(data())
  app.use(bundles())
  app.use(devtools())

  const page = content => (
    html(
      head(
        ssr.head(),
        bundles.head()
      ),
      body(layout(content))
    )
  )

  app.route('/', page(home(app)))
  app.route('/about/', page(about(app)))
  app.route('/article/:slug', page(article(app)))
  app.route('/category/:category', page(category(app)))
  app.route('/app-shell', page(() => {}))

  return app
}

if (typeof window !== 'undefined') {
  const app = main()
  app.mount('html')
}

module.exports = main
