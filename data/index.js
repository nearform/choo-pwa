const fetch = require('node-fetch')

const getData = filter => async page => {
  const response = await fetch(`https://choo-pwa.xyz/api/stories?filter=${filter}&page=${page}`)
  return response.json()
}

module.exports = getData
