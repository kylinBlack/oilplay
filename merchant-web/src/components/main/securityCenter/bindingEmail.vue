<template>
  <div class="bindingEmail">

    <el-form :model="bindEmailForm" :rules="bindEmailFormRules" ref="bindEmailForm" label-width="80px"
             class="bindEmailForm">
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="bindEmailForm.email" placeholder="请输入企业邮箱地址"  @input="emailBoxFn" class="emailbox"></el-input>
      </el-form-item>

      <p class="imgError" v-show="isShowImgError">{{errorMesg}}</p>
      <el-col :span="16">
        <el-form-item label="验证码" prop="emailCode">
          <el-input v-model="bindEmailForm.emailCode" @input="changeCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="hBtn">
        <el-button type="primary" @click="getCode" :disabled="isClickPhoneBtn" :class="{ableStyle:isAble}">
          {{btnText}}
        </el-button>
      </el-col>
      <p class="sendEmailTip" v-show="isShowTip">验证码已发送至邮箱, 请注意查收 !</p>
      <div class="oBtn">
        <el-button type="primary" @click="submintSetEmail" :disabled="isSubmit">确认提交</el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
  var qs = require('querystring')
  export default{
    name: "bindingEmail",
    props: ['setPhoneParam'],
    data(){
      var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      return {
        btnText: '获取验证码',
        isClickPhoneBtn: true,
        isShowImgError:false,
        isShowTip: false,
        isSubmit: false,
        errorMesg:'',
        isAble: true,
        $imgCodeUrl: '',
        timers: '',
        bindEmailForm: {
          email: '',
          emailCode: ''
        },
        bindEmailFormRules: {
          email: [
            {required: true, message: "请输入企业邮箱地址", trigger: 'blur'},
            {pattern: emailReg, message: '邮箱格式不正确', trigger: 'change'}
          ],
          emailCode: [
            {required: true, message: "请输入验证码", trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      changeCode(val){
        if(val == ''){
          this.isShowImgError = false;
        }
      },

      emailBoxFn(val){
        var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if(!emailReg.test(val) || val == ''){
          this.isClickPhoneBtn = true;
          this.isAble          = true;
        }else {
          this.isClickPhoneBtn = false;
          this.isAble          = false;
        }
      },


      submintSetEmail(){
        var that = this;
        this.$refs['bindEmailForm'].validate((valid) => {
          if (valid) {
            var params = {
              email:that.bindEmailForm.email,
              emailCode:that.bindEmailForm.emailCode,
            };
            that.isSubmit = true;
            that.$axios({
              url:'/merchant/email/bindingEmail',
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data:qs.stringify(params)
            }).then(function (result) {
              var res = result.data;
              if(res.code && res.code == '0000'){
                var p = {
                  type:'emailb',
                  val:that.bindEmailForm.email,
                }
                that.$router.push({
                  name:'handleSuc',
                  params:p
                })
                that.$emit("thisComponentsSetPhone",'oldPhone','',false);
              }else if(res.code && res.code == '1000'){
                that.$router.push({
                  name:'handleFail',
                  params:{
                    type:'emailb'
                  }
                })
              }
              else {
                that.clearTimer();
                that.isShowImgError = true;
                that.errorMesg= res.message;
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


      getCode(){
        var that = this;
          var params = {
            email: that.bindEmailForm.email,
            templateType: 'addEmail',
            code: '',
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
              setTimeout(function () {
                that.isShowTip = false;
              }, 3000);
              that.setTimer()
              that.closeEmailTip();
            } else if (res.code && res.code == '1000') {
              that.$router.push({
                name: 'handleFail',
                params: {
                  type: 'emailb'
                }
              })
            } else {
              that.isShowImgError = true;
              that.errorMesg = res.message;
              that.clearTimer()
            }

          }).catch(function (error) {
            console.log("error:", error)
          })

      },



      setTimer(){
        var that = this;
        var time = 60;
        that.timers = setInterval(function () {
          time--;
          that.btnText = time + "s";
          that.isClickPhoneBtn = true;
          that.isAble          = true;
          if (time <= 0) {
            clearInterval(that.timers);
            that.btnText = "获取验证码";
            that.isClickPhoneBtn = false;
            that.isAble          = false;

          }
        }, 1000)
      },

      clearTimer(){
        var that = this;
        clearInterval(that.timers);
        that.btnText = "获取验证码";
        that.isClickPhoneBtn = false;
        that.isAble          = false;

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
        })
      }
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
    left: 80px;
    top: 155px;
  }

  .bindEmailForm {
    position: relative;
    width: 76%;
    padding-top: 52px;
    margin: 0 auto;

  }

  .hBtn {
    padding-left: 10px;
    box-sizing: border-box;
  }

  .sendEmailTip {
    position: absolute;
    color: #999999;
    font-size: 12px;
    left: 82px;
    top: 97px;
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

</style>
