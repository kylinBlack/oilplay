<template>
  <div class="registerSuc">
    <p class="sucicon">
      <img src="../../assets/img/failicon.png" alt="">
    </p>
    <p class="sucText">很抱歉!  密码重置失败</p>
    <!--<div class="line"></div>-->
    <p class="sucMask">您可以尝试再次找回</p>
    <div class="sucbtn">
      <el-button type="primary" class="" @click="findPaswAgain">继续找回</el-button>

    </div>
  </div>
</template>
<script>
  export default{
    name: "registerFail",
    data(){
      return {}
    },
    methods: {
      findPaswAgain(){
        this.$router.replace('/writeLoginNo');

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

  .sucicon,.sucMask {
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

  .sucbtn {

  }
</style>
