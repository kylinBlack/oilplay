/**
 * Created by copxie on 2018/8/23.
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '../../router/registerRouter' //路由
import register from './register.vue'
import axios from 'axios'
import md5 from 'js-md5';
import http from '../../axios'

Vue.config.productionTip = false;  //阻止vue启动时 生成生产提示
Vue.prototype.$axios =  axios;
Vue.use(ElementUI);
Vue.prototype.$md5 = md5;

new Vue({
  el: '#register',
  router,
  render: (h) => h(register)
})
