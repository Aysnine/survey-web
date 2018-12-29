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
  },
  {
    path: /updateSurveyEnable.*/,
    method: 'post',
    handle({ db, body }) {
      let { survey_id, survey_enable } = body
      return {
        code: 0,
        msg: '设置成功',
        data: db
          .get('survey')
          .find({ survey_id })
          .assign({ survey_enable })
          .write().survey_id
      }
    }
  },
  {
    path: /updateSurveyTitle.*/,
    method: 'post',
    handle({ db, body }) {
      let { survey_id, survey_title } = body
      return {
        code: 0,
        msg: '设置成功',
        data: db
          .get('survey')
          .find({ survey_id })
          .assign({ survey_title })
          .write().survey_id
      }
    }
  },
  {
    path: /deleteSurvey.*/,
    method: 'post',
    handle({ db, body }) {
      let list = body
      db.get('survey')
        .remove(({ survey_id }) => list.indexOf(survey_id) > -1)
        .write()
      return {
        code: 0,
        msg: '删除成功'
      }
    }
  }
]
