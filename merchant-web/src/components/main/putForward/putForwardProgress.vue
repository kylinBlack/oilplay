<template>
<div class="putForwardProgress">
  <el-row>
    <el-col :xs="2" :sm="2" :md="5" :lg="5" :xl="5">
      <pre> </pre>
    </el-col>
    <el-col :xs="20" :sm="20" :md="15" :lg="15" :xl="15">
      <p class="topMark">
        <img src="../../../assets/img/tips.png" alt="">
        银行信息填写错误将导致提现失败，资金会自动退回到您的账户。
      </p>
      <div class="pfProgress">
        <copSteps></copSteps>
      </div>
      <p class="linkPage">
        <span class="ptLable">您可能需要:</span>
        <span class="ptLink" @click="linkPage('transactRcord')">查看提现记录</span>
        <span class="ptLine"></span>
        <span class="ptLink" @click="linkPage('putForward')">继续提现</span>
        <span class="ptLine"></span>
        <span class="ptLink" @click="linkPage('myAccount')">返回我的账户</span>
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
        name: "putForwardProgress",
        data(){
            return {

            }
        },
        methods: {
          linkPage(page){
            if(page == 'transactRcord'){
              this.$router.push({name:'transactRcord',params:{type:'proxyWithdrawPay'}})
            }else{
              this.$router.push('/'+page)
            }

          },
        },
      components:{
        copSteps
      }
    }
</script>
<style scoped>
.topMark,
.pfProgress,
.linkPage {
  position: relative;
  width: 100%;
}
.topMark {
  box-sizing: border-box;
  color: #333333;
  margin-top: 40px;
  font-size: 14px;
}
.topMark img {
  margin-left: 10px;
}
.pfProgress {
  padding: 150px 0;
}
.linkPage {
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
