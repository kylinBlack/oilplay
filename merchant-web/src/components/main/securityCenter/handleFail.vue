<template>
  <el-row ref="comp">
    <div class="handleFail">
      <p class="sucicon">
        <img src="../../../assets/img/failicon.png" alt="">
      </p>
      <p v-if="rParams.type == 'login'" class="sucText">登录密码重置失败</p>
      <p v-else-if="rParams.type == 'mobile'" class="sucText">更换手机号码失败</p>
      <p v-else-if="rParams.type == 'emailb'" class="sucText">邮箱绑定失败</p>
      <p v-else-if="rParams.type == 'emailg'" class="sucText">邮箱地址更换失败</p>
      <p v-else-if="rParams.type == 'tradePasw'" class="sucText">支付密码重置失败</p>
      <p v-else-if="rParams.type == 'sProblems'" class="sucText">安全问题设置失败</p>
      <p v-else-if="rParams.type == 'cProblems'" class="sucText">修改安全问题失败</p>
      <div class="line"></div>
      <p class="sucMask">您可刷新网页后,尝试再次操作</p>
      <div class="sucbtn">
        <el-button v-if="rParams.type == 'login'" type="primary" class="" @click="goPage">重置登录密码</el-button>
        <el-button v-else-if="rParams.type == 'mobile'" type="primary" class="" @click="goPage">更换手机号码</el-button>
        <el-button v-else-if="rParams.type == 'emailb'" type="primary" class="" @click="goPage">绑定邮箱</el-button>
        <el-button v-else-if="rParams.type == 'emailg'" type="primary" class="" @click="goPage">更换邮箱</el-button>
        <el-button v-else-if="rParams.type == 'tradePasw'" type="primary" class="" @click="goPage">重置支付密码</el-button>
        <el-button v-else-if="rParams.type == 'sProblems' || rParams.type == 'cProblems'" type="primary" class="" @click="goPage">修改安全问题</el-button>

      </div>
    </div>
  </el-row>
</template>
<script>
  export default{
    name: "handleFail",
    data(){
      return {
        rParams:'',
      }
    },
    methods: {
      goPage(){
        this.$router.push('/securityCenter')
      },
      changeTitle(){
        var y = this.rParams.type;
        console.log("yy:",y);
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
      var that = this;
      that.rParams = that.$route.params;
      that.changeTitle();

      setTimeout(function () {
        var height = that.$refs['comp'].$el.clientHeight;
        that.$emit('changewindowSize', height)
      }, 500);
    }
  }
</script>
<style scoped>
  .handleFail {
    width: 541px;
    height: auto;
    position: relative;
    left:50%;
    top:50%;
    margin-left:-271px;
    margin-top:-28vh;
  }

  .line {
    position: relative;
    width: 100%;
    height: 1px;
    background: #9f9f9f;
    opacity: 0.2;
  }

  .sucicon, .sucText, .sucMask {
    text-align: center;
    margin-bottom: 32px;
  }

  .sucText {
    font-size: 30px;
    color: #333333;
    letter-spacing: 3px;
  }

  .sucMask {
    margin-top: 22px;
    color: #9f9f9f;
    font-size: 14px;
    letter-spacing: 1px;
  }

  .sucbtn {
    margin-top: 100px;
    text-align: center;
  }

  .sucbtn {

  }

</style>
