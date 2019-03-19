<template>
  <div class="oldPhone">
    <p class="ciMark">
      <img src="../../../assets/img/tips.png" alt="">
      为保障您的账号安全,变更信息需检验身份
    </p>
    <el-form :model="oldPhoneForm" :rules="oldPhoneFormRules" ref="oldPhoneForm" label-width="100px"
             class="oldPhoneForm">
      <el-form-item label="手机号码">
        <div class="oldPhoneNo">{{setParam}}</div>
      </el-form-item>
      <el-col :span="17" v-show="isShowImgCode">
        <el-form-item  class="verifCode" label="图形验证码">
          <el-input v-model="oldPhoneForm.verifImgCode" type="text"
                    placeholder="请输入图形验证码" @input="changeTmgCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" class="codeBox" v-show="isShowImgCode">
          <div class="verifBox">
            <img :src="oldPhoneForm.codeImgurl" alt="图片验证码" title="看不清，换一张" @click.stop="getImgcode">
          </div>
      </el-col>

      <p class="imgError" v-show="isShowImgError">{{errorMesg}}</p>
      <el-col :span="16">
        <el-form-item label="验证码" prop="phoneV">
          <el-input v-model="oldPhoneForm.phoneV" @input="changeCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="hBtn">
        <el-button type="primary"  @click="getCode" :disabled="isClickPhoneBtn" :class="{clickBtnStyle:isClickBtnStyle}">
          {{btnText}}
        </el-button>
      </el-col>

      <div class="oBtn">
        <el-button type="primary" @click="nextPage" :disabled="isSubmit">下一步</el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
  var qs = require('querystring');
  export default{
    name: "verifyIdentity",
    props:['setParam'],
    data(){
      return {
        btnText: '获取验证码',
        isClickPhoneBtn:true,
        isShowImgCode:false,
        isShowImgError:false,
        isSubmit:false,
        isClickBtnStyle:false,
        $imgCodeUrl:'',
        timers:'',
        errorMesg:'',
        jsonData:'',
        oldPhoneForm: {
          phoneV: '',
          verifImgCode:'',
          codeImgurl:''
        },
        oldPhoneFormRules: {
          phoneV: [
            {required: true, message: "请输入验证码", trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      getCode(){
        var that = this;
        if(that.isShowImgCode && that.oldPhoneForm.verifImgCode == ''){
          that.isShowImgError  = true;
          that.isClickPhoneBtn = false;
          that.isClickBtnStyle = false;
          return false
        }
        that.getJsonData();
        var params = {
          imgCode:that.oldPhoneForm.verifImgCode,
        }
        that.$axios({
          url:'/merchant' + that.jsonData.u,
          method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:qs.stringify(params)
        }).then(function (result) {
          var res = result.data;
          if(res.code && res.code == '0000'){
            that.setTimer();

          }else  if(res.code && res.code == '2300'){
            that.isShowImgCode = true;
            that.getImgcode();

          }else if(res.code && res.code == '1100'){
            //that.errorMesg = res.message;
            /*that.$message.error(res.message);
            that.clearTimer();*/
            that.isShowImgError = true;
            that.errorMesg= res.message;
            if(that.isShowImgCode && res.code !== '0000'){
              that.getImgcode();
            }
          }else {
            that.$message.error(res.message);
          }
        }).catch(function (error) {
          console.log("error:",error)
        })

      },

      changeCode(val){
        if(val == ''){
          this.isShowImgError = false;
        }
      },

      getImgcode(){
        var that = this;
        that.oldPhoneForm.codeImgurl = that.$imgCodeUrl + '/templates/imageCode/getCode?' + Math.random();
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
        that.isClickPhoneBtn = false;
      },

      changeTmgCode(){
        var val = this.oldPhoneForm.verifImgCode
        if(val == ''){
          this.isShowImgError = true;
          this.isClickPhoneBtn = true;
          this.errorMesg = '请输入图形验证码';
        }else {
          this.isShowImgError = false;
          this.isClickPhoneBtn = false;
        }
      },

      nextPage(){
        var that = this;
        this.$refs['oldPhoneForm'].validate((valid) => {
          if (valid) {
            that.getJsonData();
            var params = {
              smsCode:that.oldPhoneForm.phoneV,
              smsTemplate:that.jsonData.t,
            }

            that.isSubmit = true;
            that.$axios({
              url:'/merchant/userSecurity/checkMobileSmsCode',
              method:'post',
              headers: {
                'Content-Type': "application/json"
              },
              data:params
            }).then(function (result) {
                var res = result.data;
              if(res.code && res.code == '0000'){
                that.isShowImgError = false;
                var p = that.oldPhoneForm.phoneV;
                if(that.jsonData.flag == '1'){
                  p = res.data;
                }
                that.$emit("thisComponents",that.jsonData.c,p,true);
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

      getJsonData(){
        var d = window.localStorage.getItem('c');
        d = JSON.parse(d);
        this.jsonData = d;
      },
    },

    created(){
      if(this.setParam && this.setParam !== ''){
        this.isClickPhoneBtn = false;
        this.isClickBtnStyle = false;
      }else {
        this.isClickPhoneBtn = true;
        this.isClickBtnStyle = true;
      }
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

  .oldPhoneNo {
    position: relative;
    width: 257px;
    height: 40px;
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
  .oldPhoneForm{
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
    top: 36px;
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
