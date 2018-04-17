const html = require('choo-async/html')

function manifest (children) {
  return (state, emit) => html`
    <link rel="manifest" href="/assets/manifest.webmanifest">
  `
}

module.exports = manifest
