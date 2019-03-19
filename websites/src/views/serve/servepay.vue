<template>
  <div class="content">
    <div class="topimg">
      <img src="../../assets/img/banner/servepay.png" alt>
      <!-- <img src="../../assets/img/banner/font/servepay_font.png" alt> -->
      <div class="pro-name">
        <h1>支付结算</h1>
        <p>支持全国工、农、中、建等200+银行通道</p>
      </div>
    </div>
    <div class="des">
      <div class="box">
        <h1>服务简介</h1>
        <div class="line"></div>
        <p>联合银行等金融机构，提供标准化的支付结算流程，支持全国工、农、中、建等200+银行通道，提供代收付、快捷支付、网银支付、协议支付、聚合支付等多种支付方式。</p>
      </div>
    </div>
    <div class="ser">
      <h1>服务优势</h1>
      <div class="line"></div>
      <div class="row">
        <div class="item">
          <div :class="[top.bg, 'box']" v-for="top in list.top" :key="top.id">
            <i :class="['iconfont', top.icon]"></i>
            <h4>{{top.title}}</h4>
            <p>{{top.des}}</p>
          </div>
        </div>
        <div class="item">
          <div :class="[bottom.bg, 'box']" v-for="bottom in list.bottom" :key="bottom.id">
            <i :class="['iconfont', bottom.icon]"></i>
            <h4>{{bottom.title}}</h4>
            <p>{{bottom.des}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flow">
      <h1>入网流程</h1>
      <div class="line"></div>
      <div class="box">
        <div class="flow-img">
          <img src="../../assets/img/flow.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      list: {
        top: [
          {
            title: "支持主流200+银行",
            id: "t1",
            icon: "icon-kexuejishu-4",
            bg: "myicon-servebg1",
            des:
              "支持包括工商银行、农业银行、中国银行、建设银行、交通银行等200多家主流银行"
          },
          {
            title: "支持多种支付方式",
            id: "t2",
            icon: "icon-kexuejishu-",
            bg: "myicon-servebg2",
            des:
              "提供包括代收付、快捷支付、网银支付、协议支付、聚合支付等多种支付方式"
          },
          {
            title: "资金结算安全可靠",
            id: "t3",
            icon: "icon-anquan2",
            bg: "myicon-servebg3",
            des: "银行及持牌机构进行资金结算，确保资金安全可靠"
          }
        ],
        bottom: [
          {
            title: "满足多样化场景需求",
            id: "b1",
            icon: "icon-kexuejishu-2",
            bg: "myicon-servebg4",
            des: "适用于公共事业缴费、物业、消金、保险、物流、电商等多个行业"
          },
          {
            title: "系统安全性、稳定性高",
            id: "b2",
            icon: "icon-kexuejishu-3",
            bg: "myicon-servebg5",
            des: "完善的系统架构设计，实时监控交易，保障系统的安全性和稳定性"
          },
          {
            title: "强大的业务处理能力",
            id: "b3",
            icon: "icon-kexuejishu-1",
            bg: "myicon-servebg6",
            des: "支持多种业务场景，能够迅速响应并处理，处理结果安全可靠"
          }
        ]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {}
  }
};
</script>
<style lang="scss" scoped>
.content {
  h1 {
    padding-top: 110px;
    font-size: 50px;
  }
  width: 100%;
  .line {
    width: 150px;
    height: 3px;
    background-color: #252a6a;
    margin: 35px 0 100px 0;
    margin-left: auto;
    margin-right: auto;
  }
  .topimg {
    height: 500px;
    background-color: #5b4d3d;
    position: relative;
    img:first-child {
      height: 100%;
      width: 100%;
    }
    img:last-child {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -34%);
    }
    .pro-name {
      position: absolute;
      left: 50%;
      top: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      width: 1000px;
      h1 {
        padding: 0 0 20px 0;
        font-size: 60px;
        font-weight: 100;
      }
      p {
        font-size: 30px;
        font-weight: 100;
      }
    }
  }
  .des {
    width: 100%;
    .box {
      margin: 0 auto;
      width: 1200px;
      border-bottom: 1px solid #f8f8f8;
      font-size: 24px;
      p {
        padding-bottom: 100px;
        line-height: 40px;
      }
    }
  }
  .ser {
    width: 1200px;
    // height: 650px;
    margin: 0 auto;
    .row {
      .item {
        display: flex;
        justify-content: space-between;
        .box {
          height: 380px;
          width: 300px;
          margin-bottom: 100px;
          i {
            display: inline-block;
            margin: 58px 0;
            font-size: 70px;
            &:hover {
              color: #252a6a;
            }
          }
          h4 {
            margin-bottom: 50px;
            font-size: 24px;
          }
          p {
            font-size: 14px;
          }
        }
      }
    }
  }
  .flow {
    width: 100%;
    height: 700px;
    .box {
      width: 100%;
      height: 398px;
      background-color: #f8f8f8;
      .flow-img {
        width: 1200px;
        margin: 0 auto;
        padding-top: 70px;
      }
    }
  }
}
</style>
