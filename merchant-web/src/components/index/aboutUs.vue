<template>
  <div class="aboutUs">
    <div class="abHeader">
      <p class="tWord1">致力于科技生产为核心</p>
      <p class="tWord2">遵从与合作伙伴互通﹑互融﹑互赢</p>
      <p class="tWord3">
       <span>国油众盈(北京)支付科技有限公司</span>
      </p>
    </div>
    <div class="abCont">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
          <pre> </pre>
        </el-col>
        <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
          <div class="abountusWord">
            <p class="abwTitle">关于我们</p>
            <p class="bLine">
              <span></span>
            </p>
            <p class="section1">
              国油众盈（北京）支付科技有限公司，简称“国油支付｜COP”，2016年9月成立。目前，公司团队组建公司运营部，科技开发部，产品运营部，市场合作部，交互体验部及机构合作中心近60余人的团队规模，平均年龄26.3岁，核心成员平均行业经验5年以上。
            </p>
            <p class="section2">公司服务主要以中小型企业群经营服务产品智企银通为核心，展开对国内外中小型企业客户群日常经营服务，场景化促进银行存、贷、汇、获客、消费需求。团队崇尚“尊客户，优产品，快迭代，重创造”的基本原则，以科技生产为核心，链接银行与企业的深度服务。运营至今已与BATJ、中国银联、网商银行、浦发银行、南粤银行、微众银行、SIB国际银行、泰国皇家银行，中国电信、移动、联通、烟草、Visa/Mastercard/JCB/AE/DC等36家国内外机构建立深度合作关系，并拥有微小零售商户30多万家，中大型企业客户2300多家，场景应用解决方案20余案例。</p>
            <p class="section3">公司致力于科技生产为核心，为2B市场行业生态发展，提供智能，安全，高效的市场链接服务，遵从与合作伙伴互通，互融、互赢的理念，为更加优质的市场环境而贡献力量。</p>
          </div>
          <div class="dataSum">
            <ul>
              <li>
                <p><img src="../../assets/img/at.png" alt=""></p>
                <p> 中大型企业客户2300多家</p>
              </li>
              <li>
                <p><img src="../../assets/img/ath.png" alt=""></p>
                <p>小微零售商户30多万家</p>
              </li>
              <li>
                <p><img src="../../assets/img/df.png" alt=""></p>
                <p>平均行业经验5年以上</p>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
          <div class="products">
            <p class="abwTitle">公司核心产品</p>
            <p class="bLine">
              <span></span>
            </p>
            <p class="titleTip">提供标准化支付产品及全面的支付渠道,帮助企业快速高效的搭建自己的支付系统</p>
            <ul class="productclassBox">
              <li>
                <div class="mybox">
                  <div class="firstBox" v-show="isShow">
                    <img src="../../assets/img/ayishou.png" alt="">
                    <p>易收</p>
                  </div>
                  <!-- name="slide"-->
                  <transition name="slide">
                    <div class="secondBox">
                      <img src="../../assets/img/ayishou.png" alt="">
                      <p>易收</p>
                      <div class="boxText">开通易收服务即可实现多种支付方式接入
                      </div>
                    </div>
                  </transition>
                </div>
              </li>

              <li>
                <div class="mybox">
                  <div class="firstBox" v-show="isShow">
                    <img src="../../assets/img/ayifu.png" alt="">
                    <p>易付</p>
                  </div>
                  <transition name="slide">
                    <div class="secondBox">
                      <img src="../../assets/img/ayifu.png" alt="">
                      <p>易付</p>
                      <div class="boxText">满足企业的多种资金代付需求</div>
                    </div>
                  </transition>
                </div>
              </li>

              <li>
                <div class="mybox">
                  <div class="firstBox" v-show="false">
                    <img src="../../assets/img/ayicha.png" alt="">
                    <p>易查</p>
                  </div>
                  <transition name="slide">
                    <div class="secondBox">
                      <img src="../../assets/img/ayishou.png" alt="">
                      <p>易查</p>
                      <div class="boxText">为用户提供包括授信、消费分期、信用卡、投资理财等数据技术服务</div>
                    </div>
                  </transition>
                </div>
              </li>
            </ul>
          </div>
          <div class="connectUs">
            <p class="abwTitle">联系我们</p>
            <p class="bLine">
              <span></span>
            </p>
          <ul>
            <li>
              <div class="conTop">
                <div>联系<span>客服</span></div>
                <img src="../../assets/img/customer.png" alt="">
              </div>
              <div class="item1">
                <div>客服电话</div>
                <div class="rItem">
                  <p>0755-26672765</p>
                  <p>(周一至周五9:00-18:00)</p>
                </div>
              </div>
              <div class="item1">
                <div>客服邮箱</div>
                <div class="rItem">
                  <p>kefu@chinaoilpay.com</p>
                </div>
              </div>
            </li>
            <li>
              <div class="conTop">
                <div>商务<span>合作</span></div>
                <img src="../../assets/img/business.png" alt="">
              </div>
              <div class="item1">
                <div>合作电话</div>
                <div class="rItem">
                  <p>400-877-5800</p>
                </div>
              </div>
              <div class="item1">
                <div>商务邮箱</div>
                <div class="rItem">
                  <p>chinaoilpay@chinaoilpay.com</p>
                </div>
              </div>
            </li>
          </ul>
          </div>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
          <pre> </pre>
        </el-col>
        </el-row>
    </div>
  </div>
</template>
<script>
  export default{
    name: "aboutUs",
    data(){
      return {
        isShow:false
      }
    },
    methods: {}
  }
</script>
<style scoped>
.aboutUs,
.abHeader,
.abHeader p,
.abountusWord,
.products,
.connectUs,
.abwTitle,
.bLine,
.section1,
.section2,
.section3,
.dataSum,
.dataSum ul,
.titleTip,
.connectUs ul,
.conTop,
.item1 {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}
.abCont {
  margin-bottom: 100px;
}
.abHeader {
  height: 524px;
  background: #0067b8;
  color: white;
  padding-top: 127px;
}

.abHeader p {
  color: #ffffff;
  text-align: center;
  margin: 15px 0;
  box-sizing: border-box;
  letter-spacing: 1px;
}
.tWord1 {
  font-size: 36px;
}
.tWord2 {
  font-size: 45px;
}
.tWord3 {
  padding-top: 15px;
  font-size: 26px;
}
.tWord3 span {
  display: block;
  height: 49px;
  width: 464px;
  border: 3px solid #ffffff;
  margin: 0 auto;
  line-height: 43px;
  box-sizing: border-box;
}
.clear {
  clear: both;
}

/**** 关于我们 ****/

.abountusWord {
  padding-top: 110px;
}
.abwTitle {
  text-align: center;
  color: #333333;
  font-size: 40px;
  padding-bottom: 5px;
}
.bLine {
  height: 3px;
  margin: 52px 0;
}
.bLine span {
  height: 3px;
  width: 48px;
  background: #0067b8;
  display: block;
  margin: 0 auto;
}
.section1,
.section2,
.section3 {
  font-size: 20px;
  color: #333333;
  text-align: center;
  margin-bottom: 55px;
  line-height: 40px;
}

/**** 数据展示 ****/

.dataSum {
  margin: 150px 0;
}
.dataSum ul {
  height: 117px;
  box-sizing: border-box;
}

.dataSum ul li {
  float: left;
  width: 33%;
  height: 60px;
  box-sizing: border-box;
}
.dataSum ul li p {
  text-align: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  color: #333333;
  letter-spacing: 1px;
}
.dataSum ul li p:nth-of-type(2) {
  margin-top: 11px;
}

.dataSum ul li p img {
  position: relative;
  max-width: 85%;
  height: auto;
}
.titleTip {
  font-size: 18px;
  color: #333333;
  text-align: center;
  padding-bottom: 80px;
}
.productclassBox {
  position: relative;
  width: 100%;
  margin-bottom: 100px;
  display: inline-block;
}

.productclassBox li {
  float: left;
  width: 33%;
  position: relative;
  text-align: center;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mybox {
  text-align: center;
  height: 100%;
  width: 100%;
}

.secondBox,
.firstBox {
  position: relative;
  width: 80%;
  padding: 32px 0;
  max-height: 100%;
  box-sizing: border-box;
  height: 100%;
}

.secondBox {
  box-shadow: 0 0 10px #dadada;
  margin: 0 auto;
}
.boxText {
  width: 80%;
  margin: 0 auto;
  color: #999999;
  font-size: 15px;
  text-align: left;
  padding-top: 20px;
  box-sizing: border-box;
  line-height: 20px;
}

/**** 联系我们 ****/

.connectUs {
  height: 150px;
}
.connectUs ul {
  height: 187px;
}
.connectUs ul li {
  float: left;
  width: 49%;
  height: auto;
}
.conTop {
  font-size: 40px;
  color: #333333;
}
.conTop div span {
  color: #056ab9;
}
.conTop div,
.conTop img {
  float: left;
  vertical-align: middle;
}
.conTop img {
  margin-left: 30px;
  width: 70px;
  height: auto;
}
.item1 {
  display: inline-block;
  margin-top: 55px;
}
.rItem {
  height: 55px;
}
.rItem p:nth-of-type(2) {
  color: #999999;
  margin-top: 10px;
  font-size: 16px;
}
.item1 div {
  float: left;
  font-size: 20px;
}
.item1 div:nth-of-type(1) {
  width: 100px;
}
</style>
