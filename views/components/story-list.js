const html = require('choo-async/html')
const css = require('sheetify')

const storyItem = require('./story-item')

const prefix = css`
  :host {
    margin: 0 0 0 6px;
    padding: 0 0 0 24px;
  }
`

const storyList = (stories = []) => html`
  <ol class=${prefix}>
    ${stories.filter(Boolean).map(storyItem)}
  </ol>
`

module.exports = storyList
