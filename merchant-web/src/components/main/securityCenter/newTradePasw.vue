<template>
  <div class="newTradePasw">

    <el-form :model="newTradePaswForm" :rules="newTradePaswFormRules" ref="newTradePaswForm" label-width="100px"
             class="newTradePaswForm">
      <el-form-item label="新支付密码" prop="tradePasw">
        <el-input type="password" v-model="newTradePaswForm.tradePasw" ></el-input>
      </el-form-item>

      <p class="imgError" v-show="isShowImgError">{{errorMesg}}</p>

        <el-form-item label="确认密码" prop="tradePaswAgain">
          <el-input type="password" v-model="newTradePaswForm.tradePaswAgain"></el-input>
        </el-form-item>

      <div class="oBtn">
        <el-button type="primary" @click="changePage('1')" :disabled="isSubmit">确认提交</el-button>
        <el-button  @click="changePage('0')">上一步</el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
  var qs = require('querystring')
  export default{
    name: "newTradePasw",
    props:['setParam'],
    data(){
      var re = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(\da-z)]|[\(\)])+$)([^(\da-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9])/;
      var valifloginPasw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.newTradePaswForm.tradePaswAgain) {
          callback(new Error('两次输入支付密码不一致'));
        } else {
          callback();
        }
      };
      return {
        btnText: '获取验证码',
        isClickPhoneBtn:false,
        isShowImgError: false,
        errorMesg:'',
        isSubmit: false,
        $imgCodeUrl:'',
        timers:'',
        newTradePaswForm: {
          tradePasw: '',
          tradePaswAgain:''
        },
        newTradePaswFormRules: {
          tradePasw: [
            {required: true, message: "请输入新支付密码", trigger: 'blur'},
            {min: 6, max: 20, message: "请输入6-20位的登陆密码", trigger: 'blur'},
            {pattern: re, message: "密码至少包含大、小写字母、数字、符号中的两种组合", trigger: 'blur'},
          ],
          tradePaswAgain: [
            {required: true, message: "请输入确认支付密码", trigger: 'blur'},
            {validator: valifloginPasw, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      changePage(f){
        var that = this;
        if(f == '0'){
          that.$emit("thisComponents",'verifyIdentity','',true);
          return false;
        }
        this.$refs['newTradePaswForm'].validate((valid) => {
          if (valid) {
            var params = JSON.parse(that.setParam);
            params.pwd = that.$md5(that.newTradePaswForm.tradePasw);
            params.repeatPwd = that.$md5(that.newTradePaswForm.tradePaswAgain);
            that.isSubmit = true;
            that.$axios({
              url:'/merchant/userSecurity/changeTradePwd',
              method:'post',
              headers: {
                'Content-Type': "application/json"
              },
              data:params
            }).then(function (result) {
                var res = result.data;
              if(res.code && res.code == '0000'){
                var p = {
                  type:'tradePasw',
                }
                that.$router.push({
                  name: 'handleSuc',
                  params: p
                })
                that.$emit("thisComponents",'verifyIdentity','',false);

              }else if(res.code && res.code == '1000'){

                that.$router.push({
                  name: 'handleFail',
                  params: {
                    type:'tradePasw'
                  }
                })
              }
              else {
                that.isShowImgError = true;
                that.errorMesg= res.message;
                //that.$message.error(res.message);
              }
            }).catch(function (error) {
              console.log("error:",error)
            })
            setTimeout(function () {
              that.isSubmit = false;
            },800)
          }
        })
      },

    },

  }
</script>
<style scoped>
  .ciMark {
    position: absolute;
    width: 100%;
    font-size: 15px;
    color: #666666;
    letter-spacing: 1px;
    top: 77px;
  }

  .newTradePaswNo {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    color: #999999;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .oBtn {
    position: relative;
    width: 100%;
    margin-top:10px;
    display: inline-block;
    /*border-top: 1px solid #f8f8f8;*/
    padding-top:20px;
    text-align: center;
    padding-bottom: 10px;
  }
  .newTradePaswForm{
    position: relative;
    width: 76%;
    padding-top:52px;
    margin: 0 auto;

  }
  .hBtn{
    padding-left:10px;
    box-sizing: border-box;
  }
  .imgError{
    position:absolute;
    color: red;
    font-size: 12px;
    left: 101px;
    top: 155px;
  }
  .verifBox{
    position: relative;
    width: 100%;
  }

  .verifBox img {
    position: relative;
    height: 39px;
    width: auto;
    cursor: pointer;
  }
</style>
