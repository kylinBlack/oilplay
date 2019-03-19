<template>
  <div class="page-main">
    <slot>
      我是main
    </slot>
  </div>
</template>

<script>
export default {
  name: "PageMain",
  components: {},
  props: {
    msg: String
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-main {
  // display: flex;
  flex: 1;
  background: burlywood;
  // justify-content: center;
  // align-items: center;
}
</style>
