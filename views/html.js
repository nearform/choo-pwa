const h = require('choo/html')

const isBrowser = typeof window !== 'undefined'

function initialState(state) {
  if (isBrowser) {
    return null
  } else {
    // server only
    return h`
      <script>window.__initialState__=JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(state))}"))</script>
    `
  }
}

function html (body) {
  return async (state, emit) => h`
    <html>
      <head>
        ${initialState(state)}
        ${state.assets.js.map(script => h`<script src="${script}" defer></script>`)}
        ${state.assets.css.map(link => h`<link href="${link}" rel="stylesheet">`)}
      </head>
      ${await body(state, emit)}
    </html>
  `
}

module.exports = html
