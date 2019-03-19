<template>
  <div class="putForwardFail">
    <p class="sucicon">
      <img src="../../../assets/img/failicon.png" alt="">
    </p>
    <p class="sucText">提现失败</p>
    <div class="line"></div>
    <p class="sucMask">失败原因:交易被拦截, 请联系客服人员解决</p>
    <p class="linkPage">
      <span class="ptLable">您可能需要:</span>
      <span class="ptLink" @click="pageLike('putForward')">继续提现</span>
      <span class="ptLine"></span>
      <span class="ptLink"  @click="pageLike('myAccount')">返回我的账户</span>
    </p>

  </div>
</template>
<script>
  export default{
    name: "putForwardFail",
    data(){
      return {}
    },
    methods: {
      findPaswAgain(){
        this.$emit('changeComp', 'writeLoginno', '', '1', '找回密码');

      },
      pageLike(page){
        this.$router.push('/'+page)
      }
    }
  }
</script>
<style scoped>
  .putForwardFail {
    width: 541px;
    height: auto;
    position: relative;
    top: 50%;
    margin-top: -161px;
    display: inline-block;
    left: 50%;
    margin-left: -270px;
  }

  .linkPage, .line {
    position: relative;
    width: 100%;
  }

  .line {
    margin: 14px 0;
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


  .linkPage {
    margin-top: 100px;
    text-align: center;
    letter-spacing: 1px;
    font-size: 14px;
  }

  .ptLable {
    color: #999999;
  }

  .ptLink {
    color: #418cc8;
    cursor: pointer;
  }

  .ptLine {
    height: 13px;
    width: 2px;
    background: #9c9c9c;
    display: inline-block;
    margin: 0 5px;
  }
</style>
