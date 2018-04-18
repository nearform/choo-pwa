const css = require('sheetify')
const html = require('choo-async/html')
const navigation = require('./navigation')

const prefix = css`
  :host {
    background: rgb(246, 246, 239);
    border-bottom: 2px solid #fe6501;
  }
`

const layout = children => (state, emit) => html`
  <div class=${prefix}>
    ${navigation(state, emit)}
    ${children(state, emit)}
  </div>
`

module.exports = layout
