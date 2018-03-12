const h = require('choo/html')

function body (...components) {
  return (state, emit) => h`<body>${components.map(component => component(state, emit))}</body>`
}

module.exports = body
