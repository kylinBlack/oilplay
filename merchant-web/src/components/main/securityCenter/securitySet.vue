<template>
<div class="securitySet">
  <div class="securitySetCont">
    <ul class="sList">
      <li>
        <el-row >
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="wordStyle paddingH">绑定手机</el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <p class="secondText paddingH">您已绑定手机号码:{{sInfo.mobile}}</p>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="wordStyle sBtn">
              <el-button v-if="isMobile" type="text"  :title="btnTitle" @click="resetInfo('newPhone','IEBT_UPDATE_MOBILE','/userSecurity/sendSmsCode','1')">更换</el-button>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row >
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="wordStyle paddingH">绑定邮箱</el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <p class="secondText paddingH">
              <span v-show="isShowEmail">您已绑定邮箱地址:{{sInfo.email}}</span>
              <span v-if="!isShowEmail">邮箱地址可以用于接收重要通知</span>
            </p>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="wordStyle sBtn">
              <el-button type="text" v-show="isShowEmail&&isEditEmail" @click="resetInfo('setEmail','IEBT_UPDATE_EMAIL','/email/sendMsgUpdateEmail','0')">更换</el-button>
              <el-button type="text" v-if="!isShowEmail&&isSetEmail" @click="bindEmailD = true">绑定</el-button>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row >
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="wordStyle paddingH">登录密码</el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <p class="secondText paddingH">最近一次登录时间:{{sInfo.lastLoginTime}}</p>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="wordStyle sBtn">
            <el-button v-if="isLoginPwd" type="text"  @click="resetInfo('newLoginPasw','IEBT_RESET_LOGIN_PWD','/userSecurity/sendChangePswSmsCode','1')">重置</el-button>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row >
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="wordStyle paddingH">支付密码</el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <p class="secondText paddingH">付款或提现时输入, 保护账户安全</p>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="wordStyle sBtn">
            <el-button v-if="isPayPwd" type="text"  @click="resetInfo('verifyProblemTrade','IEBT_RESET_TRADE_PWD','/userSecurity/sendChangeTradePwdSmsCode','1')">重置</el-button>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>

  <!--  实名认证审核进度框 -->
  <el-dialog
    title="实名认证审核进度"
    :visible.sync="authProgress"
    width="580px"
    height="300px"
    class="authProgress">
    <div class="authProgressCont">
      <el-steps direction="vertical" :active="1">
        <el-step title="实名认证 1" description="已成功提交"></el-step>
        <el-step title="平台审核中 2" description="预计2-3个工作日内完成"></el-step>
        <el-step title="审核完成 3" description="平台发送通知至邮箱或手机"></el-step>
      </el-steps>
    </div>
    <el-button type="primary" class="authProgressBtn" @click="authProgress = false">确 定</el-button>
  </el-dialog>

  <!-- 业务弹框 -->
  <el-dialog
    :title="setPageTitle"
    class="changePhoneD"
    :visible.sync="changeInfoD"
    @close="setBoxClose"
    width="520px">
    <component @thisComponents="thisComponents" v-bind:is="thisComp"  :setParam="setParam" ></component>
  </el-dialog>

  <!-- 绑定邮箱 -->
  <el-dialog
    title="绑定邮箱地址"
    class="changePhoneD"
    :visible.sync="bindEmailD"
    width="520px">
    <bindingEmail @setEmail="setEmail"></bindingEmail>
  </el-dialog>

</div>
</template>
<script>
import verifyIdentity from './verifyIdentity.vue'
import newPhone from './newPhone.vue'
import bindingEmail from './bindingEmail.vue'
import setEmail from './setEmail.vue'
import newLoginPasw from './newLoginPasw.vue'
import verifyProblemTrade from './verifyProblemTrade.vue'
import newTradePasw from './newTradePasw.vue'

export default {
  name: 'securitySet',
  data () {
    return {
      isShowEmail: true,
      changeInfoD: false,
      bindEmailD: false,
      authProgress: false,
      isClickMobileBtn: false,
      haveSetProblem: false,
      isauth: '',
      btnTitle: '',
      sInfo: '',
      setPageTitle: '验证身份',
      thisComp: 'verifyIdentity',
      setParam: ''
    }
  },
  computed: {
    isMobile () {
      return this.$formatFn.isPermission('sc_bind_mobile_func')
    },
    isSetEmail () {
      return this.$formatFn.isPermission('sc_bind_email_Func')
    },
    isEditEmail () {
      return this.$formatFn.isPermission('sc_update_email_func')
    },
    isLoginPwd () {
      return this.$formatFn.isPermission('sc_update_login_pwd_func')
    },
    isPayPwd () {
      return this.$formatFn.isPermission('sc_update_trade_pwd_func')
    }
  },
  methods: {
    getSetInfo () {
      var that = this
      that.$axios
        .post('/merchant/user/getSecurityCenterResp')
        .then(function (result) {
          var res = result.data
          if (res.code && res.code == '0000') {
            that.sInfo = res.data
            that.setPhoneParam = that.sInfo.mobile
            that.setEmailParam = that.sInfo.mobile
            that.setParam = that.sInfo.mobile

            if (that.sInfo.email && that.sInfo.email !== null) {
              that.isShowEmail = true
            } else {
              that.isShowEmail = false
            }
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(function (error) {
          console.log('error:', error)
        })
    },

    setEmail (f) {
      this.bindEmailD = f
    },

    resetInfo (type, p, u, f) {
      var that = this
      var d = {
        c: type,
        t: p,
        u: u,
        flag: f
      }
      d = JSON.stringify(d)
      window.localStorage.setItem('c', d)
      if (type == 'newPhone') {
        if (that.isauth != 2) {
          if (that.isauth == 1) {
            that.authProgress = true
          } else {
            that.isAuthFn()
            that.authProgress = false
          }
          that.changeInfoD = false
        } else {
          that.changeInfoD = true
          that.setPageTitle = '验证原手机号码'
        }
      } else {
        that.setPageTitle = '验证身份'
        that.changeInfoD = true
      }
    },

    thisComponents (c, v, flag) {
      var that = this

      if (c == 'verifyIdentity') {
        that.setParam = that.sInfo.mobile
        that.setPageTitle = '验证身份'
      } else if (c == 'verifyProblemTrade') {
        flag = false
        c = ''
        that.getSecurityProblem(v)
      } else {
        that.setParam = v
      }
      that.thisComp = c
      that.changeInfoD = flag
      switch (c) {
        case 'newPhone':
          that.setPageTitle = '验证新手机号码'
          break
        case 'setEmail':
          that.setPageTitle = '验证邮箱地址'
          break
        case 'newLoginPasw':
          that.setPageTitle = '设置新密码'
          break
        case 'verifyProblemTrade':
          that.setPageTitle = '验证答案'
          break
        case 'newTradePasw':
          that.setPageTitle = '设置新密码'
          break
      }
    },

    setBoxClose () {
      var that = this
      that.thisComp = 'verifyIdentity'
      that.setParam = that.sInfo.mobile
    },

    getSecurityProblem (v) {
      var that = this
      that.$axios
        .post('/merchant/questionSetting/queryQustion')
        .then(function (result) {
          var res = result.data
          that.setParam = v
          if (res.code && res.code == '0000') {
            that.changeInfoD = true
            that.thisComp = 'verifyProblemTrade'
          } else if (res.code == '1100' && res.data.isSetQuestion !== 'false') {
            that.$confirm('您还未设置安全问题,为保障您的账户安全,请设置安全问题后再重置支付密码,是否立即设置?', '提示', {
              confirmButtonText: '立即设置',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.$emit('changeMenuIndex', 'securityProblem')
            }).catch(() => {

            })
          } else {
            that.changeInfoD = true
            that.thisComp = 'verifyProblemTrade'
            that.$message.error(res.message)
          }
        })
        .catch(function (error) {
          console.log('error:', error)
        })
    },

    isAuthFn () {
      var that = this
      if (that.isauth == -1 || that.isauth == 3) {
        var wordTip = ''
        if (that.isauth == -1) {
          wordTip = '您尚未完成实名认证,请先认证'
        } else if (that.isauth == 3) {
          wordTip = '您的实名认证审核未通过,请重新认证'
        }
        that.$confirm(wordTip, '温馨提示', {
          confirmButtonText: '立即认证',
          center: true,
          showCancelButton: true,
          customClass: 'isAuthTipBox'
        }).then(() => {
          that.$router.push('/auth')
        }).catch(() => {
          // 取消
        })
      }
    }
  },

  components: {
    verifyIdentity,
    newPhone,
    bindingEmail,
    setEmail,
    newLoginPasw,
    verifyProblemTrade,
    newTradePasw
  },

  created () {
    var that = this
    that.getSetInfo()
    var userinfo = window.localStorage.getItem('userinfo')
    if (userinfo) {
      userinfo = JSON.parse(userinfo)
      that.isauth = userinfo.auditStatus
      if (that.isauth == 2) {
        that.isClickMobileBtn = false
        that.btnTitle = ''
      } else {
        that.isClickMobileBtn = true
      }
    }
  },
  mounted () {
    if (this.$route.params.forgetPasw) {
      this.resetInfo('verifyProblemTrade', 'IEBT_RESET_TRADE_PWD', '/userSecurity/sendChangeTradePwdSmsCode', '1')
    } else if (this.$route.params.changeMobile) {
      this.resetInfo('newPhone', 'IEBT_UPDATE_MOBILE', '/userSecurity/sendSmsCode', '1')
    }
  }
}
</script>
<style scoped>
.securitySet,
.securitySetCont,
.sList,
.sList li {
  position: relative;
  width: 100%;
}
.sList {
  display: inline-block;
}
.sList li {
  height: 55px;
  border-bottom: 1px solid #f4f4f4;
  padding-top: 5px;
  box-sizing: border-box;
}
.wordStyle {
  font-size: 15px;
}
.secondText {
  font-size: 14px;
  color: #999999;
}
.paddingH {
  padding: 12px 20px;
}
.sBtn {
  text-align: right;
}
.sBtn .el-button {
  color: #0067b8;
}
.authProgressCont {
  height: 332px;
  width: 200px;
  margin: 0 auto;
  padding-bottom: 41px;
}
</style>
