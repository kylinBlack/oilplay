<template>
<div class="putForwardProgress">
  <el-row>
    <el-col :xs="2" :sm="2" :md="5" :lg="5" :xl="5">
      <pre> </pre>
    </el-col>
    <el-col :xs="20" :sm="20" :md="15" :lg="15" :xl="15">
      <p class="topMark">
        <img src="../../../assets/img/tips.png" alt="">
       为保障您的安全, 代付申请需要进行审核, 审核通过后付款
      </p>
      <div class="pfProgress">
        <copSteps :stepParams="stepsData"></copSteps>
      </div>
      <p class="linkPage">
        <span class="ptLable">您可能需要:</span>
        <span class="ptLink" @click="againPayment">继续代付</span>
        <span class="ptLine"></span>
        <span class="ptLink" @click="goAccount">返回我的账户</span>
      </p>
      </el-col>
    <el-col :xs="2" :sm="2" :md="5" :lg="5" :xl="5">
      <pre> </pre>
    </el-col>
    </el-row>
</div>
</template>
<script>
  import copSteps from '../../../components/lib/copIconSteps.vue'
    export default{
        name: "paymentProgress",
        data(){
            return {
//              stepsData:'aaaaaaaaa',
              stepsData:{
                one: {name: 1, title: '提交成功', text: '提交成功', isShowTip: false},
                two: {name: 2, title: '等待审核', text: '等待审核', isShowTip: false},
                three: {name: 3, title: '付款', text: '付款', isShowTip: false}
              }
            }
        },
        methods: {
          againPayment(){
            window.localStorage.setItem('isBackHomePage',0);
            this.$router.push('/payment')
          },
          goAccount(){
            this.$router.push('/myAccount')
          }
        },
      components:{
        copSteps
      }
    }
</script>
<style scoped>
.topMark,.pfProgress,.linkPage{
  position: relative;
  width: 100%;
}
.topMark{
  box-sizing: border-box;
  color:#333333;
  margin-top:40px;
  font-size: 14px;
}
  .topMark img{
    margin-left: 10px;
  }
  .pfProgress{
    padding:150px 0
  }
  .linkPage{
    text-align: center;
    letter-spacing: 1px;
    font-size: 14px;
  }
.ptLable{
  color: #999999;
}
  .ptLink{
    color: #418cc8;
    cursor: pointer;
  }
  .ptLine{
    height: 13px;
    width: 2px;
    background: #9c9c9c;
    display: inline-block;
    margin: 0 5px;
  }
</style>
