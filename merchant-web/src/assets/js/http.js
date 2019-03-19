import axios from 'http'
import router from './router'
import {Loading}from 'element-ui'
import {Message} from 'element-ui'
import {MessageBox} from 'element-ui'
import {Notification} from 'element-ui';
// axios.defaults.timeout = 5000;
axios.defaults.headers.common['Authorization'] = 'bearer ' + sessionStorage.getItem("currentUser_token");
axios.defaults.headers.common['sRequest'] = 'sRequest' ;
 axios.defaults.baseURL = process.env.API_HOST;
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //允许携带cookie
var flaglogin = 0;
var loading        //定义loading变量
function showLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中，请稍后……'
  })
}
function closeLoading() {//使用Element loading-close 方法
  loading.close();
  loading.$el.style.visibility = "hidden" //防止close方法失败时

}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showUnionLoading() {
  if (needLoadingRequestCount === 0) {
    showLoading()

  }
  needLoadingRequestCount++
}

export function tryCloseLoading() {
  // debugger
  // needLoadingRequestCount--;
  // if (needLoadingRequestCount <= 0){
  //     closeLoading()
  //     return
  // }

  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    closeLoading();
  }
}

// request拦截器
axios.interceptors.request.use(
  config => {
    //console.log("config:",config);
    var token_ = window.localStorage.getItem('token');
    var oldRouterUrl = window.sessionStorage.getItem('r');
    var newRouterUrl = router.history.current.name;
    var thisrouterName = router.history.current.name;
    if (window.localStorage.getItem('token') || thisrouterName == 'register' || thisrouterName == 'forgetPasw' || thisrouterName == 'login') {
      config.headers.Authorization = token_;
      if (newRouterUrl !== 'login' && window.localStorage.getItem('token')) {
        router.push({
          name: oldRouterUrl
        });
      }

    } else if (thisrouterName !== 'register' && thisrouterName !== 'forgetPasw') {
      router.push({
        name: 'login'
      });
      return false
    }
    if (!window.sessionStorage.getItem('flag')) {
      showUnionLoading();
    } else {
      window.sessionStorage.removeItem('flag')
    }

    return config
  },
  error => {
    // 错误处理代码
    tryCloseLoading();
    return Promise.reject(error)
  }
)

// response拦截器
axios.interceptors.response.use(
  response => {
    tryCloseLoading();
    if (response.data.resultCode == '1000') {
      localStorage.removeItem('token');
      if (flaglogin !== 1) { // 解决登录超时 重复弹提示框bug
        // MessageBox.confirm('登录超时,请重新登录', '提示', {
        //     showConfirmButton: false,
        //     showCancelButton: false,
        //     type: 'warning'
        // }).then(() => {
        //    // router.push('/login');
        //     router.replace({
        //         name:"login",
        //         query: {
        //             redirect:router.currentRoute.fullPath
        //         }
        //     })
        // }).catch(() => {
        //   //  router.push('/login');
        //     router.replace({
        //         name:"login",
        //         query: {
        //             redirect:router.currentRoute.fullPath
        //         }
        //     })
        // });
        var isFirstLoad = window.sessionStorage.getItem('user');
        if(!isFirstLoad){
          router.replace({
            name: "login"
          });
        }else {
          Notification({
            title: '提示',
            message: "登录超时,请重新登录",
            type: 'warning',
            showClose: false,
            duration: 2500
          })
          setTimeout(()=> {
            router.replace({
              name: "login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 2500);

        }

        flaglogin = 1;
      }
      return false;

    } else if (response.data.resultCode == '1000002') {
      MessageBox.confirm('对不起,您无此权限', '提示', {
        showConfirmButton: true,
        type: 'warning'
      }).then(() => {
        router.push('/MerchantCenter/accountInfo');
      }).catch(() => {
        router.push('/MerchantCenter/accountInfo');
      });

      return false

    } else if (response.data.resultCode == '0000') {
      flaglogin = 0;
    }
    tryCloseLoading();
    return response
  },
  error => {
    tryCloseLoading();
    return Promise.reject(error)
  }

)

export default axios
