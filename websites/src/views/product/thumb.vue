<template>
  <div class="content">
    <div class="topimg">
      <img src="../../assets/img/banner/thumb.png" alt>
      <!-- <h1 class="pro-name">拇指钱包</h1> -->
      <img src="../../assets/img/banner/font/thumb_font.png" alt>
    </div>
    <div class="introduce">
      <div class="box">
        <h1>产品简介</h1>
        <div class="line"></div>
        <p>小微商户经营服务平台——拇指钱包是一款为国内外小微商户提供聚合收付款产品的平台型工具，主要提供聚合收款、经营分析、活动营销和金融导流等服务。</p>
        <div class="count">
          <div>
            <b>20W+</b>
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
          name: "聚合收款",
          icon: "icon-qunfengmaidanfenrunbili",
          hoverIcon: "icon-qunfengmaidanfenrunbili1",
          isActive: false,
          id: "f1",
          des:
            "支持包括微信、支付宝、QQ钱包等多种主流支付方式，信用卡、花呗都能用"
        },
        {
          name: "提现",
          icon: "icon-hongbao",
          hoverIcon: "icon-qunfenghongbao",
          isActive: false,
          id: "f2",
          des: "提供余额提现功能，快速到账，最低提现手续费为0"
        },
        {
          name: "语音播报",
          icon: "icon-dianhua",
          hoverIcon: "icon-qunfengdianhua",
          isActive: false,
          id: "f3",
          des: "语音播报到账金额，自动确认收款"
        },
        {
          name: "账务管理",
          icon: "icon-qunfengjinrong",
          hoverIcon: "icon-qunfengjinrong1",
          isActive: false,
          id: "f4",
          des: "清晰记录每一笔账目，提供日账单和月账单"
        },
        {
          name: "业务分析",
          icon: "icon-qunfengjichushuju",
          hoverIcon: "icon-qunfengjichushuju1",
          isActive: false,
          id: "f5",
          des: "提供多维度业务数据报表，并提供针对性的报表分析"
        },
        {
          name: "其他",
          id: "f6",
          icon: "icon-qunfengshangjiaxiangqing",
          hoverIcon: "icon-qunfengshangjiaxiangqing1",
          isActive: false,
          des: ""
        }
      ],
      scenelist: [
        { name: "商超便利店", id: "s1", icon: "icon-bianlidian", des: "" },
        { name: "水果店", id: "s2", icon: "icon-shuiguo", des: "" },
        { name: "服装店", id: "s3", icon: "icon-gouwuche1", des: "" },
        { name: "烟酒店", id: "s4", icon: "icon-jiushuishouru", des: "" },
        { name: "快餐店", id: "s5", icon: "icon-canyin", des: "" },
        { name: "菜市场", id: "s6", icon: "icon-shucai", des: "" },
        { name: "夜市", id: "s7", icon: "icon-shaokao", des: "" },
        { name: "其他", id: "s8", icon: "icon-qita", des: "" }
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
    height: 750px;
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
        &:last-child {
          .right {
            padding-top: 10px;
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
