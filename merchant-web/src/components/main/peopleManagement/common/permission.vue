<template>
  <div>
    <el-dialog
      title="权限配置"
      class="permission-dialog"
      append-to-body
      :visible.sync="perVisible"
      width="720px"
      :before-close="close"
      :close="close">
      <div class="tree-box">
        <ul class="head">
          <li>一级菜单</li>
          <li>二级菜单</li>
          <li>功能与操作</li>
        </ul>
        <ul class="tree" v-if="gridData&&gridData.length>0">
          <!-- 操作员列表中查看权限，只读 -->
          <template v-if="person==='user'">
            <template v-for="column in gridData">
              <li v-if="column.show" :key="column.code">
                <span >{{column.name}}</span>
                <ul v-if="column.children&&column.children.length>0">
                  <template v-for="childrenColumn in column.children">
                    <li v-if="childrenColumn.show" :key="childrenColumn.code">
                    <span>{{childrenColumn.name}}</span>
                    <ul v-if="childrenColumn.children&&childrenColumn.children.length>0">
                      <template v-for="grandChildrenColumn in childrenColumn.children">
                        <li v-if="grandChildrenColumn.show" :key="grandChildrenColumn.code">
                          <span>{{grandChildrenColumn.name}}</span>
                        </li>
                      </template>
                    </ul>
                  </li>
                  </template>
                </ul>
              </li>
            </template>
          </template>
          <!-- 角色列表查看权限，可编辑 -->
          <template v-if="person!=='user'">
            <li v-for="column in gridData" :key="column.code">
            <span><el-checkbox v-model="column.show" @change="columnChange(column)" :ref="column.perms">{{column.name}}</el-checkbox></span>
            <ul v-if="column.children&&column.children.length>0">
              <li v-for="childrenColumn in column.children" :key="childrenColumn.code">
                <span><el-checkbox v-model="childrenColumn.show" @change="childrenColumnChange(childrenColumn,column)" :ref="childrenColumn.perms">{{childrenColumn.name}}</el-checkbox></span>
                <ul v-if="childrenColumn.children&&childrenColumn.children.length>0">
                  <el-checkbox-group v-model="grandCheckedList" @change="checked=>checkPermission(checked,childrenColumn,column)">
                  <li v-for="grandChildrenColumn in childrenColumn.children" :key="grandChildrenColumn.code">
                    <span><el-checkbox :label="grandChildrenColumn.name+'/'+grandChildrenColumn.code">{{grandChildrenColumn.name}}</el-checkbox></span>
                  </li>
                  </el-checkbox-group>
                </ul>
              </li>
            </ul>
          </li>
          </template>
        </ul>
      </div>
      <span v-if="person!=='user'" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="close">取消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    perVisible: {type: Boolean, default: false}, // 开关
    person: {type: String, default: ''}, // 权限发起人
    code: {type: [String, Array], default: ''}, // 发起人code
    type: {type: String, default: ''} // 在角色列表中查看权限，支持编辑
  },
  data () {
    return {
      gridData: [],
      grandCheckedList: []
    }
  },
  watch: {
    perVisible (value) {
      if (value) {
        switch (this.person) {
          case 'role': this.getTreeResourceByRole(); break
          case 'user': this.getTreeResourceByUser(); break
          default:this.getTreeAllResource(); break
        }
      }
    }
  },
  methods: {
    childrenColumnChange (childrenColumn, column) {
      if (childrenColumn.children && childrenColumn.children.length > 0) {
        column.show = childrenColumn.show
        childrenColumn.children.forEach(el => {
          if (childrenColumn.show) {
            if (!this.grandCheckedList.includes(el.name + '/' + el.code)) {
              this.grandCheckedList.push(el.name + '/' + el.code)
            }
          } else {
            if (this.grandCheckedList.includes(el.name + '/' + el.code)) {
              this.grandCheckedList.splice(this.grandCheckedList.indexOf(el.name + '/' + el.code), 1)
            }
          }
        })
      }
    },
    columnChange (column) {
      if (column.children && column.children.length > 0) {
        column.children.forEach(el => {
          el.show = column.show
          if (el.children && el.children.length > 0) {
            el.children.forEach(item => {
              if (column.show) {
                if (!this.grandCheckedList.includes(item.name + '/' + item.code)) {
                  this.grandCheckedList.push(item.name + '/' + item.code)
                }
              } else {
                if (this.grandCheckedList.includes(item.name + '/' + item.code)) {
                  this.grandCheckedList.splice(this.grandCheckedList.indexOf(item.name + '/' + item.code), 1)
                }
              }
            })
          }
        })
      }
    },
    checkPermission (val, childrenColumn, column) {
      if (val && val.length > 0) {
        this.grandCheckedList = val.filter(n => true)
        val.forEach(item => {
          let code = item.split('/')[1]
          childrenColumn.children.forEach(it => {
            if (it.code === code) {
              childrenColumn.show = true
              column.show = true
            }
          })
        })
      }
    },
    close () {
      this.$emit('update:perVisible', false)
    },
    save () {
      if (this.grandCheckedList && this.grandCheckedList.length > 0) {
        this.$emit('passCode', this.grandCheckedList)
      }
      if (this.type === 'update') {
        this.updatePermission()
      }
      this.$emit('update:perVisible', false)
    },
    // 更新角色权限
    updatePermission () {
      let url = 'merchant/role/updateResource'
      let params = {
        code: this.code,
        resourceList: this.grandCheckedList.map(el => el.split('/')[1])
      }
      let _this = this
      this.$axios.post(url, params).then(({data}) => {
        if (data.code === '0000') {
          _this.$message.success('权限更新成功')
        } else {
          _this.$message.error(data.message)
        }
      })
    },
    // 查询所有权限配置
    getTreeAllResource () {
      let url = 'merchant/resource/getTreeAllResource'
      let _this = this
      this.$axios.post(url).then(({data}) => {
        _this.grandCheckedList = []
        _this.gridData = data.data.children
      })
    },
    // 查询角色权限
    getTreeResourceByRole () {
      let _this = this
      let url = 'merchant/resource/getTreeResourceByRole?roleCode=' + this.code
      this.$axios.post(url).then(({data}) => {
        if (data.code === '0000') {
          _this.gridData = data.data.children
          data.data.children.map((column) => {
            column.children.map((childrenColumn) => {
              childrenColumn.children.map((grandChildrenColumn) => {
                if (grandChildrenColumn.show) {
                  _this.grandCheckedList.push(grandChildrenColumn.name + '/' + grandChildrenColumn.code)
                }
              })
            })
          })
        } else {
          _this.$message.error(data.message)
        }
      })
    },
    // 查询用户权限
    getTreeResourceByUser () {
      let _this = this
      let url = 'merchant/resource/getTreeResourceByUser?userCode=' + this.code
      this.$axios.post(url).then(({data}) => {
        if (data.code === '0000') {
          _this.gridData = data.data.children
          data.data.children.map((column) => {
            column.children.map((childrenColumn) => {
              childrenColumn.children.map((grandChildrenColumn) => {
                if (grandChildrenColumn.show) {
                  _this.grandCheckedList.push(grandChildrenColumn.name + '/' + grandChildrenColumn.code)
                }
              })
            })
          })
        } else {
          _this.$message.error(data.message)
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
/* .tree-box {
  height: 400px;
  overflow-y: auto;
} */
.head {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.head > li {
  line-height: 40px;
  text-align: center;
  border: 1px solid #f3f3f3;
  font-weight: 700;
}
.head > li:nth-child(1) {
  width: 100px;
}
.head > li:nth-child(2) {
  width: 150px;
}
.head > li:nth-child(3) {
  flex: 1;
}
.tree {
  height: 240px;
  overflow-y: auto;
}
.tree > li {
  display: flex;
}
.tree span {
  line-height: 40px;
  display: inline-block;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  padding-left: 10px;
}
.tree > li > span {
  min-width: 102px;
}
.tree > li > ul {
  width: 100%;
}
.tree > li > ul > li {
  display: flex;
}
.tree > li > ul > li > span {
  min-width: 152px;
}
.tree > li > ul > li > ul {
  border: 1px solid #f3f3f3;
  width: 100%;
}
.tree > li > ul > li > ul li {
  display: inline-block;
  margin: 0 10px;
}
.tree > li > ul > li > ul li > span {
  border: none;
}
</style>
