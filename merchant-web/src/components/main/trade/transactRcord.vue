<template>
  <div class="businessAudit" v-loading="tradeTableLoading">
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
                v-model="tradeRecordData.createTime"
                type="date"
                value-format="yyyy-MM-dd"
                @change="changeTime"
                :picker-options="dateRange"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <!--<ul class="baTime">-->
              <!--<li v-for="(item,index) in timeData" :class="{activeTime:isActiveTime == index}"-->
                  <!--@click="checkTime(index)">{{item.name}}-->
              <!--</li>-->

            <!--</ul>-->
          </div>
          <div class="clear"></div>
          <div class="baItems">
            <div class="balabel">交易类型:</div>
            <ul class="baTypes">
              <li v-for="item in daifuData" :key="item.value" :class="{activeType:isActiveType == item.index}"
                  @click="checkTradeType(item.index,item.value,item.name)">{{item.name}}
              </li>
            </ul>
          </div>

          <div class="baItems">
            <div class="balabel">交易状态:</div>
            <ul class="baTypes">
              <li v-for="(item,index) in tradeStatus" :key="item.value" :class="{jiaoyiType:isTradeStatus == index}"
                  @click="checkTradeStatus(index,item.value)">{{item.name}}
              </li>
            </ul>
          </div>
          <p class="moreBtn"><el-button type="text" @click="changeMoreTerm">更多搜索条件</el-button></p>
          <div class="baItems" v-if="isShowMoreTerm">
            <div class="balabel">订单号:</div>
              <el-input v-model="tradeRecordData.orderNo" class="orderNum" @change="inputChange" placeholder="请输入订单号"></el-input>
            </div>
        </div>
        <div class="baItems" v-if="isShowMoreTerm">
          <div class="balabel">对方账户:</div>
          <el-input v-model="tradeRecordData.bankNo" class="orderNum" @change="inputChange" placeholder="请输入银行卡号"></el-input>
        </div>
        <div class="noAuditTable">
          <template>
            <el-table :data="tableData" style="width: 100%"  element-loading-background="rgba(255, 255, 255)"
                      element-loading-text="加载中...">

              <el-table-column prop="createTime" label="创建时间"  min-width="160"></el-table-column>

              <el-table-column prop="orderNo" label="订单号"  min-width="190"></el-table-column>

              <el-table-column prop="tradeAmt" label="交易金额"  min-width="120" :formatter="formatterMoney"></el-table-column>
              <el-table-column prop="status" label="交易状态"  min-width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '2'">成功</span>
                  <span v-if="scope.row.status == '3'">失败</span>
                  <span v-if="scope.row.status == '1'">处理中</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="120" fixed="right"  prop="type">
                <template v-if="isDetails" slot-scope="scope">
                    <el-button type="text" @click="seeDetail(scope.row)">详情
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
  name: 'transactRcord',
  data () {
    return {
      isActiveTime: 0,
      isActiveType: 0,
      isTradeStatus: 0,
      tradeTableLoading: false,
      isShowMoreTerm: false,
      tradeTypeName: '代付',
      tradeRecordData: {
        createTime: '',
        bankNo: '',
        orderNo: '',
        orderType: 'proxyPay',
        status: '2',
        pageBean: {
          pageNo: 1,
          pageSize: 10
        }
      },
      tableData: [],
      //        timeData: [
      //          {name: '今天'},
      //          {name: '最近:'},
      //          {name: '1个月'},
      //
      //        ],
      daifuData: [
        {name: '代付', value: 'proxyPay', index: 0},
        {name: '提现', value: 'proxyWithdrawPay', index: 1},
        {name: '代扣', value: 'proxyTake', index: 2},
        {name: '充值', value: 'recharge', index: 3}

      ],

      tradeStatus: [
        {name: '成功', value: '2'},
        {name: '失败', value: '3'},
        {name: '处理中', value: '1'}
      ],

      pageSize: 5, // 每页显示数据数量
      total: 15, // 数据总数
      currentPage: 1, // 默认打开第1页
      dateRange: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    isDetails () {
      return this.$formatFn.isPermission('trade_detail_func')
    }
  },
  methods: {
    getTradeList () {
      var that = this
      this.tradeTableLoading = true
      that.$axios({
        url: '/order/trade/getOrderList',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: that.tradeRecordData
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

    checkTime (index) {
      if (index !== 1) {
        this.isActiveTime = index
        this.getTradeList()
      }
    },

    changeTime (v) {
      console.log('v:', v)
      this.getTradeList()
    },

    checkTradeType (index, val, name) {
      this.isActiveType = index
      this.tradeRecordData.orderType = val
      this.tradeRecordData.pageBean.pageNo = 1
      this.tradeTypeName = name
      this.getTradeList()
    },

    checkTradeStatus (index, val) {
      this.isTradeStatus = index
      this.tradeRecordData.status = val
      this.tradeRecordData.pageBean.pageNo = 1
      this.getTradeList()
    },

    handleCurrentChange (val) {
      this.tradeRecordData.pageBean.pageNo = val
      this.getTradeList()
    },

    seeDetail (data) {
      let queryData = {
        createTime: Number(this.$utils.stringToDate(this.tradeRecordData.createTime)),
        orderNo: data.orderNo,
        tradeTypeName: this.tradeTypeName,
        orderType: this.tradeRecordData.orderType
      }
      // data.createTime = Number(this.$utils.stringToDate(this.tradeRecordData.createTime))
      // data.tradeTypeName = this.tradeTypeName
      // data.orderType = this.tradeRecordData.orderType
      this.$router.push({
        name: 'tradeRecordDetail',
        query: queryData
      })
    },

    changeMoreTerm () {
      this.isShowMoreTerm = !this.isShowMoreTerm
    },

    inputChange () {
      this.tradeRecordData.pageBean.pageNo = 1
      this.getTradeList()
    },

    formatterMoney (row, column) {
      row.tradeAmt = this.$formatFn.formatMoney(row.tradeAmt, 2)
      return row.tradeAmt
    },

    fromDrawPay () {
      let list = this.daifuData.filter(item => item.value === 'proxyWithdrawPay')
      this.isActiveType = list[0].index
      this.tradeRecordData.orderType = list[0].value
      this.tradeRecordData.pageBean.pageNo = 1
      this.tradeTypeName = list[0].name
      this.getTradeList()
    }
  },

  created () {
    this.$emit('changewindowSize', '', '', true, 'transactRcord')
    this.tradeRecordData.createTime = this.$utils.dateToString(new Date(), 'yyyy-MM-dd')
    if (this.$route.params.type === 'proxyWithdrawPay') {
      this.fromDrawPay()
    } else {
      this.getTradeList()
    }
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
  width: 198px;
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
  width: 160px;
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
</style>
