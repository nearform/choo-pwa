const cors = require('cors')
const https = require('https')

const RSSParser = require('rss-parser')

const fastify = require('fastify')()

const parser = new RSSParser()

const PAGE_SIZE = 5
let ARTICLES = []

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function parseArticle(item) {
  return {
    hed: item.title,
    dek: item.contentSnippet.replace(/&\w+;/, '').split(' ').splice(0, 25).join(' ') + ' ...',
    date: item.pubDate,
    slug: slugify(item.title),
    contributor: item.creator,
    category: item.categories[0],
    tout: {
      src: 'http://localhost:3000/images?url=' + encodeURIComponent(item.content.match(/\<img.+?src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/)[1]),
      alt: ''
    },
    date: Date.parse(item.isoDate),
    body: item.content
  }
}

async function setup() {
  const feeds = [
    'http://feeds.feedburner.com/TechCrunch/JohnBiggs',
    'http://feeds.feedburner.com/TechCrunch/MattBurns',
    'http://feeds.feedburner.com/TechCrunch/MikeButcher',
    'http://feeds.feedburner.com/TechCrunch/JoshConstine',
    'http://feeds.feedburner.com/TechCrunch/JordanCrook',
    'http://feeds.feedburner.com/TechCrunch/Kim-maiCutler',
    'http://feeds.feedburner.com/TechCrunch/AnthonyHa',
    'http://feeds.feedburner.com/TechCrunch/FredericLardinois',
    'http://feeds.feedburner.com/TechCrunch/IngridLunden',
    'http://feeds.feedburner.com/TechCrunch/NatashaLomas',
    'http://feeds.feedburner.com/TechCrunch/SarahPerez'
  ]

  const promises = feeds.map(feed => parser.parseURL(feed).then(feed => feed.items.map(parseArticle)))
  const results = await Promise.all(promises)
  ARTICLES = results.reduce((acc, articles) => ([...acc, ...articles]), [])
}

fastify.use(cors())

const opts = {
  schema: {
    params: {
      category: { type: 'string' }
    },
    querystring: {
      page: { type: 'integer' },
    }
  }
}

fastify.get('/api/articles/:category', opts, async (request, reply) => {
  const { category = 'all' } = request.params
  const { page = 0 } = request.query

  const articles = ARTICLES
    .filter(article => article.category.toLowerCase() === category.toLowerCase())
    .slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return {
    articles,
    category,
    page
  }
})

fastify.get('/images', async (request, reply) => {
  const { url } = request.query
  console.log('/images', url)
  https.get(decodeURIComponent(url), res => reply
    .type(res.headers['content-type'])
    .send(res))
})

fastify.get('/article/:slug', async (request, reply) => {
  const { slug } = request.params
  return articles.find(article => article.slug === slug)
})

setup().then(() => {
  
  const count = ARTICLES.reduce((acc, { category }) => ({
    ...acc,
    [category]: (acc[category] || 0) + 1
  }), {})

  console.log(count)
  fastify.listen(3000, '127.0.0.1', function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
  })
})
