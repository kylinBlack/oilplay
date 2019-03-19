/**
 * Created by copxie on 2018/8/23.
 */
import Vue from 'vue'
import Login from './login.vue'
import ElementUI from 'element-ui'
import router from '../../router/loginRouter'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import md5 from 'js-md5';
import http from '../../axios'

Vue.config.productionTip = false;  //阻止vue启动时 生成生产提示
Vue.prototype.$axios =  axios;
Vue.prototype.$md5 = md5;
Vue.use(ElementUI)

new Vue({
  el: '#login',
  router,
  render: (h) => h(Login)
})
