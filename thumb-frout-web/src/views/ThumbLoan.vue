<template>
  <div class="thumb-loan">
    <div class="banner">
      <div class="bg-box">
        <img src="../assets/images/thumbloan.png" alt />
        <div class="nav">
          <span
            v-for="(item, index) in sortList"
            :key="item.id"
            @click="checkSort(item, index)"
            :class="{ 'is-active': sortActive === index }"
          >
            {{ item.name }}
            <!-- <i v-if="index === 0" class="icon-triangle"></i> -->
          </span>
          <span @click="showPopup">
            筛选
            <i class="icon-funnel"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="screen-row">
      <div
        class="row-list"
        ref="wrapper"
        :style="{ height: wrapperHeight + 'px' }"
      >
        <md-scroll-view
          ref="scrollView"
          :scrolling-x="false"
          @refreshing="loadTop"
          @endReached="loadBottom"
        >
          <md-scroll-view-refresh
            slot="refresh"
            slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
            :scroll-top="scrollTop"
            :is-refreshing="isRefreshing"
            :is-refresh-active="isRefreshActive"
          >
          </md-scroll-view-refresh>
          <div class="box" v-for="item in list" :key="item.id">
            <div class="box-head">
              <div class="box-head-left">
                <img class="logo" :src="item.logoUrl" />
                <span>{{ item.name }}</span>
              </div>
              <div class="box-head-right">
                <span>{{ item.arriRemark }}</span>
              </div>
            </div>
            <div class="box-content">
              <div class="box-content-left">
                <h3>{{ item.amountRange }}</h3>
                <span>额度范围 (元)</span>
                <div v-if="item.rateType == 2" class="text">
                  日利率{{
                    item.lowRate != item.highRate
                      ? item.lowRate + "%-" + item.highRate + "%"
                      : item.highRate + "%"
                  }}
                </div>
                <div v-if="item.rateType == 3" class="text">
                  月利率{{
                    item.lowRate != item.highRate
                      ? item.lowRate + "%-" + item.highRate + "%"
                      : item.highRate + "%"
                  }}
                </div>
                <div v-if="item.rateType == 4" class="text">
                  年利率{{
                    item.lowRate != item.highRate
                      ? item.lowRate + "%-" + item.highRate + "%"
                      : item.highRate + "%"
                  }}
                </div>
              </div>
              <div class="box-content-right">
                <md-button
                  @click="openBottomPopup(item)"
                  class="btn"
                  type="primary"
                  round
                  >立即申请</md-button
                >
                <p>
                  <span v-if="item.applyNum >= 5000">5000+</span>
                  <span v-if="item.applyNum < 5000">{{ item.applyNum }}</span>
                  人已申请
                </p>
                <div class="text">
                  贷款期限{{
                    item.startMonth != item.endMonth
                      ? item.startMonth + "-" + item.endMonth
                      : item.endMonth
                  }}{{ item.timeUnitStr }}
                </div>
              </div>
            </div>
          </div>
          <md-scroll-view-more
            slot="more"
            :is-finished="isFinished"
          ></md-scroll-view-more>
        </md-scroll-view>
      </div>
      <!-- 右侧popup -->
      <md-popup v-model="popupRightVisible" position="right">
        <div class="screen-info">
          <p>贷款区间 (元)</p>
          <div class="money">
            <md-input-item
              placeholder="最低金额"
              type="money"
              v-model="sortVO.lowAmount"
            ></md-input-item
            ><span>-</span
            ><md-input-item
              placeholder="最高金额"
              type="money"
              v-model="sortVO.highAmount"
            ></md-input-item>
          </div>
          <p class="p40">贷款期限 (元)</p>
          <div class="money time">
            <div
              class="btn-box"
              v-for="(item, index) in timeBtnList"
              :key="item.id"
            >
              <md-button
                @click="checkTime(item, index)"
                :class="['btn', { 'btn-active': timeActive === index }]"
                round
              >
                {{ item.name }}
              </md-button>
            </div>
          </div>
          <div class="foot">
            <md-button @click="reset" class="foot-btn" round inline
              >重置</md-button
            >
            <md-button
              @click="hidePopup"
              type="warning"
              class="foot-btn"
              round
              inline
            >
              确定
            </md-button>
          </div>
        </div>
      </md-popup>
      <!-- 底部popup -->
      <md-popup
        v-model="popupBottomVisible"
        :mask-closable="false"
        position="bottom"
      >
        <div class="iphone-code">
          <h3>用户验证<i @click="closeBottomPopup" class="icon-err">X</i></h3>
          <md-input-item
            class="iphone-code-field"
            title="手机号码"
            @change="checkInputIphone"
            placeholder="请输入您的手机号码"
            type="phone"
            v-model="iphone"
          ></md-input-item>
          <md-input-item
            class="iphone-code-field"
            title="验证码"
            placeholder="请输入验证码"
            v-model="captcha"
          >
            <div class="code" slot="right" @click="getCodeServe(iphone)">
              {{ captchaText }}
            </div>
          </md-input-item>
          <md-button
            @click="login"
            :inactive="loginDisabled"
            round
            class="btn"
            >{{ loginText }}</md-button
          >
          <p>
            点击"马上领钱"即代表您阅读并同意<span @click="toServe"
              >《用户服务协议》</span
            >
          </p>
        </div>
      </md-popup>
      <!-- 头部popup -->
      <md-popup
        v-model="popupTopVisible"
        :mask-closable="false"
        :has-mask="false"
        position="top"
      >
        <div class="popup-text">{{ popupText }}</div>
      </md-popup>
    </div>
  </div>
</template>

<script>
import { ScrollView, ScrollViewRefresh, ScrollViewMore } from "mand-mobile";
import { Button, Toast, Popup, InputItem } from "mand-mobile";
export default {
  data() {
    return {
      isFinished: false,
      popupText: "",
      popupTopVisible: false,
      loginDisabled: true,
      pageNo: 1,
      topStatus: "",
      bottomStatus: "",
      wrapperHeight: "",
      iphone: "",
      captcha: "",
      captchaText: "获取验证码",
      time: 60,
      disabled: false,
      allLoaded: false,
      popupRightVisible: false,
      popupBottomVisible: false,
      list: [],
      sortActive: 0,
      sortList: [
        { name: "综合排序", id: "s1", orderType: 1 },
        { name: "费率低", id: "s2", orderType: 3 },
        { name: "额度高", id: "s3", orderType: 4 }
      ],
      moneyBtnList: [{ name: "最高金额", id: 1 }, { name: "最低金额", id: 2 }],
      moneyActive: "",
      timeBtnList: [
        { name: "3个月", id: "t1", type: 1 },
        { name: "半年", id: "t2", type: 2 },
        { name: "9个月", id: "t3", type: 3 },
        { name: "1年", id: "t4", type: 4 },
        { name: "1年以上", id: "t5", type: 5 },
        { name: "不限", id: "t6", type: 0 }
      ],
      timeActive: "",
      obj: {},
      loginText: "马上领钱",
      sortVO: {
        highAmount: "",
        lowAmount: "",
        type: null,
        orderType: 1
      }
    };
  },
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [InputItem.name]: InputItem
  },
  created() {
    this.getProductList();
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
  methods: {
    // 手机号码格式验证
    checkInputIphone() {
      let regex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; //判断是手机号
      if (!regex.test(this.iphone)) {
        this.loginDisabled = true;
      } else {
        this.loginDisabled = false;
      }
    },
    //验证码60秒倒计时
    getcode() {
      let that = this;
      if (that.time == 0) {
        that.time = 60;
        that.disabled = false;
        that.captchaText = "获取验证码";
        return;
      } else {
        that.disabled = true;
        that.time -= 1;
        that.captchaText = that.time + "s";
        setTimeout(() => {
          that.getcode();
        }, 1000);
      }
    },
    //调用获取验证码服务
    getCodeServe(iphone) {
      if (this.popupTopVisible || this.disabled) return;
      if (!iphone) {
        this.popupTopVisible = true;
        this.popupText = "手机号码不能为空";
        setTimeout(() => {
          this.popupTopVisible = false;
        }, 1500);
        return;
      } else if (iphone && this.loginDisabled) {
        this.popupTopVisible = true;
        this.popupText = "手机号码输入不正确";
        setTimeout(() => {
          this.popupTopVisible = false;
        }, 1500);
        return;
      }
      let params = {
        mobile: iphone,
        type: "40"
      };
      this.axios.get("/api/baseUser/sendSmsCode", { params }).then(
        res => {
          if (res.data.code === "0000") {
            this.getcode();
          } else {
            this.popupTopVisible = true;
            this.popupText = "获取验证码失败";
            setTimeout(() => {
              this.popupTopVisible = false;
            }, 1500);
          }
        },
        err => {
          this.popupTopVisible = true;
          this.popupText = "获取验证码失败";
          setTimeout(() => {
            this.popupTopVisible = false;
          }, 1500);
          console.log(err);
        }
      );
    },
    //登录注册
    login() {
      if (this.popupTopVisible) return;
      if (!this.iphone || !this.captcha) {
        // this.$messagebox.alert("手机号或验证码不能为空");
        this.popupTopVisible = true;
        this.popupText = "请输入验证码";
        setTimeout(() => {
          this.popupTopVisible = false;
        }, 1500);
        return;
      }
      let params = {
        mobile: this.iphone,
        code: this.captcha,
        type: "40"
      };
      this.loginText = "处理中...";

      this.axios.post("/api/baseUser/loginByMobile", params).then(
        res => {
          let data = res.data;
          if (data.code === "0000") {
            this.loginText = "验证成功";
            setTimeout(() => {
              location.href = this.obj.productUrl;
            }, 1000);
          } else {
            this.loginText = "验证失败";
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //读取cookie校验用户是否需要重新登录
    checkLogin() {
      return this.axios.get("/api/baseUser/checkLogin").then(({ data }) => {
        return data.code;
      });
    },
    //获取产品列表页面数据
    getProductList(options = {}) {
      let params = {
        highAmount: options.highAmount || 0, //最高金额
        lowAmount: options.lowAmount || 0, //最低金额
        type: options.type || 0, //月份类型 1、三个月 2、6个月 3、 9个月 4、12个月 5 大于12个月
        page: {
          pageNo: this.pageNo // 请求第几页
        },
        orderType: options.orderType || 1 // 1、综合排序 2、汇率从高到低 3、汇率从低到高 4、额度从高到低 5、额度从低到高
      };
      return this.axios({
        method: "post",
        url: "/api/product/getProductList",
        data: params
      }).then(res => {
        let result = res.data;
        if (result.code === "0000") {
          if (this.pageNo === 1) {
            this.list = result.data;
            this.pageNo++;
          } else {
            if (result.data && result.data > 0) {
              this.list.push(...result.data);
            } else {
              this.isFinished = true; // 若数据已全部获取完毕
            }
          }
        } else {
          Toast(result.message);
        }
      });
    },
    //触屏下拉状态改变事件
    handleTopChange(status) {
      this.topStatus = status;
    },
    //触屏上拉状态改变事件
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    //触屏下拉事件
    loadTop() {
      this.pageNo = 1;
      this.getProductList().then(() => {
        this.$refs.scrollView.finishRefresh();
      });
    },
    //触屏上拉事件
    loadBottom() {
      if (this.isFinished) {
        return;
      }
      this.getProductList().then(() => {
        this.$refs.scrollView.finishLoadMore();
      });
    },
    //屏幕右边popup开关
    showPopup() {
      this.popupRightVisible = true;
    },
    //屏幕右边popup开关
    hidePopup() {
      this.popupRightVisible = false;
      this.pageNo = 1;
      this.getProductList(this.sortVO);
      // this.moneyActive = "";
    },
    //屏幕底部popup开关
    openBottomPopup(item) {
      this.checkLogin().then(status => {
        if (status === "0000") {
          location.href = item.productUrl;
        } else {
          this.popupBottomVisible = true;
          this.obj = item;
        }
      });
    },
    //屏幕底部popup开关
    closeBottomPopup() {
      this.iphone = "";
      this.captcha = "";
      this.popupBottomVisible = false;
    },
    //排序标签点击高亮
    checkSort(item, index) {
      this.sortActive = index;
      this.pageNo = 1;
      this.getProductList(item);
    },
    //月数标签点击高亮
    checkTime(item, index) {
      this.timeActive = index;
      this.sortVO.type = item.type;
    },
    //清除高亮
    reset() {
      this.timeActive = "";
      // this.moneyActive = "";
      this.sortVO.highAmount = "";
      this.sortVO.lowAmount = "";
      this.sortVO.type = null;
    },
    //用户协议
    toServe() {
      this.$router.push("/serverDes");
    }
  }
};
</script>
<style lang="scss" scoped>
//$spriteWidth 雪碧图的宽度px
//$spriteHeight 雪碧图的高度px
//$iconWidth 需要显示icon的宽度px
//$iconHeight 需要显示icon的高度px
//$iconX icon的原始x坐标
//$iconY icon的原始y坐标
@mixin bgPosition(
  $spriteWidth,
  $spriteHeight,
  $iconWidth,
  $iconHeight,
  $iconX,
  $iconY
) {
  background-position: (
    ($iconX / ($spriteWidth - $iconWidth)) * 100%
      ($iconY / ($spriteHeight - $iconHeight)) * 100%
  );
}
.thumb-loan {
  // padding-top: 80px;
  height: 100%;
  width: 100%;
  background-color: #f5f2f2;
  .banner {
    width: 100%;
    height: 284px;
    .bg-box {
      width: 100%;
      position: fixed;
      z-index: 9;
      img {
        width: 100%;
        display: block;
      }
      .nav {
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #666;
        font-weight: 700;
        padding: 30px 40px;
        span {
          position: relative;
          .icon-triangle {
            display: inline-block;
            position: absolute;
            right: -0.3rem;
            top: 0.1rem;
            width: 0;
            height: 0;
            border: 10px solid;
            border-bottom-color: transparent;
            border-left-color: transparent;
            border-right-color: transparent;
            border-top-color: #333;
          }
          .icon-funnel {
            display: inline-block;
            background: transparent url("../assets/images/images.png") 0 -0.02rem
              no-repeat;
            background-size: 6rem 3rem;
            width: 24px;
            height: 24px;
            margin-left: 0.1rem;
            vertical-align: top;
            @include bgPosition(1920, 1082, 40, 74, 290, 474);
          }
        }
        background-color: #fff;
        span.is-active {
          color: #fd4010;
          .icon-triangle {
            border-top-color: #fd4010;
          }
        }
      }
    }
  }
  .screen-row {
    .row-list {
      overflow: auto;
      padding-bottom: 40px;
      background-color: #f5f2f2;
      box-sizing: border-box;
      .box {
        height: 306px;
        background-color: #fff;
        box-sizing: border-box;
        margin: 33px 26px 0;
        border-radius: 12px;
        padding: 30px 20px;
        text-align: left;
        .box-head {
          padding-bottom: 20px;
          border-bottom: 1px dashed #ccc6c6;
          display: flex;
          justify-content: space-between;
          .box-head-left {
            .logo {
              height: 40px;
              width: 40px;
            }
            span {
              font-size: 32px;
              color: #333;
              margin-left: 30px;
              vertical-align: super;
            }
          }
          .box-head-right {
            span {
              color: #999;
              font-size: 24px;
              line-height: 50px;
            }
          }
        }
        .box-content {
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          text-align: center;
          .box-content-left {
            width: 240px;
            h3 {
              color: #ff0000;
              font-size: 35px;
              line-height: 50px;
            }
            span {
              display: block;
              color: #999;
              font-size: 18px;
              padding-top: 20px;
              padding-bottom: 20px;
            }
          }
          .box-content-right {
            .btn {
              height: 50px;
              width: 180px;
              font-size: 26px;
              background-color: #3377fe;
              margin: 0 auto;
            }
            p {
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 18px;
              color: #999;
              span {
                color: #333;
              }
            }
          }
          div.text {
            font-size: 20px;
            color: #fff;
            width: 240px;
            height: 40px;
            border-radius: 8px;
            background-color: #f67c0d;
            text-align: center;
            line-height: 40px;
          }
        }
      }
    }
    .screen-info {
      width: 550px;
      height: 100%;
      position: relative;
      padding: 70px 40px 0;
      // text-align: left;
      box-sizing: border-box;
      background-color: #fff;
      color: #999;
      p {
        color: #999;
        font-size: 24px;
        text-align: left;
        &.p40 {
          padding-bottom: 40px;
        }
      }
      div.money {
        display: flex;
        justify-content: space-between;
        padding: 40px 0 70px 0;
        & > span {
          line-height: 50px;
        }
        .md-field-item {
          width: 180px;
          height: 50px;
        }
        .btn {
          width: 180px;
          height: 50px;
          font-size: 30px;
          color: #333;
          background-color: #f5f2f2;
          border-radius: 25px;
          &.btn-active {
            background-color: #ffd9cf;
          }
        }
        &.time {
          padding: 0 0 40px 0;
          flex-wrap: wrap;
          .btn-box {
            flex-basis: 50%;
            margin-bottom: 40px;
            &:nth-child(2n) {
              text-align: right;
            }
            .btn {
              color: #333;
              font-size: 30px;
            }
          }
        }
      }
      .foot {
        position: absolute;
        bottom: 127px;
        .foot-btn {
          width: 200px;
          height: 80px;
          border-radius: 40px;
          font-size: 36px;
          &:first-child {
            color: #333;
            background-color: #f5f2f2;
          }
          &:last-child {
            margin-left: 70px;
            color: #fff;
            background-color: #fd4010;
          }
        }
      }
    }
    .popup-text {
      width: 100%;
      height: 100px;
      background-color: #fff;
      text-align: center;
      font-size: 32px;
      line-height: 100px;
    }
  }
  .iphone-code {
    width: 100%;
    height: 500px;
    background-color: #fff;
    h3 {
      font-size: 36px;
      padding: 30px 0 40px 0;
      position: relative;
      .icon-err {
        position: absolute;
        right: 5%;
        top: 20%;
        color: #666;
      }
    }
    & > p {
      font-size: 18px;
      color: #666;
      span {
        color: #fd481a;
      }
    }
    .code {
      font-size: 28px;
      background-color: #fff;
      box-shadow: none;
      padding-right: 20px;
    }
    .btn {
      height: 80px;
      margin: 0 auto;
      margin-top: 40px;
      margin-bottom: 20px;
      width: 480px;
      background-color: #fd481a;
      font-size: 30px;
      color: #fff;
      &::after {
        content: none;
      }
    }
  }
}
</style>
