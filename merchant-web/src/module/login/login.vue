<template>
  <section class="login">
    <!-- 头部 -->
    <copHeader ref="cop_header"></copHeader>
    <!--  内容 -->
    <div class="login-main" :style="{height:screenHeight+'px'}">
      <div class="loginContent">
        <div class="loginBox">
          <div class="contents">
            <p class="loginImg"><img src="../../assets/img/loginImg.png" alt=""></p>
            <!--<p class="loginTitle">欢迎登录智企银通</p>-->
            <p class="registerError" v-show="isShowErrorMesg"><i class="el-icon-error"></i>{{errorMesg}}</p>
            <el-form :model="loginForm" ref="loginForm"
                     class="loginForm" :rules="loginFormRules">
              <el-form-item prop="phone">
                <el-input v-model="loginForm.phone" placeholder="登录手机号" :maxlength="11" onkeypress="return event.keyCode!=32"></el-input>
              </el-form-item>
              <el-form-item prop="loginPasw">
                <el-input v-model="loginForm.loginPasw" type="password" placeholder="登录密码" onkeypress="return event.keyCode!=32"></el-input>
              </el-form-item>
              <el-col :span="15">
                <el-form-item prop="verifCode" class="verifCode">
                  <el-input v-model="loginForm.verifCode" type="text"
                            placeholder="请输入验证码" @keyup.enter.native="login"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" class="codeBox">
                <el-form-item>
                  <div class="verifBox">
                    <img :src="loginForm.codeImgurl" alt="图片验证码"  title="看不清，换一张" @click.stop="getImgcode">
                  </div>
                </el-form-item>
              </el-col>
              <p class="findpasw" @click="findPasword">忘记密码</p>

              <el-col :span="24" class="loginBtn">
                <el-button type="primary" @click.stop="login" :disabled="isSubmit">
                  {{loginText}}
                </el-button>
              </el-col>

            </el-form>
          </div>
          <div class="clearFloat"></div>
          <div class="footers">
            <p>
              <span class="rtext">没有账号,</span>
              <span class="rlink" @click="goRegister">立即注册</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <copFooter></copFooter>

  </section>
</template>

<script>
import copHeader from '../../components/lib/header.vue'
import copFooter from '../../components/lib/footerCom.vue'
var qs = require('querystring')
export default {
  name: 'login',
  data () {
    var re = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(\da-z)]|[\(\)])+$)([^(\da-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9])/
    return {
      screenHeight: (document.body.clientHeight - 168),
      timer: false,
      loginText: '登录',
      isSubmit: false,
      isShowErrorMesg: false,
      errorMesg: '登录失败,请重新登录',
      loginForm: {
        phone: '',
        loginPasw: '',
        verifCode: '',
        codeImgurl: this.$imgCodeUrl + '/templates/imageCode/getCode?'
      },
      loginFormRules: {
        phone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {pattern: /^[0-9]/, message: '请输入数字', trigger: 'blur'},
          {pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '请输入正确的手机号码', trigger: 'blur'}
        ],
        loginPasw: [
          {required: true, message: '请输入登陆密码', trigger: 'blur'},
          {min: 6, max: 20, message: '请输入6-20位的登陆密码', trigger: 'blur'},
          {pattern: re, message: '密码至少包含大、小写字母、数字、符号中的两种组合', trigger: 'blur'}

        ],

        verifCode: [
          {required: true, message: '请输入图形验证码', trigger: 'blur'}

        ]

      }
    }
  },
  methods: {

    login () {
      var that = this
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          that.loginText = '登录...'
          var params = {
            imgCode: that.loginForm.verifCode,
            loginPwd: that.$md5(that.loginForm.loginPasw),
            msgCode: '',
            templateType: '',
            userName: that.loginForm.phone
          }
          that.isSubmit = true
          that.$axios({
            url: '/merchant/auth/login',
            method: 'post',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: params
          }).then(function (result) {
            var res = result.data
            if (res.code && res.code == '0000') {
              window.localStorage.setItem('p', res.data.userName)
              that.isShowErrorMesg = false
              that.loginText = '登录✓'
              location.assign('main.html')
              var userinfo = res.data
              var isfirstIn = res.data.auditStatus
              userinfo = JSON.stringify(userinfo)
              window.localStorage.setItem('userinfo', userinfo)
              window.localStorage.setItem('isfirstIn', isfirstIn)
            } else if (res.code) {
              that.isShowErrorMesg = true
              that.errorMesg = res.message
              that.loginText = '登录'
              that.getImgcode()
            } else {
              that.isShowErrorMesg = true
              that.errorMesg = '系统异常'
              that.loginText = '登录'
              that.getImgcode()
            }
          }).catch(function (error) {
            console.log('loginError:', error)
          })
          setTimeout(function () {
            that.isSubmit = false
          }, 800)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    vImgCode () {
      var that = this// /combine/templates/imageCode/checkCode
      var params = {
        code: that.loginForm.verifCode
      }

      that.$axios({
        url: '/combine/templates/imageCode/checkCode',
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(params)
      }).then(function (result) {

      }).catch(function (error) {
        console.log('error:', error)
      })
    },

    getImgcode () {
      var that = this
      that.loginForm.codeImgurl = that.$imgCodeUrl + '/templates/imageCode/getCode?' + Math.random()
    },

    findPasword () {
      location.assign('findPasw.html')
    },
    goRegister () {
      location.assign('register.html')
    }

  },
  components: {
    copHeader,
    copFooter
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight - 168
        that.screenHeight = window.screenHeight
      })()
    }
  },
  watch: {
    screenHeight (val) {
      let that = this
      if (!that.timer) {
        that.screenHeight = val
        that.timer = true
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  created () {
    var that = this
    setTimeout(function () {
      that.$refs.cop_header.changetiltes('登录')
    }, 300)
    var p = window.localStorage.getItem('p')
    this.loginForm.phone = p
  }
}
</script>
<style>
html,
body,
section {
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

body,
div,
p,
ul,
li {
  margin: 0;
  padding: 0;
}

.login {
  background: #f7f7f7;
}

.login-main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /*min-height: 80%;*/
}

.loginContent {
  width: auto;
  height: auto;
  /*border: 1px solid black;*/
}

.loginForm .el-form-item {
  margin-bottom: 20px !important;
}

/******  登录框  ******/

.loginBox {
  position: relative;
  min-width: 380px;
  min-height: 406px;
  width: 26%;
  height: 52%;
  box-shadow: 0 0 10px #dadada;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: -10vh;
}

.contents {
  position: relative;
  width: 100%;
  height: 419px;
  background: white;
  box-sizing: border-box;
  padding: 40px;
}

.loginBox h3 {
  text-align: left;
  padding-left: 12px;
}

.verifBox {
  text-align: center;
  border: 1px solid #f3f3f3;
  height: 40px;
}

.verifBox img {
  position: relative;
  width: 100%;
  height: 100%;
}

.lastRight li {
  float: left;
  font-size: 13px;
  font-weight: bold;
  opacity: 0.8;
  cursor: pointer;
}

.lastRight li:hover {
  opacity: 0.5;
}

.loginBtn {
  margin-top: 32px;
  position: relative;
  width: 100%;
  text-align: center;
}

.loginBtn button {
  position: relative;
  width: 100%;
}

.loginTitle {
  font-size: 30px;
  letter-spacing: 1px;
  font-weight: bold;
}

.loginForm {
  margin-top: 33px;
  display: inline-block;
  position: relative;
}

.footers {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #f7f7f7;
}

.footers p {
  text-align: center;
}

.rtext {
  color: #868686;
}

.rlink {
  color: #1d77bf;
  cursor: pointer;
}

.clearFloat {
  clear: both;
}

.codeBox {
  padding-left: 10px;
}

.findpasw {
  color: #aaaaaa;
  font-size: 15px;
  position: absolute;
  top: 175px;
  cursor: pointer;
}

.findpasw:hover {
  color: #409eff;
}
.registerError {
  position: absolute;
  width: 100%;
  color: red;
  font-size: 12px;
  height: 20px;
  top: 132px;
}

.registerError i {
  margin-right: 5px;
}

.loginImg img {
  position: relative;
  width: 100%;
}

/* 消息提示框 */

.el-message {
  min-width: 150px !important;
  top: 50% !important;
  margin-top: -24px !important;
}
</style>
