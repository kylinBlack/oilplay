<template>
  <div class="putForwardNext">
    <el-row>
      <el-col :xs="2" :sm="2" :md="5" :lg="5" :xl="5">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="15" :lg="15" :xl="15">
        <div class="pfTitle">
          <div class="pfleftBlock">
            确认提现信息
          </div>
        </div>
        <div class="putCont">
          <el-form :model="putForwardNextForm" ref="putForwardNextForm" :rules="putForwardNextFormRules"
                   label-width="100px" class="putForwardNextForm">
            <el-form-item label="账户信息" prop="putpMoney">
              <p class="formBox">
                <span>智企银通</span>
                ( <span>{{bankInfo.bankName}}</span>
                <span class="spanLine"></span>
                <span class="bank">{{bankInfo.bankAcctNo}}</span> )
              </p>
            </el-form-item>

            <el-form-item label="提现金额" prop="putpMoney">
              <p class="formBox">{{bankInfo.tradeAmt}} 元</p>
            </el-form-item>
            <el-form-item label="服务费">
              <p class="formBox">{{bankInfo.feeAmt}} 元</p>
            </el-form-item>
            <el-form-item label="实际到账金额">
              <p class="formBox">{{bankInfo.realReceiveAmt}} 元</p>
            </el-form-item>
            <p class="tradTip">
              <img src="../../../assets/img/ssave.png" alt="">
              <span>您在安全环境中,请放心使用!</span>
            </p>
            <el-form-item label="支付密码" prop="payPasw">

              <el-input type="password" v-model="putForwardNextForm.payPasw" auto-complete="off"
                        class="payPasw"></el-input>
              <p class="findpasw" >
                <!--<router-link to="/securityCenter">忘记密码?</router-link>-->
                <span @click="goFindPasw">忘记密码?</span>
              </p>

              <el-tooltip class="item" effect="light"  :manual="true" placement="right-start" v-model="visible">
                <div slot="content" >
                  <span class="el-icon-error"></span>
                  <span >{{errorMesg}}</span>
                </div>
                <el-button type="text" class="prnb" >元</el-button>
              </el-tooltip>
            </el-form-item>
            <p class="emptyDiv"></p>
            <el-form-item>
              <el-button type="primary" @click="nextpage('putForwardNextForm')" :disabled="isSubmit">确认提交</el-button>
              <el-button type="text" @click="prepage"  class="textBtn">返回修改</el-button>

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
  var qs = require('querystring');
  export default{
    name: "putForwardNext",
    data(){
      return {
        charges: '1.00',
        bankname: '中国银行',
        bankCard: '63454657687934342354',
        putMoney: '1000.00',
        sumMoney: '1001.00',
        visible:false,
        isSubmit:false,
        errorMesg:'',
        bankInfo: '',
        putForwardNextForm: {
          payPasw: '',

        },
        putForwardNextFormRules: {
          payPasw: [
            {required: true, message: "请输入6-20支付密码", trigger: 'blur'},
            {min: 6, max: 20, message: "交易密码长度为6-20位", trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      nextpage(formName){
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = {
              tradePwd: that.$md5(that.putForwardNextForm.payPasw)
            }
            that.isSubmit = true;
            that.$axios({
              url: '/order/proxypay/withdrawSubmit',
              method: 'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: qs.stringify(params)
            }).then(function (result) {
              var res = result.data;
              if (res.code == '0000') {
                that.visible = false;
                that.$router.push({
                  name: 'putForwardProgress'
                })
              } else if (res.code == '1100') {
                that.visible   = true;
                that.errorMesg = res.message
              }else {
                that.$router.push({
                  name: 'putForwardFail'
                })
              }
            }).catch(function (error) {
              console.log("error:", error);
              that.$message.error('系统异常');
            });
            setTimeout(function () {
              that.isSubmit = false;
            },800)
          }else {
            console.log('error submit!!');
        return false;
      }
      });
      },

      prepage(){
        this.$router.go(-1);
      },

      goFindPasw(){
        this.$router.replace('/securityCenter')
      }
    },
    created(){
      this.bankInfo = this.$route.params;
      window.localStorage.setItem('isBackHomePage',1);
    }
  }
</script>
<style scoped>
  .putForwardNext {

  }
a{
  color: #999999;
}
  .pfTitle, .putCont {
    position: relative;
    width: 100%;
  }

  .pfTitle {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eaeaea;
    margin-top: 30px;
    padding-right: 10px;
    box-sizing: border-box;
    font-size: 16px;
  }

  .putForwardNext .pfleftBlock {
    opacity: 0.8;
    padding-left: 10px;
  }

  .putCont {
    margin-top: 30px;
  }

  .formBox {
    position: relative;
    height: 100%;
    color: #999999;
    font-size: 14px;
    padding-left: 10px;
  }

  .spanLine {
    height: 13px;
    width: 2px;
    background: #999999;
    margin: 0 5px;
    display: inline-block;
    top: 1px;
    position: relative;
  }

  .payPasw, .findpasw {
    width: 235px;
  }

  .findpasw {
    color: #999999;
    text-align: right;
    position: absolute;
  }
  .findpasw span{
    cursor: pointer;
  }

  .tradTip{
    padding-left:100px;
    margin-bottom: 6px;
  }
  .tradTip img{
    position: relative;
    top: 2px;
  }
  .tradTip span{
    color: #05c66d;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .prnb{
    display: block;
    position: absolute;
    top: 2px;
    left: 218px;
    color: #333333;
    opacity:0;
  }
  .emptyDiv{
    height: 30px;
    position: relative;
    width:100%;
  }
</style>
