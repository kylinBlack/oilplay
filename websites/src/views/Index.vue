<template>
  <div class="index">
    <slot>
      <div class="banner">
        <el-carousel height="550px" arrow="never">
          <el-carousel-item v-for="item in 2" :key="item">
            <img :src='"../assets/img/banner/banner"+ item +".png"' alt="">
            <img :src='"../assets/img/banner/font/banner"+ item +"_font.png"' alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="product">
        <h1>了解我们的产品</h1>
        <div class="line"></div>
        <div class="pro-list">
          <el-card class="pro-card" v-for="pro in pageInfo.product" :key="pro.id">
            <div class="item">
              <h3>{{pro.name}}</h3>
              <i :class="['iconfont',pro.img]"></i>
              <p>{{pro.description}}</p>
              <div>
                <span @click="toDo(pro)">了解更多</span>  
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="product serve">
        <div class="content">
          <h1>我们为客户提供专业的服务</h1>
          <div class="line"></div>
          <div class="pro-list">
            <el-card class="pro-card h410" v-for="ser in pageInfo.serve" :key="ser.id">
              <div class="item">
                <h3>{{ser.name}}</h3>
                <i :class="['iconfont',ser.img]"></i>
                <p class="p30">{{ser.description}}</p>
                <div>
                  <span class="bg-fff" @click="toDo(ser)">了解更多</span>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div class="solution">
        <h1>满足多个行业需求的解决方案</h1>
        <div class="line"></div>
        <div class="content">
          <el-tabs :tab-position="tabPosition" style="height: 450px;">
            <el-tab-pane :label="sol.name" v-for="sol in pageInfo.solution" :key="sol.id">
              <div class="row-top">
                <h3>{{sol.name}}</h3>
                <p class="info">{{sol.description}}</p>
                <el-button @click="toDo(sol)" type="primary" round>了解更多</el-button>
              </div>
              <div class="row-bottom">
                <span v-for="s in sol.fontlist" :key="s">{{s}}</span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="pick">
        <div class="content">
          <h1>为什么选择我们</h1>
          <div class="line"></div>
          <div class="pro-list">
            <div class="pro-card" v-for="about in pageInfo.about" :key="about.id">
              <div class="item">
                <i :class="about.img"></i>
                <p>{{about.description}}</p>
              </div>
            </div>
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
    </slot>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    msg: String
  },
  data() {
    return {
      tabPosition: "left",
      pageInfo: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let url = "/api/portal";
      this.axios.get(url).then(res => {
        this.pageInfo = res.data;
      });
    },
    toDo(item) {
      this.$router.push(item.link);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index {
  h1 {
    padding-top: 110px;
    font-size: 50px;
  }
  ul {
    margin-bottom: 30px;
  }
  width: 100%;
  .line {
    width: 150px;
    height: 3px;
    background-color: #252a6a;
    margin: 35px 0 150px 0;
    margin-left: auto;
    margin-right: auto;
  }
  .banner {
    background-color: #5b4d3d;
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
  }
  .product {
    margin: 0 auto;
    width: 1200px;
    height: 950px;
    .pro-list {
      display: flex;
      justify-content: space-around;
      .pro-card {
        width: 350px;
        height: 450px;
        margin: 0 5px;
        &:hover {
          transform: scale(1.1);
          background-color: #2f54eb;
          color: #f8f8f8;
          .item {
            span {
              border-color: #f8f8f8;
            }
          }
        }
        .item {
          h3 {
            padding-top: 30px;
          }
          i {
            display: block;
            font-size: 60px;
            margin: 40px 0;
          }
          p {
            line-height: 30px;
            padding: 0 12px;
          }
          p.p30 {
            margin-bottom: 30px;
            padding: 0;
          }
          div {
            text-align: center;
            margin-top: 30px;
            span {
              display: inline-block;
              height: 40px;
              padding: 0 30px;
              line-height: 40px;
              border: 1px solid #333;
              cursor: pointer;
              border-radius: 4px;
            }
          }
        }
      }
      .pro-card.h410 {
        height: 410px;
        color: #999;
        margin: 0;
        &:hover {
          transform: scale(1.1);
          background-color: #2f54eb;
          color: #f8f8f8;
          i {
            color: #fff;
          }
          .bg-fff {
            background-color: #fff;
            color: #333;
          }
        }
        i {
          color: #333;
        }
      }
    }
  }
  .serve {
    background-color: #f8f8f8;
    width: 100%;
    height: 950px;
    .content {
      margin: 0 auto;
      width: 1200px;
      .pro-list {
        padding: 0 100px;
        .pro-card {
          .item {
            p {
              height: 90px;
              margin-bottom: 0;
            }
            div {
              margin-top: 0;
            }
            .bg-fff {
              border-color: #999;
            }
          }
        }
      }
    }
  }
  .solution {
    background: url("../assets/img/solution.png") no-repeat center/cover;
    width: 100%;
    height: 950px;
    color: #fff;
    .line {
      background-color: #fff;
    }
    .content {
      margin: 0 auto;
      width: 1200px;
      .row-top {
        border-bottom: 1px dashed #fff;
        padding-bottom: 50px;
        p.info {
          padding: 50px 0;
          line-height: 26px;
          color: #d7d7d7;
        }
        .el-button {
          background-color: #2f54eb;
          border-color: #2f54eb;
          width: 200px;
          height: 46px;
          font-size: 16px;
        }
      }
      .row-bottom {
        display: flex;
        justify-content: space-between;
        font-size: 22px;
        font-weight: 500;
        padding-top: 50px;
      }
    }
  }
  .pick {
    margin: 0 auto;
    width: 1200px;
    height: 700px;
    .pro-list {
      display: flex;
      justify-content: space-around;
      .pro-card {
        width: 300px;
        height: 350px;
        margin: 0 32px;
        i {
          margin: 50px 0 80px 0;
        }
        p {
          font-size: 20px;
        }
      }
    }
  }
  .partner {
    margin: 0 auto;
    width: 1200px;
    height: 900px;
    img {
      width: 100%;
    }
  }
}
</style>
