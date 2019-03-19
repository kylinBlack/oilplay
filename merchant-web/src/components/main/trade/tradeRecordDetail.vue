<template>
  <div class="auditDetail">
    <el-row>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <!-- echo -->
      <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16" class="auditDetailCont">
        <div class="auCont">
          <p class="auUnit">单位: 元</p>
          <div class="orderDetail">
            <ul class="orderCont">
              <li class="auditbg firstAudli">订单号</li>
              <li class="auditbg">{{tradeDetailData.tradeTypeName}}金额</li>
              <li class="auditbg">服务费</li>
              <li class="auditbg">实际交易金额</li>
              <li class="firstAudli">
                <p>{{tradeDetailData.orderNo}}</p>
              </li>
              <li>{{tradeDetailData.tradeAmt}}</li>
              <li>{{detailData.chargeAmt}}</li>
              <li class="tcolor">{{realAccount}}</li>
            </ul>
          </div>

          <div class="audsecondBlock">
            <ul>
              <li>
                <div class="audLabel">交易类型</div>
                <div class="audata">
                  {{tradeDetailData.tradeTypeName}}
                </div>
              </li>
              <li>
                <div class="audLabel">创建时间</div>
                <div class="audata">{{detailData.createTime}}</div>
              </li>
              <li>
              <div class="audLabel">交易时间</div>
              <div class="audata">{{detailData.billDate}}</div>
              </li>
              <li v-if="tradeDetailData.orderType !== 'recharge'">
                <div class="audLabel">交易说明</div>
                <div class="audata">{{detailData.remark}}</div>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
          <div v-if="tradeDetailData.orderType !== 'recharge'" class="audsecondBlock aduThreeBlock">
            <ul>
              <li>
              <div class="audLabel">对方账户</div>
              <div class="audata">智企银通 {{detailData.bankNo}}</div>
            </li>
              <li>
                <div class="audLabel">银行名称</div>
                <div class="audata">{{detailData.bankName}}</div>
              </li>
              <li>
                <div class="audLabel">交易状态</div>
                <div class="audata tcolor">
                  <span v-if="detailData.status == '2'" class="tcolor">成功</span>
                  <span v-if="detailData.status == '3'" class="tcolor">失败</span>
                  <span v-if="detailData.status == '1'" class="tcolor">处理中</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default{
  name: 'tradeRecordDetail',
  data () {
    return {
      audView: '',
      tradeTypeName: '提现',
      detailData: {},
      tradeDetailData: {},
      batchNo: '',
      pageSize: 10,
      currentPage: 1,
      total: 10,
      realAccount: 0.00
    }
  },
  methods: {
    getTradeDetailData () {
      var that = this
      var params = {
        orderNo: that.tradeDetailData.orderNo,
        createTime: this.$utils.dateToString(Number(that.tradeDetailData.createTime), 'yyyy-MM-dd'),
        orderType: that.tradeDetailData.orderType
      }
      that.$axios({
        url: '/order/trade/getOrderDetail',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: params
      }).then(function (result) {
        var res = result.data
        if (res.code && res.code == '0000') {
          that.detailData = res.data
          if (that.tradeDetailData.orderType === 'recharge') {
            that.realAccount = that.detailData.tradeAmt
            that.detailData.chargeAmt = 0
            that.detailData.billDate = that.detailData.createTime
          }
          that.getRealAccount(res.data.deductType)
        } else {
          that.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log('error:', error)
      })
    },

    getRealAccount (type) {
      var that = this
      var tradeAmt = that.detailData.tradeAmt
      var freeAmt = that.detailData.chargeAmt
      if (type == 'IN') {
        that.realAccount = tradeAmt
      } else if (type == 'OUT') {
        that.realAccount = parseFloat(tradeAmt) + parseFloat(freeAmt)
      }
      that.realAccount = that.realAccount.toFixed(2)
    }

  },
  created () {
    this.$emit('changewindowSize', '', '交易详情')
    this.tradeDetailData = this.$route.query
    this.getTradeDetailData()
    // if (this.tradeDetailData.orderType === 'recharge') {
    //   this.realAccount = this.tradeDetailData.tradeAmt
    //   this.detailData.chargeAmt = 0
    //   this.detailData.createTime = this.detailData.billDate = this.tradeDetailData.createTime
    // } else {
    //   this.getTradeDetailData()
    // }
  }
}
</script>
<style scoped>
.auCont,
.auCont,
.orderDetail,
.orderCont,
.audsecondBlock,
.audsecondBlock ul,
.audsecondBlock ul li,
.aduThreeBlock,
.audBtn,
.batchDetal,
.batchTitle {
  position: relative;
  width: 100%;
}

.clear {
  clear: both;
}

.auCont {
  margin-top: 55px;
}

.auCont {
  color: #999999;
  text-align: right;
}

.auUnit {
  padding-bottom: 10px;
}

.orderCont {
  height: 100px;
  display: inline-block;
}

.orderCont li {
  float: left;
  height: 54px;
  display: flex;
  align-items: center;
  position: relative;
  width: 21.3%;
  text-align: left;
  padding-left: 5px;
  box-sizing: border-box;
}

.auditbg {
  background: #f3f3f3;
  color: #333333;
  font-size: 15px;
}

.firstAudli {
  padding-left: 44px !important;
  box-sizing: border-box;
  width: 36% !important;
}
.firstAudli p {
  word-break: break-all;
}
.audsecondBlock {
  height: 235px;
  margin-top: 10px;
}

.audsecondBlock ul {
  box-sizing: border-box;
}

.audsecondBlock ul li {
  position: relative;
  height: 54px;
  border-top: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}

.audsecondBlock ul:last-child {
  border-bottom: 1px solid #e7e7e7;
}

.audLabel,
.audata {
  position: relative;
  height: 100%;
  line-height: 54px;
  font-size: 15px;
  color: #333333;
  float: left;
  vertical-align: top;
  letter-spacing: 1.5px;
  box-sizing: border-box;
}

.audLabel {
  width: 16%;
  min-width: 16%;
  text-align: center;
  background: #f3f3f3;
  border-right: 1px solid #e7e7e7;
}

.audata {
  position: relative;
  width: 84%;
  text-align: left;
  padding-left: 15px;
}

.aduThreeBlock {
  height: 218px !important;
}

.audBtn {
  margin-top: 40px;
  text-align: center;
  margin-bottom: 66px;
}
.audBtn .el-button {
  width: 130px;
}

.batchDetal {
  margin-top: 40px;
  margin-bottom: 20px;
}
.batchTitle {
  text-align: center;
  font-size: 17px;
  font-weight: bold;
}

.block {
  margin-top: 10px;
}
.tcolor {
  color: red;
}
.auditDetailCont {
  margin-bottom: 50px;
}
</style>
