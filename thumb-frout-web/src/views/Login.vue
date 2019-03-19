<template>
  <!-- Make a div wrapped slider,set height and width -->
  <div class="loans-login">
    <div class="bg">
      <div class="logo">
        <img src="../assets/images/logo.png" alt="" />
      </div>
      <div class="money">
        <p class="text">
          <span>最高可借额度</span>
          <md-amount :value="val" has-separator :precision="0" transition>
          </md-amount>
        </p>
      </div>
      <div class="des">
        <span>日息低至0.02%</span>
        <span>最快30秒放款</span>
      </div>
      <div class="card-login">
        <md-input-item
          type="phone"
          is-title-latent
          align="center"
          name="phone"
          v-model="iphone"
          @change="checkInputIphone"
          placeholder="输入手机号码"
        ></md-input-item>
        <md-input-item
          type="digit"
          placeholder="输入验证码"
          is-title-latent
          align="center"
          v-model="captcha"
        >
          <md-button
            @click="getCodeServe"
            :inactive="captchaDisabled"
            type="warning"
            round
            slot="right"
          >
            {{ captchaText }}
          </md-button>
        </md-input-item>
        <md-button @click="login" class="btn" type="warning" round>
          马上领钱
        </md-button>
        <p>
          点击"马上领钱"即代表您阅读并同意
          <span @click="toServe">
            《用户服务协议》
          </span>
        </p>
      </div>
      <!-- <div class="down">
        <img @click="slideNext" src="../assets/images/down.png" alt="" />
      </div> -->
    </div>
    <div class="bgc">
      <div class="wave">
        <img src="../assets/images/wave.png" alt="" />
      </div>
      <div class="picture-content">
        <div class="pic-item" v-for="item in pics" :key="item.key">
          <img :src="item.src" alt="" />
          <div class="info">
            <h3>{{ item.title }}</h3>
            <span>{{ item.info }}</span>
          </div>
        </div>
      </div>
      <div class="statement">
        <p>市场有风险，借贷需谨慎</p>
        <p>资金将由银行或持牌放款机构提供</p>
        <p>贷款具体放款时间和金额，以平台审核为准</p>
        <p>深圳市互优科技有限公司 京ICP备17019745号-3</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Amount, InputItem, Button, Toast } from "mand-mobile";
export default {
  name: "login",
  data() {
    return {
      captchaText: "获取验证码",
      time: 60,
      iphone: "",
      captcha: "",
      captchaDisabled: true,
      loginDisabled: true,
      val: 0,
      someList: [],
      options: {
        currentPage: 0,
        direction: "vertical"
      },
      pics: [
        {
          src: require("../assets/images/picture1.png"),
          key: "p1",
          title: "高额度",
          info: "额度最高可达20万元"
        },
        {
          src: require("../assets/images/picture2.png"),
          key: "p2",
          title: "放款快",
          info: "最快30秒放款"
        },
        {
          src: require("../assets/images/picture3.png"),
          key: "p3",
          title: "低利率",
          info: "最低日利率0.02%"
        },
        {
          src: require("../assets/images/picture4.png"),
          key: "p4",
          title: "免抵押",
          info: "纯信用、无需抵押或担保"
        }
      ]
    };
  },
  components: {
    [Amount.name]: Amount,
    [InputItem.name]: InputItem,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  mounted() {
    setTimeout(() => {
      this.val = 200000;
    }, 500);
  },
  methods: {
    // 手机号码格式验证
    checkInputIphone(name, value) {
      let regex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; //判断是手机号
      if (!regex.test(value)) {
        this.captchaDisabled = true;
      } else {
        this.captchaDisabled = false;
      }
    },
    toServe() {
      this.$router.push("/serverDes");
    },
    //验证码60秒倒计时
    getcode() {
      let that = this;
      if (that.time == 0) {
        that.time = 60;
        that.captchaDisabled = false;
        that.captchaText = "获取验证码";
        return;
      } else {
        that.captchaDisabled = true;
        that.time -= 1;
        that.captchaText = that.time + "s";
        setTimeout(() => {
          that.getcode();
        }, 1000);
      }
    },
    //调用获取验证码服务
    getCodeServe() {
      let params = {
        mobile: this.iphone,
        type: "40"
      };
      this.axios.get("/api/baseUser/sendSmsCode", { params }).then(
        res => {
          if (res.data.code === "0000") {
            this.getcode();
          } else {
            Toast.info(res.data.message);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //登录注册
    login() {
      if (!this.iphone || !this.captcha) {
        Toast.info("手机号或验证码不能为空");
        return;
      }
      let params = {
        mobile: this.iphone,
        code: this.captcha,
        type: "40"
      };
      Toast.info("处理中...");
      this.axios.post("/api/baseUser/loginByMobile", params).then(
        res => {
          let data = res.data;
          if (data.code === "0000") {
            Toast.succeed("验证成功");
            setTimeout(() => {
              this.$router.push("thumbloan");
            }, 1000);
          } else {
            Toast.failed("验证失败");
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.loans-login {
  width: 100%;
  .bg {
    background: url("../assets/images/bgc.png") no-repeat center/cover;
    width: 100%;
    color: #fff;
    .logo {
      padding-top: 30px;
      padding-bottom: 30px;
      img {
        width: 204px;
        height: 113px;
      }
    }
    .money {
      background: url("../assets/images/arc.png") no-repeat center/cover;
      width: 413px;
      height: 320px;
      margin: 0 auto;
      .text {
        padding-top: 135px;
        span {
          display: block;
        }
        span:first-child {
          font-size: 30px;
          margin-bottom: 20px;
        }
        span:last-child {
          font-size: 48px;
        }
      }
    }
    .des {
      font-size: 30px;
      margin-top: 24px;
      span {
        &:first-child {
          margin-right: 78px;
        }
      }
    }
    .card-login {
      // height: 535px;
      width: 670px;
      border-radius: 20px;
      padding: 50px 46px;
      box-shadow: 0 0 100px #d0d0d0;
      margin: 30px auto;
      background-color: #fff;
      .btn {
        margin-top: 50px;
      }
      & > p {
        margin-top: 40px;
        font-size: 22px;
        color: #666;
        span {
          color: #fd481a;
        }
      }
    }
    .down {
      img {
        height: 40px;
        width: 40px;
        display: block;
        margin: 0 auto;
      }
    }
  }
  .bgc {
    width: 100%;
    height: 100%;
    // overflow-y: auto;
    .wave {
      img {
        display: block;
        width: 100%;
        height: 145px;
        margin: 0 auto;
      }
    }
    .picture-content {
      background-color: #fd4010;
      .pic-item {
        position: relative;
        img {
          height: 150px;
          width: 100%;
          display: block;
          margin-bottom: 10px;
        }
        .info {
          position: absolute;
          top: 50%;
          left: 70px;
          transform: translate(0, -50%);
          text-align: left;
          h3 {
            font-size: 30px;
            color: #333;
            padding-bottom: 20px;
          }
          span {
            color: #999;
            font-size: 20px;
          }
        }
      }
    }
    .statement {
      padding: 70px 40px;
      text-align: center;
      background-color: #fd4010;
      p {
        color: #fff;
        font-size: 22px;
        white-space: normal;
      }
    }
  }
}
</style>
