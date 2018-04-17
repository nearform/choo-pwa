const choo = require('choo')
const css = require('sheetify')

const sw = require('./plugins/choo-sw')
const ssr = require('choo-ssr')
const data = require('choo-data')
const async = require('choo-async')
const bundles = require('choo-bundles')
const devtools = require('choo-devtools')

const html = require('./views/components/html')
const layout = require('./views/components/layout')
const noscript = require('./views/components/noscript')
const manifest = require('./views/components/manifest')

const error = require('./views/error')

const home = require('./views/home.loader')
const about = require('./views/about.loader')
const article = require('./views/article.loader')
const category = require('./views/category.loader')

css('tachyons')

function main () {
  const app = async(choo())

  app.use(sw())
  app.use(ssr())
  app.use(data())
  app.use(bundles())

  if (process.env.NODE_ENV !== 'production') {
    app.use(devtools())
  }

  const page = content => (
    html(
      ssr.head(
        ssr.state(),
        bundles.assets(),
        manifest()
      ),
      ssr.body(
        async.catch(
          layout(content),
          error()
        ),
        noscript()
      )
    )
  )

  app.route('/', page(home(app)))
  app.route('/about', page(about(app)))
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
