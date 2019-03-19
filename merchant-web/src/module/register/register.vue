<template>
  <section class="register">
    <!-- 头部 -->
    <copHeader ref="cop_header"></copHeader>
    <!--  内容 -->
    <div class="register-main" :style="{height:screenHeight+'px'}">
      <div class="registerContent">
        <router-view ></router-view>
        <!--<component v-bind:is="thisComponent" @changeComp="gethomePage" :userData = 'userdata'></component>-->

      </div>
    </div>
    <!-- 底部 -->
    <copFooter></copFooter>

  </section>
</template>

<script>
  import copHeader from '../../components/lib/header.vue'
  import copFooter from  '../../components/lib/footerCom.vue'
  import registerPhone from  '../../components/register/registerSetPhone.vue'
  import registerPasw from  '../../components/register/registerSetPasw.vue'
  import registerSuc from  '../../components/register/registerSuc.vue'
  import registerFail from  '../../components/register/registerFail.vue'
  export default {
    name: 'register',
    data(){
      return {
        screenHeight: (document.body.clientHeight - 168),
        timer: false,
        thisComponent: 'registerPhone',
        userdata:''
      }
    },
    methods: {
      gethomePage: function (comp,userdata) {

        this.thisComponent = comp
        this.userdata = userdata
      },
    },
    components: {
      copHeader,
      copFooter,
      registerPhone,
      registerPasw,
      registerSuc,
      registerFail
    },
    mounted(){
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight - 168;
          that.screenHeight = window.screenHeight
        })()
      }
    },
    created(){
      var that = this;
      that.$router.replace({
        name: 'registerSetPhone'
      });
      setTimeout(function () {
        that.$refs.cop_header.changetiltes('注册')

      },300)
    },
    watch: {
      screenHeight (val) {
        let that = this
        if (!that.timer) {
          that.screenHeight = val;
          that.timer = true;
          setTimeout(function () {
            that.timer = false
          }, 400)
        }
      }
    }
  }
</script>
<style>
  html, body, section {
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  body, div, p, ul, li {
    margin: 0;
    padding: 0;
  }

  .register {
    background: #f7f7f7;
  }

  .register-main {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /*min-height: 80%;*/
  }

  .registerContent {
    width: auto;
    height: auto;

  }

  /******  注册框  ******/

  .registerBox .el-col {
    border: none;
  }

  .codeBox {
    padding-left: 10px !important;
  }

  .codeBox .el-form-item__content {
    line-height: 12px !important;
  }

  .registerForm .el-form-item {
    margin-bottom:19px !important;
  }

  .el-form-item__content {
    margin-left: 0 !important;
  }

  .agree .el-checkbox__input.is-checked + .el-checkbox__label {
    color: black !important;
  }

  .el-button {
    border-radius: 0px;
  }
  .el-dialog__body{
    overflow-y: scroll;
  }
  .agreement .el-dialog__body{
    height: 350px;
  }

  /* 消息提示框 */

  .el-message {
    min-width: 150px !important;
    top: 50% !important;
    margin-top: -24px !important;
  }
  .ei_upImg .el-form-item__content{
    margin-left: 14px !important;;
  }
</style>
