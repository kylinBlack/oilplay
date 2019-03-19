/**
 * 公共工具类
 */

export default {

  /**
   * 格式化金额
   * @param num 金额
   * @param scale 默认2位小数
   * @returns {string}
   */
  formatMoney: function (num, scale) {
    num = num.toString().replace(/\$|\,/g, '')
    if (isNaN(num)) {
      num = '0'
    }
    if (isNaN(scale)) {
      scale = 2
    }
    // 获取符号(正/负数)
    var sign = (num == (num = Math.abs(num)))
    num = Math.floor(num * Math.pow(10, scale) + 0.50000000001) // 把指定的小数位先转换成整数.多余的小数位四舍五入
    var scales = num % Math.pow(10, scale) // 求出小数位数值
    num = Math.floor(num / Math.pow(10, scale)).toString() // 求出整数位数值
    scales = scales.toString() // 把小数位转换成字符串,以便求小数位长度
    // 补足小数位到指定的位数
    while (scales.length < scale) {
      scales = '0' + scales
    }
    // 对整数部分进行千分位格式化.
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
    }
    if (scale > 0) {
      return (((sign) ? '' : '-') + num + '.' + scales)
    } else {
      return (((sign) ? '' : '-') + num)
    }
  },

  /**
   * 判断手机号
   * @param num
   * @returns {boolean}
   */
  isMobileNumber: function (num) {
    return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(num)
  },

  /**
   * 去空格
   * @param str
   * @returns {string | * | void}
   */
  trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },

  /**
   *  权限判断
   * @param str
   * @returns {boolean}
   *
   */
  isPermission (str) {
    let userinfo = window.localStorage.getItem('userinfo')
    if (userinfo) {
      userinfo = JSON.parse(userinfo)
      if (userinfo.list) {
        return userinfo.list.indexOf(str) > -1
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
