<template>
  <el-dialog
    class="edit-dialog"
    title="更改个人信息"
    :visible.sync="visible"
    width="420px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="close"
    :close="close">
    <el-form :model="updateOper" ref="updateOper" :rules="editrule" :label-width="formLabelWidth">
      <el-form-item label="姓名" prop="nickname">
        <el-input v-model="updateOper.nickname" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item  prop="idCardNo" label="身份证号码">
        <el-input placeholder="请输入身份证号码" v-model="updateOper.idCardNo"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="updateOper.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {default: false, type: Boolean},
    updateObj: {type: Object},
    updateList: {type: Function}
  },
  data () {
    return {
      updateOper: {
        idCardNo: '',
        email: '',
        nickname: ''
      },
      editrule: {
        nickname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          {min: 2, max: 5, message: '请输入2-5位汉字', trigger: 'blur'},
          {pattern: /^([\u4e00-\u9fa5]){2,5}$/, message: '请输入正确格式的姓名', trigger: 'blur'}
        ],
        idCardNo: [
          { required: false, message: '请输入身份证', trigger: 'blur' },
          {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码', trigger: 'blur'}
        ],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
      },
      formLabelWidth: '100px'
    }
  },
  watch: {
    updateObj: {
      handler (obj) {
        this.updateOper = Object.assign({}, obj)
      },
      deep: true
    }
  },
  methods: {
    // 更新
    update () {
      let url = 'merchant/user/updateUserInfo'
      let _this = this
      let params = {
        email: this.updateOper.email,
        idCardNo: this.updateOper.idCardNo,
        nickname: this.updateOper.nickname
      }
      this.$axios.post(url, params).then(({data}) => {
        if (data && data.code === '0000') {
          _this.$emit('update:visible', false)
          _this.updateList()
        }
      })
    },
    // 保存
    save () {
      this.$refs['updateOper'].validate((valid) => {
        if (!valid) return
        this.update()
      })
    },
    // 关闭弹框
    close () {
      this.$refs.updateOper.resetFields()
      this.$emit('update:visible', false)
    }
  }
}

</script>

<style  scoped>
.edit-dialog .el-dialog .el-icon-tickets {
  position: absolute;
  top: 13px;
  left: 10px;
  cursor: pointer;
}

.roleError {
  position: absolute;
  color: red;
  font-size: 12px;
  left: 100px;
  top: 105px;
}
</style>
