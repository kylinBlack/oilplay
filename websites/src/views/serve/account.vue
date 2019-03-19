<template>
  <div class="content">
    <div class="topimg">
      <img src="../../assets/img/banner/account.png" alt>
      <!-- <img src="../../assets/img/banner/font/account_font.png" alt> -->
      <div class="pro-name">
        <h1>账户体系</h1>
        <p>一整套完善的用户系统、账户系统、财务系统</p>
      </div>
    </div>
    <div class="des">
      <div class="box">
        <h1>服务简介</h1>
        <div class="line"></div>
        <p>依托银行自身账户能力，针对航旅、电商等机构打造综合账户管理系统，拥有强大的用户系统、账户系统、账务系统和订单系统（资金订单），为其提供安全、高效、便捷的资金账户综合管理服务。</p>
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
            title: "支持多样化的业务场景",
            id: "t1",
            icon: "icon-kexuejishu-2",
            bg: "myicon-servebg4",
            des: "支持多种业务场景，为用户打造满足自身业务需求的账户管理系统"
          },
          {
            title: "技术对接简单快捷",
            id: "t2",
            icon: "icon-kexuejishu-",
            bg: "myicon-servebg2",
            des:
              "提供专业的技术团队开发对接，尊享专员对接的大客户体验，高效完成技术对接"
          },
          {
            title: "银行级安全架构",
            id: "t3",
            icon: "icon-anquan2",
            bg: "myicon-servebg3",
            des:
              "多服务器数据自动备份，嵌入全天候异常操作检测、数据加密、下一代防火墙、数字签名等安全策略"
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
