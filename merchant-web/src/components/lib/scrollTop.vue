<template>
    <section>
        <section :class="['utils-sticky-btns', {'scrolled': showGoTop}]">
            <a @click="runScroll($event)">
                <span>
                    <i class="el-icon-arrow-up"></i>
                </span>
            </a>
            <slot>
              <span @click="scrollParam.defaultfunc">
                <i class="el-icon-plus"></i>
              </span>
            </slot>
        </section>
    </section>
</template>

<script>
export default {
  props: {
    /*
         * 返回顶部可用参数
         */
    scrollParam: {
      type: Object,
      default () {
        return {
          // 回到顶部的方式 0 - 马上回到顶部，css实现（默认） 1 - 匀速回到顶部，js实现
          way: 0,
          // 滚动多少像素显示“回到顶部”图标
          distance: 30,
          // 向上滚动间隔
          time: 600,
          // 数据加载完成与否,
          reloadComp: false,
          // 回到顶部后回调方法
          callback: Function,
          // 下面按钮的点击事件
          defaultfunc: Function
        }
      }
    }
  },
  data () {
    return {
      // 是否展示“回到顶部”图标
      showGoTop: false
    }
  },
  mounted () {
    // console.log('document.body.scrollHeight:' + document.body.scrollHeight)
    // console.log('document.documentElement.clientHeight:' + document.documentElement.clientHeight)
    // debugger
    // if (document.body.scrollHeight - 100 > (window.innerHeight || document.documentElement.clientHeight)) {
    //   this.showGoTop = true
    // } else {
    //   this.computeScroll()
    // }
    if (this.scrollParam.reloadComp) {
      this.showGoTop = true
    }
  },
  watch: {
    'scrollParam.reloadComp': function (val) {
      if (val) {
        this.showGoTop = true
      } else {
        this.showGoTop = false
      }
    }
  },
  methods: {
    // 回到顶部
    scrollTo (element, to, duration) {
      if (duration <= 0) return
      var difference = to - element.scrollTop
      var perTick = difference / duration * 10
      let _this = this
      setTimeout(function () {
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) {
          _this.scrollParam.callback()
          return
        }
        _this.scrollTo(element, to, duration - 10)
      }, 10)
    },
    runScroll (e) {
      this.scrollTo(document.documentElement, 0, this.scrollParam.time)
    },
    // 计算滚动条位置
    computeScroll () {
      let _this = this
      window.onresize = function () {
        document.documentElement.scrollTop > _this.scrollParam.distance ? _this.showGoTop = true : _this.showGoTop = false
      }
    }
  }
}
</script>
<style scoped>
/*回到顶部标识*/
.utils-sticky-btns.scrolled {
  visibility: visible;
  opacity: 1;
}
.utils-sticky-btns {
  position: fixed;
  z-index: 50;
  right: 10%;
  bottom: 50%;
  visibility: hidden;
  opacity: 0;
  transition: opacity 1s ease;
}

.utils-sticky-btns a {
  text-decoration: underline;
  color: #ff712c;
  transition: all 0.3s ease;
}

.utils-sticky-btns span {
  display: block;
  /* float: left; */
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 2em;
  color: #fff;
  background: #999;
  border-radius: 4px;
  padding-top: 6px;
  margin: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.utils-sticky-btns span:hover {
  background: #0395f7;
}
</style>
