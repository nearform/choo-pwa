const getDataFactory = require('../data')

const getJobsData = getDataFactory('jobs')

const jobs = app => async (state, emit) => {
  const page = Number(state.params.page || 1)
  const [ bundle, data ] = await Promise.all([
    app.bundles.load('./components/stories'),
    app.data.load('jobs', getJobsData, page)
  ])
  return bundle(data, 'Jobs', `/jobs/page/${page + 1}`)
}

module.exports = jobs
