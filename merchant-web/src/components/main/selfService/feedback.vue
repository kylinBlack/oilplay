<template>
  <div class="feedback-page">
    <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
        <pre></pre>
    </el-col>
    <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="16" :span="6" >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <span class="babel">你当前的位置：</span>
        <el-breadcrumb-item :to="{ path: '/helpCenter' }">帮助中心</el-breadcrumb-item>
        <el-breadcrumb-item>问题反馈</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="content">
        <div class="title">
          <h3>网站使用问题反馈</h3>
          <p>您在使用智企银通网站过程中产生的任何疑问和意见都可以向我们提出，以便我们更好地为您提供解答和服务！</p>
        </div>
        <el-form :model="feedbackForm" :rules="rules" ref="feedbackForm" label-width="100px" class="feedbackForm">
        <el-form-item label="问题分类" prop="questionType">
          <el-radio-group class="check-box" v-model="feedbackForm.questionType">
            <el-radio border label="1">账号问题</el-radio>
            <el-radio border label="2">产品服务</el-radio>
            <el-radio border label="3">交易</el-radio>
            <el-radio border label="4">账户安全</el-radio>
            <el-radio border label="5">开发接入</el-radio>
            <el-radio border label="0">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题描述" prop="questionDescribe">
          <el-input type="textarea" :rows='4' placeholder="请简要描述您的问题" v-model="feedbackForm.questionDescribe"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="img">
          <div class="el-upload__tip">您可以上传相关的截图，以便我们更好地理解问题。支持jpg,jpeg,png格式，大小不超过2M</div>
          <el-upload
            :action="loadImgUrl"
            list-type="picture-card"
            :limit="3"
            :before-upload="beforeUpload"
            :on-exceed="pictureCardExceed"
            :on-success="pictureCardSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="feedbackForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="feedbackForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobile">
          <el-input v-model="feedbackForm.mobile"></el-input>
        </el-form-item>
        <el-form-item class="footer-btn">
          <el-button type="primary" @click="submitForm('feedbackForm')">确定</el-button>
        </el-form-item>
      </el-form>
      </div>

    </el-col>
    <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
        <pre></pre>
    </el-col>
  </div>

</template>

<script>
export default{
  name: 'feedback',
  props: {

  },
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [],
      loadImgUrl: this.$imgCodeUrl + '/upload/image',
      feedbackForm: {
        img: [],
        mobile: '',
        name: '',
        questionDescribe: '',
        questionType: '',
        sex: 0
      },
      rules: {
        name: [{ required: false, trigger: ['blur', 'change'] }],
        img: [{ required: false, message: '请上传图片', trigger: 'change' }],
        mobile: [{ required: true, message: '必填', trigger: 'change' }],
        questionDescribe: [{ required: true, max: 500, message: '必填', trigger: 'change' }],
        questionType: [{ required: true, message: '必填', trigger: 'change' }],
        sex: [{ required: false, trigger: 'change' }]
      }
    }
  },
  created () {
    this.$emit('changewindowSize', '', '帮助中心')
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        let url = 'merchant/questionFeedback/saveQuestionFeedback'
        let params = this.feedbackForm
        this.$axios.post(url, params).then(() => {
          _this.$message.success('问题反馈提交成功！')
          _this.$refs[formName].resetFields()
        })
      })
    },
    // 放大显示已上传的图片
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传之前判断大小跟格式
    beforeUpload (file) {
      const typelist = ['image/jpeg', 'image/png', 'image/jpg']
      const isType = typelist.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isType && isLt2M) {
        this.$message.error('上传图片只能是 jpg,jpeg,png 格式!')
      }
      if (!isLt2M && isType) {
        this.$message.error('上传图片大小不能超过 2M!')
      }
      if (!isLt2M && !isType) {
        this.$message.error('上传图片只能是 jpg,jpeg,png 格式且图片大小不超过2M!')
      }
      return isType && isLt2M
    },
    // 删除已上传的钩子
    handleRemove (file, list) {
      if (file.response.code === '0000') {
        this.feedbackForm.img.splice(this.feedbackForm.img.indexOf(file.response.data), 1)
      }
    },
    // 上传成功后的钩子
    pictureCardSuccess (response, file, fileList) {
      if (response.code === '0000') {
        this.feedbackForm.img.push(response.data)
      }
    },
    // 超出上传数量限制的钩子
    pictureCardExceed (file, list) {
      this.$message.warning('最多只能上传3张图片!')
    }
  }
}

</script>

<style lang="scss" scoped>
.feedback-page .el-breadcrumb {
  font-size: 16px;
  padding: 10px 0;
}
.content {
  padding-top: 20px;
}
.content .title {
  text-align: center;
}
.title h3 {
  padding-bottom: 20px;
}
.title p {
  font-size: 14px;
  color: #666;
}
.feedbackForm {
  padding: 60px 25%;
  .el-upload__tip {
    margin-top: 0;
  }
}
.babel {
  float: left;
}
.check-box label > .el-radio__input {
  display: none;
}
.feedbackForm .footer-btn {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 0;
}
</style>
