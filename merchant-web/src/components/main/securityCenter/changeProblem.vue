<template>
  <div class="changeProblem">
    <p class="ciMark">
      <img src="../../../assets/img/tips.png" alt="">
      为保障您的账号安全,需要验证原安全问题的答案
    </p>
    <el-form :model="changeProblemForm" :rules="changeProblemFormRules" ref="changeProblemForm" label-width="100px"
             class="changeProblemForm">
      <el-form-item label="安全问题">
        <div class="changeProblemNo">{{problemParam}}</div>
      </el-form-item>

      <p class="imgError" v-show="isShowProblemError">{{errorMesg}}</p>
        <el-form-item label="答案" prop="answer">
          <el-input v-model="changeProblemForm.answer" @input="changeCode"></el-input>
        </el-form-item>

      <div class="oBtn">
        <el-button type="primary" @click="nextPage">下一步</el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
  var qs = require('querystring')
  export default{
    name: "changeProblem",
    props:['problemParam'],//
    data(){
      return {
        errorMesg:'',
        isShowProblemError:false,
        changeProblemForm: {
          answer : '',
        },
        changeProblemFormRules: {
          answer: [
            {required: true, message: "请输入答案", trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      changeCode(val){
        if(val == ''){
          this.isShowProblemError = false;
        }
      },
      nextPage(){
        var that = this;
        this.$refs['changeProblemForm'].validate((valid) => {
          if (valid) {
            that.$axios({
              url:'/merchant/questionSetting/verifyAnswer',
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data:qs.stringify(that.changeProblemForm)
            }).then(function (result) {
                var res = result.data;
              if(res.code && res.code == '0000'){
                that.$emit("thisComponents",'setNweProblems',that.changeProblemForm.answer,true);

              } else {
                that.isShowProblemError = true;
                that.errorMesg= res.message;

              }
            }).catch(function (error) {
              console.log("error:",error)
            })
          }
        })
      },

    },

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

  .changeProblemNo {
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
  .changeProblemForm{
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
