const fetch = require('node-fetch')
const Parser = require('rss-parser')
const sanitizeHtml = require('sanitize-html')
const { URLSearchParams } = require('url')

async function routes (fastify, options) {
  fastify.get('/api/stories', async (request, reply) => {
    const { filter, page = 0 } = request.query || {}
    if (filter === 'comments') {
      return RSSResponse(page)
    }
    return graphQLResponse(filter, page)
  })  
}

function sanitizeItemContent (items) {
  return items.map(({content, ...rest}) => {
    let cleanContent = sanitizeHtml(content)
    return {
      content: cleanContent,
      ...rest
    }
  })
}

function RSSResponse (page) {
  const RSS_URL = 'https://hnrss.org/newcomments?count=100'
  const parser = new Parser()
  return parser.parseURL(RSS_URL)
    .then(feed => {
      let startingItem = page ? (page - 1) * 30 : 0
      const items = feed.items
        .filter(item => item.title)
        .slice(startingItem, startingItem + 30)
        return sanitizeItemContent(items)
    })
}

async function graphQLResponse (filter, page) {
  const API_URL = 'https://www.graphqlhub.com/graphql/'
  const offset = page > 1 ? (page - 1) * 30 : 0
  let queryType

  switch (filter) {
    case 'show':
      queryType = 'showStories'
      break
    case 'ask':
      queryType = 'askStories'
      break
    case 'jobs':
      queryType = 'jobStories'
      break
    case 'rank':
      queryType = 'newStories'
      break
    case 'new':
      queryType = 'newStories'
      break
    case 'best':
    default:
      queryType = 'topStories'
  }

  const query = `
    query {
      hn {
        ${queryType}(limit: 30, offset: ${offset}) {
          by {
            id
          }
          dead
          deleted
          id
          kids {
            id
          }
          score
          text
          title
          type
          url
        }
      }
    }`

  const params = new URLSearchParams({ query })
  const response = await fetch(API_URL, { method: 'POST', body: params })
  const result = await response.json()
  return result.data.hn[queryType]
}

module.exports = routes
