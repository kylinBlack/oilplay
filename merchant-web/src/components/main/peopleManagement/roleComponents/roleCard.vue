<template>
  <div>
    <permission :perVisible.sync="perVisible" person="role" :type="permissionType" :code="userObj.code"></permission>
    <edit-role :roleInfo="obj" :roleCode="userObj.code" :editStatus="editStatus" :editCardVisible.sync="editCardVisible" :updateList="updateList"></edit-role>
    <el-card class="role-card" v-if="!userObj.created">
      <div slot="header" class="card-head">
        <h3>{{userObj.rolename}}</h3>
        <p>{{userObj.description}}</p>
        <!-- <i v-if="status==20" class="el-icon-remove-outline"></i> -->
      </div>
      <div class="card-body">
        <div class="row">
          <span class="tag fl">菜单权限</span>
          <span @click="permissionManage" class="blue">查看权限</span>
        </div>
      </div>
      <div class="card-foot">
        <el-button @click="deleteCard" type="info" plain>删除</el-button>
        <!-- <el-button @click="disableCard" type="info" plain>{{status == 10 ? '禁用' : '启用'}}</el-button> -->
        <el-button @click="editCard" type="primary">编辑</el-button>
      </div>
    </el-card>
    <el-card class="role-card bg" v-if="userObj.created">
      <div @click="creatRoleCard">
        <i class="el-icon-plus"></i>
        <div>创建角色</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import permission from '../common/permission'
import editRole from './editRole'
export default {
  name: 'roleCard',
  props: {
    userObj: {tpye: Object},
    updateList: {type: Function}
  },
  components: {
    permission,
    editRole
  },
  data () {
    return {
      perVisible: false,
      editCardVisible: false,
      editStatus: 'update',
      permissionType: '',
      status: this.userObj.status,
      obj: this.userObj
    }
  },
  created () {

  },
  watch: {
    userObj: {
      deep: true,
      handler: function (val, oldVal) {
        this.status = val.status
      }
    }
  },
  methods: {
    // 设置权限
    permissionManage () {
      this.permissionType = 'update'
      this.perVisible = true
    },
    // 删除
    deleteCard () {
      this.$confirm('删除后不能恢复！您确定删除角色：' + this.userObj.rolename + '吗？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        customClass: 'isAuthTipBox'
      }).then(() => {
        let url = 'merchant/role/delete?code=' + this.userObj.code
        let _this = this
        let h = this.$createElement
        this.$axios.post(url).then(({data}) => {
          switch (data.code) {
            case '0000':_this.updateList(1); break
            case '1100':
              _this.$msgbox({
                title: '系统提示',
                message: h('p', null, [
                  h('div', null, '该角色下含有操作员，不能删除!'),
                  h('div', null, '如需删除角色，请先删除操作员.')
                ]),
                confirmButtonText: '确定',
                center: true,
                customClass: 'isAuthTipBox'
              })
              break
            default:
              break
          }
        })
      })
    },
    // 禁用
    disableCard () {
      let statusText = this.status === '10' ? '禁用' : '启用'
      this.$confirm('您确定' + statusText + '角色：' + this.userObj.rolename + '?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        customClass: 'isAuthTipBox'
      }).then(() => {
        let status = this.status === '10' ? '20' : '10'
        let url = 'merchant/role/updateStatus?code=' + this.userObj.code + '&status=' + status
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
      })
    },
    // 编辑
    editCard () {
      this.editStatus = 'update'
      this.editCardVisible = true
    },
    // 创建
    creatRoleCard () {
      this.editStatus = 'add'
      this.editCardVisible = true
    }
  }
}

</script>

<style lang="scss" scoped>
.role-card {
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
      right: 0;
      top: 0;
      color: #fd2f2f;
    }
  }
}
.role-card.bg {
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
  padding-top: 30px;
  border-bottom: 1px solid #f3f3f3;
}
.card-body .row {
  line-height: 30px;
}
.card-body .tag {
  margin-right: 30px;
}
.card-body .blue {
  color: #0066b5;
  cursor: pointer;
}
.card-foot {
  height: 80px;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
</style>
