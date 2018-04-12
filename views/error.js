const html = require('choo-async/html')

function error () {
  return err => (state, emit) => html`
    <div>
      <h2>An error has occured</h2>
      <pre>${err.stack}</pre>
    </div>
  `
}

module.exports = error
