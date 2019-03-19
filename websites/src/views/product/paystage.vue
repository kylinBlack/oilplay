<template>
  <div class="content">
    <div class="topimg">
      <img src="../../assets/img/banner/paystage.png" alt>
      <!-- <img src="../../assets/img/banner/font/paystage_font.png" alt> -->
      <div class="pro-name">
        <h1>支付结算平台</h1>
        <p>助力商业银行为企业提供支付结算服务及定制化的金融科技解决方案</p>
      </div>
    </div>
    <div class="introduce">
      <div class="box">
        <h1>产品简介</h1>
        <div class="line"></div>
        <p>协助商业银行搭建支付结算平台，为企业提供账户体系、交易结算、综合支付、风控管理等产品和服务及定制化的金融科技解决方案。</p>
        <div class="count">
          <div>
            <b>1000W+</b>笔
          </div>
          <div>日均最大支撑交易量</div>
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
          name: "支持多种支付方式",
          icon: "icon-qunfengmaidanfenrunbili",
          hoverIcon: "icon-qunfengmaidanfenrunbili1",
          isActive: false,
          id: "f1",
          des:
            "支持代收付、快捷支付、网银支付、协议支付、聚合支付等多种支付方式"
        },
        {
          name: "多商户管理模式",
          icon: "icon-kequntoushi",
          hoverIcon: "icon-kequntoushi1",
          isActive: false,
          id: "f2",
          des: "灵活的商户配置管理模式"
        },
        {
          name: "交易管理",
          icon: "icon-qunfengguanlizhongxin",
          hoverIcon: "icon-qunfengguanlizhongxin1",
          isActive: false,
          id: "f3",
          des: "多类型业务订单中心"
        },
        {
          name: "风控系统",
          icon: "icon-anquanzhongxin",
          hoverIcon: "icon-anquanzhongxin1",
          isActive: false,
          id: "f4",
          des: "完善的底层架构，严谨的风控管理技术"
        },
        {
          name: "数据报表",
          icon: "icon-qunfengjichushuju",
          hoverIcon: "icon-qunfengjichushuju1",
          isActive: false,
          id: "f5",
          des: "提供多维度的业务数据报表"
        },
        {
          name: "智能路由",
          icon: "icon-luyou",
          hoverIcon: "icon-luyou-mian2",
          isActive: false,
          id: "f6",
          des: "智能切换支付通道"
        },
        {
          name: "渠道对账",
          icon: "icon-yonghufenxi",
          hoverIcon: "icon-qunfengyonghufenxi",
          isActive: false,
          id: "f7",
          des: "提供标准T+1对账单"
        },
        {
          name: "其他",
          id: "f8",
          icon: "icon-qunfengshangjiaxiangqing",
          hoverIcon: "icon-qunfengshangjiaxiangqing1",
          isActive: false,
          des: ""
        }
      ],
      scenelist: [
        { name: "公共事业缴费", id: "s1", icon: "icon-1", des: "" },
        { name: "保险缴费", id: "s2", icon: "icon-baoxianxiaoshou", des: "" },
        { name: "电商物流", id: "s3", icon: "icon-dianshang", des: "" },
        { name: "在线教育", id: "s4", icon: "icon-jiaoyu", des: "" },
        { name: "批发零售", id: "s5", icon: "icon-gouwu", des: "" },
        { name: "旅游票务", id: "s6", icon: "icon-928caidan_piaowu", des: "" },
        { name: "医疗美容", id: "s7", icon: "icon-yiliao1", des: "" },
        { name: "酒店物业", id: "s8", icon: "icon-Hotel", des: "" }
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
    // .pro-name {
    //   padding: 0;
    //   position: absolute;
    //   left: 50%;
    //   top: 50%;
    //   color: #fff;
    //   transform: translate(-50%, -50%);
    //   font-size: 60px;
    //   font-weight: 100;
    // }
    .pro-name {
      position: absolute;
      left: 50%;
      top: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      width: 900px;
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
    height: 950px;
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
