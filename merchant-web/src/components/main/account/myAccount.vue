<template>
  <div class="myAccount">

    <!-- 用户信息 -->
    <div class="auseinfo">
      <p class="acempty"></p>
      <div class="userico">
        <div class="outBorder">
          <div class="innerBorder">
            <img :src="userIcon" alt="" @click="seeBaseInfo" :title="iconTip">
          </div>
        </div>
      </div>
      <p class="welText">{{greetings}}</p>
      <ul class="userdetail">
        <li>登录账号: <span>{{userInfo.userName}}</span></li>
        <li class="actext">
          <img src="../../../assets/img/authed.png" alt="" :title="userInfo.isAuth">
          <span>{{userInfo.isAuth}}</span>
          <img src="../../../assets/img/phone.png" alt="">
          <div class="acLine"></div>
          <div class="lastTime">
            上次登录时间:
            <span class="actime">{{userInfo.lastLoginTime}}</span>
          </div>
        </li>
      </ul>
      <div class="clear"></div>
      <p class="caozuo">操作员: <span>{{operator}}</span></p>
    </div>

    <el-row>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16">

        <!-- 账户信息 -->
        <div class="accountInfo">
          <p class="acTip" v-show="isShowMark && isAudit">
            <img src="../../../assets/img/laba.png" alt="">
            <span class="info">您当前有 <span class="acNum">{{auditSum}}</span> 笔业务等待审核
              <span class="seeNoAudit" @click="seeAudit">查看</span>
              <span class="hideNoAudit" @click="isShowMark = false">忽略</span>
            </span>
          </p>
          <ul class="accuntBox">
            <li>
              <p class="mtitle">可用余额 ( 元 )</p>
              <p class="acmoney">{{useableMoney}}</p>
              <div class="unuseMoneyText">
                不可用余额 ( 元 )
                <!--<el-popover-->
                <!--placement="right"-->
                <!--width="260"-->
                <!--trigger="click">-->
                <!--<div class="unuserHoverBox">-->
                <!--<p>不可用余额包含:</p>-->
                <!--<p>冻结金额: <span>{{disableMoney.frozenMoney}}</span> 元</p>-->
                <!--<p>支出在途金额: <span>{{disableMoney.pay}}</span> 元</p>-->
                <!--<p class="unmark">( 备注: 在途金额是指未成功到账的金额 )</p>-->
                <!--</div>-->
                <!--<el-button slot="reference"><img src="../../../assets/img/wenhao.png" alt="" title="点击查看详情"></el-button>-->
                <!--</el-popover>-->
              </div>
              <p class="unuseMoney">{{disableMoneySum}}</p>
            </li>
            <li class="yTrade">
              <div class="trade">
                <p class="mtitle">昨日交易汇总 ( 元 )</p>
                <p class="incomeMoney" align="left">入金金额 : <span>+ </span><span>{{inAmt}}</span></p>
                <p class="outcomeMoney" align="left">出金金额 :&nbsp; <span>- </span>&nbsp;<span>{{outAmt}}</span></p>
              </div>
            </li>
            <li class="yTrade clearBorder">
              <div class="trade" v-if="isAudit || isAllRrade">
                <p class="mtitle" align="left">其他</p>
                <!-- <div class="othercont mt">
                  <img src="../../../assets/img/bankaccount.png" alt="">
                  <span class="label">银行账户</span>
                </div> -->
                <div class="othercont" v-if="isAudit">
                  <img src="../../../assets/img/backlog.png" alt="">
                  <span class="label">待办事项 ( {{auditSum}} ) </span>
                  <el-button type="text" @click="seeAudit">查看</el-button>
                  <!--<span class="mangeT">管理</span>-->
                </div>
                <div class="othercont" v-if="isAllRrade">
                  <img src="../../../assets/img/plcx.png" alt="">
                  <span class="label">批量交易记录</span>
                  <el-button type="text" @click="seeAllRrade">查看</el-button>
                </div>
              </div>
            </li>
          </ul>
          <div class="acbtn">
            <template v-for="(item,index) in btnGroud">
              <el-button v-if="item.show" type="primary"  plain :key="item.name"
                       @click="openNewPages(item.page,index)">{{item.name}}
              </el-button>
            </template>

          </div>
        </div>
        <div class="btborder"></div>
        <div class="productclass">
          <p class="actitle">核心产品</p>
          <ul class="productclassBox">
            <li>
              <div class="mybox">
                <!-- name="slide"-->
                <transition name="slide">
                  <div class="secondBox">
                    <img src="../../../assets/img/yishou.png" alt="">
                    <p>易收</p>
                    <div class="boxText">多种收款方式,包括网银﹑快捷﹑协议﹑代扣﹑一键开通﹑快速收款</div>
                    <div class="secondBtn">
                      <el-button type="primary" @click="goMyProducts" v-show="isShowyishou&&isMyProduct">查看产品</el-button>
                      <el-button type="primary" @click="seeProductfn('yishou')" v-if="!isShowyishou&&isOpenProduct">我要开通</el-button>
                    </div>
                  </div>
                </transition>
              </div>
            </li>

            <li>
              <div class="mybox">
                <transition name="slide">
                  <div class="secondBox">
                    <img src="../../../assets/img/yifu.png" alt="">
                    <p>易付</p>
                    <div class="boxText">包括单笔/批量实时代付,快速帮助企业工资﹑报销﹑分佣等业务代付</div>
                    <div class="secondBtn">
                      <el-button type="primary" @click="goMyProducts" v-show="isShowyifu&&isMyProduct">查看产品</el-button>
                      <el-button type="primary" @click="seeProductfn('yifu')" v-if="!isShowyifu&&isOpenProduct">我要开通</el-button>
                    </div>
                  </div>
                </transition>
              </div>
            </li>

            <li>
              <div class="mybox">
                <transition name="slide">
                  <div class="secondBox">
                    <img src="../../../assets/img/yicha.png" alt="">
                    <p>易查</p>
                    <div class="boxText">查询用户的历史违约记录,过滤不良客户,包括身份认证,信用评估,黑名单等</div>
                    <div class="secondBtn">
                      <el-button type="primary" @click="goMyProducts" v-show="isShowyicha&&isMyProduct">查看产品</el-button>
                      <el-button type="primary" @click="seeProductfn('yicha')" v-if="!isShowyicha&&isOpenProduct">我要开通</el-button>
                    </div>
                  </div>
                </transition>
              </div>
            </li>
          </ul>
        </div>
        <div class="btborder"></div>
        <div class="transactData">
          <p class="actitle">交易数据</p>
          <el-tabs v-model="activeName" type="card" class="acTabs">

            <el-tab-pane label="交易统计" name="second" v-loading="echarLoading"
                         element-loading-background="rgba(255, 255, 255)"
                         element-loading-text="加载中...">

              <div class="echartTop">
                <p class="echartTitle">2018年月度业务交易金额统计</p>
                <p class="echartTip">月份：{{month}} 月</p>
                <div class="selectMonth">
                  <span>筛选：</span>
                  <el-date-picker
                    v-model="monthDate"
                    :clearable="false"
                    :editable="false"
                    type="month"
                    value-format="yyyy-MM"
                    @change="changeMonth"
                    :picker-options="dateRange"
                    placeholder="选择月">
                  </el-date-picker>
                </div>
              </div>
              <p class="ndatatip" v-show="isShowNoDataTip">{{tipWord}}</p>
              <div class="tradeSum" id="tradeSum" style="width: 600px;height:400px;" v-if="!isShowNoDataTip">

              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="btborder"></div>

        <!-- 下载对账单 -->
        <!--<div class="loadState">-->
        <!--<div class="loadStateCont" @click="loadStatefn('open')" >-->
        <!--<img src="../../../assets/img/xiazai.png" alt="">-->
        <!--下载对账单-->
        <!--</div>-->
        <!--</div>-->

      </el-col>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>

    <!-- 下载对账单 -->
    <!--<el-dialog-->
    <!--title="当日账单请于次日12点后尝试下载"-->
    <!--:visible.sync="loadState"-->
    <!--width="450px">-->
    <!--<div class="loadStateBox">-->
    <!--<el-form label-width="80px" :model="loadStateform" ref="loadStateform" :rules="loadStateformRules">-->
    <!--<el-form-item label="业务类型">-->
    <!--<el-input v-model="loadStateform.bType">-->
    <!--<el-option label="" value="">1</el-option>-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="账单日期">-->
    <!--<el-input v-model="loadStateform.stime"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="文件类型">-->
    <!--<el-input v-model="loadStateform.type"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--</div>-->
    <!--<el-button type="primary" @click="loadStatefn('loading')" >下载对账单</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->

    <!-- 实名认证认证审核进度 -->
    <el-dialog
      title="实名认证审核进度"
      :visible.sync="authProgress"
      width="580px"
      height="300px"
      class="authProgress">
      <div class="authProgressCont">
        <el-steps direction="vertical" :active="1">
          <el-step title="实名认证 1" description="已成功提交"></el-step>
          <el-step title="平台审核中 2" description="预计2-3个工作日内完成"></el-step>
          <el-step title="审核完成 3" description="平台发送通知至邮箱或手机"></el-step>
        </el-steps>
      </div>
      <el-button type="primary" class="authProgressBtn" @click="authProgress = false">确 定</el-button>
    </el-dialog>

  </div>
</template>
<script>
import copHeader from '../../lib/header.vue'
var qs = require('querystring')
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
// require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default{
  name: 'myAccount',
  data () {
    return {
      greetings: '上午好',
      isAuth: '已认证',
      isAuthNum: '',
      account: '135666666666',
      logintime: '2018-07-09',
      iconTip: '',
      operator: '管理员',
      monthDate: '',
      month: '',
      userIcon: require('../../../assets/img/tx.png'),
      tipWord: '暂无数据',
      tipWordRecord: '',
      activeName: 'second',
      tableData: [],
      isAuthFlag: '',
      loadState: false,
      authProgress: false,
      isShow: false,
      isShowNoDataTip: false,
      isShowMark: true,
      isShowyishou: false,
      isShowyifu: false,
      isShowyicha: false,
      flag: false,
      isPay: false,
      useableMoney: '0.00',
      disableMoneySum: '0.00',
      outAmt: '0.00',
      inAmt: '0.00',
      auditSum: '0',
      date: '',
      a: '10',
      userInfo: '',
      btnGroud: [
        {name: '提现', page: 'putForward', show: this.$formatFn.isPermission('withdraw_save')},
        {name: '代付', page: 'payment', show: this.$formatFn.isPermission('proxyPay_single') || this.$formatFn.isPermission('proxyPay_batch')}
        //          {name:'代收',page:''},
      ],
      activeMenuIndex: '1',
      disableMoney: {
        frozenMoney: '0.00',
        pay: '0.00',
        income: '0.00'
      },
      loadStateform: {
        bType: '',
        stime: ''
      },
      loadStateformRules: {},
      echartdata: {
        proxyPay: {}, // 代付
        proxyWithdrawPay: {}, // 提现
        proxyTake: {}, // 代扣
        recharge: {} // 充值
      },
      echarLoading: true,
      dateRange: {
        disabledDate (time) {
          var date = new Date()
          var year = date.getFullYear()
          var month = date.getMonth()
          var startYear = ''
          var startMonth = ''
          var endYear = year
          var endMonth = month

          if (month == 12) {
            startYear = year
            startMonth = 1
          } else if (month == 1) {
            startYear = year - 1
            startMonth = 2
          } else {
            var k = 1
            if (month < 12) {
              startMonth = 12
              startYear = year - 1
            }
            for (var i = 1; i < 12; i++) {
              if (k < 12) {
                k++
                if (month > 0) {
                  month--
                } else {
                  startMonth = startMonth - 1
                }
              }
            }
          }
          return time.getTime() < new Date(startYear, startMonth) || time.getTime() > new Date(endYear, endMonth)
        }
      }
    }
  },
  computed: {
    isAudit () {
      return this.$formatFn.isPermission('business_auidt_query')
    },
    isAllRrade () {
      return this.$formatFn.isPermission('batch_trade_query_func')
    },
    isMyProduct () {
      return this.$formatFn.isPermission('product_apply_detail')
    },
    isOpenProduct () {
      return this.$formatFn.isPermission('product_apply_Add')
    }
  },
  methods: {

    getBalance () {
      var that = this
      that.$axios.post('/merchant/balance/getMerchantBalance')
        .then(function (result) {
          var res = result.data
          if (res.code == '0000') {
            that.useableMoney = that.$formatFn.formatMoney(res.data.availableBalanceAmt, 2)
            that.disableMoney.pay = that.$formatFn.formatMoney(res.data.paymentTransitAmt, 2)
            that.disableMoney.income = that.$formatFn.formatMoney(res.data.debitTransitAmt, 2)
            that.disableMoneySum = parseFloat(res.data.paymentTransitAmt) + parseFloat(res.data.debitTransitAmt)
            that.disableMoneySum = that.$formatFn.formatMoney(that.disableMoneySum, 2)
            that.disableMoney.frozenMoney = that.disableMoney.pay
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(function (error) {
          console.log('getBalanceError:', error)
        })
    },

    getYesterdayTrad () {
      var that = this
      that.$axios.post('/merchant/trade/summary/getMerchantYestodaySummary')
        .then(function (result) {
          var res = result.data
          if (res.code == '0000') {
            that.outAmt = res.data.outAmt
            that.inAmt = res.data.inAmt
          }
        })
        .catch(function (error) {
          console.log('getYesterdayTradError:', error)
        })
    },

    drawLine () {
      var that = this
      let tradeEchart = echarts.init(document.getElementById('tradeSum'))
      tradeEchart.setOption({
        title: {
          text: '', // 标题文本
          left: 'center'
        },
        dataset: {},
        tooltip: {
          trigger: 'item',
          //            formatter: "{a} <br/>{b}: {c} " //标签内容格式器
          padding: [10, 15],
          formatter: function (params, ticket, dom, callback) {
            var htmlStr = '<div style="width: 208px;height: 63px;">'
            htmlStr += '<p>' + params.name + '</p><p style="display: flex;justify-content: space-between"><span>交易量 :</span><span>' + params.data.value + '</span></p><p style="display: flex;justify-content: space-between"><span>交易笔数 :</span><span>' + params.data.count + '</span></p>'
            htmlStr += '</div>'
            return htmlStr
          }
        },
        legend: {
          orient: 'vertical',
          right: 20,
          bottom: 20,
          data: [
            {name: '充值', val: that.echartdata.recharge.percent + '%'},
            {name: '提现', val: that.echartdata.proxyWithdrawPay.percent + '%'},
            {name: '代付', val: that.echartdata.proxyPay.percent + '%'},
            {name: '代扣', val: that.echartdata.proxyTake.percent + '%'}
          ], // 扇形区域名称
          formatter: function (name) {
            var val = ''
            switch (name) {
              case '充值':
                val = that.echartdata.recharge.percent + '%'
                break
              case '提现':
                val = that.echartdata.proxyWithdrawPay.percent + '%'
                break
              case '代付':
                val = that.echartdata.proxyPay.percent + '%'
                break
              case '代扣':
                val = that.echartdata.proxyTake.percent + '%'
                break
            }
            if (val) {
              return name + val
            } else {
              return name
            }
          }
        },
        color: ['#33EAC4', '#baa2f9', '#79A4F3', '#f3c479'],
        series: [
          {
            name: '', // 提示框标题
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },

            data: [
              {value: that.echartdata.recharge.tradeAmt, name: '充值', count: that.echartdata.recharge.count},
              {
                value: that.echartdata.proxyWithdrawPay.tradeAmt,
                name: '提现',
                count: that.echartdata.proxyWithdrawPay.count
              },
              {value: that.echartdata.proxyPay.tradeAmt, name: '代付', count: that.echartdata.proxyPay.count},
              {value: that.echartdata.proxyTake.tradeAmt, name: '代扣', count: that.echartdata.proxyTake.count}
            ], // 扇形区域数据
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },

    getEchartsData () {
      var that = this
      var data = {
        month: that.monthDate
      }

      that.$axios({
        url: '/order/trade/report/getOrderReortMonth',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data
      }).then(function (result) {
        var res = result.data
        if (res.code && res.code == '0000') {
          that.echarLoading = false
          var sum = 0

          for (var i = 0, len = res.data.length; i < len; i++) {
            var t = res.data[i].tradeType
            switch (t) {
              case 'proxyPay':
                that.echartdata.proxyPay = res.data[i]
                //   that.echartdata.proxyPay.percent = res.data[i].tradeAmt;

                break
              case 'proxyWithdrawPay':
                that.echartdata.proxyWithdrawPay = res.data[i]
                break
              case 'proxyTake':
                that.echartdata.proxyTake = res.data[i]
                break
              case 'recharge':
                that.echartdata.recharge = res.data[i]
                break
            }
            sum += parseFloat(res.data[i].tradeAmt)
          }

          var d = that.echartdata
          d.proxyPay.percent = Math.round((parseFloat(d.proxyPay.tradeAmt) / sum) * 100)
          d.proxyWithdrawPay.percent = Math.round((parseFloat(d.proxyWithdrawPay.tradeAmt) / sum) * 100)
          d.proxyTake.percent = Math.round((parseFloat(d.proxyTake.tradeAmt) / sum) * 100)
          d.recharge.percent = Math.round((parseFloat(d.recharge.tradeAmt) / sum) * 100)

          if (isNaN(d.proxyPay.percent)) {
            that.isShowNoDataTip = true
            that.tipWord = '暂无数据'
          } else {
            that.isShowNoDataTip = false
            setTimeout(function () {
              that.drawLine() // 图标
            }, 500)
          }
        } else {

        }
      })
        .catch(function (error) {
          console.log('getEchartsDataError:', error)
        })
    },

    openNewPages (page, index) {
      var that = this
      if (that.isAuthFlag) {
        if (that.flag || that.isPay) {
          that.$router.push('/' + page)
        } else {
          that.$confirm('您尚未开通此产品功能', '温馨提示', {
            confirmButtonText: '立即开通',
            center: true,
            showCancelButton: false,
            customClass: 'isAuthTipBox'
          }).then(() => {
            that.seeProductfn('yifu')
          }).catch(() => {

          })
        }
      } else {
        that.isAuthBox()
      }
    },
    // 提现代付权限查询
    isPayStatus () {
      this.$axios.post('/merchant/mpProductApply/queryPayStatus').then(({data}) => {
        if (data.code === '0000') {
          data.data === 'Y' ? this.isPay = true : this.isPay = false
        }
      })
    },
    isAuthBox () {
      var that = this
      if (window.localStorage.getItem('isfirstIn') == 1) {
        that.authProgress = true
      } else {
        this.$confirm(that.tipWordRecord, '温馨提示', {
          confirmButtonText: '立即认证',
          center: true,
          showCancelButton: true,
          customClass: 'isAuthTipBox'
        }).then(() => {
        // 确定
          that.$router.push('/auth')
        }).catch(() => {
        // 取消
        })
      }
    },

    seeBaseInfo () {
      if (!this.$formatFn.isPermission('merchant_query') && !this.$formatFn.isPermission('sub_merchant_query')) return
      if (this.isAuthNum == 1) {
        this.iconTip = ''
      } else if (this.isAuthNum == 2) {
        this.$router.push('/baseInfo')
      } else if (this.isAuthNum == -1 || this.isAuthNum == 3) {
        this.$router.push('/auth')
      }
    },

    getAuditedSum () {
      var that = this
      that.$axios({
        url: '/order/proxypay/getTradeOrderBatchAuditCount',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (result) {
          var res = result.data
          if (res.code && res.code == '0000') {
            that.auditSum = res.data
            if (that.auditSum == '0') {
              // that.isShowMark = false
            }
          } else {
            that.$message.error(res.message)
          }
        }).catch(function (error) {
          console.log('error:', error)
        })
    },

    // 查看待审
    seeAudit () {
      this.$router.push('/businessAudit')
    },

    seeProductfn (type) {
      var that = this
      if (that.isAuthFlag) {
        that.$router.push({
          name: 'productAsk',
          params: {
            name: type
          }
        })
      } else {
        that.isAuthBox()
      }
    },

    changeMonth (val) {
      this.monthDate = val
      this.month = val.split('-')[1]
      this.getEchartsData()
    },

    getProducts () {
      var that = this
      that.$axios.post('/merchant/mpProductApply/queryMyProduct').then(function (result) {
        that.loading = false
        var res = result.data
        if (res.code == '0000') {
          for (var i = 0, len = res.data.length; i < len; i++) {
            var p = res.data[i].productType
            let isOpen = res.data[i].isOpen
            switch (p) {
              case '01':
                that.isShowyishou = true
                break
              case '02':
                that.isShowyifu = true
                if (isOpen == 'Y') { that.flag = true } else { that.flag = false }
                break
              case '03':
                that.isShowyicha = true
                break
            }
          }
        } else {
          that.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log('getProductError:', error)
      })
    },

    goMyProducts () {
      this.$router.push('/myProduct')
    },

    isAuthfn () {
      var that = this
      var userinfo = window.localStorage.getItem('userinfo')
      userinfo = JSON.parse(userinfo)
      if (userinfo) {
        that.userInfo = userinfo
        var isAuth = userinfo.auditStatus
        that.isAuthNum = userinfo.auditStatus
        userinfo.type === '20' ? that.operator = '管理员' : that.operator = userinfo.nickName

        if (isAuth !== 2) {
          that.isShowNoDataTip = true
          that.tipWord = '暂无数据'
          that.echarLoading = false
          that.isAuthFlag = false
        } else {
          that.isShowNoDataTip = false
          that.echarLoading = true
          that.isAuthFlag = true
        }
        switch (isAuth) {
          case -1:
            that.tipWordRecord = '您尚未完成实名认证，请先认证'
            that.userInfo.isAuth = '未认证'
            that.iconTip = '点击去认证'
            break
          case 1:
            var isfirstIn = window.localStorage.getItem('isfirstIn')
            isfirstIn == 1 ? that.authProgress = true : ''
            that.userInfo.isAuth = '审核中'
            break
          case 2:
            that.userInfo.isAuth = '已认证'
            that.iconTip = '点击查看基本信息'
            that.getBalance() // 余额
            that.getYesterdayTrad() // 昨日交易
            that.getAuditedSum() // 待审核笔数
            this.isMyProduct && this.getProducts()
            break
          case 3:
            that.tipWord = '无交易数据'
            that.tipWordRecord = '您的实名认证审核未成功，请重新认证'
            that.iconTip = '点击去认证'
            that.userInfo.isAuth = '审核未通过'
            break
        }
        ;
        if (userinfo.picUrl) {
          that.userIcon = that.$imgCodeUrl + '/download/image/' + userinfo.picUrl
        } else {
          that.userIcon = require('../../../assets/img/tx.png')
        }
      }
    },

    initData () {
      var userName = this.userInfo.userName
      var merchantName = this.userInfo.merchantName
      if (merchantName != null && merchantName != '' && merchantName != 'undefined') {
        userName = merchantName
      }
      if (userName != null && userName.length > 20) {
        userName = userName.substr(0, 20) + '......'
      }

      var now = new Date()
      var h = now.getHours()
      if (h >= 6 && h <= 11) {
        this.greetings = '上午好'
      } else if (h >= 12 && h <= 18) {
        this.greetings = '下午好'
      } else if (h >= 19 || h <= 5) {
        this.greetings = '晚上好'
      }
      this.greetings += '，' + userName
    },
    // 批量交易记录入口
    seeAllRrade () {
      this.$router.push({name: 'batchTradeRecord'})
    }
  },

  mounted () {
    if (this.isAuthNum == 2) {
      var date = new Date()
      var year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.monthDate = year + '-' + this.month
      this.getEchartsData()
    }
  },

  components: {
    copHeader
  },

  created () {
    this.isAuthfn()
    this.initData()
    this.isPayStatus()
    this.$emit('changewindowSize', '', '', true, 'myAccount')
    window.localStorage.setItem('isBackHomePage', 0)
  }
}
</script>
<style scoped>
/*  导航菜单 */
p,
div,
span,
ul,
li {
  font-family: 'Microsoft YaHei UI' !important;
}
.accNav {
  position: absolute;
  width: 100%;
  height: 80px;
  z-index: 30;
  top: 44px;
}

.accNav .el-row {
  position: relative;
  width: 100%;
}

.accNav .el-row,
.accNav .el-col {
  height: 100%;
  line-height: 80px;
}

/*  用户信息 */
.auseinfo {
  position: relative;
  width: 100%;
  height: 370px;
  background: #0067b8;
  color: white;
}

.auseinfo p {
  position: relative;
  width: 100%;
  text-align: center;
  color: white;

  letter-spacing: 1px;
}

.clear {
  clear: both;
}

.userdetail {
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}

.userdetail,
.caozuo {
  font-size: 14px;
}

.userdetail li {
  float: left;
  padding-right: 10px;
}

.acLine {
  width: 2px;
  background: white;
  height: 14px;
  opacity: 0.8;
  float: left;
  margin-left: 5px;
  margin-right: 8px;
  margin-top: 11px;
}

.welText {
  font-size: 22px;
  font-weight: normal;
  padding-bottom: 11px;
}

.welText,
.userdetail,
.caozuo {
  height: 30px;
  line-height: 30px;
}

.caozuo,
.userdetail {
  opacity: 0.9;
}

.acempty {
  position: relative;
  width: 100%;
  height: 57px;
}

.actext {
  display: flex;
  align-content: center;
}

.actext img {
  margin: 10px 5px;
}

.actime {
  padding-left: 5px;
}

.userico {
  padding-bottom: 20px;
  position: relative;
  width: 100%;
  text-align: center;
}

.outBorder {
  display: flex;
  height: 100px;
  width: 100px;
  background: #3385c6;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 10;
  box-sizing: border-box;
}

.innerBorder {
  background: #118fed;
  display: flex;
  height: 86px;
  width: 86px;
  border-radius: 43px;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
  box-sizing: border-box;
  z-index: 20;
}

.userico img {
  position: relative;
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 40px;
  z-index: 30;
}

/*  账户信息 */
.accountInfo {
  margin-top: 24px;
}

.acTip {
  position: relative;
  width: 100%;
  color: #333333;
  font-size: 16px;
}

.acTip img {
  margin-right: 10px;
  vertical-align: middle;
}

.acTip .info {
  vertical-align: middle;
}

.acNum,
.seeNoAudit {
  color: #2f83c5;
}

.seeNoAudit {
  margin: 0 10px;
}

.hideNoAudit {
  color: #999999;
}

.seeNoAudit,
.hideNoAudit {
  cursor: pointer;
}

.accuntBox {
  position: relative;
  width: 100%;
  margin-top: 80px;
}

.accuntBox li {
  position: relative;
  float: left;
  width: 33%;
  border-right: 1px solid #f4f4f4;
  height: 163px;
}

.mtitle {
  font-size: 18px;
  color: #333333;
  padding-bottom: 10px;
}

.acmoney {
  height: 50px;
  line-height: 50px;
  font-size: 26px;
  color: #2f83c5;
}

.unuseMoneyText {
  font-size: 16px;
  color: #333333;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.unuseMoney {
  font-size: 15px;
  color: #333333;
  height: 40px;
  line-height: 40px;
}

.unuseMoneyText img {
  margin-left: 8px;
  cursor: pointer;
}

.unuseMoneyText .el-button {
  border: none;
}

.unuseMoneyText .el-button:focus,
.unuseMoneyText .el-button:hover {
  background-color: white;
}

.unuserHoverBox {
  height: 115px;
  font-size: 12px;
  /*padding:10px 20px*/
}

.unuserHoverBox p {
  height: 25px;
  line-height: 25px;
  /*letter-spacing: 1px;*/
  color: #333333;
}

.unmark {
  color: #999999 !important;
}

.trade {
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-left: 30%;
}

.incomeMoney,
.outcomeMoney {
  font-size: 16px;
  color: #333333;
  margin: 10px 0;
  display: inline-block;
}

.incomeMoney span {
  color: #0067b8;
  font-size: 26px;
}

.outcomeMoney span {
  color: #ff103d;
  font-size: 26px;
}

.trade .mtitle {
  display: inline-block;
}

.othercont {
  position: relative;
  width: 100%;
  line-height: 26px;
  height: 26px;
  margin: 10px 0;
  text-align: left;
}

.othercont.mt {
  margin-top: 15px;
}

.othercont img {
  margin-right: 10px;
  vertical-align: middle;
}

.othercont > .label {
  vertical-align: middle;
}

.mangeT {
  color: #0067b8;
  margin-left: 5px;
  cursor: pointer;
}

.clearBorder {
  border: none !important;
}

.yTrade {
  text-align: center;
}

.acbtn {
  position: relative;
  width: 100%;
  margin-top: 20px;
  display: inline-block;
}

.acbtn .el-button {
  border: none;
  color: white !important;
}

.btborder {
  position: relative;
  width: 100%;
  height: 1px;
  background: #f7f7f7;
  margin: 48px 0;
}

/*  核心产品 */
.actitle {
  text-align: center;
  font-size: 32px;
  color: #333333;
}

.productclassBox {
  position: relative;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  display: inline-block;
}

.productclassBox li {
  float: left;
  width: 33.33%;
  position: relative;
  text-align: center;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.acTabs {
  box-shadow: 0 0 10px #dadada;
  margin-top: 55px;
}

.secondBox {
  box-shadow: 0 0 10px #dadada;
}

.tableBtn {
  color: #22529c;
}

.seeAllData {
  color: #22529c;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  margin: 17px 0;
  cursor: pointer;
}

.tradeEchart,
.tradeEchartCont {
  position: relative;
  width: 100%;
}

.tradeEchartCont li {
  float: left;
  width: 33%;
}

.tradeEchartTitle {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.tradeEchartM {
  color: #8d8d8d;
  font-size: 14px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.changeM {
  width: 66px;
}

.changeMBox {
  text-align: right;
}

.tradeSum {
  margin: 0 auto;
}

/* 下载对账单 */

.loadState {
  position: relative;
  width: 100%;
  color: #333333;
  margin-bottom: 42px;
}

.loadStateCont {
  height: 40px;
  line-height: 40px;
  background: #f1f1f1;
  padding: 0 20px;
  width: 114px;
  cursor: pointer;
}

.boxText {
  width: 80%;
  margin: 0 auto;
  color: #999999;
  font-size: 12px;
  text-align: left;
  padding-top: 20px;
  box-sizing: border-box;
  line-height: 20px;
  letter-spacing: 1px;
}

.secondBox {
  position: relative;
  width: 100%;
  padding: 24px 0;
  max-height: 100%;
  box-sizing: border-box;
  height: 100%;
}

.mybox {
  text-align: center;
  height: 280px;
  width: 260px;
}

.mybox p {
  font-size: 24px;
  color: #333333;
  padding-top: 10px;
}

.boxText {
  width: 80%;
  margin: 0 auto;
  color: #999999;
  font-size: 12px;
  text-align: left;
  padding-top: 20px;
  box-sizing: border-box;
  line-height: 20px;
}

.secondBtn {
  /*padding-top:10px;*/
  position: absolute;
  bottom: 24px;
  text-align: center;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

.ndatatip,
.echartTitle,
.echartTip {
  text-align: center;
  font-family: 'Microsoft YaHei UI Light';
}

.ndatatip {
  margin-top: 233px;
  color: #999999;
}

.echartTitle {
  font-size: 16px;
  color: #333333;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  letter-spacing: 1px;
}

.echartTip {
  font-size: 16px;
  color: #666666;
}

.echartTop {
  position: relative;
  /*top: -250px;*/
}

.selectMonth {
  position: absolute;
  right: 10px;
  top: 10px;
}

.selectMonth .el-date-editor.el-input {
  width: 116px;
}

.authProgressCont {
  height: 332px;
  width: 30%;
  margin: 0 auto;
}

.authProgressBtn {
  margin-top: 30px;
}
</style>
