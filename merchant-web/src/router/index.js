import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../components/index/homePage'
import aboutUs from '../components/index/aboutUs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/homePage',
      name:'homePage',
      component:homePage
    },
    {
      path:'/aboutUs',
      name:'aboutUs',
      component:aboutUs
    }
  ]
})
