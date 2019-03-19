<template>
  <el-row ref="comp">
    <div class="authFail">
      <p class="sucicon">
        <img src="../../../assets/img/failicon.png" alt="">
      </p>
      <p class="sucText">实名认证申请失败</p>
      <div class="line"></div>
      <p class="sucMask">您可尝试重新认证</p>
      <div class="sucbtn">
        <el-button type="primary" class="">重新认证</el-button>
      </div>
    </div>
  </el-row>
</template>
<script>
  export default{
    name: "authFail",
    data(){
      return {}
    },
    methods: {},
    created(){
      var that = this;
      setTimeout(function () {
      //  that.changeSteps();

        var height = that.$refs['comp'].$el.clientHeight;
        that.$emit('changewindowSize', height)
      }, 500)
      this.$emit('changewindowSize', '','实名认证')
    }
  }
</script>
<style scoped>
  .authFail {
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
