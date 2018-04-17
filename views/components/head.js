const html = require('choo-async/html')

function head () {
  return (state, emit) => html`${[
    html`<title>Choo PWA</title>`,
    html`<meta name="viewport" content="width=device-width, initial-scale=1">`,
    html`<meta name="theme-color" content="#000000"/>`,
    html`<link rel="manifest" href="/assets/manifest.webmanifest">`
  ]}`
}

module.exports = head
