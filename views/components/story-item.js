const html = require('choo-async/html')
const css = require('sheetify')

const prefix = css`
  :host {
    line-height: 11pt;
    margin: 6px 0;
  }

  :host > .byline {
    color: #4a4a4a;
    font-size: 7pt;
  }
`

const storyItem = (story = {}) => html`
  <li class=${prefix}>
    <span><a href=${story.url}>${story.title}</a></span>
    <br />
    <span class='byline'>
      ${story.score} points by ${story.by.id}
    </span>
  </li>
`

module.exports = storyItem
