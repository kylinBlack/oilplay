import Vue from 'vue'
import Router from 'vue-router'

/*  实名认证   */
import auth from '@/components/main/auth/auth'
import authNext from '@/components/main/auth/authNext'
import authSuc from '@/components/main/auth/authSuc'
import authFail from '@/components/main/auth/authFail'

/* account 账户 */
import myAccount from '@/components/main/account/myAccount'
import baseInfo from '@/components/main/account/baseInfo'
import businessAudit from '@/components/main/account/businessAudit'
import changeBaseInfo from '@/components/main/account/changeBaseInfo'
import changeInfosuc from '@/components/main/account/changeInfosuc'
import changeInfofail from '@/components/main/account/changeInfofail'
import auditDetail from '@/components/main/account/auditDetail'

/*  产品   */
import productAsk from '@/components/main/product/productAsk'
import yishou from '@/components/main/product/yishou'
import yifu from '@/components/main/product/yifu'
import yicha from '@/components/main/product/yicha'
import myProduct from '@/components/main/product/myProduct'
import prodictsApply from '@/components/main/product/prodictsApply'
import yifuApply from '@/components/main/product/yifuApply'
import pApplyFail from '@/components/main/product/pApplyFail'
import pApplySuc from '@/components/main/product/pApplySuc'

/*  提现   */
import putForward from '@/components/main/putForward/putForward'
import putForwardNext from '@/components/main/putForward/putForwardNext'
import putForwardProgress from '@/components/main/putForward/putForwardProgress'
import putForwardFail from '@/components/main/putForward/putForwardFail'

/*  代付   */
import payment from '@/components/main/payment/payment'
import singlePayInfo from '@/components/main/payment/singlePayInfo'
import paymentProgress from '@/components/main/payment/paymentProgress'
import paymentFail from '@/components/main/payment/paymentFail'
import batchPayInfo from '@/components/main/payment/batchPayInfo'

/*  交易记录   */
import transactRcord from '@/components/main/trade/transactRcord'
import tradeRecordDetail from '@/components/main/trade/tradeRecordDetail'

/*  安全中心   */
import securityCenter from '@/components/main/securityCenter/securityCenter'
import securityProblem from '@/components/main/securityCenter/securityProblem'
import securitySet from '@/components/main/securityCenter/securitySet'
import handleSuc from '@/components/main/securityCenter/handleSuc'
import handleFail from '@/components/main/securityCenter/handleFail'

/* 人员管理 */
import userManager from '../components/main/peopleManagement/userManager.vue'
import roleManager from '../components/main/peopleManagement/roleManager.vue'

/* 自助服务 */
import helpCenter from '../components/main/selfService/helpCenter.vue'
import queryDetails from '../components/main/selfService/queryDetails.vue'
import feedback from '../components/main/selfService/feedback.vue'

import batchTradeInfo from '../components/main/trade/batchTradeInfo.vue'
import batchTradeRecord from '../components/main/trade/batchTradeRecord.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/index.html',
    redirect: {
      name: 'index'
    }
  },
  {
    path: '/',
    redirect: '/myAccount'
  },
  {
    path: '/auth',
    name: 'auth',
    component: auth,
    meta: {
      keepAlive: true, // 此组件需要被缓存
      isBack: false
    }
  },
  {
    path: '/authNext',
    name: 'authNext',
    component: authNext,
    meta: {
      keepAlive: true, // 此组件不需要被缓存
      isBack: false
    }
  },
  {
    path: '/authSuc',
    name: 'authSuc',
    component: authSuc,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/authFail',
    name: 'authFail',
    component: authFail,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/myAccount',
    name: 'myAccount',
    component: myAccount,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/baseInfo',
    name: 'baseInfo',
    component: baseInfo,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/businessAudit',
    name: 'businessAudit',
    component: businessAudit,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/auditDetail',
    name: 'auditDetail',
    component: auditDetail,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/changeBaseInfo',
    name: 'changeBaseInfo',
    component: changeBaseInfo,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/changeInfofail',
    name: 'changeInfofail',
    component: changeInfofail,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/changeInfosuc',
    name: 'changeInfosuc',
    component: changeInfosuc,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/productAsk',
    name: 'productAsk',
    component: productAsk,
    children: [{
      path: '/productAsk/yishou',
      name: 'yishou',
      component: yishou,
      meta: {
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/productAsk/yifu',
      name: 'yifu',
      component: yifu,
      meta: {
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/productAsk/yicha',
      name: 'yicha',
      component: yicha,
      meta: {
        keepAlive: false,
        isBack: false
      }
    }
    ]
  },
  {
    path: '/myProduct',
    name: 'myProduct',
    component: myProduct,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/prodictsApply',
    name: 'prodictsApply',
    component: prodictsApply,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/yifuApply',
    name: 'yifuApply',
    component: yifuApply,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/pApplyFail',
    name: 'pApplyFail',
    component: pApplyFail,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/pApplySuc',
    name: 'pApplySuc',
    component: pApplySuc,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/putForward',
    name: 'putForward',
    component: putForward,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/putForwardNext',
    name: 'putForwardNext',
    component: putForwardNext,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/putForwardProgress',
    name: 'putForwardProgress',
    component: putForwardProgress,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/putForwardFail',
    name: 'putForwardFail',
    component: putForwardFail,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: payment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/singlePayInfo',
    name: 'singlePayInfo',
    component: singlePayInfo,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/paymentProgress',
    name: 'paymentProgress',
    component: paymentProgress,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/paymentFail',
    name: 'paymentFail',
    component: paymentFail,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/batchPayInfo',
    name: 'batchPayInfo',
    component: batchPayInfo,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/transactRcord',
    name: 'transactRcord',
    component: transactRcord,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/tradeRecordDetail',
    name: 'tradeRecordDetail',
    component: tradeRecordDetail,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/batchTradeInfo',
    name: 'batchTradeInfo',
    component: batchTradeInfo,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/batchTradeRecord',
    name: 'batchTradeRecord',
    component: batchTradeRecord,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/securityCenter',
    redirect: '/securityCenter/securitySet'
  },
  {
    path: '/securityCenter',
    name: 'securityCenter',
    component: securityCenter,
    children: [{
      path: '/securityCenter/securityProblem',
      name: 'securityProblem',
      component: securityProblem,
      meta: {
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/securityCenter/securitySet',
      name: 'securitySet',
      component: securitySet,
      meta: {
        keepAlive: false,
        isBack: false
      }
    }
    ]
  },
  {
    path: '/handleSuc',
    name: 'handleSuc',
    component: handleSuc,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/handleFail',
    name: 'handleFail',
    component: handleFail,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/userManager',
    name: 'userManager',
    component: userManager,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/roleManager',
    name: 'roleManager',
    component: roleManager,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/helpCenter',
    name: 'helpCenter',
    component: helpCenter,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/queryDetails',
    name: 'queryDetails',
    component: queryDetails,
    meta: {
      keepAlive: false,
      isBack: false
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: feedback,
    meta: {
      keepAlive: false,
      isBack: false
    }
  }
  ]
})
