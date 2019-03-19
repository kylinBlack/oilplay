<template>
  <div class="writeLoginno">
      <div class="sheader">输入登录账号</div>
    <div class="writeLoginContent">

      <el-form :model="writeLoginForm" ref="writeLoginForm" :rules="writeLoginsFormRules"
               class="writeLoginForm" label-width="80px">
        <el-form-item prop="userNo" label="登录账号">
          <el-input v-model="writeLoginForm.userNo" placeholder="请输入登录账号" :maxlength="11"></el-input>
        </el-form-item>
        <el-col :span="18">
          <el-form-item prop="verifCode" class="verifCode"  label="验证码">
            <el-input v-model="writeLoginForm.verifCode" type="text"
                      placeholder="请输入验证码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="codeBox">
            <div class="verifBox">
              <img :src="imgUrl" alt="" @click="getImgCode" title="看不清? 换一张">
            </div>
        </el-col>
        </el-form-item>
        <el-col :span="24" class="writeLoginBtn">
          <el-button type="primary" @click.stop="nextPage" :disabled="isSubmit">下一步</el-button>
        </el-col>

      </el-form>
    </div>
  </div>
</template>
<script>
  var qs = require('querystring');
  export default{
    name: "writeLoginNo",
    data(){

      return {
        isSubmit: false,
        timers: '',
        imgUrl:this.$imgCodeUrl + '/templates/imageCode/getCode',
        writeLoginForm: {
          userNo: '',
          verifCode: '',
          type: true,
        },
        writeLoginsFormRules: {
          userNo: [
            {required: true, message: "请输入登陆密码", trigger: 'blur'},
            {pattern: /^[0-9]/, message: "请输入数字", trigger: 'blur'},
            {pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: "请输入正确的手机号码", trigger: 'blur'},
          ],
          verifCode: [
            {required: true, message: "请输入图形验证码", trigger: 'blur'},

          ]
        }
      }

    },
    methods: {

      getImgCode(){
        this.imgUrl = this.$imgCodeUrl + '/templates/imageCode/getCode?' + Math.random();
      },

      nextPage(){
        var that = this;
        that.$refs['writeLoginForm'].validate((valid) => {
          if(valid){
            var params = {
              imgCode:that.writeLoginForm.verifCode,
              userName:that.writeLoginForm.userNo
            };
            that.isSubmit = true;
            that.$axios({
              url:'/merchant/userSecurity/forgetLoginPwdStep1',
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data:qs.stringify(params)
            }).then(function (result) {

              var res = result.data;
              if(res.code && res.code == '0000'){
                that.$router.push({
                  name:'verifPhone',
                  params:{
                    phone:that.writeLoginForm.userNo,
                    imgCode:that.writeLoginForm.verifCode,
                    token:res.data
                  }
                })
              }else {
                that.$message.error(res.message);
                that.getImgCode();
              }
            }).catch(function (error) {
              console.log("error:",error);
              that.$message.error('系统异常');
            });
            setTimeout(function () {
              that.isSubmit = false;
            },800)
          }else {
            console.log('validError')
          }
        })
      },

    },

    created(){
       var p = this.$route.params;
      if(p){
        this.writeLoginForm.userNo    = p.phone;
        this.writeLoginForm.verifCode = p.imgCode;
      }

    }
  }
</script>
<style scoped>
  .writeLoginno {
    position: relative;
    width: 100%;
    height: 100%;


    margin: 0 auto;
    z-index: 30;
    border-radius: 8px;
    box-shadow: 0 0 10px #dadada;
  }
  .sheader{
    position: relative;
    width: 100%;
    height:106px ;
    background: #eef0f2;
    color: #666666;
    font-size: 30px;
    line-height: 106px;
    text-align: center;
    border-bottom: 1px solid #eef0f2 ;
  }
  .writeLoginContent{
    background: white;
    border:1px solid white;

  }
  .writeLoginForm{
      width: 340px;
      margin: 115px auto;
  }

  .verifBox{
   border: 1px solid #d6d6d6;
    height: 38px;
  }
  .writeLoginBtn{
    text-align: center;
    margin-top: 80px;
  }
  .verifCode{
    position: relative;
    width: 97%;
  }
  .verifBox img{
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
</style>
