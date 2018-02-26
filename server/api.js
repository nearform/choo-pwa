
const PAGE_SIZE = 5

async function routes (fastify, options) {
  const db = fastify.db
  const articles = db.getCollection('articles')

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
    try {
      const { category = 'all' } = request.params
      const { page = 0 } = request.query

      const data = articles.chain()
        .find({ category })
        .offset(page * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .data()

      return {
        data,
        category,
        page
      }
    } catch (error) {
      console.log(error)
      return new Error('Something went wrong')
    }
  })

  fastify.get('/api/article/:slug', async (request, reply) => {
    try {
      const { slug } = request.params
      return articles.findOne({ slug })
    } catch (error) {
      console.log(error)
      return new Error('Something went wrong')
    }
  })
}

module.exports = routes
