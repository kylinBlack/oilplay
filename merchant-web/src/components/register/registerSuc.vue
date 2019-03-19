<template>
  <div class="registerSuc">
    <p class="sucicon">
      <img src="../../assets/img/sucicon.png" alt="">
    </p>
    <p class="sucText">恭喜您!  账户注册成功</p>
    <div class="line"></div>
    <p class="sucMask">为方便给您提供更优质安全的服务和产品体验, 点击下方按钮即可立即完善企业实名信息</p>
    <div class="sucbtn">
      <el-button type="primary" class="" @click="goLogin">立即登录</el-button>
      <!--<el-button type="text" @click="goLogin">跳过认证</el-button>-->
    </div>
  </div>
</template>
<script>
  export default{
    name: "registerSuc",
    data(){
      return {}
    },
    methods: {
      goLogin(){
        location.assign('/login.html')
      }
    }
  }
</script>
<style scoped>
  .registerSuc {
    width: 541px;
    height: auto;

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

</style>
