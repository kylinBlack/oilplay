/**
 * Created by copxie on 2018/8/23.
 */
import Vue from 'vue'
import router from '../../router/findPaswRouter'
import findPasw from './findPasw.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import http from '../../axios'
import md5 from 'js-md5';

Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;  //阻止vue启动时 生成生产提示
Vue.prototype.$axios =  axios;
Vue.use(ElementUI)

new Vue({
  el: '#findPasw',
  router,
  render: (h) => h(findPasw)
})
