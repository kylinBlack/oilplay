<template>
  <div class="myAccount">
    <div class="accNav">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <pre> </pre>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-menu :default-active="activeMenuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">我的账户</el-menu-item>
            <el-menu-item index="2">
              <router-link to="/transactRcord"> 交易记录</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/securityCenter"> 安全中心</router-link>
            </el-menu-item>
            <!--<el-menu-item index="4">人员管理</el-menu-item>-->
            <!--<el-menu-item index="5">自助服务</el-menu-item>-->
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import copHeader from '../../lib/header.vue'
  var qs = require('querystring')


  export default{
    name: "myAccount",
    data(){
      return {
      }
    },
    methods: { },
    components: {
      copHeader,
    },

    created(){

    }
  }
</script>
<style scoped>
/*  导航菜单 */
.accNav {
  position: absolute;
  width: 100%;
  height: 80px;
  z-index: 30;
  top: 44px;
}

.accNav .el-row {
  position: relative;
  width: 100%;
}

.accNav .el-row,
.accNav .el-col {
  height: 100%;
  line-height: 80px;
}
</style>
