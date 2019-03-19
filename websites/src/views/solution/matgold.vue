<template>
  <div class="content">
    <div class="topimg">
      <img src="../../assets/img/solution_bg.png" alt>
      <div class="pro-name">
        <h1>{{datalist.name}}</h1>
        <p>{{datalist.solution}}</p>
      </div>
    </div>
    <div class="des">
      <div class="box">
        <h1>企业背景</h1>
        <p>{{datalist.background}}</p>
      </div>
      <div class="box">
        <h1>企业痛点</h1>
        <div>
          <ul class="row">
            <li v-for="item in datalist.painpoint" :key="item.id" class="item">
              <i :class="item.icon"></i>
              <p>{{item.info}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="box">
        <h1>我们的解决方案</h1>
        <p>{{datalist.selfsolution}}</p>
      </div>
      <div class="box">
        <h1>我们提供的能力</h1>
        <ul class="power-list">
          <li v-for="item in datalist.power" :key="item.id" :class="item.bgicon">
            <span class="title">{{item.name}}  <i :class="['iconfont',item.icon]"></i></span>
            <p>{{item.info}}</p>
          </li>
        </ul>
      </div>
    </div> 
    <div class="more">
      <p class="name">了解更多信息，请咨询电话：400-877-5800</p>
      <p class="info">专业商务运营团队为您提供免费咨询服务，欢迎来电咨询。</p>
      <el-button @click="toPart" type="primary" round>如何进行合作？</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      datalist: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.axios.get("/api/mg").then(res => {
        this.datalist = res.data;
      });
    },
    toPart() {
      this.$router.push("/home/partner");
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  h1 {
    padding: 110px 0 80px 0;
    font-size: 50px;
    font-weight: 500;
  }

  width: 100%;
  .topimg {
    height: 500px;
    background-color: #182041;
    position: relative;
    img {
      height: 100%;
      width: 100%;
    }
    .pro-name {
      position: absolute;
      left: 50%;
      top: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
      width: 900px;
      h1 {
        padding: 0 0 40px 0;
        font-size: 60px;
        font-weight: 100;
      }
      p {
        font-size: 18px;
      }
    }
  }
  .des {
    width: 100%;
    text-align: left;
    p {
      line-height: 40px;
    }
    .box {
      margin: 0 auto;
      width: 1200px;
      font-size: 20px;
      .row {
        display: flex;
        justify-content: space-between;
        .item {
          width: 200px;
          height: 200px;
          background-color: #f8f8f8;
          text-align: center;
          font-size: 20px;
          i {
            display: inline-block;
            margin-top: 40px;
          }
          p {
            font-weight: 500;
            margin-top: 15px;
          }
        }
      }
      .power-list {
        display: flex;
        justify-content: space-between;
        li {
          .title {
            font-size: 500;
            color: #252a6a;
            font-size: 30px;
            display: inline-block;
            margin: 85px 0 20px 0;
            i {
              font-size: 40px;
              margin-left: 30px;
              color: #8e91b1;
            }
          }
          p {
            font-size: 16px;
            line-height: 20px;
            color: #666;
            padding-right: 16px;
          }
        }
      }
    }
  }
  .more {
    margin-top: 100px;
    padding: 120px 0 100px 0;
    background-color: #f8f8f8;
    .name {
      font-size: 26px;
      font-weight: 500;
    }
    .info {
      color: #666;
      padding: 20px 0 40px 0;
      font-size: 22px;
    }
    .el-button {
      font-size: 26px;
      border-radius: 40px;
      width: 300px;
      height: 80px;
      background-color: #252a6a;
      border-color: #252a6a;
    }
  }
}
</style>
