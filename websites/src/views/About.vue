<template>
  <div class="about">
    <div class="topimg">
      <img src="../assets/img/banner/intro.png" alt>
      <!-- <img src="../assets/img/banner/font/intro_font.png" alt> -->
      <div class="about-info">
        <h3>{{intro.title}}</h3>
        <div class="line"></div>
        <div class="info">
          <p>{{intro.row1}}</p>
          <p>{{intro.row2}}</p>
          <p>{{intro.row3}}</p>
        </div>
        <div class="num">
          <ul>
            <template  v-for="(item,index) in intro.list">
              <li v-if="index != 2" :key="index">
                <span>{{item.num}}+</span>
                <span>{{item.text}}</span>
              </li>
              <li v-if="index == 2" :key="index">
                <span >{{item.num}}<b class="home"> 家</b></span>
                <span>{{item.text}}</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="team">
      <h1>我们有一支朝气蓬勃的队伍</h1>
      <div class="line"></div>
      <i class="picture" @click="dialogVisible=true"></i>
      <el-dialog append-to-body :visible.sync="dialogVisible">
        <img width="100%" src="../assets/img/picture.png" alt="">
      </el-dialog>
    </div>
    <div class="post">
      <h1>不只是招聘，更希望招你喜欢</h1>
      <div class="line"></div>
      <p>如果你认同国油支付科技。专业、充满乐趣和高回报的公司文化，如果你对生活充满好奇，如果你愿意与和你一样优秀的人才一起，创造职业生涯中的辉煌，我们随时欢迎你的到来。</p>
      <div class="title">
        <span>职位列表</span>
      </div>
      <el-tabs v-model="activeName" class="about-tab">
        <el-tab-pane 
          v-for="item in persons"
          :key="item.id"
          :label="item.name" 
          :name="item.code">
          <div class="title">
            <span>职位信息</span>
          </div>
          <h3>职责与要求</h3>
          <p v-html="item.des" class="des-p"></p>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="ours">
      <h1>联系我们</h1>
      <div class="line"></div>
      <div class="map-bg">
        <div class="right">
          <i class="myicon-dingwei"></i>
          <span>广东省深圳市福田区滨河大道9289号京基滨河时代广场A座1406室</span>
        </div>
        <div class="bottom">
          <i class="myicon-lianjie"></i>
          <p>有关我们服务的更多信息，请联系</p>
          <p>电话 400-877-5800 / 邮箱 kefu@chinaoilpay.com</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
      persons: [],
      intro: [],
      activeName: "first",
      dialogVisible: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPerson();
      this.getIntro();
    },
    getPerson() {
      let url = "/api/person";
      this.axios.get(url).then(res => {
        this.persons = res.data;
      });
    },
    getIntro() {
      let url = "/api/introdata";
      this.axios.get(url).then(res => {
        this.intro = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.about {
  h1 {
    padding-top: 110px;
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
    height: 927px;
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
      transform: translate(-50%, -45%);
    }
    .about-info {
      color: #fff;
      width: 1100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h3 {
        font-size: 50px;
        font-weight: 400;
      }
      & > .line {
        height: 2px;
        width: 155px;
        margin: 35px auto;
        margin-bottom: 100px;
        background-color: #fff;
      }
      .info {
        p {
          font-size: 16px;
          line-height: 30px;
          margin-bottom: 26px;
          &:last-child {
            margin: 0;
          }
        }
      }
      .num {
        padding-top: 100px;
        ul {
          display: flex;
          justify-content: space-between;
          li {
            border-left: 1px solid #fff;
            width: 25%;
            height: 100px;
            text-align: center;
            &:first-child {
              border: none;
            }
            span {
              display: block;
              font-weight: 400;
              &:first-child {
                font-size: 55px;
                font-weight: 700;
              }
              .home {
                font-size: 26px;
              }
            }
          }
        }
      }
    }
  }
  .team {
    width: 1200px;
    margin: 0 auto;
    padding: 0 5%;
    .picture {
      display: block;
      width: 960px;
      height: 360px;
      background-image: url("../assets/img/picture.png");
      background-repeat: no-repeat;
      background-size: contain;
      margin: 0 auto;
    }
  }
  .post {
    width: 1200px;
    margin: 0 auto;
    p {
      line-height: 26px;
    }
    .title {
      height: 80px;
      background-color: #f8f8f8;
      line-height: 80px;
      margin: 70px 0;
      span {
        font-size: 24px;
      }
    }
    .des-p {
      text-align: left;
      line-height: 40px;
    }
    h3 {
      text-align: left;
      padding-bottom: 50px;
      font-size: 30px;
    }
  }
  .ours {
    height: 950px;
    .map-bg {
      background: url("../assets/img/map.png") no-repeat center/cover;
      height: 660px;
      position: relative;
      font-size: 12px;
      color: #fff;
      .right {
        position: absolute;
        top: 50%;
        right: 25%;
        transform: translateY(-50%);
        i {
          font-size: 30px;
        }
        span {
          display: inline-block;
          width: 200px;
          text-align: left;
          vertical-align: top;
          line-height: 24px;
          margin-left: 20px;
        }
      }
      .bottom {
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        i {
          font-size: 30px;
        }
        p {
          line-height: 20px;
        }
      }
    }
  }
}
</style>
