const equal = require('deep-equal')
const isBrowser = typeof window !== 'undefined'

function data () {
  return (state, emitter, app) => {
    // State
    state.data = state.data || {}

    // Events
    emitter.on('data:store', (name, change, data, opts = {}) => {
      state.data[name] = {
        change: change,
        data: data
      }
      opts.render && emitter.emit('render')
    })

    // Enhancements
    app.data = {
      async load(name, loader, update, opts = {}) {
        const store = state.data[name] || {}
        const change = update(store.change)
        if (!change) {
          return store.data
        }
        const promise = loader(change, store.data)
        if (isBrowser && !opts.blocking) {
          // non-blocking
          promise.then(data => {
            emitter.emit('data:store', name, change, data, { render: true })
          })
        } else {
          // blocking
          const data = await promise
          emitter.emit('data:store', name, change, data)
          return data
        }
      }
    }
  }
}

module.exports = data
