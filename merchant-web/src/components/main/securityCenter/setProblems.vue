<template>
  <div class="setProblems">
    <p class="ciMark">
      <img src="../../../assets/img/tips.png" alt="">
      建议填写真实信息,有助于您通过回答问题快速找回密码
    </p>
    <el-form :model="setProblemsForm" :rules="setProblemsFormRules" ref="setProblemsForm" label-width="100px"
             class="setProblemsForm">
      <el-form-item label="安全问题" prop="questionCode">
        <el-select v-model="setProblemsForm.questionCode" placeholder="请选择安全问题">
          <el-option v-for="item in problemData " :label="item.name" :value="item.code" :key="item.code"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input v-model="setProblemsForm.answer" ></el-input>
        </el-form-item>

      <div class="oBtn">
        <el-button type="primary" @click="submintProblem">确认提交</el-button>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
  var qs = require('querystring')
  export default{
    name: "setProblems",
    props:['setParam'],
    data(){
      return {
        problemData:'',
        setProblemsForm: {
          questionCode : '',
          answer:'',
          oldAnswer:''
        },
        setProblemsFormRules: {
          questionCode : [
            {required: true, message: "请选择安全问题", trigger: 'blur'},
          ],
          answer: [
            {required: true, message: "请输入答案", trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      getProblems(){
        var that = this;
        that.$axios.post('/merchant/question/questionQuery')
          .then(function (result) {
          var res = result.data;
          if(res.code && res.code == '0000'){
            that.problemData = res.data;

          }else {
            that.$message.error(res.message);
          }

        }).catch(function (error) {
          console.log("error:",error)
        })

      },
      submintProblem(){
        var that = this;
        this.$refs['setProblemsForm'].validate((valid) => {
          if (valid) {
            that.$axios({
              url:'/merchant/questionSetting/setQuestion',
              method:'post',
              headers: {
                'Content-Type': "application/json"
              },
              data:that.setProblemsForm
            }).then(function (result) {
                var res = result.data;
              if(res.code && res.code == '0000'){
                that.$router.push({
                  name:'handleSuc',
                  params:{
                    type:'sProblems'
                  }
                })
                that.$emit('thisComponents','','',false)
              }else if (res.code && res.code == '1000') {
                that.$router.push({
                  name:'handleFail',
                  params:{
                    type:'sProblems'
                  }
                })
              }
              else {
                that.$message.error(res.message)
              }
            }).catch(function (error) {
              console.log("error:",error)
            })
          }
        })
      },


    },

    created(){
      this.getProblems()
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

  .setProblemsNo {
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
  .setProblemsForm{
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
