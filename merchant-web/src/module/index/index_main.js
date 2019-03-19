/**
 * Created by copxie on 2018/8/23.
 */
import Vue from 'vue'
import router from '../../router/index'
import ElementUI from 'element-ui'
import index from './index.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;  //阻止vue启动时 生成生产提示
Vue.use(ElementUI);
 


new Vue({
  el: '#index',
  router,
  render: (h) => h(index)
})
