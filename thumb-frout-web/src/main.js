import Vue from "vue";

// import FastClick from "fastclick"; //解决移动端点击事件延迟300秒的问题
import "normalize.css"; //标准化浏览器元素差异

import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/resize"; //响应设置根元素fontsize
import "./assets/index.scss";

Vue.use(VueAxios, axios);

// 允许请求头携带cookie
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

// if ("addEventListener" in document && "ontouchstart" in window) {
//   FastClick.prototype.focus = function(targetElement) {
//     targetElement.focus();
//   };
//   document.addEventListener(
//     "DOMContentLoaded",
//     function() {
//       FastClick.attach(document.body);
//     },
//     false
//   );
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
