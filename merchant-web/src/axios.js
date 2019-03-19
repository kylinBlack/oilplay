import Vue from 'vue'
import axios from 'axios'
// import {Loading}from 'element-ui'
import {
  Message
} from 'element-ui'
import {
  MessageBox
} from 'element-ui'

// 商户信息图片
// http://192.168.4.135:9030/combine/download/merchantImage/
// 其它图片，如用户图像、银行logo等
// http://192.168.4.135:9030/combine/download/image/
window.Promise = Promise // 解决IE报Promise未定义

axios.defaults.baseURL = process.env.API_HOST
Vue.prototype.$imgCodeUrl = process.env.API_HOST + '/combine'
Vue.prototype.$filesUrl = process.env.API_HOST

axios.defaults.crossDomain = true
axios.defaults.withCredentials = true // 允许携带cookie

var k = 0
var flag = 0

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    var res = response.data
    if (res.code && res.code == '500') {
      if (k == 0) {
        Message({
          message: '系统异常',
          type: 'error'
        })
      }
      k++
      return false
    } else if (res.code == '2000' || res.code == '2100') {
      if (flag == 0) {
        MessageBox.confirm('登录超时,请重新登录', '提示', {
          showConfirmButton: true,
          showCancelButton: false,
          showClose: false,
          type: 'warning'
        }).then(() => {
          location.assign('/login.html')
          k = 0
        })
      } else {
        return false
      }
      flag = 1
    } else if (res.code == '0000') {
      flag = 0
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios
