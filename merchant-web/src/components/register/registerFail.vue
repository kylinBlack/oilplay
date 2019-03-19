<template>
  <div class="registerSuc">
    <p class="sucicon">
      <img src="../../assets/img/failicon.png" alt="">
    </p>
    <p class="sucText">很抱歉!  账户注册失败</p>
    <div class="line"></div>
    <p class="sucMask">可能因网络通讯故障等导致注册失败,您可尝试再次提交注册</p>
    <div class="sucbtn">
      <el-button type="primary" class="">重新注册</el-button>
      <el-button type="text">返回首页</el-button>
    </div>
  </div>
</template>
<script>
  export default{
    name: "registerFail",
    data(){
      return {}
    },
    methods: {}
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

  .sucicon, .sucText,.sucMask {
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
