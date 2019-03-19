<template>
  <div class="newEmail">

    <el-form :model="newEmailForm" :rules="newEmailFormRules" ref="newEmailForm" label-width="100px"
             class="newEmailForm">
      <el-form-item label="新邮箱地址" prop="newEmail">
        <el-input v-model="newEmailForm.newEmail" placeholder="请输入新邮箱地址"></el-input>
      </el-form-item>

      <p class="sendEmailTip" v-show="isShowTip">验证码已发送至邮箱, 请注意查收 !</p>
      <p class="imgError" v-show="isShowImgError">{{errorMesg}}</p>

      <el-col :span="16">
        <el-form-item label="验证码" prop="emailCode">
          <el-input v-model="newEmailForm.emailCode" @input="changeCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="hBtn">
        <el-button type="primary"  @click="getCode" :disabled="isClickPhoneBtn" :class="{clickBtnStyle:isClickBtnStyle}">
          {{btnText}}
        </el-button>
      </el-col>

      <div class="oBtn">
        <el-button type="primary" @click="changeEmail('1')" :disabled="isSubmit">确认提交</el-button>
        <el-button  @click="changeEmail('0')">上一步</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  var qs = require('querystring')
  export default{
    name: "setEmail",
    props:['setParam'],
    data(){
      return {
        btnText: '获取验证码',
        isClickPhoneBtn:false,
        isShowImgError:false,
        isShowTip: false,
        isSubmit: false,
        isClickBtnStyle:false,
        $imgCodeUrl:'',
        timers:'',
        newEmailForm: {
          emailCode: '',
          verifImgCode:'',
          codeImgurl:'',
          newEmail:''
        },
        newEmailFormRules: {
          newEmail: [
            {required: true, message: "请输入新邮箱地址", trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change']}
          ],
          emailCode: [
            {required: true, message: "请输入验证码", trigger: 'blur'},
          ],
        },
        errorMesg:''
      }
    },
    methods: {

      changeCode(val){
        if(val !== ''){
          this.isShowImgError = false;
        }
      },

      getCode(){
        var that = this;
        var params = {
          email: that.newEmailForm.newEmail,
          templateType: 'updateEamil',
          code:'',
        }
        that.$axios({
          url: '/combine/templates/email/sendEmailCode',
          method: 'post',
          headers: {
            'Content-Type': "application/json"
          },
          data: params
        }).then(function (result) {
          var res = result.data;
          if (res.code && res.code == '0000') {
            that.isShowTip = true;
            that.setTimer()
            that.closeEmailTip();
          }  else {

            that.isShowImgError = true;
            that.errorMesg= res.message;
          }

        }).catch(function (error) {
          console.log("error:", error)
        })

      },

      closeEmailTip(){
        var time = 10;
        var that = this;
        var t = setInterval(function () {
          time--;
          if (time < 1) {
            that.isShowTip = false;
            clearInterval(t)
          }
        },1000)
      },

      setTimer(){
        var that = this;
        var time = 60;
        that.timers = setInterval(function () {
          time--;
          that.btnText = time + "s";
          that.isClickPhoneBtn = true;
          that.isClickBtnStyle = true;
          if (time <= 0) {
            clearInterval(that.timers);
            that.btnText = "获取验证码";
            that.isClickPhoneBtn = false;
            that.isClickBtnStyle = false;
          }
        }, 1000)
      },

      clearTimer(){
        var that = this;
        clearInterval(that.timers);
        that.btnText = "获取验证码";
        if(that.newEmailForm.emailCodee !== ''){
          that.isClickPhoneBtn = false;
        }else {
          that.isClickPhoneBtn = true;
        }
      },


      changeEmail(f){
        var that = this;
        if(f == '0'){
          that.$emit("thisComponents",'verifyIdentity','',true);
          return false;
        }
        this.$refs['newEmailForm'].validate((valid) => {
          if (valid) {
            var params = {
              email :that.newEmailForm.newEmail,
              emailCode :that.newEmailForm.emailCode,
              msgCode :that.setParam,
            };
            that.isSubmit = true;
            that.$axios({
              url:'/merchant/email/updateEmail',
              method:'post',
              headers: {
                'Content-Type': "application/json"
              },
              data:params
            }).then(function (result) {
                var res = result.data;

              if(res.code && res.code == '0000'){
                var p = {
                  type:'emailg',
                  val:that.newEmailForm.newEmail,
                };
                that.$router.push({
                  name:'handleSuc',
                  params:p
                })
                that.$emit("thisComponents",'verifyIdentity','',false);

              }else if(res.code && res.code == '1000'){
                that.$router.push({
                  name:'handleFail',
                  params:{
                    type:'emailg'
                  }
                })
              }
              else {
                that.isShowImgError = true;
                that.errorMesg= res.message;
              }
            }).catch(function (error) {
              console.log("error:",error)
            });
            setTimeout(function () {
              that.isSubmit = false;
            },800)
          }
        })
      },

    },

    created(){

    }
  }
</script>
<style scoped>
  .imgError{
    position:absolute;
    color: red;
    font-size: 12px;
    left: 100px;
    top: 94px;
  }
  .ciMark {
    position: absolute;
    width: 100%;
    font-size: 15px;
    color: #666666;
    letter-spacing: 1px;
    top: 77px;
  }

  .newEmailNo {
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
  .newEmailForm{
    position: relative;
    width: 76%;
    padding-top:52px;
    margin: 0 auto;

  }
  .hBtn{
    padding-left:10px;
    box-sizing: border-box;
  }

  .sendEmailTip {
    position: absolute;
    color: #999999;
    font-size: 12px;
    left: 99px;
    top: 36px;
  }
  .clickBtnStyle{
    opacity: 0.7;
  }
</style>
