const loki = require('lokijs')
const RSSParser = require('rss-parser')
const fastifyPlugin = require('fastify-plugin')

function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function parseArticle (item) {
  return {
    hed: item.title,
    dek: item.description, //contentSnippet.replace(/&\w+;/, '').split(' ').splice(0, 25).join(' ') + ' ...',
    date: Date.parse(item.isoDate),
    slug: slugify(item.title),
    contributor: item.creator,
    category: item.categories[0].toLowerCase(),
    tout: {
      src: 'https://choo-pwa.xyz/images?url=' + encodeURIComponent(item.thumbnail['$'].url),
      alt: ''
    },
    body: item.content
  }
}

async function setup () {
  const feeds = [
    'https://www.wired.com/feed/category/business/latest/rss',
    'https://www.wired.com/feed/category/culture/latest/rss',
    'https://www.wired.com/feed/category/gear/latest/rss',
    'https://www.wired.com/feed/category/ideas/latest/rss',
    'https://www.wired.com/feed/category/science/latest/rss',
    // 'http://feeds.feedburner.com/TechCrunch/JordanCrook',
    // 'http://feeds.feedburner.com/TechCrunch/Kim-maiCutler',
    // 'http://feeds.feedburner.com/TechCrunch/AnthonyHa',
    // 'http://feeds.feedburner.com/TechCrunch/FredericLardinois',
    // 'http://feeds.feedburner.com/TechCrunch/IngridLunden',
    // 'http://feeds.feedburner.com/TechCrunch/NatashaLomas',
    // 'http://feeds.feedburner.com/TechCrunch/SarahPerez'
  ]

  const parser = new RSSParser({
    customFields: {
      item: [
        ['media:thumbnail', 'thumbnail'],
      ]
    }
  })

  const promises = feeds.map(feed => parser.parseURL(feed).then(feed => feed.items.map(parseArticle)))
  const results = await Promise.all(promises)

  // console.log(results)

  return results.reduce((acc, articles) => ([...acc, ...articles]), [])
}

async function dbConnector (fastify, options) {
  const db = new loki('PWA')
  const articles = db.addCollection('articles', { indices: ['slug'] })

  const data = await setup()
  for (article of data) {
    articles.insert(article)
  }

  fastify.decorate('db', db)
}

module.exports = fastifyPlugin(dbConnector)
