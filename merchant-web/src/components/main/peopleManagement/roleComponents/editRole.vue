<template>
  <el-dialog
    class="edit-dialog"
    :title="title"
    :visible.sync="editCardVisible"
    width="420px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="close"
    :close="close">
    <permission :perVisible.sync="perVisible" @passCode="getCode"></permission>
    <el-form :model="editCardForm" ref="editCardForm" :rules="editrule" >
      <el-form-item label="角色名称" prop="rolename" :label-width="formLabelWidth">
        <el-input v-model="editCardForm.rolename" @input="changeCode"></el-input>
        <p class="roleError" v-show="isShowRoleError">{{errorMesg}}</p>
      </el-form-item>
      <el-form-item v-if="editStatus == 'add'" prop="resourceList" label="菜单权限" :label-width="formLabelWidth">
        <el-input class="el-ipt" readonly placeholder="点击选择权限" v-model="editCardForm.resourceList"></el-input>
        <i class="el-icon-tickets" @click="openPermission"></i>
      </el-form-item>
      <el-form-item label="备注" prop="description" :label-width="formLabelWidth">
        <el-input v-model="editCardForm.description" placeholder="请输入不超过30字的描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="editStatus == 'update'" type="info" plain @click="close">取消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import permission from '../common/permission'
export default {
  props: {
    editCardVisible: {default: false, type: Boolean},
    editStatus: {default: 'add', type: String},
    roleCode: {type: [String, Array]},
    updateList: {type: Function},
    roleInfo: {type: Object}
  },
  components: {
    permission
  },
  data () {
    return {
      title: '',
      perVisible: false,
      isShowRoleError: false,
      errorMesg: '',
      editCardForm: {
        code: [],
        description: '',
        resourceList: '',
        rolename: ''
      },
      editrule: {
        rolename: [
          {required: true, message: '角色名称不能为空', trigger: 'blur'},
          {required: true, max: 30, message: '最多不超过30个字', trigger: 'blur'}
        ],
        resourceList: [{required: true, message: '菜单权限不能为空', trigger: 'blur,change'}],
        description: [{required: false, max: 30, message: '最多不超过30个字', trigger: 'blur'}]
      },
      formLabelWidth: '80px',
      gridData: []
    }
  },
  created () {
    if (this.editStatus === 'add') {
      this.title = '创建角色'
    } else {
      this.title = '编辑角色'
      this.editCardForm = Object.assign({}, this.editCardForm, this.roleInfo)
    }
  },
  watch: {
    editStatus (val) {
      if (val === 'add') {
        this.title = '创建角色'
      } else {
        this.title = '编辑角色'
        this.editCardForm = Object.assign({}, this.editCardForm, this.roleInfo)
      }
    }
  },
  methods: {
    changeCode (val) {
      if (val === '') {
        this.isShowRoleError = false
      }
    },

    // 新增
    add () {
      let url = 'merchant/role/create'
      let params = {
        resourceList: this.editCardForm.code,
        rolename: this.editCardForm.rolename,
        description: this.editCardForm.description
      }
      let _this = this
      this.$axios.post(url, params).then(({data}) => {
        if (data && data.code === '0000') {
          _this.$emit('update:editCardVisible', false)
          _this.updateList(1)
          _this.$refs.editCardForm.resetFields()
          _this.isShowRoleError = false
        } else if (data) {
          _this.isShowRoleError = true
          _this.errorMesg = data.message
        }
      })
    },
    // 更新
    update () {
      let url = 'merchant/role/update'
      let _this = this
      let params = {
        code: this.roleCode,
        description: this.editCardForm.description,
        rolename: this.editCardForm.rolename
      }
      this.$axios.post(url, params).then(({data}) => {
        if (data && data.code === '0000') {
          _this.$emit('update:editCardVisible', false)
          _this.updateList(1)
        } else if (data && data.code === '1100') {
          _this.isShowRoleError = true
          _this.errorMesg = data.message
        }
      })
    },
    // 保存
    save () {
      this.$refs['editCardForm'].validate((valid) => {
        if (!valid) return
        this.editStatus === 'add' ? this.add() : this.update()
      })
    },
    // 关闭弹框
    close () {
      this.$refs.editCardForm.resetFields()
      this.$emit('update:editCardVisible', false)
      this.isShowRoleError = false
    },
    // 打开权限配置
    openPermission () {
      this.perVisible = true
    },
    // 获取权限code
    getCode (list) {
      let name = []
      let code = []
      list.forEach(el => {
        name.push(el.split('/')[0])
        code.push(el.split('/')[1])
      })
      this.editCardForm.resourceList = name.join(',')
      this.editCardForm.code = code
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
  left: 0px;
  line-height: 20px;
}
</style>
