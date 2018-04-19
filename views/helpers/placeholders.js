const line = (min, max) => '▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂'.substr(0, Math.floor(Math.random() * max) + min)

const placeholders = Array.apply(null, Array(30)).map(() => ({
  title: line(10, 19),
  content: line(10, 19),
  by: {
    id: line(7, 10)
  }
}))

module.exports = placeholders
