const html = require('choo/html')
const { async } = require('./utils')

// const spinner = require('./views/components/spinner')

/*
<!DOCTYPE html>
*/

function layout (children) {
  return async (state, emit) => html`
    <body>
      <header class="bg-white black-80 tc pv4 avenir">
        <h1 class="mt2 mb0 baskerville i fw1 f1">Amazing PWA</h1>
        <h2 class="mt2 mb0 f6 fw4 ttu tracked">The place to get amazing news</h2>
        <nav class="bt bb tc mw7 center mt4">
          <a class="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/">Home</a>
          <a class="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/category/tc">TC</a>
          <a class="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/category/apps">Apps</a>
          <a class="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/category/startups">Startups</a>
          <a class="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/category/gadgets">Gadgets</a>
          <a class="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/about">About</a>
        </nav>
      </header>
      <main>
        ${await children(state, emit)}
      </main>
    </body>
  `
}

module.exports = layout
