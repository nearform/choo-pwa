const fs = require('fs')
const http2 = require('http2')

const client = http2.connect('https://localhost:3000', {
  rejectUnauthorized: false
})

client.on('stream', (pushedStream, requestHeaders) => {
  console.log('requestHeaders', requestHeaders)
  pushedStream.on('push', (responseHeaders) => {
    console.log('pushed', responseHeaders)
  })

  var log = false
  pushedStream.on('data', (chunk) => {})
})

const req = client.request({ ':path': '/' })

req.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  }
})
