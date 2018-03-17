const fs = require('fs')
const path = require('path')
const tinyify = require('tinyify')
const watchify = require('watchify')
const sheetify = require('sheetify')
const exorcist = require('exorcist')
const browserify = require('browserify')
const splitRequire = require('split-require')

const bl = require('bl')
const through = require('through2')
const from2 = require('from2-string')
const staticModule = require('static-module')

const PUBLIC_DIR = 'public'
const ASSETS_DIR = 'assets'

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
b.plugin(splitRequire, {
  out: path.resolve(__dirname, PUBLIC_DIR, ASSETS_DIR),
  public: '/assets/',
  filename: entry => path.parse(entry.file).base,
})
b.on('split.pipeline', function (pipeline, entry, basename) {
  // Source maps
  pipeline.get('wrap').push(exorcist(path.resolve(__dirname, PUBLIC_DIR, ASSETS_DIR, `${basename}.map`)))
  // CSS
  const outFile = path.resolve(__dirname, PUBLIC_DIR, ASSETS_DIR, basename.replace('.js', '.css'))
  cssExtract(pipeline.get('pack'), outFile)
})

b.on('bundle', function (bundle) {
  const outFile = path.resolve(__dirname, PUBLIC_DIR, ASSETS_DIR, 'index.css')
  cssExtract(b.pipeline.get('pack'), outFile)
})

// bundling

b.on('update', bundle)

bundle()

function bundle() {
  b.bundle()
    .pipe(exorcist(path.resolve(__dirname, PUBLIC_DIR, ASSETS_DIR, 'index.js.map')))
    .pipe(fs.createWriteStream(path.resolve(__dirname, PUBLIC_DIR, ASSETS_DIR, 'index.js')));
}

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
