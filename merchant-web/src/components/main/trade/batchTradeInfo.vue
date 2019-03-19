<template>
  <div class="auditDetail">
    <el-row>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4" class="bgc-blue">
        <pre> </pre>
      </el-col>
      <!-- echo -->
      <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16" class="auditDetailCont">
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <span class="babel">您当前的位置：</span>
          <el-breadcrumb-item :to="{ path: '/batchTradeRecord' }">批量交易查询</el-breadcrumb-item>
          <el-breadcrumb-item>交易详情</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div class="auCont">
          <p class="auUnit">单位: 元</p>
          <div class="orderDetail">
            <ul class="orderCont">
              <li class="auditbg firstAudli">批次订单号</li>
              <li class="auditbg"></li>
              <li class="auditbg">{{tradeDetailData.tradeType == 'debit'? '代收' : '代付'}}金额</li>
              <li class="auditbg">服务费</li>
              <li class="auditbg">实际交易金额</li>
              <li class="firstAudli">
                <p>{{tradeDetailData.batchNo}}</p>
              </li>
              <li></li>
              <li>{{tradeDetailData.totalAmt}}</li>
              <li>{{tradeDetailData.chargeAmt}}</li>
              <li class="tcolor">{{tradeDetailData.realAmt}}</li>
            </ul>
          </div>

          <div class="audsecondBlock">
            <ul>
              <li>
                <div class="audLabel">交易类型</div>
                <div class="audata">
                  {{tradeDetailData.tradeType == 'debit'? '代收' : '代付'}}
                </div>
              </li>
              <li>
                <div class="audLabel">笔数（笔）</div>
                <div class="audata">{{tradeDetailData.totalNum}}</div>
              </li>
              <li>
                <div class="audLabel">交易情况</div>
                <div class="audata">成功{{tradeDetailData.succNum}}笔，失败{{tradeDetailData.failNum}}笔，处理中{{tradeDetailData.doingNum}}笔</div>
              </li>
              <li>
                <div class="audLabel">成功交易金额（元）</div>
                <div class="audata">{{tradeDetailData.succAmt}}</div>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
          <div class="audsecondBlock aduThreeBlock">
            <ul>
              <li>
              <div class="audLabel">创建时间</div>
              <div class="audata">{{tradeDetailData.createTime}}</div>
            </li>
              <li>
                <div class="audLabel">交易时间</div>
                <div class="audata">{{tradeDetailData.createTime}}</div>
              </li>
              <li>
                <div class="audLabel">交易说明</div>
                <div class="audata"></div>
              </li>
              <li>
                <div class="audLabel">交易状态</div>
                <div class="audata tcolor">
                  <span v-if="tradeDetailData.status == '2'">全部失败</span>
                  <span v-if="tradeDetailData.status == '3'">处理中</span>
                  <span v-if="tradeDetailData.status == '1'">全部成功</span>
                  <span v-if="tradeDetailData.status == '0'">部分成功</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="look-info">
            <el-button type="text" @click="lookInfo">查看明细</el-button>
          </div>
          <div v-if="showTable">
            <template>
              <el-table :data="detailsList" style="width: 100%" v-loading="loading" element-loading-background="rgba(255, 255, 255)"
                        element-loading-text="加载中...">
                <el-table-column prop="orderNo" label="订单号"  min-width="190"></el-table-column>
                <el-table-column prop="tradeAmt" label="代付金额"  min-width="120"></el-table-column>
                <el-table-column prop="chargeAmt" label="服务费"  min-width="120"></el-table-column>
                <el-table-column prop="bankName" label="收款银行"  min-width="120"></el-table-column>
                <el-table-column prop="bankCardNo" label="收款银行账号"  min-width="190"></el-table-column>
                <el-table-column prop="status" label="状态"  min-width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == '2'" class="tcolor">交易成功</span>
                  <span v-if="scope.row.status == '3'" class="tcolor">交易失败</span>
                  <span v-if="scope.row.status == '1'" class="tcolor">处理中</span>
                  </template>
                </el-table-column>
                <el-table-column label="备注" min-width="120" fixed="right"  prop="remark"></el-table-column>
              </el-table>
            </template>
            <div class="block">
              <el-pagination
                @current-change="CurrentChange"
                :current-page.sync="page.currentPage"
                :page-size="page.pageSize"
                layout="prev, pager, next, jumper"
                :total="page.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4" class="bgc-blue">
        <pre> </pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default{
  name: 'batchTradeInfo',
  data () {
    return {
      detailsList: [],
      tradeDetailData: {},
      loading: false,
      showTable: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 10
      },
      createTime: ''
    }
  },
  computed: {
    batchId () {
      return this.$route.query.id || 0
    }
  },
  methods: {
    // 批量交易详情查询
    getBatchTradeDetail () {
      if (!this.batchId) return
      let _this = this
      let url = 'order/batch/getBatchTradeDetail?batchId=' + this.batchId
      this.$axios.post(url).then(({data}) => {
        _this.tradeDetailData = data.data
        switch (_this.tradeDetailData.totalNum) {
          case _this.tradeDetailData.succNum:_this.$set(_this.tradeDetailData, 'status', '1'); break
          case _this.tradeDetailData.failNum:_this.$set(_this.tradeDetailData, 'status', '2'); break
          case _this.tradeDetailData.doingNum: _this.$set(_this.tradeDetailData, 'status', '3'); break
          default: _this.$set(_this.tradeDetailData, 'status', '0'); break
        }
        _this.createTime = _this.tradeDetailData.createTime
      })
    },
    // 查看明细列表查询
    getBatchOrderList (time) {
      let url = 'order/batch/getBatchOrderList'
      let params = {
        batchId: this.batchId,
        createTime: this.$utils.dateToString(time, 'yyyy-MM-dd'),
        pageBean: {
          pageSize: 10,
          pageNo: 1
        }
      }
      let _this = this
      this.$axios.post(url, params).then(({data}) => {
        _this.detailsList = data.data.dataList
      })
    },
    lookInfo () {
      this.showTable = !this.showTable
      if (this.showTable && this.createTime) {
        this.getBatchOrderList(this.createTime)
      }
    },
    CurrentChange () {

    }
  },
  created () {
    this.$emit('changewindowSize', '', '交易详情')
    this.getBatchTradeDetail()
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
  margin-top: 30px;
  color: #999999;
}

.auCont .auUnit {
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
  width: 16%;
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
  height: 180px;
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
  height: 220px !important;
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
  text-align: right;
}
.tcolor {
  color: red;
}
.auditDetailCont {
  margin-bottom: 50px;
}
.look-info {
  margin: 30px 0 20px 0;
}
.look-info > .el-button {
  display: block;
}
.bgc-blue {
  background: #0067b8;
}
.bread {
  width: 100%;
  height: 41px;
  background: #0067b8;
}
.bread .el-breadcrumb .babel {
  float: left;
}
</style>
