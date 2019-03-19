<template>
  <div class="content">
    <div class="topimg">
      <img src="../../assets/img/banner/auth.png" alt>
      <!-- <img src="../../assets/img/banner/font/auth_font.png" alt> -->
      <div class="pro-name">
        <h1>认证鉴权</h1>
        <p>提供身份证认证、银行卡认证、手机号码认证以及生物识别等多种认证方式</p>
      </div>
    </div>
    <div class="des">
      <div class="box">
        <h1>服务简介</h1>
        <div class="line"></div>
        <p>提供包括身份证、银行卡、手机号码等多种方式的认证鉴权，以大数据为支撑，为银行、第三方支付机构、消金机构、网贷平台、保险公司等多个金融行业客户提供认证鉴权服务。</p>
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
            title: "支持多种认证方式",
            id: "t1",
            icon: "icon-kexuejishu-4",
            bg: "myicon-servebg1",
            des:
              "支持多种认证方式，包括但不限于身份证认证、银行卡认证、手机号码认证以及生物识别"
          },
          {
            title: "准确率99.9%",
            id: "t2",
            icon: "icon-kexuejishu-",
            bg: "myicon-servebg2",
            des: "实时联网核查，极速出结果，准确率99.9%"
          },
          {
            title: "全网搜查",
            id: "t3",
            icon: "icon-kexuejishu-3",
            bg: "myicon-servebg5",
            des: "全网搜查，提供精准权威的结果"
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
