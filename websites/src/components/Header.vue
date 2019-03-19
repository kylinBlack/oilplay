<template>
  <div :class="['page-header',{'bg-blue':active}]">
    <slot>
      <el-header height="100px">
        <div class="head-left">
          <i class="myicon-cop"></i>
        </div>
        <div class="head-right">
          <el-menu
            :default-active="activeIndex"
            router
            class="portal-menu"
            mode="horizontal"
            background-color="transparent"
            text-color="#ffffff99"
            active-text-color="#fff">
            <el-menu-item index="index">首页</el-menu-item>
            <el-submenu index="product">
              <template slot="title">产品中心</template>
              <el-menu-item index="paystage">支付结算平台</el-menu-item>
              <el-menu-item index="iebt">智企银通</el-menu-item>
              <el-menu-item index="thumb">拇指钱包</el-menu-item>
            </el-submenu>
            <el-submenu index="serve">
              <template slot="title">服务</template>
              <el-menu-item index="servepay">支付结算</el-menu-item>
              <el-menu-item index="account">账户体系</el-menu-item>
              <el-menu-item index="auth">认证鉴权</el-menu-item>
            </el-submenu>
            <el-submenu index="solution">
              <template slot="title">解决方案</template>
              <el-menu-item index="matgold">消金行业</el-menu-item>
              <el-menu-item index="insurance">保险行业</el-menu-item>
              <el-menu-item index="logistics">物流行业</el-menu-item>
              <el-menu-item index="ecommerce">电商行业</el-menu-item>
            </el-submenu>           
            <el-menu-item index="partner">商务合作</el-menu-item>
            <el-menu-item index="about">关于我们</el-menu-item>
          </el-menu>
        </div>
      </el-header>
    </slot>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    msg: String
  },
  computed: {
    activeIndex() {
      return this.$route.path.replace("/home/", "");
    }
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (scrollTop >= 450) {
        this.active = true;
      } else {
        this.active = false;
      }
    });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-header {
  display: flex;
  width: 100%;
  min-height: 100px;
  position: fixed;
  z-index: 999;
  background-color: rgba(51, 51, 51, 0.3);
  &.bg-blue {
    background-color: rgba(51, 51, 51, 1);
  }
}
.el-header {
  min-width: 1200px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .portal-menu {
    border-bottom-color: transparent;
  }
}
</style>
