<template>
  <el-row ref="comp">
    <div class="authSuc">
      <p class="sucicon">
        <img src="../../../assets/img/sucicon.png" alt="">
      </p>
      <p class="sucText">恭喜您! 信息更改成功</p>
      <div class="sucbtn">
        <el-button type="primary" @click="goHome">返回我的账户</el-button>
      </div>
    </div>
  </el-row>
</template>
<script>
  export default{
    name: "changeInfosuc",
    data(){
      return {}
    },
    methods: {
      goHome(){
        location.assign('main.html')
      }
    },
    created(){
      this.$emit('changewindowSize', '','更改企业信息')
    }
  }
</script>
<style scoped>
  .authSuc {
    width: 541px;
    height: auto;
    position: relative;
    left: 50%;
    top: 50%;
    margin-left: -271px;
    /*margin-top:-195px;*/
    margin-top: -28vh;
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
    margin-top: 63px;
    text-align: center;
  }

  .btnmarsk {
    text-align: center;
    position: relative;
    padding-bottom: 15px;
    color: #333333;
    font-size: 14px;
  }
</style>
