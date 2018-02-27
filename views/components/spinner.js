const css = require('sheetify')
const html = require('choo/html')

// const prefix = css('./spinner.css')

function spinner () {
  return (state, emit) => html`
    <div class=${prefix}>
      <div class="loader" />
    </div>
  `
}

module.exports = spinner
