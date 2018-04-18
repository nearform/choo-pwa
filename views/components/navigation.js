const css = require('sheetify')
const html = require('choo-async/html')

const prefix = css`
  :host {
    align-items: center;
    background-color: #fe6501;
    display: flex;
    padding: 2px;
  }

  :host a {
    color: #000;
  }

  :host > .logo {
    align-items: center;
    display: flex;
    flex-shrink: 0;
  }

  :host > .logo > .image {
    width: 18px;
    height: 18px;
    display: inline-block;
    border: 1px solid #fff;
  }

  :host > .logo > .text {
    font-weight: 700;
    padding: 2px 4px;
  }

  :host > .nav {
    color: #000;
    font-size: 9pt;
    margin-left: 8px;
  }

  :host > .nav .is-active {
    color: #fff;
  }
`

const imageBg = 'data:image/gif;base64,R0lGODlhEgASAKIAAP/jyvihV/aKLfmxc/////9mAAAAAAAAACH5BAAAAAAALAAAAAASABIAAAMpWLrc/jDKOQkRy8pBhuKeRAAKQFBBxwVUYY5twXVxodV3nLd77f9ASQIAOw=='

const navigation = (state, emit) => html`
  <div class=${prefix}>
    <a href="/" class="logo">
      <div class="image" style="background-size: '18px'; background-image: url(${imageBg})"></div>
      <span class="text">Hacker News</span>
    </a>
    <nav class="nav">
      <a href="/newest">new</a> |
      <a href="/newcomments"> comments</a> |
      <a href="/show"> show</a> |
      <a href="/ask"> ask</a> |
      <a href="/jobs"> jobs</a>
    </nav>
  </div>
`

module.exports = navigation
