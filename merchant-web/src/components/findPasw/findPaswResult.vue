<template>
  <section class="register">

    <!--  内容 -->
    <div class="register-main" :style="{height:screenHeight+'px'}">
      <div class="registerContent">

        <component v-bind:is="thisComponent" @changeComp="gethomePage" ></component>

      </div>
    </div>
    <!-- 底部 -->
    <!--<copFooter></copFooter>-->

  </section>
</template>

<script>
  import copHeader from '../../components/lib/header.vue'
  import copFooter from  '../../components/lib/footerCom.vue'
  import resSuc from  '../../components/lib/resSuc.vue'
  import resFail from  '../../components/lib/resFail.vue'

  export default {
    name: 'register',
    data(){
      return {
        screenHeight: (document.body.clientHeight - 168),
        timer: false,
        thisComponent: 'resSuc',
        userdata:'',
        title:'找回密码'
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
      resSuc,
      resFail,
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
      this.$emit('changeHeader','1');
      var p = this.$route.params;
      if(p && p.type == 1){
        this.thisComponent = 'resSuc';
      }else {
        this.thisComponent = 'resFail';
      }
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
<style scoped>
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
    margin-bottom: 20px !important;
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
</style>
