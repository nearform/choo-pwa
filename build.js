const fs = require('fs')
const path = require('path')
const tinyify = require('tinyify')
const watchify = require('watchify')
const sheetify = require('sheetify')
const exorcist = require('exorcist')
const browserify = require('browserify')

const bl = require('bl')
const through = require('through2')
const from2 = require('from2-string')
const staticModule = require('static-module')

const PUBLIC_DIR = 'public'
const ASSETS_DIR = 'assets'

// var PUBLIC_DIR = path.resolve(__dirname, '/public')
// var ASSETS_DIR = path.resolve(PUBLIC_DIR, '/assets')

const b = browserify({
  debug: true,
  entries: './index.js',
  cache: {},
  packageCache: {}
})

if (process.argv.includes('watch')) {
  console.log('Watching files')
  b.plugin(watchify)
}

if (process.env.NODE_ENV === 'production') {
  b.plugin(tinyify)
}
b.transform(sheetify)

var assetDir = path.resolve(__dirname, PUBLIC_DIR, ASSETS_DIR)

b.plugin(require('choo-bundles/browserify'), {
  output: path.resolve(__dirname, PUBLIC_DIR, ASSETS_DIR),
  manifest: path.resolve(__dirname, PUBLIC_DIR, 'manifest.json'),
  prefix: '/assets/',
  filename: entry => path.parse(entry.file).base
})

b.on('choo-bundles.pipeline', function (pipeline, entry, basename, manifest) {
  manifest.add('css', '/assets/' + basename.replace('.js', '.css'))
  pipeline.get('pack').unshift(exorcssist(path.resolve(assetDir, basename.replace('.js', '.css'))))
  pipeline.get('wrap').push(exorcist(path.resolve(assetDir, `${basename}.map`)))
})

b.pipeline.get('pack').unshift(exorcssist(path.resolve(assetDir, 'common.css')))
b.pipeline.get('wrap').push(exorcist(path.resolve(assetDir, `common.js.map`)))
b.on('update', bundle)

bundle()

function bundle () {
  b.bundle().pipe(fs.createWriteStream(path.resolve(assetDir, 'common.js')))
}

function exorcssist (outFile) {
  const extractStream = through.obj(write, flush)
  const writeStream = (typeof outFile === 'function')
    ? outFile()
    : bl(writeComplete)

  // run before the "label" step in browserify pipeline
  return extractStream

  function write (chunk, enc, cb) {
    // Performance boost: don't do ast parsing unless we know it's needed
    if (!/[insert\-css|sheetify/insert]/.test(chunk.source)) {
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
