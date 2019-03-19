<template>
  <page-column>
    <page-header></page-header>
    <page-row>
      <!-- <page-main></page-main> -->
      <router-view></router-view>
    </page-row>
    <page-footer></page-footer>
  </page-column>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
<style lang="scss" scoped>
</style>
