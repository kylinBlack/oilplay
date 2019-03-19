<template>
  <div class="setNewPasw">
    <div class="sheader">设置密码</div>
    <div class="setNewPaswContent">

      <el-form :model="setNewPaswForm" ref="setNewPaswForm" :rules="setNewPaswsFormRules"
               class="setNewPaswForm" label-width="94px">
        <el-form-item prop="newLoginPasw" label="新登陆密码">
          <el-input v-model="setNewPaswForm.newLoginPasw" type="password" placeholder="6-20位数字﹑字母的组合"></el-input>
        </el-form-item>
        <el-form-item prop="newLoginPaswAgain" label="确认密码">
          <el-input v-model="setNewPaswForm.newLoginPaswAgain" type="password" placeholder="确认新密码"></el-input>
        </el-form-item>
        </el-form-item>
        <el-col :span="24" class="setNewPaswBtn">
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
    name: "setNewPasw",
    data(){
      var re = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(\da-z)]|[\(\)])+$)([^(\da-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9])/;
      var valifLoginPasw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.setNewPaswForm.newLoginPasw) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };

      return {
        btnPhoneText: '获取验证码',
        isClickPhoneBtn: true,
        isSubmit: false,
        btnPhoneTip: '请填写手机号码',
        timers: '',
        preParams:'',
        centerDialogVisible: false,
        setNewPaswForm: {
          newLoginPasw: '',
          newLoginPaswAgain: '',

        },
        setNewPaswsFormRules: {
          newLoginPasw: [
            {required: true, message: "请输入登陆密码", trigger: 'blur'},
            {min: 6, max: 20, message: "请输入6-20位的登陆密码", trigger: 'blur'},
            {pattern: re, message: "密码至少包含大、小写字母、数字、符号中的两种组合", trigger: 'blur'},

          ],
          newLoginPaswAgain: [
            {required: true, message: "请确认新登陆密码", trigger: 'blur'},
            {validator: valifLoginPasw, trigger: 'blur'}

          ]
        }
      }

    },
    methods: {

      nextPage(){
        var that = this;
        this.$refs['setNewPaswForm'].validate((valid) => {
          if(valid){
            var params      = that.preParams;
            params.loginPwd = that.$md5(that.setNewPaswForm.newLoginPasw);
            that.isSubmit   = true;
            that.$axios({
              url:'/merchant/userSecurity/forgetLoginPwdStep4',
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data:qs.stringify(params)
            }).then(function (result) {
              var res = result.data;
              if(res.code && res.code == '0000'){
                that.$router.push({
                  name:'findPaswResult',
                  params:{
                    type:1
                  }
                })
              }else if(res.code && res.code == '1000'){
                that.$router.push({
                  name:'findPaswResult',
                  params:{
                    type:0
                  }
                })
              }else {
                that.$message.error(res.message);
              }
            }).catch(function (error) {
              console.log("error:",error)
            })
            setTimeout(function () {
              that.isSubmit = false;
            },800)

          }else {
            console.log('validError')
          }
        })

      },
      prePage(){
        this.$emit('changeComp','writeLoginno')
      },
    },
    created(){
     this.preParams = this.$route.params;
      console.log("aaa:",this.preParams);
    }
  }
</script>
<style scoped>
  .setNewPasw {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    z-index: 30;
    border-radius: 8px;
    box-shadow: 0 0 10px #dadada;
    border: 1px solid #eef0f2;
    box-sizing: border-box;
  }

  .sheader {
    position: relative;
    width: 100%;
    height: 106px;
    background: #eef0f2;
    color: #666666;
    font-size: 30px;
    line-height: 106px;
    text-align: center;
    border-bottom: 1px solid #eef0f2;
    border-radius: 8px 8px 0 0;
  }

  .setNewPaswContent {
    background: white;
  }

  .setNewPaswForm {
    width: 340px;
    margin: 115px auto;
  }

  .setNewPaswBtn {
    text-align: center;
    margin-top:54px;
  }
</style>
