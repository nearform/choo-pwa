const css = require('sheetify')
const html = require('choo-async/html')

const prefix = css`
  :host {
    background-color: red;
  }
`

const about = (state, emit) => html`
  <section class=${prefix}>
    <h1>ABOUT</h1>
  </section>
`

module.exports = about
