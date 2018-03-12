const callsites = require('callsites')
const resolvePath = require('resolve')

function load(filename, basedir) {
  const resolved = new Promise((resolve, reject) => resolvePath(filename, { basedir }, (err, res) => {
    if (err) {
      reject(err)
    } else {
      resolve(res)
    }
  }))
  return resolved.then(require)
}

module.exports = load
