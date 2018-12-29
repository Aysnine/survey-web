/* eslint-disable */

import qs from 'qs'

/*
  在 console 中打印 xhr 请求信息，目前仅用
  于 axios，需要自己在拦截器中调用该 log
*/

/** Usage:

import axios from 'axios'
import log from './sao-log.js'

// interceptor of response
service.interceptors.response.use(
  res => {
    saoLog(res.request, res)          // ! here
    return res
  },
  err => {
    saoLog(err.request, err.response) // ! and here
    return err
  }
)

export default service
*/

function render(method, status, url, other) {
  if (status == 200) {
    return [
      `🚜%c ${method} %c ${status} %c ${url} %c ${other}`,
      'background:#35495e ; padding: 1px 0; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#009688 ; padding: 1px 0; color: #fff',
      'background: transparent; border: 1px solid #009688 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #009688',
      'background:transparent; color: #90939975'
    ]
  } else {
    return [
      `🚒%c ${method} %c ${status} %c ${url} %c ${other}`,
      'background:#35495e ; padding: 1px 0; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#E91E63 ; padding: 1px 0; color: #fff',
      'background: transparent; border: 1px solid #E91E63 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #E91E63',
      'background:transparent; color: #90939975'
    ]
  }
}

export default function(req, res) {
  if (process.env.VUE_APP_SAOLOG !== 'off') return;
  console.groupCollapsed(
    ...render(
      res.config.method.toUpperCase(),
      res.status,
      res.config.url,
      req.constructor.name
    )
  )
  if (res.config) {
    // * just axios maybe
    console.group('🍍 Request')
    console.log('📜 Headers', res.config.headers)
    console.log('📜 Params', qs.parse(res.config.params))
    if (res.config.data)
      console.log(
        '📜 Body',
        typeof res.config.data === 'string'
          ? JSON.parse(res.config.data)
          : qs.parse(res.config.data)
      )
    console.groupEnd()
  }
  console.group('🍓 Response')
  console.log(
    res.status == 200 ? res.data || res.msg : res.msg || res.statusText || res
  )
  console.groupEnd()
  console.groupEnd()
}
