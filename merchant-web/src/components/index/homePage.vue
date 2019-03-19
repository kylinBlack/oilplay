<template>
  <el-container>
    <el-header>
      <div class="index_banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerData" :key="item.index">
            <div class="bannerImg">
              <img :src="item.b" alt="">
              <div v-if="item.btn" class="to-more" @click="toMore">了解更多</div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="floatwindow" v-if="!isShow">
          <p class="ftitle">欢迎使用智企银通 !</p>
          <p class="fmark">您当前登录的智企银通账户是:</p>
          <p class="fid">{{mername}}</p>
          <div class="fbtn">
            <el-button type="primary" @click="goMyAccount">进入我的账户</el-button>
          </div>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-row>
        <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
          <pre> </pre>
        </el-col>
        <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16">
          <div class="index_pro blockComment">
            <div class="block_top">
              <p class="block_title">产品服务能力</p>
              <p class="block_text">提供标准化支付产品及全面的支付渠道,帮助企业快捷高效的搭建自己的支付系统</p>
            </div>
            <div class="block_content">
              <el-tabs v-model="activeName" @tab-click="handleClick" class="index_tabs" id="index_tabs">
                <el-tab-pane name="first">
                  <div slot="label">
                    <img src="../../assets/img/yishou.png" alt="">
                    <p>易收</p>
                  </div>
                  <div class="index_tabs_content">
                    <p class="index_tabsMarsk tabMarsk1">一个API, 在任何平台合场景接入支付功能.</p>
                    <div class="index_tabs_itemContent tabCont1">
                      <ul>
                        <li>
                          <p class="tabsItems_title">网银支付</p>
                          <div class="tabsItems_contents">
                            银行网银页面输入银行卡信息并验证支付密码，具有稳定易用，安全可靠的特点。
                          </div>
                        </li>
                        <li>
                          <p class="tabsItems_title">快捷支付</p>
                          <div class="tabsItems_contents">
                            只需提供银行卡卡号、户名、手机号码等信息，用户输入正确的手机动态口令，即可完成支付。
                          </div>
                        </li>
                        <li>
                          <p class="tabsItems_title">协议支付</p>
                          <div class="tabsItems_contents">
                            只需提供银行卡卡号、户名、手机号码等信息，用户输入正确的手机动态口令，即可完成支付。
                          </div>
                        </li>
                        <li class="clearBorder">
                          <p class="tabsItems_title">代扣收款</p>
                          <div class="tabsItems_contents">
                            只需提供银行卡卡号、户名、手机号码等信息，用户输入正确的手机动态口令，即可完成支付。
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </el-tab-pane>
                <el-tab-pane name="second">
                  <div slot="label">
                    <img src="../../assets/img/yifu.png" alt="">
                    <p>易付</p>
                  </div>
                  <div class="index_tabs_content">
                    <p class="index_tabsMarsk tabMarsk2">提供API接口、商户平台两种产品形态</p>
                    <div class="index_tabs_itemContent tabCont2">
                      <ul>
                        <li>
                          <p class="tabsItems_title">单笔代付</p>
                          <div class="tabsItems_contents">
                            仅需提供收款方名称、银行账号、银行名称、开户支行信息等，即可将账户余额代付至收款方银行账户，无需开发接口对接，安全易用
                          </div>
                        </li>
                        <li>
                          <p class="tabsItems_title">批量代付</p>
                          <div class="tabsItems_contents">
                            单次批量代付最高可支持2000笔，操作员下载付款模板导入付款信息并上传至平台，输入支付密码确认即可完成付款。
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </el-tab-pane>
                <el-tab-pane name="third">
                  <div slot="label">
                    <img src="../../assets/img/yicha.png" alt="">
                    <p>易查</p>
                  </div>
                  <div class="index_tabs_content">
                    <p class="index_tabsMarsk tabMarsk3">基于大数据风控技术，为信贷机构提供的贷前风控查询服务</p>
                    <div class="index_tabs_itemContent tabCont3">
                      <ul>
                        <li>
                          <div class="tabsItems_contents">
                            针对信贷机构贷前申请环节，为信贷机构提供的一套信贷风控服务。依托大数据技术，将申请材料、使用设备、不良信用记录和多平台借贷记录等信息加以整合，有效识别团伙欺诈、机构代办等高风险行为。帮助行业合作伙伴之间建立联防联控机制，过滤不良客户，减少资金损失，净化行业环境。
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </el-tab-pane>

              </el-tabs>

            </div>

          </div>
          <div class="index_userConnect blockComment">
            <div class="block_top">
              <p class="block_title">产品服务能力</p>
              <p class="block_text">提供标准化支付产品及全面的支付渠道,帮助企业快捷高效的搭建自己的支付系统</p>
            </div>
            <div class="block_content">
              <ul class="userConnect">
                <li class="userConnect_text">
                  <div class="userConnect_block" @mouseover="showImg('lefttop')" @mouseout="hideImg('lefttop')">
                    <p class="userConnect_title">
                      <b class="jiacu">1</b>天快速接入
                    </p>
                    <img src="../../assets/img/lt_line.png" alt="" class="block_line lefttop-line" v-show="lefttop">
                    <div class="userConnect_content">
                      周到专业的技术支持, 详细全面的文档简介易用接口, 丰富客户经验积累
                    </div>
                  </div>
                  <div class="userConnect_block" @mouseover="showImg('leftbottom')" @mouseout="hideImg('leftbottom')">
                    <p class="userConnect_title">
                      节省<b class="jiacu">99%</b> 成本
                    </p>
                    <img src="../../assets/img/lb_line.png" alt="" class="block_line leftbottom-line"
                         v-show="leftbottom">
                    <div class="userConnect_content">
                      <p>一站式技术服务</p>
                      <p>丰富</p>
                      <p>全面使用的组件库</p>
                    </div>
                  </div>
                </li>
                <li class="userConnect_img">

                  <transition name="el-fade-in-linear">
                     <img :src="imgSrc" alt="" v-show="isChangeImg">
                     <!--<img src="../../assets/img/lt_img.png" alt="" v-if="lefttop">-->
                  </transition>
                  <!--<transition name="el-fade-in-linear">-->
                    <!--<img src="../../assets/img/lb_img.png" alt="" v-if="leftbottom">-->
                  <!--</transition>-->
                  <!--<transition name="el-fade-in-linear">-->
                    <!--<img src="../../assets/img/rt_img.png" alt="" v-if="righttop">-->
                  <!--</transition>-->
                  <!--<transition name="el-fade-in-linear">-->
                    <!--<img src="../../assets/img/rb_img.png" alt="" v-if="rightbottom">-->
                  <!--</transition>-->
                </li>
                <li class="userConnect_text">
                  <div class="userConnect_block" @mouseover="showImg('righttop')" @mouseout="hideImg('righttop')">
                    <p class="userConnect_title">
                      <b class="jiacu">7x10</b>小时服务
                    </p>
                    <transition name="el-fade-in-linear">
                      <img src="../../assets/img/rt_line.png" alt="" class="block_line righttop-line" v-show="righttop">
                   </transition>
                    <div class="userConnect_content">
                      客户成功团队从接口联调﹑测试上线到后期系统运维﹑管理平台使用等各方向全面提供7x10小时服务
                    </div>
                  </div>
                  <div class="userConnect_block" @mouseover="showImg('rightbottom')" @mouseout="hideImg('rightbottom')">
                    <p class="userConnect_title">
                      <b class="jiacu">1</b>站式管理平台
                    </p>
                    <transition name="el-fade-in-linear">
                       <img src="../../assets/img/rb_line.png" alt="" class="block_line rightbottom-line"
                         v-show="rightbottom">
                      </transition>
                    <!--<img src="../../assets/img/rb_line.png" alt="" class="block_line rightbottom-line"-->
                        <!--&gt;-->
                    <div class="userConnect_content">
                      管理平台悉数呈现多方交易数据,支持多角色协同,同意管理所有的业务和财务数据,多维度分析业务运行状况
                    </div>
                  </div>
                </li>
              </ul>

            </div>
          </div>
          <div class="index_banking blockComment">
            <div class="block_top">
              <p class="block_title">银行金融科技服务</p>
              <p class="block_text">为中小型银行﹑直销银行等提供金融科技服务,协助银行更好的服务企业客户,助力中小银行业务增长</p>
            </div>
            <div class="block_content">
              <div class="index_bankingLt">
                <div class="bankingLt_text">
                  <div>存﹑贷﹑汇一体化解决方案</div>
                  <div>大数据﹑智能风控﹑精准营销﹑金融云</div>
                  <div>智能投顾﹑供应链金融服务</div>
                  <div>银行电子Ⅱ类账户﹑跨行支付﹑聚合支付等服务</div>
                </div>
              </div>
              <div class="index_bankingRt">
                <img src="../../assets/img/bakingImg.png" alt="">
              </div>

            </div>
          </div>
          <div class="index_comBanking blockComment ">
            <div class="block_top">
              <p class="block_title">企业金融科技服务</p>
              <p class="block_text">链接银行与企业,助力特色企业业务发展, 满足企业日常经营需求</p>
            </div>
            <div class="block_content">
              <div class="index_bankingRt">
                <img src="../../assets/img/enBankingImg.png" alt="">
              </div>
              <div class="index_bankingLt">
                <div class="bankingLt_text">
                  <div>多种支付能力应用,包括网银﹑快捷﹑代收付﹑聚合收付等</div>
                  <div>数据服务﹑数据鉴权﹑征信服务等</div>
                  <div>智企业融资﹑理财一站式服务</div>
                  <div>互金﹑电商﹑物流﹑航空多种行业解决方案</div>
                </div>
              </div>
            </div>
          </div>
          <div class="index_trads blockComment">
            <div class="block_top">
              <p class="block_title">多种行业解决方案</p>
            </div>
            <div class="block_content">
              <ul class="index_tradsblock">
                <li>
                  <img src="../../assets/img/jinrong.png" alt="">
                  <p>金融</p>
                </li>
                <li>
                  <img src="../../assets/img/dianshang.png" alt="">
                  <p>电商</p>
                </li>
                <li>
                  <img src="../../assets/img/lingshou.png" alt="">
                  <p>零售</p>
                </li>
                <li>
                  <img src="../../assets/img/piaowu.png" alt="">
                  <p>票务</p>
                </li>
                <li>
                  <img src="../../assets/img/baoxian.png" alt="">
                  <p>保险</p>
                </li>
                <li>
                  <img src="../../assets/img/jiaoyu.png" alt="">
                  <p>教育</p>
                </li>
                <li>
                  <img src="../../assets/img/yiliao.png" alt="">
                  <p>医疗</p>
                </li>
                <li>
                  <img src="../../assets/img/canyin.png" alt="">
                  <p>餐饮</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="index_partner blockComment clearBorder">
            <div class="block_top">
              <p class="block_title">合作伙伴</p>
            </div>
            <ul class="index_partnerblock">
              <li>
                <img src="../../assets/img/zhongguoyinlian.png" alt="">

              </li>
              <li>
                <img src="../../assets/img/zhongxinyinhang.png" alt="">

              </li>
              <li>
                <img src="../../assets/img/nanyue.png" alt="">

              </li>
              <li>
                <img src="../../assets/img/jincheng.png" alt="">

              </li>
              <li>
                <img src="../../assets/img/weixinzhifu.png" alt="">

              </li>
              <li>
                <img src="../../assets/img/zhifubao.png" alt="">

              </li>
              <li>
                <img src="../../assets/img/wangshang.png" alt="">

              </li>
              <li>
                <img src="../../assets/img/dianxin.png" alt="">
              </li>

            </ul>
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
          <pre> </pre>
        </el-col>

      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import copfooter from '../../components/lib/footerCom.vue'
export default {
  name: 'homePage',
  data () {
    return {
      activeName: 'first',
      lefttop: true,
      leftbottom: false,
      righttop: false,
      rightbottom: false,
      isShow: true,
      isChangeImg: true,
      lastFadeIn: '',
      mername: '',
      bannerData: [
        {b: require('../../assets/img/banner1.png')},
        {b: require('../../assets/img/banner2.png'), btn: true},
        {b: require('../../assets/img/banner3.png')},
        {b: require('../../assets/img/banner4.png')}
      ],
      imgSrc: require('../../assets/img/lt_img.png'),
      rountImg: {
        lefttop: require('../../assets/img/lt_img.png'),
        leftbottom: require('../../assets/img/lb_img.png'),
        righttop: require('../../assets/img/rt_img.png'),
        rightbottom: require('../../assets/img/rb_img.png')

      }
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log('产品选项卡切换');
    },
    showImg (val) {
      var that = this
      that.hidingImg()
      switch (val) {
        case 'lefttop':
          that.lefttop = true
          that.imgSrc = that.rountImg.lefttop
          break
        case 'leftbottom':
          that.lefttop = false
          that.leftbottom = true
          that.imgSrc = that.rountImg.leftbottom
          break
        case 'righttop':
          that.lefttop = false
          that.righttop = true
          that.imgSrc = that.rountImg.righttop
          break
        case 'rightbottom':
          that.lefttop = false
          that.rightbottom = true
          that.imgSrc = that.rountImg.rightbottom
          break
      }
    },
    hideImg (val) {
      var that = this
      that.lastFadeIn = val
    },

    hidingImg () {
      var that = this
      var img = that.lastFadeIn
      switch (img) {
        case 'lefttop':
          that.lefttop = false
          break
        case 'leftbottom':
          that.leftbottom = false
          break
        case 'righttop':
          that.righttop = false
          break
        case 'rightbottom':
          that.rightbottom = false
          break
      };
    },

    goMyAccount () {
      location.assign('main.html')
    },

    signOut () {
      location.assign('/')
      window.localStorage.removeItem('userinfo')
    },

    toMore () {
      open('http://docs.open.iebt.net', '_blank')
    }
  },

  created () {
    var userinfo = window.localStorage.getItem('userinfo')
    userinfo = JSON.parse(userinfo)
    if (userinfo) {
      this.isShow = false
      this.mername = userinfo.merchantName
    }
  },
  components: {
    copfooter
  }
}
</script>

<style>
body,
section,
p,
div,
span,
ul,
li {
  margin: 0;
  padding: 0;
  font-family: 'Microsoft YaHei UI';
}

li {
  list-style: none;
}

/***** 头部,banner ****/
.index_logo,
.index_nav {
  display: inline-block;
}

.block_top {
  margin-bottom: 130px;
}

.bannerImg,
.bannerImg img {
  position: relative;
  width: 100%;
  height: auto;
}

.index_nav .el-menu {
  background: #0067b8;
}

.el-header {
  padding: 21px 0;
  /*background: #0067b8;*/
  color: white;
  display: inline-block;
  height: auto !important;
}
.el-button--primary {
  background-color: #0067b8 !important;
  border-color: #0067b8 !important;
  border-radius: 1px;
}
.el-menu--horizontal .el-menu-item {
  height: 53px;
  line-height: 53px;
  background: #0067b8;
  color: white;
}

.header_main {
  display: flex;
  justify-content: space-between;
}

.el-menu--horizontal {
  border: none;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid white;
}

.banner_rt .el-button {
  border: 1px solid #9cc4e4;
  background: #0067b8;
  color: white;
}

.banner_rt .el-button:hover {
  border: 1px solid #ffffff;
}

.banner_rt,
.banner_lt {
  display: inline-block;
  position: relative;
  width: 48%;
  text-align: center;
  vertical-align: middle;
  padding-top: 27px;
}

.banner_lt img {
  width: 26.875rem;
  height: 23.125rem;
}

.btn_text,
.btn_img {
  display: inline-block;
  vertical-align: middle;
}

.btn_text {
  padding-right: 5px;
}

.banner_title {
  font-size: 2.625rem;
  color: #ffffff;
}

.banner_text {
  font-size: 1.1875rem;
  color: #ffffff;
  margin: 1.5625rem 0;
}

.b_content {
  display: inline-block;
  text-align: left;
  letter-spacing: 3px;
  width: 60%;
}

.emptyDiv {
  display: inline-block;
  position: relative;
  width: 30%;
}

/******** 主体 ********/

.block_text,
.block_title {
  letter-spacing: 2px;
}

.block_title {
  font-size: 32px;
  color: #333333;
  text-align: center;
}

.block_text {
  color: #000000;
  font-size: 18px;
  margin: 30px;
  text-align: center;
}

.index_tabs {
  position: relative;
  width: 100%;
}

.index_tabs .is-top.el-tabs__nav {
  text-align: center;
  width: 100%;
}

.el-tabs__item {
  width: 33.3%;
  height: auto;
  display: inline-block;
  font-size: 16px;
}

.el-tabs__active-bar {
  /*width: 33.3% !important;*/
  /*left: 0;*/
  color: #0067b8;
}

.el-tabs__nav-wrap::after {
  height: 1px;
}

.el-tabs__item.is-active {
  color: #333333;
}

.el-tabs__item:hover {
  color: #333333;
}

.index_tabs_content {
}

.index_tabsMarsk {
  margin-top: 30px;
  margin-bottom: 66px;
  font-size: 15px;
  color: #333333;

  letter-spacing: 1px;
}
.tabMarsk1 {
  text-align: left;
}
.tabMarsk2 {
  text-align: center;
}
.tabMarsk3 {
  text-align: right;
}

.index_tabs_itemContent {
  margin-top: 20px;
  letter-spacing: 1px;
  padding: 10px;
  box-sizing: border-box;
}

.index_tabs_itemContent,
.index_tabs_itemContent ul,
.index_tabs_itemContent ul li {
  position: relative;
  width: 100%;
  display: inline-block;
}

.index_tabs_itemContent ul li {
  float: left;
  box-sizing: border-box;
}
.tabCont1 ul li {
  width: 24%;
  min-height: 185px;
  padding: 15px 25px;
  border-right: 1px solid #f5f5f5;
}
.tabCont2 ul li {
  width: 49%;
  padding: 20px 20px;
}
.tabCont3 ul li {
  width: 100%;
  padding: 20px 20px;
  line-height: 30px !important;
}
.tabCont3 .tabsItems_contents {
  color: #000000 !important;
}

.clearBorder {
  border: none !important;
}

.index_tabs_itemContent ul li:hover {
  box-shadow: 1px 1px 20px 2px #e4e7ed;
}

.tabsItems_title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 10px;
  color: #333333;
}
.tabCont1 .tabsItems_title {
}

.tabsItems_contents {
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  padding: 21px;
  color: #333333;
}

.blockComment {
  margin-top: 67px;
  border-bottom: 1px solid #f7f7f7;
  padding-bottom: 68px;
}

.userConnect {
  position: relative;
  width: 100%;
  height: 500px;
  margin: 0;
  padding: 0;
}

.userConnect li {
  position: relative;
  height: 100%;
  float: left;
  vertical-align: top;
  box-sizing: border-box;
}

.userConnect_text {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.userConnect_img {
  width: 49%;
  display: table;
  line-height: 500px;
  text-align: center;
  padding: 0 10px;
}

.userConnect_img img {
  position: relative;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

.userConnect_title {
  font-size: 24px;
  color: #333333;
  margin-bottom: 30px;
}

.userConnect_content {
  color: #888888;
  letter-spacing: 2px;
  font-size: 15px;
  text-align: left;
  line-height: 25px;
}

.jiacu {
  font-size: 35px;
}

.block_line {
  position: absolute;
  width: 133%;
  z-index: -1;
}

.lefttop-line {
  top: 60px;
  left: 10px;
}

.leftbottom-line {
  top: 5px;
  left: 10px;
}

.righttop-line {
  top: 60px;
  right: 13px;
}

.rightbottom-line {
  top: 5px;
  right: 13px;
}

.userConnect_block {
  position: relative;
}

/*.userConnect_block img{*/
/*position: relative;*/
/*width: 130%;*/
/*}*/

/*  银行金融  */
.index_bankingRt,
.index_bankingLt {
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: middle;
  text-align: center;
  padding: 0 18px;
}

.index_bankingLt p {
  height: 35px;
  line-height: 35px;
  text-align: left;
}

.bankingLt_text {
  display: inline-block;
}
.bankingLt_text div {
  letter-spacing: 2px;
  line-height: 42px;
  text-align: left;
  color: #333333;
}

.index_bankingRt img {
  position: relative;
  max-width: 100%;
  height: auto;
}

/*  多种行业解决方案  */

.index_tradsblock,
.index_partnerblock {
  position: relative;
  width: 100%;
  display: inline-block;
}
.index_partnerblock li {
  margin-top: 40px;
}
.index_tradsblock li,
.index_partnerblock li {
  float: left;
  position: relative;
  max-width: 25%;
  width: 24.5%;
  text-align: center;
}

.index_tradsblock li {
  height: 92px;
  margin-bottom: 70px;
  padding: 10px;
  box-sizing: border-box;
}
.index_tradsblock li:hover {
  box-shadow: 1px 1px 20px 2px #e4e7ed;
}

.index_partnerblock li img {
  position: relative;
  width: 100%;
  height: auto;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: white;
}

@media only screen and (max-width: 768px) {
  .block_line {
    width: 136%;
  }
}

@media only screen and(min-width: 768px ) and (max-width: 1200px) {
  .block_line {
    width: 130%;
  }
}

@media only screen and(min-width: 1200px) {
  .block_line {
    width: 120%;
  }
}

.floatwindow {
  position: absolute;
  width: 360px;
  height: 248px;
  border: 1px solid white;
  top: 1.5%;
  right: 15%;
  padding: 40px;
  background: white;
  z-index: 30;
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: 0px 0px 11px #aaccff;
}

.ftitle {
  font-size: 24px;
  height: 40px;
  border-bottom: 1px solid #f3f3f3;
  color: #333333;
}

.fmark {
  margin-top: 20px;
  color: #666666;
  font-size: 15px;
}

.fid {
  height: 42px;
  line-height: 40px;
  color: #333333;
  font-size: 16px;
}
.fbtn,
.fbtn .el-button {
  position: relative;
  width: 100%;
}
.to-more {
  position: absolute;
  left: 22%;
  margin-left: 8px;
  bottom: 25%;
  border: 1px solid;
  padding: 10px 30px 10px 15px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
