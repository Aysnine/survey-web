import request from '@/lib/main/el-request'

export function fetchSurveyList() {
  return request({
    method: 'get',
    url: 'fetchSurveyList'
  })
}
