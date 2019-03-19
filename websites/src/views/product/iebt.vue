<template>
  <div class="content">
    <div class="topimg">
      <!-- <img src="../../assets/img/banner/iebt.png" alt> -->
      <img src="../../assets/img/banner/font/iebt_font.png" alt>
      <!-- <h1 class="pro-name">智企银通</h1> -->
    </div>
    <div class="introduce">
      <div class="box">
        <h1>产品简介</h1>
        <div class="line"></div>
        <p>助力银行连接企业，为银行和企业提供专业的金融产品及技术服务，包括企业融资、企业理财、账户体系、资金结算、分账能力等金融科技服务。</p>
        <div class="count">
          <div>
            <b>10W+</b>
          </div>
          <div>累计商户数量</div>
        </div>
      </div>
    </div>
    <div class="func">
      <h1>产品功能</h1>
      <div class="line"></div>
      <div class="row">
        <div class="item" v-for="func in profunc" :key="func.id">
          <div class="left">
            <i :class="['iconfont',!func.isActive ? func.icon : func.hoverIcon]" @mouseover="goin(func)" @mouseout="goout(func)"></i>
          </div>
          <div class="right">
            <h3>{{func.name}}</h3>
            <p>{{func.des}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="scene">
      <h1>适用场景</h1>
      <div class="line"></div>
      <div class="column">
        <div class="item" v-for="scene in scenelist" :key="scene.id">
          <i :class="['iconfont',scene.icon]"></i>
          <p>{{scene.name}}</p>
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
      profunc: [
        {
          name: "易收",
          icon: "icon-qunfengfenrunguanli",
          hoverIcon: "icon-qunfengfenrunguanli1",
          isActive: false,
          id: "f1",
          des:
            "支持代收付、快捷支付、网银支付、协议支付、聚合支付等多种支付方式"
        },
        {
          name: "易付",
          icon: "icon-qunfenghongbaotuisong",
          hoverIcon: "icon-qunfenghongbaotuisong1",
          isActive: false,
          id: "f2",
          des: "支持单笔代付和批量代付，支持跨行及本行交易，单笔代付实时出账"
        },
        {
          name: "易查",
          icon: "icon-qunfengshimingrenzheng",
          hoverIcon: "icon-qunfengshimingrenzheng1",
          isActive: false,
          id: "f3",
          des:
            "提供包括身份证、银行卡、手机号码等多种方式的认证鉴权，以及大数据风控技术"
        },
        {
          name: "易融",
          icon: "icon-zijintixian",
          hoverIcon: "icon-qunfengzijintixian",
          isActive: false,
          id: "f4",
          des:
            "为企业用户提供银行融资服务支持，比如：小微信用贷、抵押贷、税金贷、发票贷等产品"
        }
      ],
      scenelist: [
        { name: "消金还款", id: "s1", icon: "icon-huankuandan", des: "" },
        { name: "保险缴费", id: "s2", icon: "icon-baoxianxiaoshou", des: "" },
        { name: "代发工资", id: "s3", icon: "icon-gongzi", des: "" },
        { name: "批发零售", id: "s4", icon: "icon-gouwu", des: "" },
        { name: "身份认证", id: "s5", icon: "icon-cardid", des: "" },
        { name: "数字鉴权", id: "s6", icon: "icon-fengkongxianxing", des: "" },
        { name: "金融理财", id: "s7", icon: "icon-qiandai", des: "" },
        { name: "融资贷款", id: "s8", icon: "icon-iconset0293", des: "" }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
    goin(func) {
      func.isActive = true;
    },
    goout(func) {
      func.isActive = false;
    }
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
    background-color: #d1d3d3;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-55%, -31%);
    }
    .pro-name {
      padding: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      font-size: 60px;
      font-weight: 100;
    }
  }
  .introduce {
    width: 100%;
    height: 780px;
    background-color: #f8f8f8;
    .box {
      margin: 0 auto;
      width: 1200px;
      font-size: 24px;
      .line {
        margin-bottom: 0;
      }
      p {
        padding: 100px 0;
        line-height: 40px;
      }
      .count {
        width: 385px;
        height: 204px;
        background-color: #2f54eb;
        margin: 0 auto;
        color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 20px 0;
        b {
          font-size: 55px;
        }
      }
    }
  }
  .func {
    width: 1200px;
    height: 650px;
    margin: 0 auto;
    border-bottom: 1px solid #f3f3f3;
    .row {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        width: 50%;
        margin-bottom: 40px;
        .left {
          width: 100px;
          height: 100px;
          float: left;
          margin-right: 20px;
          i {
            font-size: 50px;
          }
        }
        .right {
          float: left;
          text-align: left;
          line-height: 30px;
          width: 300px;
          h3 {
            color: #252a6a;
          }
          p {
            font-size: 16px;
            color: #999;
          }
        }
      }
    }
  }
  .scene {
    width: 1200px;
    height: 680px;
    margin: 0 auto;
    border-bottom: 1px solid #f3f3f3;
    .column {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .item {
        flex: 25%;
        margin-bottom: 70px;
        i {
          font-size: 50px;
        }
        p {
          padding-top: 30px;
          font-size: 18px;
        }
      }
    }
  }
  .flow {
    width: 100%;
    height: 700px;
    .box {
      width: 100%;
      background-color: #f8f8f8;
      height: 398px;
      .flow-img {
        width: 1200px;
        margin: 0 auto;
        padding-top: 70px;
      }
    }
  }
}
</style>
