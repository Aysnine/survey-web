export default [
  {
    path: /fetchSurveyList.*/,
    method: 'get',
    handle({ db }) {
      return {
        code: 0,
        msg: '获取成功',
        data: db
          .get('survey')
          .sortBy('survey_create_datetime')
          .reverse()
          .cloneDeep()
          .value()
      }
    }
  },
  {
    path: /createSurvey.*/,
    method: 'post',
    handle({ db, body, uid, date }) {
      let { survey_title, survey_enable, survey_doc } = body
      return {
        code: 0,
        msg: '添加成功',
        data: db
          .get('survey')
          .push({
            survey_id: uid(),
            survey_title,
            survey_enable,
            survey_doc,
            survey_create_datetime: date().format('YYYY-MM-DD HH:mm:ss')
          })
          .write().survey_id
      }
    }
  }
]
