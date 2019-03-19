<template>
  <div class="content">
    <div class="topimg">
      <img src="../assets/img/banner/part.png" alt>
      <!-- <img src="../assets/img/banner/font/part_font.png" alt> -->
      <h1 class="pro-name">选择国油支付科技，我们将用专业服务满足您的金融科技需求</h1>
    </div>
    <div class="wefine">
      <div class="box">
        <h1>我们的优势</h1>
        <div class="line"></div>
        <div class="list">
          <ul>
            <li v-for="item in fineList" :key="item.id">
              <i :class="item.icon"></i>
              <p>{{item.des}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flow">
      <h1>商户合作接入流程</h1>
      <div class="line"></div>
      <h4>仅需5步，扬起金融科技革新之帆</h4>
      <div class="box">
        <div class="flow-img">
          <img src="../assets/img/flow.png" alt>
        </div>
      </div>
    </div>
    <div class="partner">
      <h1>合作伙伴</h1>
      <div class="line"></div>
      <div>
        <img src="../assets/img/partner.png" alt="">
      </div>
    </div>
    <div class="ours">
      <h1>联系我们</h1>
      <div class="line"></div>
      <div class="ours-info">
        <p>有关我们服务的更多信息，请联系</p>
        <p>电话 400-877-5800 / 邮箱 kefu@chinaoilpay.com</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      fineList: [
        { des: "专业的研发和产品团队", id: 1, icon: "myicon-fine1" },
        {
          des: "银行级别的安全技术，稳定性强且灵活度高",
          id: 2,
          icon: "myicon-fine2"
        },
        { des: "丰富的银行服务经验", id: 3, icon: "myicon-fine3" },
        { des: "成熟的市场产品", id: 4, icon: "myicon-fine4" },
        { des: "7*24小时服务", id: 5, icon: "myicon-fine5" }
      ]
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
    background-color: #182041;
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
      font-size: 48px;
      font-weight: 100;
      line-height: 70px;
    }
  }
  .wefine {
    width: 100%;
    height: 700px;
    background-color: #f8f8f8;
    .box {
      margin: 0 auto;
      width: 1200px;
      font-size: 24px;
      .list {
        ul {
          display: flex;
          justify-content: space-between;
          width: 100%;
          li {
            padding: 0 15px;
            flex: 1;
            p {
              margin-top: 90px;
            }
          }
        }
      }
    }
  }
  .flow {
    width: 100%;
    height: 700px;
    .line {
      margin-bottom: 0;
    }
    h4 {
      padding: 35px 0 100px 0;
    }
    .box {
      width: 100%;
      background-color: #f8f8f8;
      height: 398px;
      .flow-img {
        min-width: 1200px;
        margin: 0 auto;
        padding-top: 70px;
        img {
          // width: 100%;
        }
      }
    }
  }
  .partner {
    margin: 0 auto;
    width: 1200px;
    margin-top: 60px;
    margin-bottom: 100px;
    img {
      width: 100%;
    }
  }
  .ours {
    margin: 0 auto;
    background-color: #f8f8f8;
    color: #333;
    .ours-info {
      font-size: 20px;
      line-height: 30px;
      p {
        padding: 5px 0;
      }
    }
    padding-bottom: 100px;
  }
}
</style>
