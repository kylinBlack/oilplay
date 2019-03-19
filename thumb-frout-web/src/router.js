import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import ThumbLoan from "./views/ThumbLoan.vue";
import ServerDes from "./views/ServerDes.vue";

import test from "./components/swiper.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/test",
      name: "test",
      component: test
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/thumbLoan",
      name: "ThumbLoan",
      component: ThumbLoan
    },
    {
      path: "/serverDes",
      name: "ServerDes",
      component: ServerDes
    }
  ]
});
