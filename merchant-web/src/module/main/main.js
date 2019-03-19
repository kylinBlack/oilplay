/**
 * Created by copxie on 2018/8/27.
 */

import Vue from 'vue'
import Main from './main.vue'
import ElementUI from 'element-ui'
import router from '../../router/mainRouter'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import http from '../../axios'
import echarts from 'echarts'
import md5 from 'js-md5'
import formatFn from '../../assets/js/utils'
import '../../assets/css/base.css'

import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'

// mounts 可以设置['cookie', 'browse', 'locat']
Vue.use(VXEUtils, XEUtils)
// Vue.prototype.$echarts = echarts

axios.defaults.withCredentials = true
Vue.config.productionTip = false // 阻止vue启动时 生成生产提示
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$formatFn = formatFn

Vue.use(ElementUI)

new Vue({
  el: '#cop_main',
  router,
  render: h => h(Main)
})

let routerList = ['payment', 'auth']
router.beforeEach((to, from, next) => {
  if (
    routerList.length &&
    routerList.indexOf(to.name) === routerList.length - 1
  ) {
    // 后退
    routerList.splice(routerList.length - 1, 1)
    to.meta.isBack = true
  } else {
    // 前进
    routerList.push(from.name || '/')
    to.meta.isBack = false
  }
  next()
})
