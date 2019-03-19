<template>
  <div class="yishou">
    <div class="proIntr">
      <div class="pro_title">产品介绍</div>
      <div class="pro_content">易付包括实时代付，批量代付，垫资代付等，可以通过使用易付产品解决企业代发工资、发放福利等日常办公需求，可以进行线上大小额的代付汇款，满足企业的资金代付需求。</div>
    </div>
    <div class="proGuide">
      <div class="pro_title">接入指引</div>
      <div class="pro_content">
        <div class="proApplySteps">
          <div class="psteps">
            <div class="proStepsLeft">
              第1阶段
            </div>
            <div class="proStepsCenter">
              <div class="proStepsLine firstLine"></div>
              <img src="../../../assets/img/check.png" alt="">
            </div>
            <div class="proStepsRight">
              <div class="proStepsText">创建并激活智企银通账号，完成账号实名认证</div>
              <div class="proStepsMark">在智企银通网站, 注册成为会员并完成认证</div>
            </div>
          </div>
          <div class="psteps">
            <div class="proStepsLeft">
              第2阶段
            </div>
            <div class="proStepsCenter">
              <div class="proStepsLine "></div>
              <img src="../../../assets/img/uncheck.png" alt="">
            </div>
            <div class="proStepsRight">
              <div class="proStepsText">申请产品</div>
              <div class="proStepsMark">根据产品要求提交资料, 1-2个工作日即可完成审核</div>
            </div>
          </div>
          <div class="psteps">
            <div class="proStepsLeft">
              第3阶段
            </div>
            <div class="proStepsCenter">
              <div class="proStepsLine"></div>
              <img src="../../../assets/img/uncheck.png" alt="">
            </div>
            <div class="proStepsRight">
              <div class="proStepsText">签署协议</div>
              <div class="proStepsMark">身后通过后, 应产品介入要求, 由智企银通官方客服联系您线签署协议</div>
            </div>
          </div>
          <div class="psteps">
            <div class="proStepsLeft">
              第4阶段
            </div>
            <div class="proStepsCenter">
              <div class="proStepsLine"></div>
              <img src="../../../assets/img/uncheck.png" alt="">
            </div>
            <div class="proStepsRight">
              <div class="proStepsText">接入产品</div>
              <div class="proStepsMark">根据产品接入介绍文档进行产品接入即可使用产品</div>
            </div>
          </div>
          <div class="psteps">
            <div class="proStepsLeft">
              <pre> </pre>
            </div>
            <div class="proStepsCenter">
              <img src="../../../assets/img/endspot.png" alt="" class="lasterSpot">
            </div>
            <div class="proStepsRight">
              <pre> </pre>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="applyTerm">
      <div class="pro_title">申请条件</div>
      <div class="pro_content">
        <p>①有合法经营资格,经营活动均符合所在国家 (地区) 相关法律﹑法规的规定,且经营状况良好;</p>
        <p>②须有固定的营业场所,商户实际经营内容与营业执照上核定的经营范围相符,经营业务需要在公司代收业务范围内;</p>
        <p>③商户注册资本应不低于人名币500万元 (含),并持续经营2年 (含) 以上;</p>
        <p>④商户营业执照﹑开户许可证﹑法定代表人 (负责人) 身份证等相关证照齐全﹑真是﹑有效,且具备行业经营资质;</p>
      </div>
    </div>
    <!--<div class="protocols">-->
      <!--<div class="pro_title">相关协议 <span class="protoMark"> 点击相依可查看详细内容并下载协议的电子文档</span></div>-->
      <!--<div class="pro_content">-->
        <!--<p @click="protoFiles = true">《智企银通产品服务协议》</p>-->
      <!--</div>-->
    <!--</div>-->
    <!-- 协议 1-->
    <!--<el-dialog-->
      <!--title="智企银通产品服务协议"-->
      <!--:visible.sync="protoFiles"-->
      <!--width="50%"-->
      <!--center>-->
      <!--<prot></prot>-->
      <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="protoFiles = false" class="cancelBtn">关闭</el-button>-->
    <!--<el-button type="primary"  class="btnAstyle">-->
      <!--<a href="../../../assets/files/智企银通产品服务协议.docx" download="智企银通产品服务协议.docx">下载协议</a>-->
    <!--</el-button>-->
  <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>
<script>
  import prot from '../../lib/serviceAgreement.vue'
  export default{
    name: "yifu",
    data(){
      return {
        protoFiles: false,
      }
    },
    methods: {


    },
    components: {
      prot,
    }
  }
</script>
<style scoped>

  .proIntr, .pro_title, .pro_content {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    color: #333333;
  }

  .pro_title {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
  }

  .pro_content {
    padding-left: 15px;
    margin-top: 20px;
    margin-bottom: 32px;
    line-height: 25px;
    font-size: 15px;

  }

  .applyTerm .pro_content {

    font-size: 13px !important;
  }

  .protoMark {
    color: #999999;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .protocols .pro_content p {
    color: #0067b8;
    font-size: 15px;
    cursor: pointer;
  }

  .proGuide .pro_content {
    height: 400px;
  }

  /* 步骤  */

  .psteps {
    position: relative;
    width: 100%;
    height: 25%;
    box-sizing: border-box;
  }

  .proStepsLeft, .proStepsCenter, .proStepsRight, .proApplySteps {
    position: relative;
    height: 100%;
    display: inline-block;
    box-sizing: border-box;
  }

  .proApplySteps {
    width: 100%;
  }

  .proStepsLeft, .proStepsCenter, .proStepsRight {
    float: left;
  }

  .proStepsLeft {
    width: 92px;
  }

  .proStepsCenter {
    width: 18px;
    overflow-y: hidden;
  }

  .proStepsRight {
    position: relative;
    width: 60%;
    padding-left: 30px;
  }

  .proStepsLine {
    width: 1px;
    background: #e4e4e4;
    position: relative;
    height: 100%;
    margin: 0 auto;
  }

  .proStepsCenter img {
    position: absolute;
    top: 9px;
    left: 50%;
    margin-left: -5px;
  }

  .proStepsMark, .proStepsText {
    position: relative;
    width: 100%;
  }

  .proStepsText {
    font-size: 16px;

  }

  .proStepsMark {
    font-size: 14px;
    color: #999999;
  }

  .lasterSpot {
    top: 0px !important;
    margin-left: -8px !important;
  }

  .firstLine {
    margin-top: 8px !important;
  }

  .cancelBtn {
    background: #f1f1f1;
    color: #333333;
    border: none;
    width: 98px;
  }
  .btnAstyle a{
    color: white !important;
  }

</style>
