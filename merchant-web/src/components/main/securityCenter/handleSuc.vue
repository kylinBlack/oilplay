<template>
  <div class="handleSuc">
    <p class="sucicon">
      <img src="../../../assets/img/sucicon.png" alt="">
    </p>
    <p class="sucText">
      <span v-if="rParams.type == 'moblie'">手机号码更换成功</span>
      <span v-else-if="rParams.type == 'login'">登录密码重置成功</span>
      <span v-else-if="rParams.type == 'tradePasw'">支付密码重置成功</span>
      <span v-else-if="rParams.type == 'emailb'">邮箱绑定成功</span>
      <span v-else-if="rParams.type == 'emailg'">邮箱更换成功</span>
      <span v-else-if="rParams.type == 'cProblems'">安全问题修改成功</span>
      <span v-else-if="rParams.type == 'sProblems'">安全问题设置成功</span>
    </p>
    <div class="aline" v-if="rParams.type !== 'sProblems' && rParams.type !== 'cProblems'"></div>
    <p class="sucMask"  v-if="rParams.type == 'moblie'">新手机号码为:{{rParams.val}}</p>
    <p class="sucMask"  v-if="rParams.type == 'login'">请使用新登录密码重新登录</p>
    <p class="sucMask"  v-if="rParams.type == 'tradePasw'">请妥善保管好密码</p>
    <p class="sucMask"  v-if="rParams.type == 'emailb' || rParams.type == 'emailg'">当前绑定邮箱地址为:{{rParams.val}}</p>
    <div class="sucbtn">
      <el-button v-if="rParams.type == 'moblie' || rParams.type == 'login'" type="primary" class="" @click="goPage('login')">重新登录</el-button>
      <el-button v-else-if="rParams.type == 'emailb' || rParams.type == 'sProblems' || rParams.type == 'emailg'" type="primary" class="" @click="goPage('myAccount')">返回我的账户</el-button>
      <el-button v-else-if="rParams.type == 'cProblems' || rParams.type == 'cProblems' || rParams.type == 'tradePasw'" type="primary" class="" @click="goPage('securityCenter')">返回安全中心</el-button>
      <!--<el-button v-else-if="rParams.type == 'emailg'" type="primary" class="" @click="goPage('securityCenter')">返回安全中心</el-button>-->
    </div>
    <p class="linkPage"  v-if="rParams.type == 'sProblems'">
      <span class="ptLable">您可能需要:</span>
      <span class="ptLink" @click="goPage('securitySet')">重置支付密码</span>
      <span class="ptLine"></span>
      <span class="ptLink" @click="goPage('securityCenter')">返回安全中心</span>
    </p>
  </div>
</template>
<script>
  export default{
    name: "handleSuc",
    data(){
      return {
        sParams:'150000000001',
        rParams:'',
      }
    },
    methods: {
      goPage(type){
        if(type == 'login'){
          window.location.assign('login.html')
        }else if(type == 'securitySet'){
          this.$router.push({name:type,params:{forgetPasw:true}})
        }else {
          this.$router.push('/'+type)
        }
      },
      changeTitle(){
        var y = this.rParams.type;
        var t = ''
        switch (y){
          case 'moblie':
            t = '更换手机号码';
                break;
          case 'login':
            t = '重置登录密码';
                break;
          case 'emailb':
            t = '绑定邮箱地址';
            break;
          case 'tradePasw':
            t = '更换支付密码';
            break;
          case 'emailg':
            t = '更换邮箱地址';
          break;
          case 'sProblems':
            t = '设置安全问题';
          break;
          case 'cProblems':
            t = '修改安全问题';
          break;
        }

        this.$emit('changewindowSize', '',t)
      }
    },
    created(){
      this.rParams = this.$route.params;
      this.changeTitle();
    }
  }
</script>
<style scoped>
  .handleSuc {
    width: 541px;
    height: auto;
    position: absolute;
    top: 50%;
    margin-top: -161px;
    display: inline-block;
    left: 50%;
    margin-left: -270px;

  }

  .aline {
    position: relative;
    width: 100%;
    height: 1px;
    background: #9f9f9f;
    opacity: 0.2;
    margin: 17px 0;
  }

  .sucicon, .sucMask {
    text-align: center;
    margin-bottom: 32px;
  }

  .sucText {
    text-align: center;
    font-size: 30px;
    color: #333333;
    letter-spacing: 3px;
  }

  .sucMask {
    margin-top: 5px;
    color: #9f9f9f;
    font-size: 14px;
    letter-spacing: 1px;
  }

  .sucbtn {
    margin-top: 100px;
    text-align: center;
  }
  .linkPage {
    margin-top: 17px;
    text-align: center;
    letter-spacing: 1px;
    font-size: 14px;
  }
  .line {
    margin: 14px 0;
    height: 1px;
    background: #9f9f9f;
    opacity: 0.2;
  }
  .linkPage, .line {
    position: relative;
    width: 100%;
  }
  .ptLable {
    color: #999999;
  }

  .ptLink {
    color: #418cc8;
    cursor: pointer;
  }

  .ptLine {
    height: 11px;
    width: 1px;
    background: #9c9c9c;
    display: inline-block;
    margin: 0 1px;
  }
</style>
