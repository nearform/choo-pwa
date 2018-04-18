const qs = require('qs')
const fetch = require('node-fetch')

const getData = filter => async page => {
  const params = qs.stringify({ filter, page })
  const response = await fetch(`https://choo-pwa.xyz/api/stories?${params}`)
  return response.json()
}

module.exports = getData
