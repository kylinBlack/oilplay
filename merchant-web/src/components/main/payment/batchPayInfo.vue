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
                <div class="audLabel">批次号</div>
                <div class="audata">{{auditData.batchNo}}</div>
              </li>
              <li>
                <div class="audLabel">申请笔数</div>
                <div class="audata">{{auditData.tradeTotal}} 笔</div>
              </li>
              <li>
                <div class="audLabel">总金额</div>
                <div class="audata">{{auditData.tradeAmt}} 元</div>
              </li>
              <li>
                <div class="audLabel">服务费</div>
                <div class="audata">{{auditData.feeAmt}}  元</div>
              </li>
              <li>
                <div class="audLabel">实付总额</div>
                <div class="audata">{{auditData.realPayAmt}} 元</div>
              </li>

            </ul>
          </div>
          <div class="clear"></div>

          <div class="audBtn">
            <el-form ref="putForm" :model="putForm" :rules="putFormRules" label-width="100px" class="putForm">
              <p class="sMark">
                <img src="../../../assets/img/ssave.png" alt="">
                <span>您在安全的环境,请放心使用!</span>
              </p>

              <el-form-item label="交易密码" class="pasw" prop="tradePwd">
                <el-input type="password" v-model="putForm.tradePwd"
                          placeholder="请输入交易密码"></el-input>
              </el-form-item>
              <p class="findpaswbtn"><span @click="forgetPasw">忘记密码</span></p>
              <div class="proxyBtn">
                <el-button @click="auditYes" type="primary" :disabled="isSubmit">确认提交</el-button>
                <el-button  type="text" @click="auditNo">返回修改</el-button>
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
    name: "paymentInfo",
    data(){
      return {
        audView: '',
        isSubmit:false,
        auditData: {
          batchNo : '2538346975976987687454',
          zhifuType: '账户支付',
          feeAmt : '1.00',
          realPayAmt:'',
          tradeAmt:'',
          tradeTotal:''
        },
        putForm: {
          tradePwd:'',
          tradeRmk:''
        },
        putFormRules: {
          tradePwd: [
            {required: true, message: "请输入6-20交易密码", trigger: 'blur'},
            {min: 6, max: 20, message: "交易密码长度为6-20位", trigger: 'blur'}
          ],
        },

      }
    },
    methods: {
      auditYes(){
        var that = this;
        var params = {
          tradePwd:that.$md5(that.putForm.tradePwd),
          tradeRmk:that.auditData.tradeRmk
        }
        that.isSubmit = true;
        that.$axios({
          url:'/order/proxypay/batchProxyPaySubmit',
          method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:qs.stringify(params)
        }).then(function (result) {

          var res = result.data;
          if(res.code == '0000'){
            that.$router.push('/paymentProgress');

          }else if(res.code == '1100'){
            that.$message.error(res.message)
          }else {
            this.$router.push('/putForwardFail')
          }
        }).catch(function (error) {
          console.log("auditYesError:",error);
        });
        setTimeout(function () {
          that.isSubmit = false;
        },800)
      },
      forgetPasw(){
        location.assign('/findPasw.html')
      },
      auditNo(){
        this.$router.go(-1)
      }
    },
    created(){
      window.localStorage.setItem('isBackHomePage',1);
      if(Object.keys(this.$route.params).length>0){
        this.auditData = this.$route.params
      }else{
        this.auditData = JSON.parse(window.localStorage.getItem('batchPayInfo_p'))
      }

    }
  }
</script>
<style scoped>
.auCont,
.auCont,
.audsecondBlock,
.audsecondBlock ul,
.audsecondBlock ul li,
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

.putForwordInfo .audata {
  color: #999999;
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
  position: relative;
}

.sMark {
  text-align: center;
  color: #05c66d;
  font-size: 14px;
  margin-bottom: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  /*display:inline-block;*/
}
.sMark span {
  margin-left: 5px;
}
.findpaswbtn {
  text-align: right;
  color: #999999;
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 85px;
}
.findpaswbtn span {
  cursor: pointer;
}
.proxyBtn {
  margin-top: 68px;
}
</style>
