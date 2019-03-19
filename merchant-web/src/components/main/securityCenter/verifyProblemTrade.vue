<template>
  <div class="verifyProblemT">
    <p class="ciMark">
      <img src="../../../assets/img/tips.png" alt="">
      为保障您的账号安全,变更信息需检验身份
    </p>
    <el-form :model="verifyProblemTForm" :rules="verifyProblemTFormRules" ref="verifyProblemTForm" label-width="100px"
             class="verifyProblemTForm">
      <el-form-item label="安全问题">
        <div class="verifyProblemTNo">{{verifyProblemTForm.problem}}</div>
      </el-form-item>

      <p class="imgError" v-show="isShowImgError">{{errorMesg}}</p>

        <el-form-item label="答案" prop="answer">
          <el-input v-model="verifyProblemTForm.answer"></el-input>
        </el-form-item>

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
    name: "verifyProblemTrade",
    props:['setParam'],//
    data(){
      return {
        btnText: '获取验证码',
        isShowImgError: false,
        isSubmit: false,
        $imgCodeUrl:'',
        timers:'',
        errorMesg:'',
        verifyProblemTForm: {
          problem: '',
          answer:'',

        },
        verifyProblemTFormRules: {
          problem: [
            {required: true, message: "请输入验证码", trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      getProblem(){
        var that = this;
        that.$axios.post('/merchant/questionSetting/queryQustion')
          .then(function (result) {
          var res = result.data;
          if(res.code && res.code == '0000'){
            that.verifyProblemTForm.problem = res.data;
          }else {
            that.$message.error(res.message);
          }
        }).catch(function (error) {
          console.log("error:",error)
        })

      },

      nextPage(){
        var that = this;
        this.$refs['verifyProblemTForm'].validate((valid) => {
          if (valid) {
            var params = {
              answer:that.verifyProblemTForm.answer
            }
            that.isSubmit = true;
            that.$axios({
              url:'/merchant/questionSetting/verifyAnswer',
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data:qs.stringify(params)
            }).then(function (result) {
              var res = result.data;
              if(res.code && res.code == '0000'){
                that.isShowImgError = false;
                var p = {
                  token:that.setParam,
                  questionAnswer:that.verifyProblemTForm.answer,
                }
                p = JSON.stringify(p);
                that.$emit("thisComponents",'newTradePasw',p,true);
              }else {
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
      this.getProblem()
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

  .verifyProblemTNo {
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
  .verifyProblemTForm{
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
