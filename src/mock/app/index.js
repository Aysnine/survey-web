export default [
  {
    path: /fetchSurveyList.*/,
    method: 'get',
    handle({ db }) {
      return db
        .get('survey')
        .cloneDeep()
        .value()
    }
  }
]
