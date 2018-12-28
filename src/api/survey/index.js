import request from '@/lib/main/el-request'

export function fetchSurveyList() {
  return request({
    method: 'get',
    url: 'fetchSurveyList'
  })
}

export function createSurvey({ survey_title, survey_doc, survey_enable }) {
  return request({
    method: 'post',
    url: 'createSurvey',
    data: {
      survey_title,
      survey_enable,
      survey_doc: JSON.stringify(survey_doc)
    }
  })
}
