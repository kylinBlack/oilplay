<template>
  <section class="findepasw">
    <template v-if="isShow">
      <!-- 头部 -->
      <div class="cop-findpaswheader">
      <!--<copfindpaswHeader />-->
        <resHeader ref="rHeader"></resHeader>
        </div>
      <!--  内容 -->
      <div class="findepasw-main" :style="{height:screenHeight+'px'}">
        <div class="findepaswContent">
          <router-view @changeHeader="changeHeader"></router-view>
          <!--<component v-bind:is="thisComponent" @changeComp="gethomePage" :userData = 'userdata'></component>-->
        </div>
      </div>
    </template>
   <template v-else>
     <!--头部-->
     <resHeader ref="rHeader"></resHeader>

     <!-- 内容 -->
     <div class="findepasw-main" :style="{height:screenHeight+'px'}">
       <router-view @changeHeader="changeHeader"></router-view>
       <!--<component v-bind:is="thisComponent" @changeComp="gethomePage" :userData = 'userdata'></component>-->
     </div>
   </template>
    <!-- 底部 -->
    <copFooter></copFooter>

  </section>
</template>

<script>
  import resHeader from  '../../components/lib/header.vue'
  import resFail from  '../../components/lib/resFail.vue'
  import resSuc from  '../../components/lib/resSuc.vue'
  import copFooter from  '../../components/lib/footerCom.vue'
  import writeLoginno from  '../../components/findPasw/writeLoginNo.vue'
  import verifPhone from  '../../components/findPasw/verifPhone.vue'
  import setnewPasw from  '../../components/findPasw/setNewPasw.vue'



  export default {
    name: 'findepasw',
    data(){
      return {
        isShow:true,
        screenHeight: (document.body.clientHeight - 168),
        timer: false,
        thisComponent: 'writeLoginno',
        userdata:'',

      }
    },
    methods: {
      gethomePage: function (comp,userdata,type,titleText) {
        this.thisComponent = comp
        this.userdata = userdata;
        if(type && type == '1'){
         this.isShow = false
        }else {
          this.isShow = true
        }
      },
      changeHeader(type){
        if(type && type == '1'){
          this.isShow = false
        }else {
          this.isShow = true
        }
      }
    },
    components: {

      copFooter,
      writeLoginno,
      verifPhone,
      setnewPasw,
      resHeader,
      resFail,
      resSuc

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
        name: 'writeLoginNo'
      });
      setTimeout(function () {
        that.$refs.rHeader.changetiltes('找回密码')
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

  .findepasw {
    background: #f7f7f7;
  }

  .findepasw-main {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    /*min-height: 80%;*/
  }

  .findepaswContent {
    position: relative;
    width: 68%;
    height: 85%;
    margin-top: -35vh;

  }
  .cop-findpaswheader {
    position: relative;
    width: 100%;
    height: 259px;
    background: #0067b8;
    box-sizing: border-box;
  }



  .findepaswBox .el-col {
    border: none;
  }

 .setNewPasw .codeBox {
    padding-left: 7px !important;
  }

  .codeBox .el-form-item__content {
    line-height: 12px !important;
  }

  .findepaswForm .el-form-item {
    margin-bottom: 20px !important;
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
  .setNewPasw .el-form-item{
    margin-bottom: 33px !important;
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
  .ei_upImg .el-dialog__body{
    overflow: visible;
  }

</style>
