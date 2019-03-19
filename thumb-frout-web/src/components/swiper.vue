<template>
  <div
    class="wrap"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div class="wrap2" ref="wrap2">
      <div class="page" v-for="item in options.len" :key="item">
        <slot> 我是第{{ item }}页内容 </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "swiper",
  props: {},
  data() {
    return {
      options: {
        len: 6, //一共有几页
        n: 0 //页面一打开默认在第几页？第一页就是0，第二页就是1
      },
      startY: null,
      moveY: null,
      cliH: null
    };
  },
  mounted() {
    //获取屏幕高度
    this.cliH = document.body.clientHeight;
    window.addEventListener(
      "resize",
      function() {
        this.cliH = document.body.clientHeight;
      },
      { passive: true }
    );
  },
  methods: {
    touchstart(event) {
      if (!event.touches.length) {
        return;
      }
      this.startY = event.touches[0].pageY;
      this.moveY = 0;
    },
    touchmove(event) {
      if (!event.touches.length) {
        return;
      }
      this.moveY = event.touches[0].pageY - this.startY;
      this.$refs.wrap2.style.transform =
        "translateY(" + (-this.options.n * this.cliH + this.moveY) + "px)"; //根据手指的位置移动页面
    },
    touchend() {
      //位移小于+-50的不翻页
      if (this.moveY < -50) this.options.n++;
      if (this.moveY > 50) this.options.n--;
      //最后&最前页控制
      if (this.options.n < 0) this.options.n = 0;
      if (this.options.n > this.options.len - 1)
        this.options.n = this.options.len - 1;
      //重定位
      this.$refs.wrap2.style.transform =
        "translateY(" + -this.options.n * 10 + "%)"; //根据百分比位置移动页面
      console.log(this.options.n);
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .wrap2 {
    width: 100%;
    height: 1000%;
    transition: 0.3s linear;
    .page {
      width: 100%;
      height: 10%;
      background-color: #fdfdfd;
      font-size: 100px;
      line-height: 400px;
      text-align: center;
      font-weight: 700;
    }
  }
}
</style>
