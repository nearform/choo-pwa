// const budo = require('budo')
const browserify = require('browserify')
const sheetify = require('sheetify')
const splitRequire = require('split-require')
const cssExtract = require('css-extract')
const path = require('path')

const watchifyServer = require('watchify-server')

const staticModule = require('static-module')
const from2 = require('from2-string')
const through = require('through2')
const bl = require('bl')
const fs = require('fs')

const b = browserify('./index.js')

b.transform(sheetify)
b.plugin(splitRequire, {
  public: '/dist',
  out: 'dist',
  filename: entry => {
    console.log(entry.file)
    return path.parse(entry.file).base
  }
})

b.on('split.pipeline', function (pipeline, entry, basename) {
  const outFile = __dirname + '/dist/' + basename.replace('.js', '.css')
  console.log(outFile)
  addHooks()

  function addHooks () {
    const extractStream = through.obj(write, flush)
    const writeStream = (typeof outFile === 'function')
      ? outFile()
      : bl(writeComplete)

    // run before the "label" step in browserify pipeline
    pipeline.get('pack').unshift(extractStream)

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
})

watchifyServer(b, {
  entry: './dist/index.js',
  dir: __dirname + '/dist',
  cwd: __dirname + '/dist',
  root: 'dist',
  port: 8000
}, (err, event) => {
  console.log('Server running on 8000')
})

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
