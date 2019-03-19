import Vue from 'vue'
import Router from 'vue-router'
// import register from '@/components/register'
import registerSetPhone from '@/components/register/registerSetPhone'
import registerSetPasw from '@/components/register/registerSetPasw'
import registerFail from '@/components/register/registerFail'
import registerSuc from '@/components/register/registerSuc'

Vue.use(Router)


export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/index.html',
      redirect: {
        name: 'index'
      }
    },
  
    {
      path:'/registerSetPhone',
      name:'registerSetPhone',
      component:registerSetPhone
    },
    {
      path:'/registerSetPasw',
      name:'registerSetPasw',
      component:registerSetPasw
    },
    {
      path:'/registerFail',
      name:'registerFail',
      component:registerFail
    },
    {
      path:'/registerSuc',
      name:'registerSuc',
      component:registerSuc
    },
   
  ]
})
