import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Index from "./views/Index.vue";
import About from "./views/About.vue";

import Paystage from "./views/product/paystage.vue";
import Iebt from "./views/product/iebt.vue";
import Thumb from "./views/product/thumb.vue";

import servepay from "./views/serve/servepay.vue";
import account from "./views/serve/account.vue";
import auth from "./views/serve/auth.vue";

import matgold from "./views/solution/matgold.vue";
import insurance from "./views/solution/insurance.vue";
import logistics from "./views/solution/logistics.vue";
import ecommerce from "./views/solution/ecommerce.vue";

import Partner from "./views/Partner.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home/index"
    },
    {
      path: "/home",
      redirect: "/home/index"
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "index",
          name: "index",
          component: Index
        },
        {
          path: "about",
          name: "about",
          component: About
        },
        {
          path: "Paystage",
          name: "Paystage",
          component: Paystage
        },
        {
          path: "Iebt",
          name: "Iebt",
          component: Iebt
        },
        {
          path: "Thumb",
          name: "Thumb",
          component: Thumb
        },
        {
          path: "servepay",
          name: "servepay",
          component: servepay
        },
        {
          path: "account",
          name: "account",
          component: account
        },
        {
          path: "auth",
          name: "auth",
          component: auth
        },
        {
          path: "matgold",
          name: "matgold",
          component: matgold
        },
        {
          path: "insurance",
          name: "insurance",
          component: insurance
        },
        {
          path: "logistics",
          name: "logistics",
          component: logistics
        },
        {
          path: "ecommerce",
          name: "ecommerce",
          component: ecommerce
        },
        {
          path: "partner",
          name: "partner",
          component: Partner
        }
      ]
    }
  ]
});
