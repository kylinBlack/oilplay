<template>
  <div class="newPhone">

    <el-form :model="newPhoneForm" :rules="newPhoneFormRules" ref="newPhoneForm" label-width="100px"
             class="newPhoneForm">
      <el-form-item label="手机号码" prop="newPhone">
        <el-input v-model="newPhoneForm.newPhone" :maxlength="11" @input="changePhone" placeholder="请输入新手机号码"></el-input>
      </el-form-item>
      <el-col :span="17" v-show="isShowImgCode">
        <el-form-item  class="verifCode" label="图形验证码">
          <el-input v-model="newPhoneForm.verifImgCode" type="text"
                    placeholder="请输入图形验证码" @input="changeTmgCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" class="codeBox" v-show="isShowImgCode">

        <div class="verifBox">
          <img :src="newPhoneForm.codeImgurl" alt="图片验证码" title="看不清，换一张" @click.stop="getImgcode">
        </div>

      </el-col>
      <p class="imgError" v-show="isShowImgError">{{errorMesg}}</p>
      <el-col :span="16">
        <el-form-item label="验证码" prop="phoneV" >
          <el-input v-model="newPhoneForm.phoneV" @input="changeCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="hBtn">
        <el-button type="primary"  @click="getCode" :disabled="isClickPhoneBtn" :class="{clickBtnStyle:isClickBtnStyle}">
          {{btnText}}
        </el-button>
      </el-col>

      <div class="oBtn">
        <el-button type="primary" @click="changePage('1')" :disabled="isSubmit">下一步</el-button>
        <el-button  @click="changePage('0')">上一步</el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
  var qs = require('querystring')
  export default{
    name: "newPhone",
    props:['setParam'],
    data(){
      return {
        btnText: '获取验证码',
        isClickPhoneBtn:true,
        isShowImgCode: false,
        isShowImgError: false,
        isClickBtnStyle:true,
        isSubmit:false,
        $imgCodeUrl:'',
        timers:'',
        newPhoneForm: {
          phoneV: '',
          verifImgCode:'',
          codeImgurl:'',
          newPhone:''
        },
        newPhoneFormRules: {
          newPhone: [
            {required: true, message: "请输入新手机号码", trigger: 'blur'},
            {pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: "请输入正确的手机号码", trigger: 'blur'},
          ],
          phoneV: [
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

      getCode(){
        var that = this;
        if(that.isShowImgCode && that.newPhoneForm.verifImgCode == ''){
          that.isShowImgError  = true;
          that.isClickPhoneBtn = false;
          that.isClickBtnStyle = false;
          return false
        }else {
          that.isShowImgError  = false;
          that.isClickPhoneBtn = true;
        }
        var params = {
          mobile:that.newPhoneForm.newPhone,
        }
        that.$axios({
          url:'/merchant/userSecurity/sendSmsCode1',
          method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:qs.stringify(params)
        }).then(function (result) {
          var res = result.data;
          if(res.code && res.code == '0000'){
            that.setTimer()

          }else  if(res.code && res.code == '2300'){
            that.getImgcode()
            that.isShowImgCode = true;
          }else if(res.code && res.code == '1100'){
            that.isShowImgError = true;
            that.errorMesg= res.message;
            that.clearTimer();
            if(that.isShowImgCode && res.code !== '0000'){
              that.getImgcode();
            }
          }else {
            if(that.isShowImgCode && res.code !== '0000'){
              that.getImgcode();
            }
          }

        }).catch(function (error) {
          console.log("error:",error)
        })

      },

      changePhone(val){
        if(val && val !== '' && val.length == 11){
          this.isClickBtnStyle = false;
          this.isClickPhoneBtn = false;
        }
      },

      getImgcode(){
        var that = this;
        that.newPhoneForm.codeImgurl = that.$imgCodeUrl + '/templates/imageCode/getCode?' + Math.random();
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
            that.isClickBtnStyle = false;
            if(that.newPhoneForm.phoneV !== ''){
              that.isClickPhoneBtn = false;
            }else {
              that.isClickPhoneBtn = true;
            }
          }
        }, 1000)
      },

      clearTimer(){
        var that = this;
        clearInterval(that.timers);
        that.btnText = "获取验证码";
        if(that.newPhoneForm.phoneVe !== ''){
          that.isClickPhoneBtn = false;
        }else {
          that.isClickPhoneBtn = true;
        }
      },

      changeTmgCode(){
        var val = this.newPhoneForm.verifImgCode
        if(val == ''){
          this.isShowImgError = true;
          this.isClickPhoneBtn = true;
        }else {
          this.isShowImgError = false;
          this.isClickPhoneBtn = false;
        }
      },

      changePage(f){
        var that = this;
        if(f == '0'){
          that.$emit("thisComponents",'verifyIdentity','',true);
          return false;
        }
        this.$refs['newPhoneForm'].validate((valid) => {
          if (valid) {

            var params = {
              mobile:that.newPhoneForm.newPhone,
              smsCode:that.newPhoneForm.phoneV,
              token:that.setParam,
            };
            that.isSubmit = true;
            that.$axios({
              url:'/merchant/userSecurity/changeMobile',
              method:'post',
              headers: {
                'Content-Type': "application/json"
              },
              data:params
            }).then(function (result) {
                var res = result.data;

              if(res.code && res.code == '0000'){
               var p = {
                  type:'moblie',
                    val:that.newPhoneForm.newPhone,
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
                    type:'mobile'
                  }
                })
              }else {
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

    },

    created(){
      this.clearTimer();
      console.log("aaa:",this.setParam);
    }
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

  .newPhoneNo {
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
  .newPhoneForm{
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
  .clickBtnStyle{
    opacity: 0.7;
  }
</style>
