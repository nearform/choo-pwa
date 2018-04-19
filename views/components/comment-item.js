const css = require('sheetify')
const raw = require('choo/html/raw')
const html = require('choo-async/html')

const prefix = css`
  :host {
    line-height: 10pt;
    margin: 6px 0;
  }

  :host .title {
    display: block;
    font-size: 8pt;
    padding: 0 0 6px;
  }

  :host .content {
    color: #000;
    display: block;
    font-size: 9pt;
    line-height: 12pt;
    padding: 0 0 6px;
  }

  :host .content p {
    margin: 4px 0;
  }
`

const timeAgo = isoDate => {
  if (!isoDate) {
    return ' some time ago'
  }

  var seconds = Math.floor((new Date() - Date.parse(isoDate)) / 1000)
  var interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return interval + ' years ago'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + ' months ago'
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + ' days ago'
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + ' hours ago'
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + ' minutes ago'
  }
  return Math.floor(seconds) + ' seconds ago'
}

const getTitle = title => {
  if (!title) return
  const split = title.split('in "')
  if (!split || split.length < 2) return title
  return split[1].replace(/"/g, '')
}

const commentItem = (comment = {}) => html`
  <li class=${prefix}>
    <span class="title">
      ${comment.creator}
      ${timeAgo(comment.isoDate)}
      | on: ${getTitle(comment.title)}
    </span>
    <span className='content'>
      ${raw(comment.content)}
    </span>
  </li>
`

module.exports = commentItem
