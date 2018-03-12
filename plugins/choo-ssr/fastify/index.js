
async function routes (fastify, options) {
  // init plugins
  const plugins = (options.plugins || []).map(plugin => plugin(options))

  fastify.get('*', async (request, reply) => {
    const state = {}
    const location = request.raw.url
    
    try {
      // plugin pre-render phase
      plugins.forEach(plugin => plugin.pre(state))
      // render
      const app = options.app()
      const html = await app.toString(location, state)
      reply.type('text/html; charset=utf-8')
      // plugin post-render phase
      plugins.forEach(plugin => plugin.post(html, state, reply))
      // send html
      reply.res.stream.end(html)
    } catch (e) {
      console.log(e)
    }
  })
}

module.exports = routes
