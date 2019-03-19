<template>
  <div class="page-footer">
    <slot>
      <footer height>
        <div class="left-box">
          <div class="top-box">
            <ul>
              <li class="title">
                <span>关于我们</span>
                <span>联系方式</span>
              </li>
              <li>
                <span class="finger" @click="toAbout">公司介绍</span>
                <span>
                <i class="myicon-site"></i> 
                地址：深圳市福田区滨河大道9289号京基滨河时代广场（下沙KKONE大厦）A座1406
                </span>
              </li>
              <li>
                <span class="finger" @click="toPart">商务合作</span>
                <span>
                  <i class="myicon-phone"></i>
                  电话：400-877-5800
                </span>
              </li>
              <li>
                <span class="finger" @click="toAbout">人才招聘</span>
                <span>
                  <i class="myicon-email"></i>
                  邮箱：kefu@chinaoilpay.com
                </span>
              </li>
            </ul>
          </div>
          <div class="bottom-box">
            <span>Copyright © 国油众盈 （北京）支付科技有限公司版权所有 </span>&nbsp;&nbsp;&nbsp;
            <span>京ICP备17019745号-1</span>
          </div>
        </div>
        <div class="right-box">
          <div class="wechat">
            <img src="../assets/img/wechat.jpg" alt="">
          </div>
        </div>
      </footer>
    </slot>
  </div>
</template>

<script>
export default {
  name: "PageFooter",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    toAbout() {
      if (this.$route.path === "/home/about") {
        window.scrollTo(0, 0);
      } else {
        this.$router.push("/home/about");
      }
    },
    toPart() {
      if (this.$route.path === "/home/partner") {
        window.scrollTo(0, 0);
      } else {
        this.$router.push("/home/partner");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-footer {
  display: flex;
  width: 100%;
  min-height: 100px;
  background: #313235;
  footer {
    min-width: 1200px;
    padding: 0 10px;
    margin: 80px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-box {
      flex: 1;
      height: 100%;
      color: #fff;
      .top-box {
        border-bottom: 1px solid #464646;
        padding-bottom: 20px;
        li {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 20px;
          .finger {
            cursor: pointer;
          }
          span {
            display: inline-block;
            i {
              color: #fff;
              margin-right: 20px;
            }
          }
          &.title {
            margin-bottom: 50px;
            span {
              font-size: 20px;
            }
          }
          span:first-child {
            width: 200px;
            text-align: left;
          }
        }
      }
      .bottom-box {
        text-align: left;
        margin-top: 35px;
      }
    }
    .right-box {
      .wechat {
        height: 200px;
        width: 200px;
        background-color: yellow;
        margin-left: 70px;
        img {
          height: 100%;
        }
      }
    }
  }
}
</style>
