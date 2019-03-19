<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {}
};
</script>

<style lang="scss">
.solution {
  .el-tabs__item {
    color: #a8a8a8;
    height: 95px;
    line-height: 95px;
    padding-right: 80px;
    font-size: 22px;
  }
  .el-tabs__item.is-active {
    color: #fff;
  }
  .el-tabs__item:hover {
    color: #fff;
  }
  .el-tabs__content {
    text-align: left;
    padding: 20px 0 0 100px;
  }
}
</style>
