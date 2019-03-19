<template>
  <div class="verifPhone">
      <div class="vheader">验证手机号码</div>
    <div class="verifPhoneContent">

      <el-form :model="verifPhoneForm" ref="verifPhoneForm" :rules="verifPhonesFormRules"
               class="verifPhoneForm" label-width="80px">
        <el-form-item  label="手机号码">
        <div class="vphone">{{verifPhoneForm.phone}}</div>
        </el-form-item>
        <el-col :span="18">
          <el-form-item prop="verifCode" class="verifCode"  label="验证码">
            <el-input v-model="verifPhoneForm.verifCode" type="text"
                      placeholder="请输入验证码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="codeBox">
            <div class="verifBox">
              <el-button type="primary" :disabled="isClickPhoneBtn" @click="getCode" :class="{ableStyle:isAble}"> {{btnPhoneText}}</el-button>
            </div>
        </el-col>
        <transition name="el-fade-in-linear">
          <p class="phoneMarkText" v-show="ishowtips">短信验证码已发送至手机, 请注意查收 !</p>
        </transition>
        </el-form-item>


        <el-col :span="24" class="verifPhoneBtn">
          <el-button type="primary" @click.stop="prePage">上一步</el-button>
          <el-button type="primary" @click.stop="nextPage" :disabled="isSubmit">下一步</el-button>

        </el-col>

      </el-form>
    </div>
  </div>
</template>
<script>
  var qs = require('querystring');
  export default{
    name: "verifPhone",
    data(){
      var re = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(\da-z)]|[\(\)])+$)([^(\da-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9])/;
      return {
        isClickPhoneBtn: false,
        ishowtips:false,
        isSubmit:false,
        isAble:false,
        timers: '',
        btnPhoneText: '获取验证码',
        verifPhoneForm: {
          phone: '13566666666',
          verifCode: '',
          type: true,
          imgCode:'',
          token:''
        },
        verifPhonesFormRules: {

          verifCode: [
            {required: true, message: "请输入短信验证码", trigger: 'blur'},
            {pattern: /^[0-9]{6}$/, message: "短信验证码包含6位数字", trigger: 'blur'},
          ]
        }
      }

    },
    methods: {
      getCode(){
        var that = this;
        var params = {
          mobile:that.verifPhoneForm.phone,
          imgCode:that.verifPhoneForm.imgCode,
          token:that.verifPhoneForm.token
        };
        that.isSubmit = true;
        that.$axios({
          url:'/merchant/userSecurity/forgetLoginPwdStep2',
          method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:qs.stringify(params)
        }).then(function (result) {
            var res = result.data;
          if(res.code && res.code == '0000'){
            that.setTimer();
            setTimeout(function () {
              that.ishowtips = true;
            },1000)
          }else {
            that.$message.error(res.message);
            that.clearTimer();
            that.ishowtips = false;
          }
        }).catch(function (error) {
          console.log("error:",error);
          that.$message.error('系统异常');
        });
        setTimeout(function () {
          that.isSubmit = false;
        },800)
      },

      setTimer(){
        var that = this;
        var time = 60;
        that.timers = setInterval(function () {
          time--;
          that.btnPhoneText = time + "s";
          that.isClickPhoneBtn = true;
          if (time <= 0) {
            clearInterval(that.timers);
            that.btnPhoneText = "获取验证码";
            that.isClickPhoneBtn = false;

          }
        }, 1000)
      },

      clearTimer(){
        var that = this;
        clearInterval(that.timers);
        that.btnPhoneText = "获取验证码";
        that.isClickPhoneBtn = false;
      },


      nextPage(){
        var that = this;
        var params = {
          mobile:that.verifPhoneForm.phone,
          smsCode:that.verifPhoneForm.verifCode,

        };
        that.$axios({
          url:'/merchant/userSecurity/forgetLoginPwdStep3',
          method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:qs.stringify(params)
        }).then(function (result) {
          var res = result.data;
          if(res.code && res.code == '0000'){

            var p = {
              mobile:that.verifPhoneForm.phone,
              token:res.data
            }
            that.$router.push({
              name:'setNewPasw',
              params:p
            });
          }else {
            that.$message.error(res.message);
            that.ishowtips = false;
          }
          that.clearTimer();
        }).catch(function (error) {
          console.log("error:",error)
          that.clearTimer();
        })
      },


      prePage(){
        var that = this;
        that.$router.push({
          name:'writeLoginNo',
          params:{
            phone:that.verifPhoneForm.phone,
            imgCode:that.verifPhoneForm.imgCode
          }
        });
      }
    },
    created(){
      var p = this.$route.params;
      if(p){
        this.verifPhoneForm.phone = p.phone;
        this.verifPhoneForm.imgCode = p.imgCode;
        this.verifPhoneForm.token = p.token;
      }

    }
  }
</script>
<style scoped>
  .verifPhone {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    z-index: 30;
    border-radius: 8px;
    box-shadow: 0 0 10px #dadada;
  }
  .vheader{
    position: relative;
    width: 100%;
    height:106px ;
    background: #eef0f2;
    color: #666666;
    font-size: 30px;
    line-height: 106px;
    text-align: center;
    border-bottom: 1px solid  #eef0f2;
  }
  .verifPhoneContent{
    background: white;
  }
  .verifPhoneForm{
    position: relative;
      width: 340px;
      margin: 115px auto;
  }

  .verifBox{
    height: 38px;
    padding-left: 7px;
  }
  .verifPhoneBtn{
    text-align: center;
    margin-top: 80px;
  }
  .vphone{
    position: relative;
    width: 100%;
    background: #f3f3f3;
    color: #9c9c9c;
    height: 40px;
    padding:0 15px;
  }
  .phoneMarkText{
    position: absolute;
    color: #aaaaaa;
    font-size: 13px;
    padding-left:80px;
    height: 30px;
    width: 100%;
    top: 106px;
  }
  .ableStyle{
    opacity:0.8;
  }
</style>
