<template>
  <div class="yishouApply">
    <div class="bcrumb ">
      <el-row class="pcontent">
        <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
          <pre> </pre>
        </el-col>
        <el-col :xs="23" :sm="23" :md="20" :lg="20" :xl="20" class="yishouATop">
          <span class="bLabel">您当前的位置:</span>
          <div class="bCont">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbCont">
              <el-breadcrumb-item :to="{ path: '/productAsk' }">产品申请</el-breadcrumb-item>
              <el-breadcrumb-item>{{productName}}申请</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="yishouA_cont">
      <el-row class="pcontent">
        <el-col :xs="1" :sm="1" :md="3" :lg="3" :xl="4">
          <pre> </pre>
        </el-col>
        <el-col :xs="22" :sm="22" :md="18" :lg="18" :xl="16" class="yishouATop">

          <p class="yishouaTitle">
            <img src="../../../assets/img/tips.png" alt="">
            <span>您正在申请开通智企银通产品服务，请按照要求如实提交资料，以便完成审核</span>
          </p>
          <div class="yishouaMail">
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
              <pre> </pre>
            </el-col>
            <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
              <el-form ref="yifuaform" :model="yifuaform" label-width="100px" class="yifuaform">
                <el-form-item label="产品名称">
                  <div class="product_name">{{productName}}</div>
                </el-form-item>
                <el-form-item label="公司门头照" required class="imgStyle">
                  <div class="product_name p_mark">请上传1张公司或经营场地的门头照</div>
                  <el-upload
                    action=""
                    ref='companyImg'
                    list-type="picture-card"
                    accept="image/jpeg,image/png"
                    title="上传图片"
                    class="companyImg"
                    :on-preview="handlePictureCardPreview"
                    :limit="1"
                    :before-upload="beforUpImg"
                    :http-request="coDoorPoto">
                    <i class="el-icon-plus"></i>
                    <p class="imgUpBtn">
                      <el-button type="primary">上传照片</el-button>
                    </p>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" >
                  </el-dialog>
                  <p class="p_mark">要求：清晰的彩色照片，支持jpg，jpeg,png格式，大小不超过2M</p>
                </el-form-item>

                <el-form-item label="经营环境" required class="imgStyle">
                  <div class="product_name p_mark">请上传3张公司或经营场地的照片，要求必须反映真实的办公环境</div>
                  <ul class="uploadGroud">
                    <li>
                      <el-upload
                        action=""
                        ref='companyImg'
                        list-type="picture-card"
                        accept="image/jpeg,image/png"
                        title="上传图片"
                        class="companyImg"
                        :on-preview="handlePictureCardPreview"
                        :limit="1"
                        :before-upload="beforUpImg"
                        :http-request="coEnvironmentPhoto1">
                        <i class="el-icon-plus"></i>
                        <p class="imgUpBtn btnBlock">
                          <el-button type="primary">上传照片</el-button>
                        </p>
                      </el-upload>

                    </li>
                    <li>
                      <el-upload
                        action=""
                        ref='companyImg'
                        list-type="picture-card"
                        accept="image/jpeg,image/png"
                        title="上传图片"
                        class="companyImg"
                        :on-preview="handlePictureCardPreview"
                        :limit="1"
                        :before-upload="beforUpImg"
                        :http-request="coEnvironmentPhoto2">
                        <i class="el-icon-plus"></i>
                        <p class="imgUpBtn btnBlock">
                          <el-button type="primary">上传照片</el-button>
                        </p>
                      </el-upload>

                    </li>
                    <li>
                      <el-upload
                        action=""
                        ref='companyImg'

                        list-type="picture-card"
                        accept="image/jpeg,image/png"
                        title="上传图片"
                        class="companyImg"
                        :on-preview="handlePictureCardPreview"
                        :limit="1"
                        :before-upload="beforUpImg"
                        :http-request="coEnvironmentPhoto3">
                        <i class="el-icon-plus"></i>
                        <p class="imgUpBtn btnBlock">
                          <el-button type="primary">上传照片</el-button>
                        </p>

                      </el-upload>

                    </li>
                  </ul>
                  <p class="p_mark lastmark" >要求：清晰的彩色照片，支持jpg，jpeg,png格式，大小不超过2M</p>
                </el-form-item>
                <!--<el-form-item label="" required>-->
                  <!--<p class="xieyi">-->
                    <!--<el-checkbox label="勾选即代表您阅读并同意" name="type" v-model="isAgree"></el-checkbox>-->
                    <!--<span class="protoText" @click="protols = true">《智企银通产品服务协议》</span>-->
                  <!--</p>-->

                <!--</el-form-item>-->
                <el-form-item label="" class="applyOPen">
                  <el-button type="primary" @click="applyOpen" :disabled="isClickBtn" :class="{ableStyle:isAble}">立即开通</el-button>
                </el-form-item>

              </el-form>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="1" :sm="1" :md="3" :lg="3" :xl="4">
          <pre> </pre>
        </el-col>
      </el-row>
    </div>
    <!-- 协议 -->
    <!--<el-dialog-->
      <!--title="智企银通产品服务协议1"-->
      <!--:visible.sync="protols"-->
      <!--width="50%"-->
      <!--center>-->
      <!--<agree></agree>-->
      <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="protols = false" class="cancelBtn">关闭</el-button>-->
    <!--<el-button type="primary" @click="agreement" class="btnAstyle">-->
      <!--<a href="../../../assets/files/智企银通产品服务协议.docx" download="智企银通产品服务协议.docx">下载协议</a>-->
    <!--</el-button>-->
  <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>
<script>
  import agree from '../../lib/serviceAgreement.vue'
  export default{
    name: "prodictsApply",
    data(){
      return {
        protols: false,
        dialogVisible: false,
        agentNo: '',
        dialogImageUrl: '',
        paramsFiles: '',
        productName: '易付',

//        isAgree:true,
        isClickBtn:true,
        isAble:true,
        yifuaform: {
          productType: '',
          companyHeadImg: '',
          companyWorkplaceImg1: '',
          companyWorkplaceImg2: '',
          companyWorkplaceImg3: '',
        }
      }
    },
    methods: {
      handlePictureCardPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },



      getAgentNo(){
        var that = this;
        that.$axios.post('/merchant/merchantInfo/getAgentNo').then(function (result) {

          var res = result.data;
          if (res.code == '0000') {
            that.agentNo = res.data;
          } else if (res.code == '1100') {

          }
        }).catch(function (error) {
          console.log("getProvinceError:", error)
        })
      },

      beforUpImg(file){
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const size  = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error('请上传jpeg,jpg,png格式的图片');
          return false
        };
        if(!size){
          this.$message.error('上传头像图片大小不能超过2MB');
          return false
        }
      },

      coDoorPoto(data){
        this.paramsFiles.set('file', data.file);
        this.upComImg('companyHeadImg');

      },

      coEnvironmentPhoto1(data){
        this.paramsFiles.set('file', data.file);
        this.upComImg('companyWorkplaceImg1')
      },

      coEnvironmentPhoto2(data){
        this.paramsFiles.set('file', data.file);
        this.upComImg('companyWorkplaceImg2')
      },

      coEnvironmentPhoto3(data){
        this.paramsFiles.set('file', data.file);
        this.upComImg('companyWorkplaceImg3')
      },

      upComImg(file){
        var that = this;
        var No = that.agentNo;

        that.$axios({
          url: '/combine/upload/merchantImage/'+ No + '/100',
          method: 'post',
          data: that.paramsFiles
        }).then(function (result) {
          var res = result.data;
          if (res.code == "0000") {
            switch (file) {
              case 'companyHeadImg':
                that.yifuaform.companyHeadImg = res.data;
                break;
              case 'companyWorkplaceImg1':
                that.yifuaform.companyWorkplaceImg1 = res.data;
                break;
              case 'companyWorkplaceImg2':
                that.yifuaform.companyWorkplaceImg2 = res.data;
                break;
              case 'companyWorkplaceImg3':
                that.yifuaform.companyWorkplaceImg3 = res.data;
                break;
            };
            that.$message({
              message:'图片上传成功',
              type:'success'
            })
            that.isClickFn();
          }else {
            that.$message({
              message:'图片上传失败',
              type:'error'
            })
          }
        }).catch(function (error) {
          console.log("uploadImgError:", error);
        })
      },


      agreement(){

        this.protols = false
      },
      applyOpen(){
        var that = this;
        if(that.yifuaform.companyHeadImg == ''){
          that.$message.error('请上传公司门头照');
          return false
        }else if(that.yifuaform.companyWorkplaceImg1 == '' || that.yifuaform.companyWorkplaceImg2 == '' || that.yifuaform.companyWorkplaceImg3 == ''){
          that.$message.error('至少上传三张公司经营环境照片');
          return false
        }
        that.isClickBtn = true;
        that.$axios({
          url: '/merchant/mpProductApply/createProductApply',
          method: 'post',
          headers: {
            'Content-Type': "application/json"
          },
          data: that.yifuaform
        }).then(function (result) {

          var res = result.data;
          if(res.code == '0000'){
            that.$router.push('/pApplySuc')
          }else if(res.code == '1100'){
            that.$message.error(res.message)
          }else {
            that.$router.push('/pApplyFail')
          }
        }).catch(function (error) {
          console.log("applyOpenerror:", error);
        });
        setTimeout(function () {
          that.isClickBtn = false;
        },800)
      },

      isClickFn(){
        var headImg  = this.yifuaform.companyHeadImg;
        var workImg1 = this.yifuaform.companyWorkplaceImg1;
        var workImg2 = this.yifuaform.companyWorkplaceImg2;
        var workImg3 = this.yifuaform.companyWorkplaceImg3;
        if(headImg !=='' && workImg1 !=='' && workImg2 !=='' && workImg3 !==''){
          this.isClickBtn = false;
          this.isAble     = false;
        }else {
          this.isClickBtn = true;
          this.isAble     = true;
        }
      },


    },
    created(){
      this.productName = this.$route.params.name;
      this.yifuaform.productType = this.$route.params.productType;
      this.getAgentNo();
      this.paramsFiles = new FormData();

    },
    components: {
      agree,
    },

  }
</script>
<style scoped>
.yishouApply {
  position: relative;
  height: 100%;
}

.bcrumb,
.yishouaTitle,
.yishouaMail,
.product_name,
.uploadGroud {
  position: relative;
  width: 100%;
}

.clear {
  clear: both;
}

.bcrumb {
  background: #0066b8;
  height: 40px;
  line-height: 40px;
}

.yishouATop {
  padding-left: 20px;
  box-sizing: border-box;
}

.bLabel,
.bCont {
  float: left;
  color: white;
  vertical-align: middle;
  position: relative;
  height: 100%;
  display: inline-block;
}

.crumbCont {
  position: relative;
  height: 100%;
  line-height: 40px;
}

.bLabel {
  padding-right: 15px;
}

/* 内容 */

.yishouaTitle {
  height: 40px;
  line-height: 40px;
  padding-left: 8px;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;
  margin-top: 12px;
}

.yishouaTitle span {
  font-size: 14px;
  color: #333333;
}

.yishouaMail {
  margin-bottom: 50px;
  display: inline-block;
}

.product_name {
  height: 100%;
}

.p_mark {
  color: #999999;
}

.imgUpBtn {
  margin-bottom: 15px;
}

.uploadGroud {
  display: inline-block;
}

.uploadGroud li {
  position: relative;
  float: left;
  width: 33%;
}

.protoText {
  color: #056ab9;
  cursor: pointer;
}

.yifuaform {
  margin-top: 20px;
}

.applyOPen {
  padding-top: 75px;
}
.imgStyle {
  height: 283px;
}
.btnAstyle a {
  color: white !important;
}
.ableStyle {
  opacity: 0.8;
}
.lastmark {
  position: relative;
  top: -18px;
}
</style>
