const html = require('choo-async/html')

function noscript (children) {
  return (state, emit) => html`
    <noscript>JavaScript is recommended to be enabled for the best experience</noscript>
  `
}

module.exports = noscript
