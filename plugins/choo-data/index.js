const equal = require('deep-equal')
const isBrowser = typeof window !== 'undefined'

function data () {
  return (state, emitter, app) => {
    // State
    state.data = state.data || {}

    // Events
    emitter.on('data:store', (name, params, data, opts = {}) => {
      state.data[name] = {
        params: params,
        data: data
      }
      opts.render && emitter.emit('render')
    })

    // Enhancements
    app.data = {
      loadData: async (name, loader, params, opts = {}) => {
        if (state.data[name] && equal(state.data[name].params, params)) {
          return state.data[name].data
        }
        if (isBrowser && !opts.blocking) {
          // non-blocking
          loader(params).then(data => {
            emitter.emit('data:store', name, params, data, { render: true })
          })
        } else {
          // blocking
          const data = await loader(params)
          emitter.emit('data:store', name, params, data)
          return data
        }
      }
    }
  }
}

module.exports = data
