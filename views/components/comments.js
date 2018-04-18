const css = require('sheetify')
const html = require('choo-async/html')

const commentList = require('./comment-list')
const placeholders = require('../helpers/placeholders')

const prefix = css`
  :host {
    opacity: 1;
    padding: 6px 6px 6px 0;
    transition: opacity .2s ease-out;
  }

  :host .title {
    font-size: 10pt;
    margin: 0;
    padding-left: 8px;
  }

  :host .more {
    margin-bottom: 6px;
    padding: 0 0 0 30px;
  }
`

const comments = (comments = placeholders, title, nextPage) => html`
  <div class=${prefix}>
    ${title && html`<h1 class="title">${title}</h1>`}
    ${commentList(comments)}
    <p class="more">
      <a href=${nextPage}>More</a>
    </p>
  </div>
`

module.exports = comments
