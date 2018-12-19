import Vue from 'vue'
import App from './App.vue'
import store from './store'

if (process.env.VUE_APP_PREVIEW == 'on') {
  require('@/mock/register')
}

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.styl'

import '@/plugin'

import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'small', locale })

Vue.config.productionTip = false
Vue.prototype.$env__is_preview = process.env.VUE_APP_PREVIEW === 'on'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
