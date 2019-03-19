<template>
  <div class="securityCenter">
    <el-row>
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="16">
        <div class="producaLeft">
          <el-menu
            :default-active="securityRouterName"
            class="el-menu-vertical-demo proMenu"
            @select="handleSelect"
            @close="handleClose">
            <el-menu-item index="securitySet">
              <span slot="title">安全设置</span>
            </el-menu-item>
            <el-menu-item index="securityProblem">
              <span slot="title">安全问题</span>
            </el-menu-item>

          </el-menu>
        </div>
        <div class="producaRight">
          <router-view @changeMenuIndex="changeMenuIndex"></router-view>
        </div>

      </el-col>
      <el-col :xs="1" :sm="1" :md="2" :lg="4" :xl="4">
        <pre>  </pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: "securityCenter",
    data(){
      return {
        isClick: false,
        securityRouterName: 'securitySet',
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);

      },

      handleClose(key, keyPath){
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath){

        this.securityRouterName = key;
        this.$router.replace('/securityCenter/'+key);
      },

      changeMenuIndex(val){
        this.handleSelect(val)
      }

    },
    created(){
      this.$emit('changewindowSize', '','',true,'securityCenter');

    }
  }
</script>
<style scoped>
  .securityCenter{
    padding-top:15px;
  }
  .producaLeft, .producaRight {
    position: relative;
    box-sizing: border-box;
    float: left;
    padding-top: 15px;
  }

  .producaLeft {

    width: 23%;
  }

  .producaRight {
    width: 77%;
    padding-left: 30px;

  }

  .proMenu .el-menu-item {
    border-bottom: 1px solid #f3f3f3;
    color: #333333;
  }

  .proMenu .el-menu-item.is-active {
    background: #f3f3f3;

  }

  .bottomLine {
    height: 1px;
    background: #f8f8f8;
    position: relative;
    width: 100%;

    display: inline-block;
  }

  .productBtn {
    position: relative;
    width: 100%;
    text-align: right;
    margin: 25px 0;

  }

</style>
