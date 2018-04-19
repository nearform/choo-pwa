const css = require('sheetify')
const html = require('choo-async/html')

const commentItem = require('./comment-item')

const prefix = css`
  :host {
    list-style: none;
    margin: 0 0 0 6px;
    padding: 0 0 0 2px;
  }
`

const commentsList = (comments = []) => html`
  <ul class=${prefix}>
    ${comments.map(commentItem)}
  </ul>
`

module.exports = commentsList
