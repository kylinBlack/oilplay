<template>
  <div class="businessAudit">
    <el-row class="bcont">
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
        <div class="baTop">
          <div class="baItems">
            <div class="balabel">创建时间:</div>
            <div class="selectTime">
              <el-date-picker
                v-model="startTime"
                type="date"
                @change="changeStartTime"
                value-format="yyyy-MM-dd"
                :editable="false"
                :clearable="false"
                :picker-options="pickerBeginDateBefore"
                placeholder="选择日期">
              </el-date-picker>
              <div class="baline">-</div>
              <el-date-picker
                v-model="endTime"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="pickerBeginDateAfter"
                :editable="false"
                :clearable="false"
                @change="changeEndTime"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <ul class="baTime">
              <li v-for="(item,index) in timeData" :class="{activeTime:isActiveTime == index}"
                  @click="checkTime(index,item.value)">{{item.name}}
              </li>

            </ul>
          </div>
          <div class="clear"></div>
          <div class="baItems">
            <div class="balabel">交易类型:</div>
            <ul class="baTypes">
              <li v-for="(item,index) in daifuData" :class="{activeType:isActiveDealType == index}"
                  @click="checkDealType(index)">{{item.name}}
              </li>
            </ul>
          </div>
          <div class="baItems">
            <div class="balabel">交易状态:</div>
            <ul class="baTypes">
              <li v-for="(item,index) in jiaoyiData" :class="{jiaoyiType:isJiaoyiType == index}"
                  @click="checkType(index)">{{item.name}}
              </li>
            </ul>
          </div>
          <div class="baItems">
            <div class="balabel">订单号:</div>
            <el-input v-model="orderNum" class="orderNum" placeholder="请输入订单号/批次号" @change="changeBatchNo"></el-input>
          </div>
        </div>
        <div class="noAuditTable">
          <template>
            <el-table :data="auditData" style="width: 100%">
              <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
              <el-table-column prop="batchNo" label="订单号/批次号" min-width="190"></el-table-column>
              <el-table-column prop="tradeTotal" label="交易类型" min-width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.tradeTotal == 1">单笔代付</span>
                  <span v-if="scope.row.tradeTotal >= 2">批量代付</span>
                </template>
              </el-table-column>
              <el-table-column prop="tradeAmt" label="代付金额" min-width="190"  :formatter="formatterMoney"></el-table-column>
              <el-table-column prop="status" label="审核状态" min-width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 0"  >全部</span>
                  <span v-if="scope.row.status == 10"  >待审核</span>
                  <span v-if="scope.row.status == 30"  >通过</span>
                  <span v-if="scope.row.status == 20"  >不通过</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="80" fixed="right" prop="type">
                <template slot-scope="scope">
                  <el-button type="text"
                             v-if="scope.row.status == 10" @click="seeDetail(scope.row)">审批
                  </el-button>
                  <el-button type="text" v-else @click="seeDetail(scope.row)">详情
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
      <el-col :xs="2" :sm="2" :md="2" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  name: 'businessAudit',
  data () {
    return {
      startTime: '',
      endTime: '',
      isBatch: '',
      status: '',
      isActiveTime: 0,
      isActiveDealType: 0,
      isJiaoyiType: 0,
      orderNum: '',
      auditData: [],
      realAccount: 0,
      timeData: [
        { name: '今天', value: '0' },
        { name: '最近:' },
        { name: '1个月', value: '30' },
        { name: '3个月', value: '90' },
        { name: '1年', value: '365' }
      ],
      daifuData: [{ name: '全部' }, { name: '单笔代付' }, { name: '批量代付' }],
      jiaoyiData: [
        { name: '全部' },
        { name: '待审核' },
        { name: '通过' },
        { name: '不通过' }
      ],
      pageSize: 10, // 每页显示数据数量
      total: 15, // 数据总数
      currentPage: 1, // 默认打开第1页

      pickerBeginDateBefore: {
        disabledDate: time => {
          var beginDateVal = this.endTime
          if (beginDateVal) {
            return time.getTime() > beginDateVal
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  methods: {
    checkTime (index, val) {
      if (index !== 1) {
        this.isActiveTime = index
        this.getDay(val)
        this.getAuditData()
      }
    },

    checkType (index) {
      var that = this
      that.isJiaoyiType = index
      switch (index) {
        case 0:
          that.status = ''
          break
        case 1:
          that.status = 10
          break
        case 2:
          that.status = 30
          break
        case 3:
          that.status = 20
          break
      }
      this.currentPage = 1
      that.getAuditData()
    },

    handleCurrentChange (val) {
      this.currentPage = val
      this.getAuditData()
    },

    seeDetail (data) {
      this.$router.push({
        name: 'auditDetail',
        query: {batchNo: data.batchNo}
      })
    },

    getAuditData () {
      var that = this
      var params = {
        batchNo: that.batchNo,
        startTime: that.startTime,
        endTime: that.endTime,
        isBatch: that.isBatch,
        pageBean: {
          pageNo: that.currentPage,
          pageSize: that.pageSize
        },
        status: that.status
      }

      that
        .$axios({
          url: '/order/proxypay/getOrderBatchAuditList',
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: params
        })
        .then(function (result) {
          var res = result.data
          if (res.code == '0000') {
            that.auditData = res.data.dataList
            that.total = res.data.pageBean.totalCount
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(function (error) {
          console.log('error:', error)
        })
    },

    changeStartTime (val) {
      this.startTime = val
      this.currentPage = 1
      this.getAuditData()
    },

    changeEndTime (val) {
      this.endTime = val
      this.currentPage = 1
      this.getAuditData()
    },

    checkDealType (index) {
      var that = this
      that.isActiveDealType = index
      index == '0' ? (that.isBatch = '') : (that.isBatch = index)
      this.currentPage = 1
      that.getAuditData()
    },

    changeBatchNo (val) {
      this.batchNo = val
      this.currentPage = 1
      this.getAuditData()
    },
    getDay (time) {
      time = parseInt(time)
      var now = new Date()
      var startDate = new Date(now.getTime() - time * 24 * 3600 * 1000)
      var yearEnd = startDate.getFullYear()
      var monthEnd = startDate.getMonth() + 1
      var dayEnd = startDate.getDate()
      this.startTime = yearEnd + '-' + monthEnd + '-' + dayEnd

      var date = new Date()
      var yearNow = date.getFullYear()
      var monthNow = date.getMonth() + 1
      var dayNow = date.getDate()
      this.endTime = yearNow + '-' + monthNow + '-' + dayNow
    },

    formatterMoney (row, column) {
      row.tradeAmt = this.$formatFn.formatMoney(row.tradeAmt, 2)
      return row.tradeAmt
    }
  },

  created () {
    this.$emit('changewindowSize', '', '业务审核')
    this.getDay(0)
    this.getAuditData()
  }
}
</script>
<style scoped>
.bcont {
  position: relative;
  width: 100%;
  /*display: inline-block;*/
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
  width: 364px;
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
  width: 85px;
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
</style>
