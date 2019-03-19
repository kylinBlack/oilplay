
<template>
  <div>
    <el-dialog
    class="edit-dialog"
    :title="title"
    :visible.sync="userOptions.visible"
    width="500px"
    :close-on-click-modal="false"
    :before-close="close"
    :close="close">
      <el-form ref="editUserForm" :model="editUserMo" :rules="editUserRule" label-width="90px">
        <el-form-item :label="mobileText" prop="mobile">
          <el-input v-model="editUserMo.mobile" placeholder="手机号码将作为登录账号" :disabled="userOptions.type !== 'add'" @input="changeCode"></el-input>
          <p class="operatorError" v-show="isShowOperatorError">{{errorMesg}}</p>
        </el-form-item>
        <el-form-item label="图形验证码" prop="imgCode" v-if="phone.isShowImgCode && userOptions.type == 'add'">
          <el-col :span="13">
            <el-input v-model="editUserMo.imgCode"></el-input>
          </el-col>
          <el-col :span="11" class="codeBox">
            <img :src="editUserMo.codeImgurl" alt="图片验证码" title="看不清，换一张" @click.stop="getImgcode">
          </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="smsCode" v-if="userOptions.type == 'add'">
          <el-col :span="13">
            <el-input v-model="editUserMo.smsCode" @input="changeCode"></el-input>
            <p class="operatorErrors" v-show="isShowOperatorErrors">{{errorMesgs}}</p>
          </el-col>
          <el-col :span="11" class="codeBox">
            <el-button type="primary" @click="getPhoneCode"> {{phone.phoneCode}} </el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="登录密码" prop="loginPwd" v-if="userOptions.type == 'add'" onkeypress="return event.keyCode!=32">
          <el-input v-model="editUserMo.loginPwd" placeholder="设置6-20位数字﹑字母组合的登录密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="editUserMo.nickname" placeholder="请输入操作员真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCardNo">
          <el-input v-model="editUserMo.idCardNo" placeholder="请输入操作员身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="roleCode">
          <el-select v-model="editUserMo.roleCode" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.code"
              :label="item.rolename"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="editUserMo.email"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="editUserMo.remark" placeholder="请输入不超过30字的描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="close">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'editUser',
  props: {
    userOptions: {
      type: Object,
      default () {
        return {
          visible: false,
          type: 'add',
          updateList: Function,
          close: Function
        }
      }
    },
    userObj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    /* var re = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(\da-z)]|[\(\)])+$)([^(\da-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9])/ */
    var re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    return {
      roleList: [],
      title: '创建操作员',
      isShowOperatorError: false,
      isShowOperatorErrors: false,
      errorMesg: '',
      errorMesgs: '',
      mobileText: '手机号码',
      mobilePhone: '',
      mobileSmsCode: '',
      timers: null,
      phone: {
        phoneCode: '获取验证码',
        mark: false,
        time: 60,
        isShowImgCode: false
      },
      editUserMo: {
        email: '', // 邮箱
        idCardNo: '', // 身份证
        loginPwd: '', // 登录密码
        mobile: '', // 手机号
        nickname: '', // 姓名
        remark: '', // 备注
        roleCode: '', // 所属角色
        smsCode: '', // 验证码
        codeImgurl: '',
        imgCode: ''
      },
      editUserRule: {
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
        idCardNo: [
          { required: false, message: '请输入身份证', trigger: 'blur' },
          {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码', trigger: 'blur'}
        ],
        loginPwd: [
          {required: true, message: '登录密码不能为空', trigger: 'blur'},
          {min: 6, max: 20, message: '请输入6-20位的登陆密码', trigger: 'blur'},
          {pattern: re, message: '请输入6-20位数字和字母的组合', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {pattern: /^[0-9]/, message: '请输入数字', trigger: 'blur'},
          {pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '请输入正确的手机号码', trigger: 'blur'}
        ],
        nickname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          {min: 2, max: 5, message: '请输入2-5位汉字', trigger: 'blur'},
          {pattern: /^([\u4e00-\u9fa5]){2,5}$/, message: '请输入正确格式的姓名', trigger: 'blur'}
        ],
        smsCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        roleCode: [{ required: true, message: '所属角色不能为空', trigger: 'change' }],
        remark: [{required: false, max: 30, message: '最多不超过30个字', trigger: 'blur'}],
        imgCode: [{required: false,  trigger: 'blur'}]
      }
    }
  },
  created () {
    this.getRoleUserAll()
  },
  watch: {
    userOptions: {
      handler: function (options, old) {
        if (options.type === 'update' && options.visible) {
          this.mobileText = '登录账号'
          this.title = '编辑操作员'
          this.editUserMo = Object.assign({}, this.editUserMo, this.userObj)
        }
      },
      deep: true
    }
  },
  methods: {
    changeCode (val) {
      if (this.editUserMo.mobile === val) {
        if (val !== this.mobilePhone) {
          this.isShowOperatorError = false
          this.mobilePhone = val
        }
      }
      if (this.editUserMo.smsCode === val) {
        if (val !== this.mobileSmsCode) {
          this.isShowOperatorErrors = false
          this.mobileSmsCode = val
        }
      }
    },

    // 角色查询
    getRoleUserAll () {
      let url = 'merchant/role/queryAll'
      let _this = this
      let params = {
        pageBean: {
          pageNo: 1,
          pageSize: 10
        }
      }
      this.$axios.post(url, params).then(({data}) => {
        _this.roleList = data.data.dataList
      })
    },
    // 获取权限码
    getPhoneCode () {
      if (this.phone.mark) return
      this.$refs.editUserForm.validateField('mobile', (value) => {
        if (value) return
        let url = 'merchant/subUser/sendCreateSubUserSmsCode?mobile=' + this.editUserMo.mobile + '&imgCode=' + this.editUserMo.imgCode
        this.$axios.post(url).then(({data}) => {
          if (data.code && data.code === '0000') {
            this.phone.isShowImgCode = false
            this.setTimer()
          } else if (data.code && data.code === '2300') {
            this.getImgcode()
            this.phone.isShowImgCode = true
          } else if (data.code && data.code === '1100') {
            this.isShowOperatorError = true
            this.errorMesg = data.message
          } else {
            this.clearTimer()
          }
        })
      })
    },
    setTimer () {
      var that = this
      var time = 60
      that.timers = setInterval(function () {
        time--
        that.phone.phoneCode = time + 's'
        that.phone.mark = true
        if (time <= 0) {
          clearInterval(that.timers)
          that.phone.phoneCode = '获取验证码'
          that.editUserMo.mobile !== '' ? that.phone.mark = false : that.phone.mark = true
        }
      }, 1000)
    },

    clearTimer () {
      var that = this
      clearInterval(that.timers)
      that.phone.mark = false
      that.phone.phoneCode = '获取验证码'
    },
    getImgcode () {
      var that = this
      that.editUserMo.codeImgurl = that.$imgCodeUrl + '/templates/imageCode/getCode?' + Math.random()
    },
    // 提交
    onSubmit () {
      this.$refs['editUserForm'].validate((valid) => {
        if (!valid) return
        this.userOptions.type === 'update' ? this.updateUser() : this.creatUser()
      })
    },
    // 创建操作员
    creatUser () {
      let url = 'merchant/subUser/create'
      let _this = this
      let params = Object.assign({}, this.editUserMo)
      params.loginPwd = this.$md5(params.loginPwd)
      this.$axios.post(url, params).then(({data}) => {
        _this.userOptions.updateList(1)
        _this.clearTimer()
        if (data && data.code === '0000') {
          _this.$refs['editUserForm'].resetFields()
          _this.userOptions.close()
        } else if (data && data.code === '1100') {
          _this.isShowOperatorErrors = true
          _this.errorMesgs = data.message
          _this.editUserMo.imgCode = ''
        } else {
          _this.$message.error(data.message)
        }
      })
    },
    // 更新操作员信息
    updateUser () {
      let url = 'merchant/subUser/update'
      let _this = this
      let params = Object.assign({}, this.editUserMo)
      this.$axios.post(url, params).then(({data}) => {
        _this.userOptions.close()
        _this.$refs['editUserForm'].resetFields()
        _this.userOptions.updateList(1)
      })
    },
    // 关闭弹框
    close () {
      this.$refs['editUserForm'].resetFields()
      this.clearTimer()
      this.userOptions.close()
      this.isShowOperatorError = false
      this.isShowOperatorErrors = false
    }
  }
}

</script>

<style  scoped>
.codeBox {
  text-align: center;
}
.operatorError {
  position: absolute;
  color: red;
  font-size: 12px;
  left: 0px;
  line-height: 20px;
}
.operatorErrors {
  position: absolute;
  color: red;
  font-size: 12px;
  left: 2px;
  top: 30px;
}
</style>
