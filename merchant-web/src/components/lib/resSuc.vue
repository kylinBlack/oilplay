<template>
  <div class="registerSuc">
    <p class="sucicon">
      <img src="../../assets/img/sucicon.png" alt="">
    </p>
    <p class="sucText">恭喜您! 密码重置成功</p>
    <!--<div class="line"></div>-->
    <p class="sucMask">为保障您的账户安全, 请妥善保管好您的账号密码</p>
    <div class="sucbtn">
      <el-button type="primary" class="" @click="goLogin">立即登录</el-button>

    </div>
  </div>
</template>
<script>
  export default{
    name: "",
    data(){
      return {}
    },
    methods: {
      goLogin(){
        window.location.assign('login.html')
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

</style>
