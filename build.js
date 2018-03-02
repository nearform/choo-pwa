const fs = require('fs')
const path = require('path')
const watchify = require('watchify')
const sheetify = require('sheetify')
const browserify = require('browserify')
const splitRequire = require('split-require')

const bl = require('bl')
const through = require('through2')
const from2 = require('from2-string')
const staticModule = require('static-module')

const b = browserify({
  entries: './index.js',
  cache: {},
  packageCache: {}
})

b.plugin(watchify)
b.transform(sheetify)
b.plugin(splitRequire, {
  out: 'dist',
  public: '/assets/',
  filename: entry => path.parse(entry.file).base
})
b.on('split.pipeline', function (pipeline, entry, basename) {
  const outFile = __dirname + '/dist/' + basename.replace('.js', '.css')
  console.log('split', outFile)
  cssExtract(pipeline.get('pack'), outFile)
})

b.on('bundle', function (bundle) {
  const outFile = __dirname + '/dist/index.css'
  console.log('bundle', outFile)
  cssExtract(b.pipeline.get('pack'), outFile)
})

// bundling

b.on('update', bundle)

bundle()

function bundle() {
  b.bundle().pipe(fs.createWriteStream('./dist/index.js'));
}

// --

// const serves = require('serves')

// serves({
//   cwd: process.cwd(),
//   root: 'dist',
//   entry: 'index.js',
//   title: 'My Site'
// }, function (err, ev) {
//   if (err) throw err
//   console.log('Listening on', ev.url)
// })

// const watchifyServer = require('watchify-server')

// watchifyServer(b, {
//   entry: './dist/index.js',
//   dir: __dirname + '/dist',
//   cwd: __dirname + '/dist',
//   root: 'dist',
//   port: 8000
// }, (err, event) => {
//   console.log('Server running on 8000')
// })

require('./server')

// 

function cssExtract (handle, outFile) {
  const extractStream = through.obj(write, flush)
  const writeStream = (typeof outFile === 'function')
    ? outFile()
    : bl(writeComplete)

  // run before the "label" step in browserify pipeline
  handle.unshift(extractStream)

  function write (chunk, enc, cb) {
    // Performance boost: don't do ast parsing unless we know it's needed
    if (!/[insert\-css|sheetify\/insert]/.test(chunk.source)) {
      return cb(null, chunk)
    }

    var source = from2(chunk.source)
    var sm = staticModule({
      'insert-css': function (src) {
        writeStream.write(String(src) + '\n')
        return from2('null')
      },
      'sheetify/insert': function (src) {
        writeStream.write(String(src) + '\n')
        return from2('null')
      }
    })

    source.pipe(sm).pipe(bl(complete))

    function complete (err, source) {
      if (err) return extractStream.emit('error', err)
      chunk.source = String(source)
      cb(null, chunk)
    }
  }

  // close stream and signal end
  function flush (cb) {
    writeStream.end()
    cb()
  }

  function writeComplete (err, buffer) {
    if (err) return extractStream.emit('error', err)
    fs.writeFileSync(outFile, buffer)
  }
}


// budo('./index.js', {
//   live: true,
//   cors: true,
//   port: 8000,
//   pushstate: true,
//   base: '/',
//   browserify: {
//     transform: [
//       sheetify
//     ],
//     plugin: [
//       [splitRequire, { public: '/' }],
//       [cssExtract, { out: 'bundle.css' }]
//     ]
//   }
// })
// .on('split.pipeline', function (pipeline, entry, basename) { console.log(arguments) })
// .on('connect', function (ev) {
//   console.log('Server running on %s', ev.uri)
//   console.log('LiveReload running on port %s', ev.livePort)
//   require('./server')
// }).on('update', function (buffer) {
//   console.log('bundle - %d bytes', buffer.length)
// })
