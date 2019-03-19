import Vue from 'vue'
import Router from 'vue-router'
import writeLoginNo from '@/components/findPasw/writeLoginNo'
import verifPhone from '@/components/findPasw/verifPhone'
import setNewPasw from '@/components/findPasw/setNewPasw'
import findPaswResult from '@/components/findPasw/findPaswResult'

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
      path: '/writeLoginNo',
      name: 'writeLoginNo',
      component: writeLoginNo
    },
    {
      path: '/verifPhone',
      name: 'verifPhone',
      component: verifPhone
    },
    {
      path: '/setNewPasw',
      name: 'setNewPasw',
      component: setNewPasw
    },
    {
      path: '/findPaswResult',
      name: 'findPaswResult',
      component: findPaswResult
    }
  ]
})
