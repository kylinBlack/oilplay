<template>
  <div class="registerPaswBox">
    <div class="contents">
      <p ><img src="../../assets/img/paswImg.png" alt=""></p>
      <p class="goback" @click="goBack">
       <img src="../../assets/img/back.png" alt="">
        <span>返回</span>
      </p>
      <el-form :model="registerFormPasw" ref="registerFormPasw"
               class="registerFormPasw" :rules="registerFormPaswRules" >
        <el-form-item prop="loginPasw">
          <el-input v-model="registerFormPasw.loginPasw" placeholder="设置6-20位数字﹑字母组合的登录密码" type="password" :maxlength="20" onkeypress="return event.keyCode!=32"></el-input>
        </el-form-item>
        <el-form-item prop="loginPaswAgain">
          <el-input v-model="registerFormPasw.loginPaswAgain" placeholder="确认登录密码" type="password" :maxlength="20" onkeypress="return event.keyCode!=32"></el-input>
        </el-form-item>
        <el-form-item prop="tradePasw">
          <el-input v-model="registerFormPasw.tradePasw" placeholder="设置6-20位数字﹑字母组合的支付密码" type="password" :maxlength="20" onkeypress="return event.keyCode!=32"></el-input>
        </el-form-item>
        <el-form-item prop="tradePaswAgain">
          <el-input v-model="registerFormPasw.tradePaswAgain" placeholder="确认支付密码" type="password" :maxlength="20" onkeypress="return event.keyCode!=32"></el-input >
        </el-form-item>
        <el-col :span="24" class="registerBtn">
          <el-button type="primary" @click.stop="regiser" :disabled="isSubmit">确认注册</el-button>
        </el-col>

      </el-form>
    </div>

  </div>
</template>
<script>
  export default{
    name: "registerSetPasw",
    data(){
      var re = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(\da-z)]|[\(\)])+$)([^(\da-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9])/;
      var valifloginPasw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerFormPasw.loginPasw) {
          callback(new Error('两次输入登录密码不一致'));
        } else {
          callback();
        }
      };
      var valiftradPasw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerFormPasw.tradePasw) {
          callback(new Error('两次输入交易密码不一致'));
        } else {
          callback();
        }
      };
      var valifSameTradPasw = (rule, value, callback)=> {
        if (value == this.registerFormPasw.loginPasw) {
          callback(new Error('交易密码不能与登陆密码相同'));
        } else {
          callback();
        }
      };
      var valifSameLoginPwd = (rule, value, callback)=> {
        if (value == this.registerFormPasw.tradePasw) {
          callback(new Error('登陆密码不能与交易密码相同'));
        } else {
          callback();
        }
      }

      return {
        userData:'',
        isSubmit:false,
        registerFormPasw: {
          loginPasw: '',
          loginPaswAgain: '',
          tradePasw: '',
          tradePaswAgain: '',
        },
        registerFormPaswRules:{
          loginPasw: [
            {required: true, message: "请输入登陆密码", trigger: 'blur'},
            {min: 6, max: 20, message: "请输入6-20位的登陆密码", trigger: 'blur'},
            {pattern: re, message: "密码至少包含大、小写字母、数字、符号中的两种组合", trigger: 'blur'},
            {validator: valifSameLoginPwd, trigger: 'blur'}
          ],
          loginPaswAgain: [
            {required: true, message: "请输入登陆密码", trigger: 'blur'},
            {validator: valifloginPasw, trigger: 'blur'}
          ],
          tradePasw: [
            {required: true, message: "请输入交易密码", trigger: 'blur'},
            {min: 6, max: 20, message: "请输入6-20位的交易密码", trigger: 'blur'},
            {pattern: re, message: "密码至少包含大、小写字母、数字、符号中的两种组合", trigger: 'blur'},
            {validator: valifSameTradPasw, trigger: 'blur'}
          ],
          tradePaswAgain: [
            {required: true, message: "请输入交易密码", trigger: 'blur'},
            {validator: valiftradPasw, trigger: 'blur'}
          ],

        }
      }
    },
    methods: {

      regiser(){
        var that = this;
        this.$refs['registerFormPasw'].validate((valid) => {
          if (valid) {
            var params = {
              tradePwd:that.$md5(that.registerFormPasw.tradePasw),
              loginPwd:that.$md5(that.registerFormPasw.loginPasw),
              token:that.userData.token,
              mobile:that.userData.mobile
            };
            that.isSubmit = true;
            that.$axios({
            url:'/merchant/user/registerSubmit',
            method:'post',
            headers: {
              'Content-Type': "application/json;charset=UTF-8"
            },
            data:params
          }).then(function (result) {
              var res = result.data;
              if(res.code && res.code == '0000'){
                that.$router.push('/registerSuc');
              }else if(res.code && res.code == '1100'){
                that.$message.error(res.message)
              }else if(res.code && res.code == '1000'){
                that.$router.push('/registerFail');
              }

            }).catch(function (error) {
              console.log("registerError:",error);
            })
            setTimeout(function () {
              that.isSubmit = false;
            },800)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      goBack(){
        var d =  this.userData
        this.$router.push({
          name:'registerSetPhone',
          params:d
        })
      }
    },
    created(){
      this.userData = this.$route.params;

    }
  }
</script>
<style scoped>


  .registerPaswBox {
    position: relative;
    min-width: 397px;
    min-height: 406px;
    width: 26%;
    height: 52%;
    box-shadow: 0 0 10px #dadada;
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: -10vh;
  }

  .contents {
    position: relative;
    width: 100%;
    background: white;
    box-sizing: border-box;
    padding: 40px;
    height: 100%;
  }

  .registerPaswBox h3 {
    text-align: left;
    padding-left: 12px;
  }

  .verifBox img {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .lastRight li {
    float: left;
    font-size: 13px;
    font-weight: bold;
    opacity: 0.8;
    cursor: pointer;
  }

  .lastRight li:hover {
    opacity: 0.5;
  }

  .registerBtn {
    margin-top: 22px;
    position: relative;
    width: 100%;
    text-align: center;
  }

  .registerBtn button {
    position: relative;
    width: 100%;

  }

  .registerTitle {
    font-size: 30px;
    letter-spacing: 1px;
    font-weight: bold;
  }

  .registerFormPasw {
    margin-top: 25px;
    display: inline-block;
    position: relative;
    width: 100%;
  }
.goback{
  position: absolute;
  right: 40px;
  top:20px;
  text-align: center;
  cursor: pointer;
}
.goback img,.goback span{
  display: inline-block;
  vertical-align: middle;
}



</style>
