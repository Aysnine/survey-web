import request from '@/lib/main/el-request'

export function fetchSurveyList() {
  return request({
    method: 'get',
    url: 'fetchSurveyList'
  })
}

export function createSurvey(form) {
  return request({
    method: 'post',
    url: 'createSurvey',
    data: {
      ...form,
      survey_doc: JSON.stringify(form.survey_doc)
    }
  })
}

export function updateSurveyEnable({ survey_id, survey_enable }) {
  return request({
    method: 'post',
    url: 'updateSurveyEnable',
    data: {
      survey_id,
      survey_enable
    }
  })
}

export function updateSurveyTitle({ survey_id, survey_title }) {
  return request({
    method: 'post',
    url: 'updateSurveyTitle',
    data: {
      survey_id,
      survey_title
    }
  })
}

export function updateSurveyTips({ survey_id, survey_tips }) {
  return request({
    method: 'post',
    url: 'updateSurveyTips',
    data: {
      survey_id,
      survey_tips
    }
  })
}

export function deleteSurvey(ids) {
  return request({
    method: 'post',
    url: 'deleteSurvey',
    data: ids
  })
}
