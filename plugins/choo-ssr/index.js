const h = require('choo/html')

function ssr() {
  return (state, emitter, app) => {}
}

ssr.head = () => (state, emit) => h`<script>window.initialState=JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(state))}"))</script>`

module.exports = ssr
