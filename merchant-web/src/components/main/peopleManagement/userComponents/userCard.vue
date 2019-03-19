
<template>
  <div>
    <permission :perVisible.sync="perVisible" person="user" :code="userObj.code"></permission>
    <edit-user :userOptions="userOptions" :userObj="userObj" ></edit-user>
    <el-card class="user-card" v-if="!userObj.created">
      <div slot="header" class="card-head" >
        <h3>{{userObj.nickname}}</h3>
        <p>{{userObj.remark}}</p>
        <i v-if="status==30" class="el-icon-remove-outline"></i>
      </div>
      <div class="card-body">
        <div class="row">
          <span class="tag fl">所属角色</span>
          <span class="">{{userObj.roleName}}</span>
        </div>
        <div class="row">
          <span class="tag fl">登录账号</span>
          <span class="">{{userObj.userName}}</span>
        </div>
        <div class="row">
          <span class="tag fl">菜单权限</span>
          <span @click="permissionManage" class="blue">查看权限</span>
        </div>
      </div>
      <div class="card-foot">
        <el-button type="info" plain @click="deleteUserCard">删除</el-button>
        <el-button type="info" plain @click="disableUserCard">{{status == 20 ? '禁用' : '启用'}}</el-button>
        <el-button type="primary" @click="editUserCard">编辑</el-button>
        <el-button type="info" plain @click="resetUserCard">重置密码</el-button>
      </div>
    </el-card>
    <el-card class="user-card bg" v-if="userObj.created">
      <div @click="creatUserCard">
        <i class="el-icon-plus"></i>
        <div>创建操作员</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import permission from '../common/permission'
import editUser from './editUser'
export default {
  name: 'userCard',
  props: {
    userObj: {type: Object},
    updateList: {type: Function}
  },
  components: {
    permission,
    editUser
  },
  data () {
    return {
      perVisible: false,
      status: this.userObj.status,
      userOptions: {
        visible: false,
        type: 'add',
        updateList: this.updateList,
        close: this.close
      }
    }
  },
  methods: {
    // 设置权限
    permissionManage () {
      this.perVisible = true
    },
    close () {
      this.userOptions.visible = false
    },
    // 删除
    deleteUserCard () {
      this.$confirm('删除后不能恢复！您确定删除操作员：' + this.userObj.nickname + '吗？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        customClass: 'isAuthTipBox'
      }).then(() => {
        let url = 'merchant/subUser/delete?code=' + this.userObj.code
        let _this = this
        this.$axios.post(url).then(({data}) => {
          if (data && data.code === '0000') {
            _this.updateList(1)
          }
        })
      }).catch(() => {

      })
    },
    // 禁用
    disableUserCard () {
      let statusText = this.status === '20' ? '禁用' : '启用'
      this.$confirm('您确定' + statusText + '操作员：' + this.userObj.nickname + '?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        customClass: 'isAuthTipBox'
      }).then(() => {
        let status = this.status === '20' ? '30' : '20'
        let url = 'merchant/subUser/updateStatus?code=' + this.userObj.code + '&status=' + status
        let _this = this
        this.$axios.post(url).then(({data}) => {
          if (data.code === '0000') {
            _this.status = status
            _this.$message({
              type: 'success',
              message: statusText + '成功!'
            })
          }
        })
      }).catch(() => {

      })
    },
    // 编辑
    editUserCard () {
      this.userOptions.visible = true
      this.userOptions.type = 'update'
    },
    updateCard (obj) {

    },
    // 创建
    creatUserCard () {
      this.userOptions.visible = true
      this.userOptions.type = 'add'
    },
    // 重置密码
    resetUserCard () {
      this.$confirm('您确定要重置账号为：' + this.userObj.userName + '的登录密码吗?', '重置登录密码确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        customClass: 'isAuthTipBox'
      }).then(() => {
        let url = 'merchant/subUser/resetLoginPwd?code=' + this.userObj.code
        let _this = this
        let h = this.$createElement
        this.$axios.post(url).then(({data}) => {
          if (data.code === '0000') {
            _this.status = status
            _this.$msgbox({
              title: '系统提示',
              message: h('p', null, [
                h('div', null, '密码初始化成功！ '),
                h('div', null, '新的登录密码为：' + data.data),
                h('div', null, '请谨记密码，以防丢失！')
              ]),
              confirmButtonText: '好的，我知道了',
              center: true,
              customClass: 'isAuthTipBox'
            })
          }
        }, (e) => {
          _this.$message.error('密码重置失效！')
        })
      }).catch(() => {

      })
    }
  }
}

</script>

<style lang="scss" scoped>
.user-card {
  width: 400px;
  height: 280px;
  margin: 40px 0 60px 0;
  box-sizing: border-box;
  .card-head {
    position: relative;
    h3 {
      margin: 0;
    }
    i {
      position: absolute;
      top: 0;
      right: 0;
      color: #fd2f2f;
    }
  }
}
.user-card.bg {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
  cursor: pointer;
}
.card-body {
  height: 110px;
  box-sizing: border-box;
  padding-left: 90px;
  border-bottom: 1px solid #f3f3f3;
}
.card-body .row {
  line-height: 30px;
}
.card-body .tag {
  margin-right: 30px;
}
.card-foot {
  height: 80px;
  padding: 20px 0;
  box-sizing: border-box;
}
.blue {
  color: #0066b5;
  cursor: pointer;
}
</style>
