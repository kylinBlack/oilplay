<template>
  <div class="payment">
    <el-row class="pcontent">
      <el-col :xs="2" :sm="2" :md="5" :lg="5" :xl="5">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="15" :lg="15" :xl="15">
        <p class="topMark">
          <img src="../../../assets/img/tips.png" alt="">
          温馨提示：不支持付款到信用卡账号，否则将导致付款失败。
        </p>
        <div class="payTab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-if="$formatFn.isPermission('proxyPay_single')" label="单笔代付" name="first">
              <singlePay ref="singlePayFn"></singlePay>
            </el-tab-pane>
            <el-tab-pane v-if="$formatFn.isPermission('proxyPay_batch')" label="批量代付" name="second">
              <batchPay ref="batchPayFn"></batchPay>
            </el-tab-pane>
            </el-tabs>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import singlePay from '../../../components/main/payment/singlePay'
import batchPay from '../../../components/main/payment/batchPay'
export default{
  name: 'payment',
  data () {
    return {
      activeName: 'first',
      isFirstEnter: true
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
    }
  },
  components: {
    singlePay,
    batchPay
  },
  activated () {
    var that = this
    var f = window.localStorage.getItem('isBackHomePage')
    if (f == 0) {
      if (!that.isFirstEnter) {
        that.$emit('changewindowSize', '', '代付')
        that.isShowSev = false
        that.$refs.singlePayFn.isLoading()
        that.$refs.batchPayFn.isLoading()
      }
    }
    that.isFirstEnter = false
  },
  created () {
    this.$emit('changewindowSize', '', '代付')
  }
}
</script>
<style scoped>
.payment {
  display: inherit;
  /*position: relative;*/
  /*width: 100%;*/
}
.topMark,
.payTab {
  position: relative;
  width: 100%;
}

.payTab {
  margin: 40px 0;
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
.clear {
  clear: both;
}
</style>
