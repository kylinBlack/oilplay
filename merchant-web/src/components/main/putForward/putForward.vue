<template>
  <div class="putForward">
    <el-row class="pcontent">
      <el-col :xs="2" :sm="2" :md="5" :lg="5" :xl="5">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="15" :lg="15" :xl="15">
        <div class="pfTitle">
          <div class="pfleftBlock">
            可提现余额: <span class="money">{{money}}</span> 元
          </div>
          <ul>
            <li @click='addBank'>添加银行账户</li>
            <div class="pfLine"></div>
            <li>
              <router-link to="/transactRcord">查看提现记录</router-link>
            </li>
          </ul>
        </div>
        <p class="pfMark">根据银行规定，单笔提现超过5万元，请于周一到周五00:00-17:00进行提现，如遇周六周日则延迟到账时间。一般银行到账时间为2个小时，
          具体时间以到账为准。
        </p>
        <div class="changeBankIds">选择提现银行账号：</div>
        <ul class="bankList">
          <li v-for="(item,index) in showBankCardList" :key="index" :data-index="index" :class="{bgColor:ischeck == index}" @click="checkBank(index,item.bankCode)">
            <div class="banks">
              <el-radio-group v-model="bank" @change="changeBanks">
                <el-radio :label="item.bankCode" class="pfRadio"></el-radio>
              </el-radio-group>
              <img :src="$imgCodeUrl+'/download/image/'+item.bankIcon" alt="">
              <div class="bankname">{{item.bankName}}</div>
            </div>
            <div class="bankAcctNo">{{item.bankAcctNo}}</div>
            <div class="bankAcctType">{{item.bankAcctType | bankTypeFilter}}</div>
          </li>

          <div class="moreBtn" v-if="bankCardData.length>2" @click="openList">
            <el-button size="small">{{isOpen?'更多银行卡':'收起'}}</el-button>
          </div>
        </ul>
        <div class="putmoney">
          <el-form :model="putForwardForm" ref="putForwardForm" :rules="putForwardFormRules" label-width="80px"
                   class="putForwardForm">
            <el-form-item label="提现金额" prop="tradeAmt">

              <el-input type="text" v-model="putForwardForm.tradeAmt" auto-complete="off"
                        @input="changeMoney('putForwardForm')" @change="getFee"></el-input>
            </el-form-item>

            <el-tooltip class="item" effect="light"  :manual="true" placement="right-start" v-model="visible">
              <div slot="content" >
                <span class="el-icon-error"></span>
                <span >{{errorMesg}}</span>
              </div>
              <el-button type="text" class="rnb" >元</el-button>
            </el-tooltip>

            <el-form-item label="服务费">
              <div class="feeAmt ">{{feeAmt}} 元</div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="nextpage('putForwardForm')" class="putfBtn" :disabled="isclick"
                         :class="{able:isAble}">下一步
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>

  </div>
</template>
<script>
var qs = require('querystring')

export default{
  name: 'putForward',
  data () {
    var reg = /^([1-9][0-9]{0,8}|[0-9]{1,9}\.[0-9]{1,2})$/
    return {
      money: '0.00',
      bank: '',
      isclick: true,
      ischeck: 0,
      isAble: true,
      isOpen: true,
      visible: false,
      isAbleTip: true,
      isFirstEnter: true,
      errorMesg: '',
      imgurl: this.$imgCodeUrl + '/merchant',
      bankCardData: '',
      showBankCardData: [
        {bankName: '中国银行', bankCode: '1', bankAcctNo: '666666666666666', bankAcctType: '1'},
        {bankName: '建设银行', bankCode: '2', bankAcctNo: '666666666666666', bankAcctType: '1'},
        {bankName: '工商银行', bankCode: '3', bankAcctNo: '666666666666666', bankAcctType: '2'}
      ],
      feeAmt: '0.00',
      putForwardForm: {
        tradeAmt: '',
        //          bankAcctNo:'',
        cardId: ''
      },
      putForwardFormRules: {
        tradeAmt: [
          {required: true, message: '请输入提现金额', trigger: 'blur'},
          {pattern: reg, message: '请输入正确的金额', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    checkBank (val, bankcode) {
      this.ischeck = val
      this.bank = bankcode
    },

    changeMoney () {
      var that = this
      that.isclick = false
      that.isAble = false
    },

    getFee () {
      this.getServiceCharge()
    },

    addBank () {
      this.$alert('目前只能提现到结算账户。如您需要添加其他银行账户，可以联系智企银通官方客服电话400-877-5800', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    },

    nextpage (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.isclick = true
          that.$axios({
            url: '/order/proxypay/withdrawPreview',
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            data: that.putForwardForm
          }).then(function (result) {
            var res = result.data
            if (res.code == '0000') {
              that.visible = false
              that.$router.push({
                name: 'putForwardNext',
                params: res.data
              })
            } else {
              that.errorMesg = res.message
              that.visible = true
            }
          }).catch(function (error) {
            console.log('error:', error)
            that.$message.error('系统异常')
          })
          setTimeout(function () {
            that.isclick = false
          }, 800)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    getBankCardList () {
      var that = this
      that.$axios.post('/merchant/merchantInfo/getMerchantBankCards')
        .then(function (result) {
          var res = result.data
          if (res.code == '0000') {
            that.bankCardData = res.data
            that.bank = res.data[0].bankCode
            that.changeBanks(that.bank)
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(function (error) {
          console.log('getBankCardListError:', error)
        })
    },

    openList () {
      this.isOpen = !this.isOpen
    },

    getBalance () {
      var that = this
      that.$axios.post('/merchant/balance/getMerchantBalance')
        .then(function (result) {
          var res = result.data
          if (res.code == '0000') {
            that.money = that.$formatFn.formatMoney(res.data.availableBalanceAmt, 2)
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(function (error) {

        })
    },

    getServiceCharge () {
      var that = this
      var params = {
        amount: that.putForwardForm.tradeAmt
      }
      that.$axios({
        url: '/merchant/payConfig/reckonProxyPayFee',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(params)
      }).then(function (result) {
        var res = result.data
        if (res.code == '0000') {
          that.feeAmt = that.$formatFn.formatMoney(res.data.feeAmt, 2)
        } else {
          that.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log('error:', error)
      })
    },

    changeBanks (val) {
      let obj = {}
      obj = this.bankCardData.find((item) => {
        return item.bankCode === val
      })

      //        this.putForwardForm.bankAcctNo   = obj.bankAcctNo
      this.putForwardForm.cardId = obj.id
    }

  },
  computed: {
    showBankCardList () {
      var that = this
      if (that.isOpen) {
        if (that.bankCardData.length > 2) {
          var showBankCardList = []
          for (var i = 0; i < 2; i++) {
            showBankCardList.push(that.bankCardData[i])
          }
        } else {
          showBankCardList = that.bankCardData
        }
        return showBankCardList
      }
      return that.bankCardData
    }
  },

  filters: {
    bankTypeFilter (val) {
      var type = ''
      if (val == '1') {
        type = '个人账户'
      } else {
        type = '对公账户'
      }
      return type
    }
  },

  activated () {
    var that = this
    var f = window.localStorage.getItem('isBackHomePage')

    if (f == 0) {
      if (!that.isFirstEnter) {
        that.$refs.putForwardForm.resetFields()
        that.feeAmt = '0.00'
        that.$emit('changewindowSize', '', '提现')
        that.getBankCardList()
        that.getBalance()
      }
    }
    that.isFirstEnter = false
  },

  created () {
    this.$emit('changewindowSize', '', '提现')
    this.getBankCardList()
    this.getBalance()
    //      this.$router.push({
    //        name: 'putForwardNext',
    //      })
  }
}
</script>
<style scoped>
.pfMark,
.pfTitle,
.changeBankIds,
.bankList,
.bankList li,
.putmoney {
  position: relative;
  width: 100%;
}
a {
  color: #333333;
}
.pfTitle {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  margin-top: 30px;
  padding-right: 10px;
  box-sizing: border-box;
}

.pfLine {
  width: 2px;
  height: 13px;
  background: #333333;
  float: left;
  margin: 0 10px;
  top: 14px;
  position: relative;
}

.pfleftBlock {
  font-size: 16px;
}

.pfTitle ul {
  display: inline-block;
}

.pfTitle ul li {
  float: left;
  cursor: pointer;
  letter-spacing: 1px;
}

.money {
  font-size: 28px;
  color: #333333;
  opacity: 1 !important;
}

.pfleftBlock {
  color: #333333;
}

.pfMark {
  font-size: 14px;
  text-align: left;
  margin: 30px 0;
  color: #999999;
}

.changeBankIds {
  font-size: 16px;
  color: #000;
  margin-bottom: 28px;
  letter-spacing: 1px;
}

.bankList li {
  height: 50px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  color: #999999;
  padding-left: 10px;
  padding-right: 20px;
  box-sizing: border-box;
  letter-spacing: 1px;
}

.bankList li:hover {
  background: #f3f3f3;
}

.bankList li img {
  margin-left: 15px;
  height: 39px;
  width: auto;
}

.bankList li .el-radio {
  width: 6px;
  height: 6px;
  position: relative;
  top: -13px;
}

.putmoney {
  position: relative;
}

.putForwardForm {
  width: 300px;
  margin-top: 40px;
}

.feeAmt {
  position: relative;
  height: 100%;
  color: #999999;
}

.putfBtn {
  margin-top: 30px;
}

.bankname {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  display: inline-block;
  position: relative;
  top: -11px;
  left: 2px;
}

.moreBtn {
  position: relative;
  width: 100%;
  display: inline-block;
  text-align: left;
  margin-top: 20px;
}
.banks,
.bankAcctNo,
.bankAcctType {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
}
.banks {
  width: 40%;
}
.bankAcctNo {
  width: 40%;
  text-align: center;
}
.bankAcctType {
  width: 20%;
  text-align: right;
}
.rnb {
  display: block;
  position: absolute;
  top: 2px;
  left: 306px;
  color: #333333;
}
.textBtn {
  margin-left: 39px;
}
.bgColor {
  background: #f3f3f3;
}
</style>
