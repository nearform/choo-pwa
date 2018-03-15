'use strict'

const equal = require('deep-equal')

function onChange(current) {
  return prev => {
    if (!equal(prev, current)) {
      return current
    }
  }
}

function onChangeWith(current, update) {
  return (prev = []) => {
    const changed = !equal(prev[0], current)
    const extra = changed ? update() : update(prev[1])
    if (changed || !equal(prev[1], extra)) {
      return [ current, extra ]
    }
  }
}

module.exports = {
  onChange: onChange,
  onChangeWith: onChangeWith
}
