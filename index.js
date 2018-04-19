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
const head = require('./views/components/head')

const error = require('./views/error')

const ask = require('./views/ask')
const show = require('./views/show')
const jobs = require('./views/jobs')
const home = require('./views/home')
const newest = require('./views/newest')
const comments = require('./views/comments')

css('./index.css')

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
        head(),
        bundles.preloads(),
        bundles.assets()
      ),
      ssr.body(
        async.catch(
          layout(content),
          error()
        ),
        noscript(),
        ssr.state(),
      )
    )
  )

  app.route('/', page(home(app)))
  app.route('/page/:page', page(home(app)))
  app.route('/newest', page(newest(app)))
  app.route('/newest/page/:page', page(newest(app)))
  app.route('/newcomments', page(comments(app)))
  app.route('/newcomments/page/:page', page(comments(app)))
  app.route('/show', page(show(app)))
  app.route('/show/page/:page', page(show(app)))
  app.route('/ask', page(ask(app)))
  app.route('/ask/page/:page', page(ask(app)))
  app.route('/jobs', page(jobs(app)))
  app.route('/jobs/page/:page', page(jobs(app)))
  app.route('/app-shell', page(() => {}))

  return app
}

if (typeof window !== 'undefined') {
  const app = main()
  app.mount('html')
}

module.exports = main
