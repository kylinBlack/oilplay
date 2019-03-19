<template>
  <div class="auditDetail">
    <el-row>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16" class="auditDetailCont">
        <div class="auCont">
          <p class="auUnit">单位: 元</p>
          <div class="orderDetail">
            <ul class="orderCont">
              <li class="auditbg firstAudli">{{auditData.tradeTotal !== 1 ? '批次号' : '订单号'}}</li>
              <!--<li class="auditbg">支付方式</li>-->
              <li class="auditbg">代付金额</li>
              <li class="auditbg">服务费</li>
              <li class="auditbg">实际交易金额</li>
              <li class="firstAudli">{{auditData.batchNo}}</li>
              <li>{{auditData.tradeAmt}}</li>
              <li>{{auditData.feeAmt }}</li>
              <li>{{auditData.realAccount}}</li>
            </ul>
          </div>

          <div class="audsecondBlock ">
            <ul>
              <li>
                <div class="audLabel">交易类型</div>
                <div class="audata">
                  <span v-if="auditData.tradeTotal  == 1">单笔代付</span>
                  <span v-if="auditData.tradeTotal !== 1">批量代付</span>
                </div>
              </li>
              <li>
                <div class="audLabel">创建时间</div>
                <div class="audata">{{auditData.createTime}}</div>
              </li>
              <li>
                <div class="audLabel">交易说明</div>
                <div class="audata">{{auditData.tradeRmk}}</div>
              </li>
              <li v-if="auditData.tradeTotal<=1">
                <div class="audLabel">对方账户</div>
                <div class="audata">{{batchNo}}</div>
              </li>
              <li v-if="auditData.tradeTotal<=1">
                <div class="audLabel">银行名称</div>
                <div class="audata">{{bankName}}</div>
              </li>
              <!--<li>-->
                <!--<div class="audLabel">开户支行</div>-->
                <!--<div class="audata">中国银行支行</div>-->
              <!--</li>-->
            </ul>
          </div>
          <div class="clear"></div>
          <div class="audsecondBlock aduThreeBlock">
            <ul>
              <li>
                <div class="audLabel">审核状态</div>
                <div class="audata">
                  <span v-if="auditData.status == 10" class="tradeStatus">待审核</span>
                  <span v-if="auditData.status == 20" class="tradeStatus">拒绝</span>
                  <span v-if="auditData.status == 30" class="tradeStatus">审核通过</span>
                </div>
              </li>
              <li>
                <div class="audLabel">审核备注</div>
                <div class="audata audview">
                  <el-input type="textarea" v-if="auditData.status == 10" v-model="audView" placeholder="(选填)此处可以输入您的审核意见"></el-input>
                  <span v-else>{{auditData.tradeRmk }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="batchDetal" v-if="auditData.tradeTotal > 1">
            <div class="batchTitle">批次明细</div>
            <div class="batchTable">
              <el-table
                :data="batchDetalData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="序号"
                  type="index"
                  align="left"
                  min-width="50">
                </el-table-column>
                <el-table-column
                  prop="tradeAmt"
                  label="代付金额"
                  align="left"
                  min-width="120">
                </el-table-column>
                <el-table-column
                prop="feeAmt"
                min-width="120"
                align="left"
                label="服务费">
              </el-table-column>
                <el-table-column
                  prop="bankName"
                  min-width="120"
                  align="left"
                  label="收款银行">
                </el-table-column>
                <el-table-column
                  prop="bankAcctNo"
                  min-width="190"
                  align="left"
                  label="收款银行账号">
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="bankName"-->
                  <!--align="left"-->
                  <!--min-width="190"-->
                  <!--label="开户支行">-->
                <!--</el-table-column>-->
              </el-table>
            </div>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="audBtn" v-if="auditData.status == 10">
            <el-button type="primary" @click="auditRecord('30')">审核通过</el-button>
            <el-button @click="auditRecord('20')">审核拒绝</el-button>
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
export default {
  name: 'auditDetail',
  data () {
    return {
      audView: '',
      batchDetalData: [],
      auditData: {},
      batchNo: '',
      pageSize: 10,
      currentPage: 1,
      total: 10,
      bankName: '',
      isReadable: false
    }
  },
  methods: {
    auditRecord (val) {
      var that = this
      var tip = ''
      val == '30' ? (tip = '审核通过') : (tip = '审核拒绝')

      that
        .$confirm('确定' + tip + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          that.operater(val)
        })
        .catch(() => {})
    },

    operater (val) {
      var that = this
      var params = {
        batchNo: that.auditData.batchNo,
        remark: that.audView,
        status: val
      }
      that
        .$axios({
          url: '/order/proxypay/auditOrder',
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: params
        })
        .then(function (result) {
          var res = result.data
          if (res.code && res.code == '0000') {
            that.$message({
              message: '操作成功',
              type: 'success'
            })
            setTimeout(function () {
              that.$router.push('/businessAudit')
            }, 2000)
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(function (error) {
          console.log('error:', error)
        })
    },

    handleCurrentChange (val) {
      this.currentPage = val
      this.getAuditDetailData()
    },
    // 查询详情
    getDetails () {
      let that = this
      let url = '/order/proxypay/getOrderAuditDetail?batchNo=' + this.auditData.batchNo
      this.$axios.post(url).then(({data}) => {
        if (data.code === '0000') {
          if (data.data.deductType == 'IN') {
            data.data.realAccount = parseFloat(data.data.tradeAmt).toFixed(2)
          } else if (data.data.deductType == 'OUT') {
            data.data.realAccount = (parseFloat(data.data.tradeAmt) + parseFloat(data.data.feeAmt)).toFixed(2)
          }
          that.auditData = data.data
        } else {
          that.$message.error(data.message)
        }

        // realAccount = realAccount.toFixed(2)
        // data.data.realAccount = realAccount
      })
    },
    // 查询详情列表
    getAuditDetailData () {
      var that = this
      var params = {
        batchNo: that.auditData.batchNo,
        pageBean: {
          pageNo: that.currentPage,
          pageSize: that.pageSize
        }
      }
      that
        .$axios({
          url: '/order/proxypay/getOrderAuditList',
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: params
        })
        .then(function (result) {
          var res = result.data
          if (res.code && res.code == '0000') {
            that.batchDetalData = res.data.dataList
            for (var i in that.batchDetalData) {
              that.bankName = that.batchDetalData[i].bankName
              that.batchNo = that.batchDetalData[i].bankAcctNo
            }
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(function (error) {
          console.log('error:', error)
        })
    }
  },
  created () {
    this.auditData = this.$route.query
    this.getAuditDetailData()
    this.getDetails()
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
  line-height: 54px;
  position: relative;
  width: 21.3%;
  text-align: left;
}

.auditbg {
  background: #f3f3f3;
  color: #333333;
  font-size: 15px;
}

.firstAudli {
  padding-left: 44px;
  box-sizing: border-box;
  width: 36% !important;
}

.audsecondBlock {
  height: 318px;
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
  height: 157px !important;
}

.aduThreeBlock ul li:nth-of-type(2) {
  height: 100px !important;
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
  margin-bottom: 15px;
  text-align: center;
  font-size: 17px;
  font-weight: bold;
}

.block {
  margin-top: 10px;
}
.tradeStatus {
  color: red;
}
.auditDetailCont {
  margin-bottom: 50px;
}
</style>
