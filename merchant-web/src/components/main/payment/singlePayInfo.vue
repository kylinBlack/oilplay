<template>
  <div class="putForwordInfo">
    <el-row>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16">
        <div class="auCont">
          <p class="putfInfo_title">确认代付信息</p>

          <div class="audsecondBlock ">
            <ul>
              <li>
                <div class="audLabel">收款名称</div>
                <div class="audata">{{pData.bankAcctName}}</div>
              </li>
              <li>
                <div class="audLabel">账户类型</div>
                <div class="audata">{{bankAcctType}}</div>
              </li>
              <li>
                <div class="audLabel">银行名称</div>
                <div class="audata">{{pData.bankName}}</div>
              </li>
              <li>
                <div class="audLabel">开户支行</div>
                <div class="audata">{{pData.subBankName}}</div>
              </li>
              <li>
                <div class="audLabel">银行账号</div>
                <div class="audata">{{pData.bankAcctNo}}</div>
              </li>

            </ul>
          </div>
          <div class="clear"></div>
          <div class="audsecondBlock aduThreeBlock">
            <ul>
              <li>
                <div class="audLabel">金额</div>
                <div class="audata">{{pData.tradeAmt}}元</div>
              </li>
              <li>
                <div class="audLabel">服务费</div>
                <div class="audata">{{pData.feeAmt}} 元</div>
              </li>
              <li>
                <div class="audLabel">实付金额</div>
                <div class="audata">{{pData.realReceiveAmt}} 元</div>
              </li>
              <li>
                <div class="audLabel">备注</div>
                <div class="audata">{{pData.tradeRmk}}</div>
              </li>

            </ul>
          </div>

          <div class="audBtn">
            <el-form ref="putForm" :model="putForm" :rules="putFormRules" label-width="100px" class="putForm">
              <p class="sMark">
                <img src="../../../assets/img/ssave.png" alt="">
                <span>您在安全的环境,请放心使用!</span>
              </p>
              <el-form-item label="支付密码" class="pasw" prop="traderPasw">
                <el-input type="password" v-model="putForm.traderPasw"
                          placeholder="请输入支付密码"></el-input>
                <p class="findpaswbtn"><span @click="forgetPasw">忘记密码</span></p>
              </el-form-item>

              <el-tooltip class="item" effect="light"  :manual="true" placement="right-start" v-model="visible">
                <div slot="content" >
                  <span class="el-icon-error"></span>
                  <span >{{errorMesg}}</span>
                </div>
                <el-button type="text" class="rnb" >元</el-button>
              </el-tooltip>

              <div class="proxyBtn">
                <el-button @click="auditYes('putForm')" type="primary" :disabled="isSubmit">确认提交</el-button>
                <el-button @click="auditNo" type="text">返回修改</el-button>
              </div>
            </el-form>

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

  var qs = require('querystring');

  export default{
    name: "singlePayInfo",
    data(){
      return {
        errorMesg:'',
        visible:false,
        pData:'',
        bankAcctType:'',
        isSubmit:false,
        putForm: {
          traderPasw:'',
        },
        putFormRules: {
          traderPasw: [
            {required: true, message: "请输入6-20支付密码", trigger: 'blur'},
            {min: 6, max: 20, message: "支付密码长度为6-20位", trigger: 'blur'}
          ],
        },

      }
    },
    methods: {
      auditYes(formName){
        var that = this;
        that.$refs[formName].validate((valid) => {
          if(valid){
              var params = {
                tradePwd:that.$md5(that.putForm.traderPasw)
              };
              that.isSubmit = true;
              that.$axios({
              url:'/order/proxypay/singleProxyPaySubmit',
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data:qs.stringify(params)
            }).then(function (result) {
              var res = result.data;
              if(res.code == '0000'){
                that.$router.push('/paymentProgress')
              }else if(res.code == '1100'){
                that.errorMesg = res.message;
                that.visible   = true;
              }else if(res.code == '1000'){
                that.$router.push('/paymentFail')
              }
            }).catch(function (error) {
              console.log("auditYesError:",error);
            });
            setTimeout(function () {
              that.isSubmit = false;
            },800)
          }
      })
      },

      auditNo(){
        this.$router.go(-1)
      },
      forgetPasw(){
        this.$router.push({name:'securitySet',params:{forgetPasw:true}});
      }
    },

    created(){
      window.localStorage.setItem('isBackHomePage',1);
      this.pData = this.$route.params;
      this.pData.bankAcctType == '1'? this.bankAcctType = '个人账户' : this.bankAcctType = '对公账户'
    }
  }
</script>
<style scoped>
  .auCont,
  .auCont,
  .audsecondBlock,
  .audsecondBlock ul,
  .audsecondBlock ul li,
  .aduThreeBlock,
  .audBtn {
    position: relative;
    width: 100%;
  }

  .clear {
    clear: both;
  }

  .auCont {

    color: #333333;
    text-align: left;
    margin-top: 40px;

  }

  .rnb{
    display: block;
    position: absolute;
    top: 42px;
    left: 845px;
    color: #333333;
    opacity: 0;
  }

  .orderCont li {
    float: left;
    height: 54px;
    line-height: 54px;
    position: relative;
    width: 16%;
    text-align: left;

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

  .audLabel, .audata {
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

  .putForwordInfo .audata {
    color: #999999;
  }

  .aduThreeBlock {
    height: 292px !important;
  }

  .audBtn {
    margin-top: 40px;
    text-align: center;
    margin-bottom: 66px;
  }

  .putfInfo_title {
    font-size: 17px;
    font-weight: bold;
    height: 30px;
    border-bottom: 1px solid #f7f7f7;
    padding-left: 10px;
    margin-bottom: 30px;
  }

  .putForm {
    width: 450px;
    margin: 0 auto;
  }

  .sMark {
    text-align: center;
    color: #05c66d;
    font-size: 14px;
    margin-bottom: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center
  }
  .sMark span{
    margin-left: 5px;
  }
  .findpaswbtn{
    text-align: right;
    color: #999999;
    font-size:14px;
    position: absolute;
    right: 0;
  }
  .findpaswbtn span{
    cursor: pointer;
  }
  .proxyBtn{
    margin-top:68px;
  }
</style>
