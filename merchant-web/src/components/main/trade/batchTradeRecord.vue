<template>
  <div class="businessAudit">
    <el-row class="bcont">
      <el-col :xs="2" :sm="2" :md="3" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
        <div class="baTop">
          <div class="baItems">
            <div class="balabel">创建时间:</div>
            <div class="selectTime">
              <el-date-picker
                v-model="createTime"
                type="daterange"
                unlink-panels
                value-format="yyyy-MM-dd"
                @change="changeTime"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <div class="time-btn">
                <span>今天</span>
                <span>|</span>
                <span>最近：
                  <span class="btn activeTime">1个月</span>
                  <span class="btn">3个月</span>
                  <span class="btn">1年</span>
                </span>
              </div>
            </div>
          </div>
          <div class="clear"></div>
          <div class="baItems">
            <div class="balabel">交易类型:</div>
            <ul class="baTypes">
              <li v-for="item in daifuData" :key="item.value" :class="{activeType:isActiveType == item.index}"
                  @click="checkTradeType(item)">{{item.name}}
              </li>
            </ul>
          </div>

          <div class="baItems" v-if="false">
            <div class="balabel">交易状态:</div>
            <ul class="baTypes">
              <li v-for="(item,index) in tradeStatus" :key="item.value" :class="{jiaoyiType:isTradeStatus == index}"
                  @click="checkTradeStatus(index,item.value)">{{item.name}}
              </li>
            </ul>
          </div>
          <div class="baItems">
            <div class="balabel">批次号:</div>
              <el-input v-model="tradeRecordData.batchNo" class="orderNum" @change="inputChange" placeholder="请输入订单号"></el-input>
            </div>
          </div>
        <div class="noAuditTable">
          <template>
            <el-table :data="tableData" style="width: 100%" v-loading="tradeTableLoading" element-loading-background="rgba(255, 255, 255)"
                      element-loading-text="加载中...">
              <el-table-column prop="createTime" label="创建时间"  min-width="160"></el-table-column>
              <el-table-column prop="batchNo" label="批次号"  min-width="190"></el-table-column>
              <el-table-column prop="tradeType" label="交易类型"  min-width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.tradeType == 'payment'">代付</span>
                  <span v-if="scope.row.tradeType == 'debit'">代收</span>
                </template>
              </el-table-column>
              <el-table-column prop="totalNum" label="交易笔数"  min-width="120"></el-table-column>
              <el-table-column prop="totalAmt" label="总金额（元）"  min-width="120" :formatter="formatterMoney"></el-table-column>
              <!-- <el-table-column prop="status" label="状态"  min-width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '2'">成功</span>
                  <span v-if="scope.row.status == '3'">失败</span>
                  <span v-if="scope.row.status == '1'">处理中</span>
                </template>
              </el-table-column> -->
              <el-table-column label="操作" min-width="120" fixed="right"  prop="type">
                <template slot-scope="scope" v-if="isDetails">
                    <el-button type="text" @click="seeInfo(scope.row)">详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
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
      </el-col>
      <el-col :xs="2" :sm="2" :md="3" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default{
  name: 'batchTradeRecord',
  data () {
    return {
      isActiveTime: 0,
      isActiveType: 0,
      isTradeStatus: 0,
      tradeTableLoading: false,
      isShowMoreTerm: false,
      tradeTypeName: '代付',
      createTime: [],
      tradeRecordData: {
        startTime: '',
        batchNo: '',
        endTime: '',
        tradeType: '',
        pageBean: {
          pageNo: 1,
          pageSize: 20
        }
      },
      tableData: [],
      daifuData: [
        {name: '全部', value: '', index: 0},
        {name: '代付', value: 'payment', index: 1},
        {name: '代收', value: 'debit', index: 2}
      ],
      tradeStatus: [
        {name: '全部', value: '0'},
        {name: '成功', value: '2'},
        {name: '失败', value: '3'},
        {name: '部分成功', value: '4'},
        {name: '处理中', value: '1'}
      ],

      pageSize: 20, // 每页显示数据数量
      total: 10, // 数据总数
      currentPage: 1 // 默认打开第1页
    }
  },
  computed: {
    isDetails () {
      return this.$formatFn.isPermission('batch_trade_query_qetail')
    }
  },
  methods: {
    getTradeList () {
      let that = this
      this.tradeRecordData.startTime = this.createTime[0]
      this.tradeRecordData.endTime = this.createTime[1]
      if (!this.tradeRecordData.startTime || !this.tradeRecordData.endTime) return
      this.tradeTableLoading = true
      this.$axios({
        url: '/order/batch/getBatchTrade',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.tradeRecordData
      }).then(function (result) {
        var res = result.data
        that.tradeTableLoading = false
        if (res.code && res.code === '0000') {
          that.tableData = res.data.dataList
          that.total = res.data.pageBean.totalCount
        } else {
          that.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log('error:', error)
      })
    },
    changeTime (v) {
      this.getTradeList()
    },

    checkTradeType (item) {
      this.isActiveType = item.index
      this.tradeRecordData.tradeType = item.value
      this.tradeRecordData.pageBean.pageNo = 1
      this.tradeTypeName = item.name
      this.getTradeList()
    },

    checkTradeStatus (index, val) {
      // this.isTradeStatus = index
      // this.tradeRecordData.status = val
      // this.tradeRecordData.pageBean.pageNo = 1
      // this.getTradeList()
    },

    handleCurrentChange (val) {
      this.tradeRecordData.pageBean.pageNo = val
      this.getTradeList()
    },

    seeInfo (data) {
      this.$router.push({
        name: 'batchTradeInfo',
        query: {id: data.batchId}
      })
    },

    inputChange () {
      this.tradeRecordData.pageBean.pageNo = 1
      this.getTradeList()
    },

    formatterMoney (row, column) {
      row.totalAmt = this.$formatFn.formatMoney(row.totalAmt, 2)
      return row.totalAmt
    }
  },

  created () {
    let dateObj = new Date()
    this.$emit('changewindowSize', '', '交易详情')
    this.createTime[1] = this.$utils.dateToString(new Date(), 'yyyy-MM-dd')
    this.createTime[0] = this.$utils.dateToString(dateObj.setMonth(dateObj.getMonth() - 1), 'yyyy-MM-dd')
    this.getTradeList()
  }
}
</script>
<style scoped>
.bcont {
  position: relative;
  width: 100%;
  display: inline-block;
}
.clear {
  clear: both;
}

.baTop,
.baItems,
.noAuditTable,
.block {
  position: relative;
  width: 100%;
}
.baItems {
  height: 40px;
  margin-bottom: 16px;
  font-size: 15px;
  color: #333333;
}
.baTop {
  margin-top: 35px;
}

.balabel,
.selectTime,
.baline,
.baTime {
  float: left;
  font-size: 15px;
  color: #333333;
}

.balabel {
  width: 95px;
  text-align: right;
  padding-right: 15px;
  height: 40px;
  line-height: 40px;
  letter-spacing: 1.5px;
}

.selectTime {
  display: inline-block;
}

.baTime,
.baTypes {
  height: 40px;
  line-height: 40px;
}

.baTime li {
  float: left;
  width: 60px;
  text-align: center;
  cursor: pointer;
}
.baTypes li {
  float: left;
  width: 95px;
  text-align: center;
  cursor: pointer;
}
.selectTime .el-date-editor {
  float: left;
}

.baline {
  width: 30px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.activeTime,
.activeType,
.jiaoyiType {
  background: #2f8be9;
  color: white;
}
.orderNum {
  width: 32.5%;
}
.noAuditTable {
  margin-top: 66px;
}
.block {
  text-align: right;
  margin-top: 30px;
  margin-bottom: 40px;
}
.moreBtn {
  padding-left: 22px;
}
.time-btn {
  float: left;
  line-height: 40px;
  margin-left: 30px;
}
.time-btn span {
  display: inline-block;
  margin: 0 10px;
  font-size: 16px;
}
.time-btn .btn {
  width: 95px;
  margin: 0;
  text-align: center;
}
.time-active {
}
</style>
