<template>
  <div class="newLoginPasw">

    <el-form :model="newLoginPaswForm" :rules="newLoginPaswFormRules" ref="newLoginPaswForm" label-width="100px"
             class="newLoginPaswForm">
      <el-form-item label="新登录密码" prop="loginPasw">
        <el-input type="password" v-model="newLoginPaswForm.loginPasw" placeholder="6-20位数字和字母组合"></el-input>
      </el-form-item>

      <p class="imgError" v-show="isShowImgError">请输入图形验证码</p>

        <el-form-item label="确认密码" prop="loginPaswAgain">
          <el-input type="password" v-model="newLoginPaswForm.loginPaswAgain"  placeholder="6-20位数字和字母组合"></el-input>
        </el-form-item>

      <div class="oBtn">
        <el-button type="primary" @click="changePage('1')" :disabled="isSubimt">下一步</el-button>
        <el-button  @click="changePage('0')">上一步</el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
  var qs = require('querystring')
  export default{
    name: "newLoginPasw",
    props:['setParam'],
    data(){
      var re = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(\da-z)]|[\(\)])+$)([^(\da-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9])/;
      var valifloginPasw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.newLoginPaswForm.loginPasw) {
          callback(new Error('两次输入登录密码不一致'));
        } else {
          callback();
        }
      };
      return {
        btnText: '获取验证码',
        isClickPhoneBtn:false,
        isShowImgError: false,
        isSubimt: false,
        $imgCodeUrl:'',
        timers:'',
        newLoginPaswForm: {
          loginPasw: '',
          loginPaswAgain:''
        },
        newLoginPaswFormRules: {
          loginPasw: [
            {required: true, message: "请输入新登录密码", trigger: 'blur'},
            {min: 6, max: 20, message: "请输入6-20位的登陆密码", trigger: 'blur'},
            {pattern: re, message: "密码至少包含大、小写字母、数字、符号中的两种组合", trigger: 'blur'},
          ],
          loginPaswAgain: [
            {required: true, message: "请输入确认登录密码", trigger: 'blur'},
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
        this.$refs['newLoginPaswForm'].validate((valid) => {
          if (valid) {
            var params = {
              pwd:that.$md5(that.newLoginPaswForm.loginPasw),
              repeatPwd :that.$md5(that.newLoginPaswForm.loginPaswAgain),
              token :that.setParam,
            };
            that.isSubimt = true;
            that.$axios({
              url:'/merchant/userSecurity/changeloginPwd',
              method:'post',
              headers: {
                'Content-Type': "application/json"
              },
              data:params
            }).then(function (result) {
                var res = result.data;
              if(res.code && res.code == '0000'){
                that.$emit("thisComponents",'verifyIdentity','',false);
                that.$router.push({
                  name:'handleSuc',
                  params:{
                    type:'login'
                  }
                })
              }else {
                that.$message.error(res.message);
              }
            }).catch(function (error) {
              console.log("error:",error)
            })
            setTimeout(function () {
              that.isSubimt = false;
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
  .ciMark {
    position: absolute;
    width: 100%;
    font-size: 15px;
    color: #666666;
    letter-spacing: 1px;
    top: 77px;
  }

  .newLoginPaswNo {
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
  .newLoginPaswForm{
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
