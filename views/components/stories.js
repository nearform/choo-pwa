const css = require('sheetify')
const raw = require('choo/html/raw')
const html = require('choo-async/html')

const storyList = require('./story-list')
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

const stories = (stories = placeholders, title, nextPage) => html`
  <main class=${prefix}>
    ${title && html`<h1 class="title">${title}</h1>`}
    ${storyList(stories)}
    <p class="more">
      <a href=${nextPage}>More</a>
    </p>
  </main>
`

module.exports = stories
