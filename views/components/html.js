const h = require('../../plugins/choo-async/html')

function html (head, body) {
  return (state, emit) => {
    const pBody = body(state, emit)
    const pHead = pBody.then(() => head(state, emit)) // resolve head once body is resolved
    return h`
      <html>
        ${pHead}
        ${pBody}
      </html>
    `
  }
}

module.exports = html
