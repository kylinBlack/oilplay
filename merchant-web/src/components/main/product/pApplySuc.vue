<template>
  <el-row ref="comp"  class="pcontent">
    <div class="authSuc">
      <p class="sucicon">
        <img src="../../../assets/img/sucicon.png" alt="">
      </p>
      <p class="sucText">恭喜您! 产品开通申请提交成功</p>
      <div class="line"></div>
      <p class="sucMask">预计申请审核需要1-2个工作日，审核通过后我司工作人员会主动联系您，并将合同协议寄出给贵司，贵司需要补充协议上的内容并签盖公章，且需要
        于5个工作日内回寄协议。
      </p>
      <div class="sucbtn">
        <el-button type="primary" class="" @click="goPage">
           我的账户
        </el-button>

      </div>
    </div>
  </el-row>
</template>
<script>
  export default{
    name: "pApplySuc",
    data(){
      return {}
    },
    methods: {
      goPage(){
        this.$router.push('/myAccount');
      },
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

  a {
    text-decoration: none;
    color: white;
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
