<template>
  <el-container>
    <el-header>
      <div class="index_header">
        <el-row>
          <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
            <pre> </pre>
          </el-col>
          <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="16" class="header_main">
            <div class="index_logo">
              <img src="../../assets/img/logo.png" alt="">
            </div>
            <div class="index_nav">
              <el-menu :default-active="menuActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="homePage">首页</el-menu-item>
                <el-menu-item index="api">文档中心</el-menu-item>
                <el-menu-item index="aboutus">关于我们</el-menu-item>
                <!--<el-menu-item index="help">帮助</el-menu-item>-->
                <el-menu-item index="login" v-show="isShow">登录</el-menu-item>
                <el-menu-item index="register" v-show="isShow"><span class="index_register">注册</span></el-menu-item>
                <el-menu-item index="register" v-if="!isShow" @click="signOut">退出</el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
            <pre> </pre>
          </el-col>
        </el-row>
      </div>
    </el-header>

    <!-- 内容 -->
      <div class="indexCont">
        <router-view></router-view>
      </div>

    <!-- 底部 -->
    <copfooter/>

  </el-container>
</template>

<script>
import copfooter from '../../components/lib/footerCom.vue'
export default {
  name: 'index',
  data () {
    return {
      menuActiveIndex: 'homePage',
      activeName: 'first',
      isActive: false,
      isShow: true,
      mername: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key == 'aboutus' || key == 'homePage') {
        this.$router.push('/' + key)
      } else if (key == 'api') {
        window.open('http://docs.open.iebt.net', '_blank')
      } else {
        location.assign(key + '.html')
      }
    },
    handleClick (tab, event) {
      console.log('产品选项卡切换')
    },

    signOut () {
      location.assign('/')
      window.localStorage.removeItem('userinfo')
    }
  },

  created () {
    var userinfo = window.localStorage.getItem('userinfo')
    userinfo = JSON.parse(userinfo)
    if (userinfo) {
      this.isShow = false
      this.mername = userinfo.merchantName
    }
    this.handleSelect('homePage')
  },
  components: {
    copfooter
  }
}
</script>

<style>
body,
section,
p,
div,
span,
ul,
li {
  margin: 0;
  padding: 0;
  font-family: 'Microsoft YaHei UI';
}

li {
  list-style: none;
}

/***** 头部,banner ****/
.index_logo,
.index_nav {
  display: inline-block;
}

.index_header {
}

.index_nav .el-menu {
  background: #0067b8;
}

.el-header {
  padding: 21px 0;
  background: #0067b8;
  color: white;
  display: inline-block;
  height: auto !important;
}
.el-button--primary {
  background-color: #0067b8 !important;
  border-color: #0067b8 !important;
  border-radius: 1px;
}
.el-menu--horizontal .el-menu-item {
  height: 53px;
  line-height: 53px;
  background: #0067b8;
  color: white;
}

.header_main {
  display: flex;
  justify-content: space-between;
}

.el-menu--horizontal {
  border: none;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid white;
}

/******** 主体 ********/

.indexCont {
  position: relative;
  width: 100%;
}
</style>
