<template>
  <div class="copMain">
    <!-- 头部 -->
    <div>
      <div class="main_top">
      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <pre> </pre>
        </el-col>
        <el-col :xs="10" :sm="10" :md="12" :lg="14" :xl="14">
          <pre> </pre>
        </el-col>
        <el-col :xs="10" :sm="10" :md="8" :lg="6" :xl="6">
          <ul class="smallnav">
            <li @click="goPage" class="a_router">
              账户中心
            </li>
            <div class="main_line"></div>
            <li>你好,{{userName}}</li>
            <li class="signOut" @click="signOut">退出</li>
          </ul>
        </el-col>
      </el-row>
      </div>
      <div class="accNav">
        <el-row class="navRow">
          <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
            <pre></pre>
          </el-col>
          <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="16" class="cHeader">
            <div class="leftHeader">
              <img src="../../assets/img/logo.png" alt="" @click="goFirstPage" title="点击回到首页">
              <div class="fline" v-show="isShowTitle"></div>
              <div class="fText" v-show="isShowTitle">{{title}}</div>
            </div>
            <div class="rightHeader" v-show="isShowNav">
              <el-menu :default-active="activeMenuIndex" class="el-menu-list" mode="horizontal" @select="handleSelect">
                <el-menu-item index="myAccount">我的账户</el-menu-item>
                <el-menu-item index="transactRcord" v-if="isShowTrade"> 交易记录</el-menu-item>
                <el-menu-item index="securityCenter" v-if="isSecurityCenter">安全中心</el-menu-item>
                <el-submenu index="peopleManagement" v-if="isManager">
                  <template slot="title">人员管理</template>
                  <el-menu-item index="roleManager">角色管理</el-menu-item>
                  <el-menu-item index="userManager">操作员管理</el-menu-item>
                </el-submenu>
                <el-submenu index="selfService">
                  <template slot="title">自助服务</template>
                  <el-menu-item index="openPlatform">开放平台</el-menu-item>
                  <el-menu-item index="helpCenter">帮助中心</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
          <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
            <pre></pre>
          </el-col>
        </el-row>
        <div class="clear"></div>
      </div>
    </div>
    <div>
      <div class="clear"></div>
      <!-- 内容  -->
      <div class="copContent" :style="{minHeight:screenHeight+'px'}">
          <keep-alive>
            <router-view @changewindowSize="changewindowSize" v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>

          <router-view @changewindowSize="changewindowSize" v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <div class="clear"></div>
    </div>

    <!-- 底部 -->
    <footerCop></footerCop>
  </div>

</template>

<script>
import headerCop from '../../components/lib/header.vue'
import footerCop from '../../components/lib/footerCom.vue'

export default {
  name: 'mainw',
  data () {
    return {
      title: '实名认证',
      timer: false,
      isShowNav: true,
      isShowTitle: '',
      activeMenuIndex: 'myAccount',
      userName: '',
      screenHeight: (document.body.clientHeight - 208)
    }
  },
  computed: {
    isSecurityCenter () {
      return this.$formatFn.isPermission('security_center')
    },
    isShowTrade () {
      return this.$formatFn.isPermission('trade_detail_query')
    },
    isManager () {
      let local = window.localStorage.getItem('userinfo')
      if (local) {
        return JSON.parse(local).type == 20
      } else {
        return false
      }
    }
  },
  methods: {
    signOut () {
      var that = this
      that.$confirm('确定退出?', '退出登录', {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('userinfo')
        location.assign('index.html')
      }).catch(() => {

      })
    },

    goPage () {
      this.$router.push('/myAccount')
    },

    changewindowSize (h, t, f, n) {
      var that = this
      if (h && h !== '') {
        h = parseInt(h)
        window.screenHeight = h
        that.screenHeight = window.screenHeight
      }
      ;
      if (t !== undefined) {
        this.changetiltes(t)
      }
      if (f) {
        that.isShowNav = f
      } else {
        that.isShowNav = false
      }
      if (n) {
        that.activeMenuIndex = n
      }
    },

    handleSelect (val) {
      if (val === 'myAccount') {
        this.$router.push('/' + val)
      } else if (val === 'openPlatform') {
        window.open('http://docs.open.iebt.net', '_blank')
      } else if (val === 'roleManager' || val === 'userManager') {
        let session = JSON.parse(window.localStorage.getItem('userinfo'))
        switch (session.auditStatus) {
          case -1: this.isAuthBox('您尚未完成实名认证，请先认证'); break
          case 2: this.$router.replace('/' + val); break
          case 3: this.isAuthBox('您的实名认证审核未成功，请重新认证'); break
          default:break
        }
      } else {
        this.$router.replace('/' + val)
      }
    },
    isAuthBox (tipWordRecord) {
      var that = this
      this.$confirm(tipWordRecord, '温馨提示', {
        confirmButtonText: '立即认证',
        center: true,
        showCancelButton: true,
        customClass: 'isAuthTipBox'
      }).then(() => {
        // 确定
        that.$router.push('/auth')
      }).catch(() => {
        // 取消
      })
    },
    goFirstPage () {
      // this.$router.push('/myAccount');
      location.assign('index.html')
    },
    changetiltes (t) {
      if (t && t !== '') {
        this.isShowTitle = true
      } else {
        this.isShowTitle = false
      }
      this.title = t
    }

  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight - 196
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

  components: {
    headerCop,
    footerCop
  },

  beforeCreate () {
    var userInfo = window.localStorage.getItem('userinfo')
    if (!userInfo) {
      this.$message.error('您还未登录,请登录')
      setTimeout(function () {
        location.assign('/login.html')
      }, 2000)

      return false
    }
  },
  created () {
    var userInfo = window.localStorage.getItem('userinfo')

    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userName = userInfo.userName
      this.changetiltes()
    }
  }
}
</script>
<style>
body,
div,
span,
p,
span,
ul,
li,
a,
ol,
table {
  margin: 0;
  padding: 0;
  font-family: 'Microsoft YaHei UI';
}

html,
body,
.copMain {
  position: relative;
  width: 100%;
  height: 100%;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}
/* .copMain {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.copMain > div:nth-child(2) {
  flex: 1;
} */
.smallnav a {
  color: white;
}

.clear {
  clear: both;
}
.a_router {
  cursor: pointer;
}
.navRow {
  display: inline-block;
}

.copContent {
  /* margin-top: -4px; */
  /*display: inline-block;*/
  /*position: relative;*/
  /*width: 100%;*/
}

.main_top {
  position: relative;
  width: 100%;
  height: 28px;
  line-height: 28px;
  background: #0562aa;
  color: white;
  font-size: 12px;
}

.smallnav li,
.main_line {
  float: left;
}

.smallnav li {
  padding: 0 5px;
  opacity: 0.95;
}

.signOut {
  cursor: pointer;
}

.signOut:hover {
  opacity: 1;
}

.main_line {
  height: 13px;
  width: 1px;
  background: white;
  margin-top: 8px;
}

.copMain .el-row,
.copMain .el-col {
  position: relative;
  height: 100%;
}

/* 头部 */

.cop-header {
  position: relative;
  width: 100%;
  height: 80px;
  background: #0067b8;
  box-sizing: border-box;
  display: inline-block;
}

.header-content {
  position: relative;
  height: 80px;
  line-height: 80px;
  text-align: left;
}

.cHeader {
  display: flex;
  justify-content: space-between;
}

.rightHeader,
.leftHeader {
  display: flex;
  align-items: center;
}

.leftHeader img {
  cursor: pointer;
}

.header-content img {
  top: 50%;
  margin-top: 19px;
  cursor: pointer;
}

.fline {
  height: 25px;
  width: 1px;
  background: white;
  margin-top: 9px;
  margin-left: 10px;
  margin-right: 10px;
}

.fText {
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding-top: 10px;
}

.header-content img,
.fText,
.fline {
  float: left;
}

/*  导航菜单 */
.accNav {
  width: 100%;
  height: 80px;
  z-index: 30;
  background: #0067b8;
}

.accNav .el-row {
  position: relative;
  width: 100%;
}

/*.accNav .el-row, .accNav .el-col {*/
/*height: 100%;*/
/*line-height: 80px;*/

/*}*/

/* 上传图片 */
.el-upload-list--picture-card .el-upload-list__item {
  z-index: 10;
  position: absolute;
}
.feedbackForm .el-upload-list--picture-card .el-upload-list__item {
  z-index: 0;
  position: relative;
}
.authent .el-input__inner {
  border-radius: 2px !important;
}

.el-select,
.el-autocomplete {
  position: relative;
  width: 100%;
}

.el-button--primary {
  background-color: #0067b8 !important;
  border-color: #0067b8 !important;
}

.el-button {
  border-radius: 2px;
}

.transactData .el-tabs--card > .el-tabs__header {
  background: #f4f4f4 !important;
}

.transactData .el-tabs__item.is-active {
  background: white !important;
}

.transactData .el-tabs__content {
  height: 555px;
  padding: 0 13px;
}

.authProgress .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid #f7f7f7;
}

.authProgress .el-dialog__title {
  font-weight: bold;
  letter-spacing: 1px;
}

.authProgress .el-dialog__body {
  padding: 20px 0;
  text-align: center;
}

.myAccount .el-message-box__header {
  border-bottom: 1px solid #f1f1f1;
}

.myAccount .el-message-box__title {
  text-align: center;
  font-weight: bold;
}

.isAuthTipBox .el-message-box__header {
  border-bottom: 1px solid #f1f1f1;
  font-weight: bold;
}

.isAuthTipBox .el-message-box__content {
  height: 109px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.accNav .el-menu--horizontal {
  border-bottom: none;
}

.accNav .el-menu {
  background-color: inherit;
}

.accNav .el-menu--horizontal > .el-menu-item {
  color: #ffffff;
}

.accNav .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.accNav .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: #0067b8;
  color: #ffffff;
}

.accNav .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #ffffff;
}

.audview .el-textarea,
.audview .el-textarea .el-textarea__inner {
  height: 100%;
  width: 100%;
  border: none;
  resize: none;
}

.el-dialog__body {
  /* overflow-y: scroll; */
}

.securityCenter .el-dialog__body {
  overflow-y: hidden;
}

.authent .ei_upImg .el-dialog__body,
.productAsk .el-dialog__body,
.yishouApply .el-dialog__body {
  height: 350px;
}

.productAsk .el-dialog__footer {
  border-top: 1px solid #f4f4f4;
  margin-top: 25px;
  padding-top: 20px;
}

.productAsk .el-button + .el-button {
  margin-left: 35px;
}

.myProduct .el-table th {
  background: #f3f3f3;
}

.crumbCont .el-breadcrumb__inner a,
.crumbCont .el-breadcrumb__inner.is-link,
.crumbCont .el-breadcrumb__inner {
  color: white !important;
  font-size: 15px;
}

.xieyi .el-checkbox__label {
  color: #999999;
}

.bankList .el-radio__input.is-checked .el-radio__inner {
  border-color: #333333;
  background: #333333;
}

.bankList .el-radio__inner {
  border: 1px solid #333333;
}

.bankList .el-radio__label {
  display: none;
}

/* 消息提示框 */

.el-message {
  min-width: 150px !important;
  top: 50% !important;
  margin-top: -24px !important;
}

.ei_upImg .el-form-item__content {
  margin-left: 0 !important;
}
/*.authent .ei_upImg .el-dialog__body{*/
/*overflow: visible;*/
/*height: 350px;*/
/*}*/

.el-input__inner {
  border-radius: 0px;
}

.proMenu .el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}

.changePhoneD .el-dialog__body {
  padding: 10px 20px;
}

.changePhoneD .el-dialog__header {
  border-bottom: 1px solid #f8f8f8;
}

.baseInfo .el-upload {
  position: relative;
  width: 100%;
  height: 100%;
}

/*.pcontent{*/
/*position:relative;*/
/*width:100%;*/
/*display:inline-block;*/

/*}*/
.rCont .el-upload--picture-card {
  position: relative !important;
}

.emailbox .el-input__inner {
  border: none !important;
  background: #f1f1f1 !important;
  color: #999999 !important;
}

/* 提示框 */
.el-tooltip__popper.is-light {
  border: 1px solid #ff6757;
  color: #ff6656;
}
.el-tooltip__popper.is-light[x-placement^='right'] .popper__arrow {
  border-right-color: #ff6656;
}
.ableStyle {
  opacity: 0.8;
}
.acTabs .el-tabs__item {
  min-width: 96px;
}

/* 导航栏 */
.el-menu-list.el-menu--horizontal > .el-submenu .el-submenu__title {
  color: white;
}
.el-menu-list.el-menu--horizontal
  > .el-submenu
  .el-submenu__title:not(.is-disabled):focus,
.el-menu-list.el-menu--horizontal
  > .el-submenu
  .el-submenu__title:not(.is-disabled):hover {
  background-color: #0067b8;
  color: #ffffff;
}
.el-menu-list.el-menu--horizontal
  > .el-submenu
  .el-submenu__title
  .el-submenu__icon-arrow {
  color: white;
}
.el-menu-list.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: 2px solid #ffffff;
}
.el-menu--popup {
  min-width: 100px;
}
.bread span,
.bread .el-breadcrumb .el-breadcrumb__item span.el-breadcrumb__inner,
.bread .el-icon-arrow-right {
  color: #fff;
  font-size: 16px;
}
.role-card > .el-card__header,
.user-card > .el-card__header {
  height: 60px;
  text-align: center;
  background: #f3f3f3;
  box-sizing: border-box;
  padding: 10px;
}
.edit-dialog .el-dialog {
  border-radius: 10px;
}
.edit-dialog .el-dialog .el-dialog__title {
  font-weight: 700;
}
.edit-dialog .el-dialog .el-dialog__header,
.edit-dialog .el-dialog .el-dialog__footer {
  text-align: center;
}
.permission-dialog .el-dialog {
  border-radius: 10px;
}
.permission-dialog .el-dialog__title {
  font-weight: 700;
}
.permission-dialog .el-dialog .el-dialog__header,
.permission-dialog .el-dialog .el-dialog__footer {
  text-align: center;
}
.edit-dialog .el-dialog .el-ipt .el-input__inner {
  padding-left: 26px;
}
.container section.utils-sticky-btns {
  bottom: 15%;
  right: 5%;
}
.check-box label > .el-radio__input {
  display: none;
}
.check-box > label.el-radio {
  width: 100px;
  margin: 0 10px 10px 0 !important;
  text-align: center;
}
.el-dialog__body {
  padding: 30px 30px 10px 20px;
  border-top: 1px solid #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
}
</style>
