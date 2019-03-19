<template>
  <div class="registerBox">
    <div class="contents">
      <p class="registerImg"><img src="../../assets/img/registerImg.png" alt=""></p>
      <!--<p class="registerTitle">欢迎注册智企银通</p>-->

      <el-form :model="registerForm" ref="registerForm" :rules="registersFormRules"
               class="registerForm">

        <p class="registerError" v-show="isShowErrorMesg"><i class="el-icon-error"></i>{{errorMesg}}</p>
        <el-form-item prop="userphone">
          <el-input v-model="registerForm.userphone" placeholder="请输入常用手机号" @input="phoneBoxChange"
                    :maxlength="11" onkeypress="return event.keyCode!=32"></el-input>
        </el-form-item>

        <el-col :span="13" v-show="isShowImgCode">
          <el-form-item  class="verifCode">
            <el-input v-model="registerForm.verifImgCode" type="text"
                      placeholder="请输入图形验证码" @input="changeTmgCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" class="codeBox" v-show="isShowImgCode">
          <el-form-item>
            <div class="verifBox">
              <img :src="registerForm.codeImgurl" alt="图片验证码" title="看不清，换一张" @click.stop="getImgcode">
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="13">
          <el-form-item prop="verifCode" class="verifCode">
            <el-input v-model="registerForm.verifCode" type="text"
                      placeholder="请输入短信验证码" @input="vChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" class="codeBox">
          <el-form-item>
            <div class="verifBox">
              <el-button type="primary" :disabled="isClickPhoneBtn" @click="getPhoneCode" :title="btnPhoneTip" >
                {{btnPhoneText}}
              </el-button>
            </div>
          </el-form-item>
        </el-col>

        <p class="imgError" v-show="isShowImgError">请输入图形验证码</p>
        <el-col :span="24" class="registerBtn">
          <el-button type="primary" @click="nextPage" :disabled="isClickNext" :class="{ableStyle:isAble}">下一步</el-button>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="type" class="agreeCheck">
            <el-checkbox label="我已阅读并同意" name="type" v-model="registerForm.type" @change="agreement"
                         class="agree"></el-checkbox>
            <span class="agreement" @click="readAgreement">《用户服务协议》</span>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="clearFloat"></div>
    <div class="footers">
      <p>
        <span class="rtext">已有账号,</span>
        <span class="rlink" @click="goLogin">立即登录</span>
      </p>
    </div>

    <!-- 服务协议 -->
    <el-dialog
      title="e通服务协议"
      :visible.sync="centerDialogVisible"
      width="50%"
      class="agreement"
      center>
      <agreement></agreement>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="iAgree">同意</el-button>
  </span>
    </el-dialog>

  </div>
</template>
<script>
import agreement from '../../components/lib/userProto.vue'
var qs = require('querystring')
export default{
  name: 'registerSetPhone',
  data () {
    return {
      btnPhoneText: '获取验证码',
      isClickPhoneBtn: true,
      btnPhoneTip: '请填写手机号码',
      timers: '',
      centerDialogVisible: false,
      isShowErrorMesg: false,
      isShowImgCode: false,
      isShowImgError: false,
      isClickNext: true,
      isAble: true,
      errorMesg: '',
      registerForm: {
        verifImgCode: '',
        userphone: '',
        verifCode: '',
        type: true,
        codeImgurl: ' '
      },
      registersFormRules: {
        userphone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {pattern: /^[0-9]/, message: '请输入数字', trigger: 'blur'},
          {pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '请输入正确的手机号码', trigger: 'blur'}
        ],
        verifCode: [
          {required: true, message: '请输入短信验证码', trigger: 'blur'},
          {pattern: /^[0-9]{6}$/, message: '短信验证码包含6位数字', trigger: 'blur'}
        ],
        verifImgCode: [
          {required: true, message: '请输入图形验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {

    getImgcode () {
      var that = this
      that.registerForm.codeImgurl = that.$imgCodeUrl + '/templates/imageCode/getCode?' + Math.random()
    },

    changeTmgCode () {
      var val = this.registerForm.verifImgCode
      if (val == '') {
        this.isShowImgError = true
        this.isClickPhoneBtn = true
      } else {
        this.isShowImgError = false
        this.isClickPhoneBtn = false
        this.isClickNextFn()
      }
    },

    nextPage () {
      var that = this
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          if (that.isShowImgCode && that.registerForm.verifImgCode == '') {
            that.isShowImgError = true
            return false
          } else {
            that.isShowImgError = false
          }
          var params = {
            mobile: that.registerForm.userphone,
            smsCode: that.registerForm.verifCode
          }
          that.isClickNext = true
          that.$axios({
            url: '/merchant/user/registerCheck',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(params)
          }).then(function (result) {
            var res = result.data
            if (res.code && res.code == '0000') {
              params.token = res.data
              params.mobile = that.registerForm.userphone
              that.$router.push({
                name: 'registerSetPasw',
                params: params
              })
            } else {
              that.isShowErrorMesg = true
              that.errorMesg = res.message
              that.isClickPhoneBtn = false
            }
          }).catch(function (error) {
            console.log('registerCheckError:', error)
          })
          setTimeout(function () {
            that.isClickNext = false
          }, 800)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    getPhoneCode () {
      var that = this
      if (that.isShowImgCode && that.registerForm.verifImgCode == '') {
        that.isShowImgError = true
        that.isClickPhoneBtn = false
        return false
      } else {
        that.isShowImgError = false
        that.isClickPhoneBtn = true
      }

      var params = {
        mobile: that.registerForm.userphone,
        imgCode: that.registerForm.verifImgCode
      }

      that.$axios({
        url: '/merchant/user/registerSendSmsCode',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(params)
      }).then(function (result) {
        var res = result.data
        if (res.code && res.code == '0000') {
          that.setTimer()
          that.isShowErrorMesg = false
          that.errorMesg = ''
        } else if (res.code && res.code == '2300') {
          that.isShowImgCode = true
          that.getImgcode()
        } else if (res.code && res.code == '1100') {
          that.errorMesg = res.message
          that.isShowErrorMesg = true
          that.clearTimer()
          if (that.isShowImgCode && res.code !== '0000') {
            that.getImgcode()
          }
        } else {
          that.isShowErrorMesg = true
          that.errorMesg = res.message
          if (that.isShowImgCode && res.code !== '0000') {
            that.getImgcode()
          }
        }
      }).catch(function (error) {
        console.log('getPhoneError:', error)
        that.isShowErrorMesg = true
        that.isClickPhoneBtn = false
        that.errorMesg = '系统异常,请稍后再试'
      })
    },

    changeVimg (val) {
      if (val) {
        this.isClickPhoneBtn = false
      }
    },

    phoneBoxChange (val) {
      var that = this
      if (val.length < 11) {
        that.btnPhoneText = '获取验证码'
        that.isClickPhoneBtn = true
        that.btnPhoneTip = '请填写手机号码'
      } else {
        that.isClickPhoneBtn = false
        that.btnPhoneTip = ''
      }
      that.isClickNextFn()
    },

    isClickNextFn () {
      var that = this
      var phone = that.registerForm.userphone
      var verifImgCode = that.registerForm.verifImgCode
      var verifCode = that.registerForm.verifCode
      if (phone && phone !== '' && phone.length == 11 && verifCode && verifCode !== '' && that.registerForm.type) {
        if (that.isShowImgCode) {
          if (verifImgCode && verifImgCode !== '') {
            that.isClickNext = false
            that.isAble = false
          } else {
            that.isClickNext = true
            that.isAble = true
          }
          return false
        }
        that.isClickNext = false
        that.isAble = false
      } else {
        that.isClickNext = true
        that.isAble = true
      }
    },

    vChange (val) {
      this.isClickNextFn()
    },

    setTimer () {
      var that = this
      var time = 60
      that.timers = setInterval(function () {
        time--
        that.btnPhoneText = time + 's'
        that.isClickPhoneBtn = true
        if (time <= 0) {
          clearInterval(that.timers)
          that.btnPhoneText = '获取验证码'
          if (that.registerForm.userphone !== '') {
            that.isClickPhoneBtn = false
          } else {
            that.isClickPhoneBtn = true
          }
        }
      }, 1000)
    },

    clearTimer () {
      var that = this
      clearInterval(that.timers)
      that.btnPhoneText = '获取验证码'
      if (that.registerForm.userphone !== '') {
        that.isClickPhoneBtn = false
      } else {
        that.isClickPhoneBtn = true
      }
    },

    readAgreement () {
      this.centerDialogVisible = true
    },

    goLogin () {
      location.assign('login.html')
    },

    agreement (val) {
      this.isClickNextFn()
    },

    iAgree () {
      this.registerForm.type = true
      this.centerDialogVisible = false
      this.isClickNextFn()
    }
  },

  components: {
    agreement
  },

  created () {
    var that = this
    var data = that.$route.params
    that.registerForm.userphone = data.mobile
    that.registerForm.verifCode = data.smsCode
    if (that.registerForm.userphone && that.registerForm.userphone !== '') {
      that.isClickPhoneBtn = false
      that.isClickNext = false
    } else {
      that.isClickPhoneBtn = true
      that.isClickNext = true
    }
  }

}
</script>
<style scoped>
.registerBox {
  position: relative;
  min-width: 355px;
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
  height: 409px;
  background: white;
  box-sizing: border-box;
  padding: 40px;
}

.registerBox h3 {
  text-align: left;
  padding-left: 12px;
}

.verifBox img {
  position: relative;
  height: 39px;
  width: auto;
  cursor: pointer;
}
.imgError {
  position: absolute;
  color: red;
  font-size: 12px;
  left: 0;
  top: 101px;
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

.registerBtn {
  /*margin-top: 22px;*/
  position: relative;
  width: 100%;
  text-align: center;
}

.registerBtn button {
  position: relative;
  width: 100%;
}

.registerTitle {
  font-size: 30px;
  letter-spacing: 1px;
  font-weight: bold;
}

.registerForm {
  margin-top: 35px;
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

.agreeCheck {
  position: relative;
  width: 100%;
}

.agreement {
  color: #409eff;
  cursor: pointer;
}

.agreement,
.agree {
  display: inline-block;
}

.registerError {
  position: absolute;
  width: 100%;
  color: red;
  font-size: 12px;
  height: 20px;
  top: -20px;
}

.registerError i {
  margin-right: 5px;
}
.registerImg img {
  position: relative;
  width: 100%;
}
.ableStyle {
  opacity: 0.8;
}
</style>
