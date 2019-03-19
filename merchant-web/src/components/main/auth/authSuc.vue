<template>
  <el-row ref="comp">
  <div class="authSuc">
    <p class="sucicon">
      <img src="../../../assets/img/sucicon.png" alt="">
    </p>
    <p class="sucText">实名认证申请提交成功 !</p>
    <div class="line"></div>
    <p class="sucMask">我们会在1-3个工作日内完成审核。审核结果将以短信或邮件的形式告知，请留意查收</p>
    <div class="sucbtn">
      <p class="btnmarsk">您还没有设置账户安全保护问题, 快去完善吧  </p>
      <el-button type="primary" class="" @click="linkPage('securityProblem')">设置安全问题</el-button>
      <p>
        <el-button type="text"  @click="linkPage('myAccount')"> << 返回我的账户 </el-button>
      </p>
  </div>
  </div>
  </el-row>
</template>
<script>
export default{
  name: 'authSuc',
  data () {
    return {
      time: 5
    }
  },
  methods: {
    linkPage (val) {
      if (val === 'securityProblem') {
        this.$router.push({name: val, params: {sucSet: true}})
      } else {
        this.$router.push({name: val})
      }
    }
  },
  created () {
    this.$emit('changewindowSize', '', '实名认证')
  }
}
</script>
<style scoped>
.authSuc {
  margin-top: 5%;
}

.line {
  position: relative;
  width: 100%;
  height: 1px;
  background: #9f9f9f;
  opacity: 0.2;
}

.sucicon,
.sucText,
.sucMask {
  text-align: center;
  margin-bottom: 32px;
}

.sucText {
  font-size: 30px;
  color: #333333;
  letter-spacing: 3px;
}

.sucMask {
  margin-top: 22px;
  color: #9f9f9f;
  font-size: 14px;
  letter-spacing: 1px;
}

.sucbtn {
  margin-top: 63px;
  text-align: center;
}
.btnmarsk {
  text-align: center;
  position: relative;
  padding-bottom: 15px;
  color: #333333;
  font-size: 14px;
}
</style>
