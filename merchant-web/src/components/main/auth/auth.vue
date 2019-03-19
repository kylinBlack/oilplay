<template>
  <div class="authent">
    <el-row class="pcontent">
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="22" :sm="22" :md="16" :lg="16" :xl="16">
        <div class="authmain">
          <div class="step">
            <steps ref="stepsfn"></steps>
          </div>

          <el-form ref="authform" :model="authform" :rules="authformRules" label-width="107px">
            <!-- 企业信息 -->
            <div class="CoInfo">
              <div class="subtitle">
                <div class="verLine"></div>
                <div class="subtitle_topText">企业基本信息</div>
              </div>
              <div class="cont">
                <div class="contBox">
                  <el-form-item label="企业名称" prop="merchantName">
                    <el-input v-model="authform.merchantName" :maxlength="64" placeholder="请输入与营业执照一致的企业名称"></el-input>
                  </el-form-item>
                  <el-form-item label="简称" prop="merchantShortName">
                    <el-input v-model="authform.merchantShortName" :maxlength="20" placeholder="请输入企业简称"></el-input>
                  </el-form-item>

                  <el-form-item label="公司地址" class="address" required>
                    <el-col :span="7">
                      <el-form-item prop="provinceName">
                        <el-select v-model="authform.provinceName" placeholder="省份" @input="changeProvince">
                          <el-option v-for="item in provinceData" :label="item.provinceName" :value="item.provinceName"
                                     :key="item.provinceCode"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <pre> </pre>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item prop="cityName">
                        <el-select v-model="authform.cityName " placeholder="城市" @input="changeCity">
                          <el-option v-for="item in cityData" :label="item.cityName" :value="item.cityName"
                                     :key="item.cityCode"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <pre> </pre>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item prop="areaName">
                        <el-select v-model="authform.areaName " placeholder="区县">
                          <el-option v-for="item in countyData" :label="item.areaName" :value="item.areaName"
                                     :key="item.areaCode"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="" prop="detailAddress">
                    <el-input v-model="authform.detailAddress" placeholder="请填写详细地址"></el-input>
                  </el-form-item>
                  <el-form-item label="官网地址" prop="website">
                    <el-input v-model="authform.website" placeholder="请输入官网地址,无则可不填"></el-input>
                  </el-form-item>
                  <el-form-item label="客服电话" prop="servicePhone">
                    <el-input v-model="authform.servicePhone" placeholder="请输入客服电话"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人"  prop="leaderName">
                    <el-input v-model="authform.leaderName" :maxlength="10" placeholder="请输入主要联系人"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="leaderMobile">
                    <el-input v-model="authform.leaderMobile" placeholder="请输入主要联系人手机号码" :maxlength="11"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>

            <!-- 法人信息 -->
            <div class="legalPerson">
              <div class="subtitle">
                <div class="verLine"></div>
                <div class="subtitle_topText">法人代表人信息</div>
              </div>
              <div class="cont">
                <div class="contBox">
                  <el-form-item label="法人名称" prop="legalpersonName">
                    <el-input v-model="authform.legalpersonName" placeholder="请输入与营业执照上的法定代表人名称"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" prop="legalpersonCertNo">
                    <el-input v-model="authform.legalpersonCertNo" :maxlength='18' placeholder="请输入法定代表人的身份证"></el-input>
                  </el-form-item>
                </div>
                <el-col :span="12">
                  <div  class="lLable">
                    <span class="eLabel">身份证正面</span>
                  </div>
                  <div class="rCont">
                    <el-form-item label="" class="ei_upImg" prop="legalpCertFrontImg">
                    <el-upload
                    action=""
                    ref='legalpCertFrontImg'
                    list-type="picture-card"
                    accept="image/jpeg,image/png"
                    title="上传图片"
                    class="legalpCertFrontImg"
                    :on-preview="handlePictureCardPreview"
                    :limit="1"
                    :before-upload="beforUpImg"
                    :http-request="uploadFZ">
                    <i class="el-icon-plus"></i>
                      <img :src="legalpCertFrontImgSrc" alt="" class="imgData">
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" >
                    </el-dialog>
                    <el-popover
                    placement="top-start"
                    title="身份证正面示例"
                    width="310"
                    trigger="hover">
                    <img src="../../../assets/img/shenfenzhengz.png" alt="">
                    <el-button slot="reference">查看示例</el-button>
                    </el-popover>

                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">

                  <div  class="lLable">
                    <span class="eLabel">身份证反面</span>
                  </div>
                  <div class="rCont">
                    <el-form-item label="" class="ei_upImg" prop="legalpCertBackImg">
                      <el-upload
                        action=""
                        ref='legalpCertBackImg'
                        list-type="picture-card"
                        accept="image/jpeg,image/png"
                        title="上传图片"
                        class="legalpCertBackImg"
                        :on-preview="handlePictureCardPreview"
                        :limit="1"
                        :before-upload="beforUpImg"
                        :http-request="uploadFF">
                        <i class="el-icon-plus"></i>
                        <img :src="legalpCertBackImgSrc" alt="" class="imgData">
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                      <el-popover
                        placement="top-start"
                        title="身份证反面示例"
                        width="310"
                        trigger="hover">
                        <img src="../../../assets/img/shenfenzhengf.png" alt="">
                        <el-button slot="reference">查看示例</el-button>
                      </el-popover>
                    </el-form-item>

                  </div>

                </el-col>
                <p class="mark">注意:请上传彩色印件或清晰的彩色照片,支持jpg, jpeg, png格式, 大小不超过2M</p>
              </div>
            </div>

            <!-- 企业证件信息 -->
            <div class="legalPersonCert">
              <div class="subtitle">
                <div class="verLine"></div>
                <div class="subtitle_topText">企业证件信息</div>
                <p class="legalmark"> 请上传在有效期内的营业执照, 开户许可证彩印件信息等 </p>

              </div>
              <div class="cont">
                <div class="contBox">
                  <el-form-item label="营业执照编号" prop="licenceNo">
                    <el-input v-model="authform.licenceNo" placeholder="请输入与营业执照编号"></el-input>
                  </el-form-item>
                </div>
                <el-col :span="12">
                  <div  class="lLable">
                    <span class="eLabel">营业执照</span>
                  </div>
                  <div class="rCont">
                    <el-form-item label="" class="ei_upImg" prop="licenceImg">
                    <el-upload
                      action=""
                      ref='licenceImg'
                      list-type="picture-card"
                      accept="image/jpeg,image/png"
                      title="上传图片"
                      class="licenceImg"
                      :on-preview="handlePictureCardPreview"
                      :limit="1"
                      :before-upload="beforUpImg"
                      :http-request="uploadY">
                      <i class="el-icon-plus"></i>
                      <img :src="licenceImgSrc" alt="" class="imgData">
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <el-popover
                      placement="top-start"
                      title="营业执照示例"
                      width="310"
                      trigger="hover">
                      <img src="../../../assets/img/yinye.png" alt="">
                      <el-button slot="reference">查看示例</el-button>
                    </el-popover>
                    </el-form-item>

                  </div>

                </el-col>
                <el-col :span="12">
                  <div  class="lLable">
                    <span class="eLabel">开户许可证</span>
                  </div>
                  <div class="rCont">
                    <el-form-item label="" class="ei_upImg" prop="merAgreementImg">
                      <el-upload
                        action=""
                        ref='merAgreementImg'
                        list-type="picture-card"
                        accept="image/jpeg,image/png"
                        title="上传图片"
                        class="merAgreementImg"
                        :on-preview="handlePictureCardPreview"
                        :limit="1"
                        :before-upload="beforUpImg"
                        :http-request="uploadK">
                        <i class="el-icon-plus"></i>
                        <img :src="merAgreementImgSrc" alt="" class="imgData">
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                      <el-popover
                        placement="top-start"
                        title="开户许可证示例"
                        width="310"
                        trigger="hover">
                        <img src="../../../assets/img/kaihuxuke.png" alt="">
                        <el-button slot="reference">查看示例</el-button>
                      </el-popover>
                    </el-form-item>

                  </div>

                </el-col>
              </div>
            </div>
            <div class="authbtn">
              <el-button type="primary" @click="nextPage" >下一步</el-button>
            </div>

          </el-form>
        </div>

      </el-col>
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import steps from '../../lib/copSteps.vue'
  var qs = require('querystring');
  export default{
    name: "auth",
    data(){
      var mReg = /(^([0-9]{3,4}-)?[0-9]{7,8}$)/;
      var pReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
      var valifMobile = (rule, value, callback) => {
        if (!mReg.test(value) && !pReg.test(value)) {
          callback(new Error('电话格式不正确'));
        } else {
          callback();
        }
      };

      return {
        stepsIndex: 2,
        dialogImageUrl: '',
        dialogVisible: false,
        isFirstEnter: true,
        cityData: '',
        provinceData: '',
        countyData: '',
        agentNo: '',
        paramImg: '',
        legalpCertFrontImgSrc:'',
        legalpCertBackImgSrc:'',
        licenceImgSrc:'',
        merAgreementImgSrc:'',
        authform: {
          merchantName: '',
          merchantShortName: '',
          provinceName: '',
          cityName: '',
          areaName: '',
          detailAddress: '',
          website: '',
          servicePhone: '',
          leaderName : '',
          leaderMobile: '',
          legalpersonName: '',
          legalpersonCertNo: '',
          legalpCertFrontImg: '',
          legalpCertBackImg: '',
          licenceImg: '',
          merAgreementImg: '',
          licenceNo: '',
          bankAcctName:''
        },
        authformRules: {
          merchantName: [
            {required: true, message: "请输入企业名称", trigger: 'blur'},
          ],
          merchantShortName: [
            {required: true, message: "请输入公司简称", trigger: 'blur'},
          ],
          provinceName: [
            {required: true, message: "请选择省份", trigger: 'blur'},
          ],
          cityName: [
            {required: true, message: "请选择城市", trigger: 'blur'},
          ],
          areaName: [
            {required: true, message: "请选择区县", trigger: 'blur'},
          ],
          leaderName: [
            {required: true, message: "请输入联系人", trigger: 'blur'},
          ],
          servicePhone: [
            {required: true, message: "请输入客服电话", trigger: 'blur'},
            {validator: valifMobile, trigger: 'blur'},
          ],
          leaderMobile: [
            {required: true, message: "请输入手机号码", trigger: 'blur'},
            {pattern: /^[0-9]/, message: "请输入数字", trigger: 'blur'},
            {pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: "请输入正确的手机号码", trigger: 'blur'},
          ],
          legalpersonName: [
            {required: true, message: "请输入法人名称", trigger: 'blur'},
          ],
          detailAddress: [
            {required: true, message: "请填写详细地址", trigger: 'blur'},
            {max:100,message:'详细地址长度不超过100',trigger: 'blur'},
          ],
          licenceNo: [
            {required: true, message: "请填写营业执照编号", trigger: 'blur'},
            {pattern:/(^[(0-9a-zA-Z)]{15}$)|(^[(0-9a-zA-Z)]{18}$)/,message:'营业执照编号为15位或18位', trigger: 'blur'}
          ],
          legalpersonCertNo: [
            {required: true, message: "请填写身份证号", trigger: 'blur'},
            {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: "身份证格式错误", trigger: 'blur'},
          ],
          website:[
            {max:100,message:'官网地址长度不超过100',trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      changeSteps(data, index){
        this.$refs.stepsfn.changeStepsIndex('', '1')
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      getProvince(){
        var that = this;
        that.$axios.post('/combine/baseData/queryProvinceList').then(function (result) {

          var res = result.data;
          if (res.code == '0000') {
            that.provinceData = res.data;
          }
        }).catch(function (error) {
          console.log("getProvinceError:", error)
        })
      },

      getCity(province){
        var that = this;
        var params = {
          provinceId: province
        }
        that.$axios({
          url: '/combine/baseData/queryCity',
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify(params)
        }).then(function (result) {
          var res = result.data;
          if (res.code == '0000') {
            that.cityData = res.data;
          }
        }).catch(function (error) {
          console.log("getCityError:", error)
        })
      },

      getCountry(city){
        var that = this;
        var params = {
          cityId: city
        };
        that.$axios({
          url: '/combine/baseData/queryArea',
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify(params)
        }).then(function (result) {
          var res = result.data;
          if (res.code == '0000') {
            that.countyData = res.data;
          }
        }).catch(function (error) {
          console.log("getCountryError:", error)
        })
      },

      changeProvince(val){
        let obj = {};
        obj = this.provinceData.find((item) =>{
            return item.provinceName === val;
      });
        this.getCity(obj.id)
      },

      changeCity(val){
        let obj = {};
        obj = this.cityData.find((item) =>{
            return item.cityName === val;
      });

        this.getCountry(obj.id)
      },

      getAgentNo(){
        var that = this;
        that.$axios.post('/merchant/merchantInfo/getAgentNo').then(function (result) {
          var res = result.data;
          if (res.code == '0000') {
            that.agentNo = res.data;
          }else {
            that.$message.error(res.message);
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
        }
        if(!size){
          this.$message.error('上传头像图片大小不能超过2MB');
          return false
        }

      },

      uploadFZ(fileData){
        var that = this;
        that.paramImg.set('file', fileData.file);
        that.uploadImg('legalpCertFrontImg', '05');
      },

      uploadFF(fileData){
        var that = this;
        that.paramImg.set('file', fileData.file);
        that.uploadImg('legalpCertBackImg', '06');
      },

      uploadY(fileData){
        var that = this;
        that.paramImg.set('file', fileData.file);
        that.uploadImg('licenceImg', '01');
      },

      uploadK(fileData){
        var that = this;
        that.paramImg.set('file', fileData.file);
        that.uploadImg('merAgreementImg', '04');
      },

      uploadImg(file, fileNo){
        var that = this;
        var No = that.agentNo;
        that.$axios({
          url: '/combine/upload/merchantImage/' + No + '/' + fileNo,
          method: 'post',
          data: that.paramImg
        }).then(function (result) {
          var res = result.data;
          if (res.code == "0000") {
            switch (file) {
              case 'legalpCertFrontImg':
                that.authform.legalpCertFrontImg = res.data;
                break;
              case 'legalpCertBackImg':
                that.authform.legalpCertBackImg = res.data;
                break;
              case 'licenceImg':
                that.authform.licenceImg = res.data;
                break;
              case 'merAgreementImg':
                that.authform.merAgreementImg = res.data;
                break;
            }
          }
        }).catch(function (error) {
          console.log("uploadImgError:", error);
        })
      },

      nextPage(){
        var that = this;
        this.$refs.authform.validate((valid) => {
          if (valid) {
            if(that.authform.legalpCertFrontImg ==''){
              that.$message.error('请上传身份证正面照片');
              return false;
            }else if(that.authform.legalpCertBackImg ==''){
              that.$message.error('请上传身份证反面照片');
              return false;
            }else if(that.authform.licenceImg ==''){
              that.$message.error('请上传营业执照照片');
              return false;
            }else if(that.authform.merAgreementImg ==''){
              that.$message.error('请上传开户许可证照片');
              return false;
            }else {
              that.authform.bankAcctName = that.authform.merchantName;
              this.$router.push({
                name: 'authNext',
                params: that.authform
              })
            }
          } else {
            console.log('verfiError')
          }
        })

      },

      getAuthInfo(){
        var that = this;
        that.$axios.post('/merchant/merchantInfo/authLastInfoQuery').then(function (result) {
          var res = result.data;
          if(res.code && res.code == '0000'){
            that.authform = res.data;
            that.legalpCertFrontImgSrc = res.data.legalpCertFrontImgPath;
            that.legalpCertBackImgSrc  = res.data.legalpCertBackImgPath;
            that.licenceImgSrc         = res.data.licenceImgPath;
            that.merAgreementImgSrc    = res.data.merAgreementImgPath;

          }
        }).catch(function (error) {
          console.log("error:",error)
        })
      },

      loadingInfo(){
        var that = this;
        that.getProvince();    // 获取省份
        that.getAgentNo();     //获取代理商号
        that.paramImg = new FormData();
        that.$emit('changewindowSize', '','实名认证');
        var t = window.localStorage.getItem('userinfo');
        t = JSON.parse(t);

        if(t && t.auditStatus == 3){
            that.getAuthInfo();
        }
      }

    },

    components: {
      steps
    },

    activated(){
      var that = this;
      var f = window.localStorage.getItem('isBackHomePage');

      if(f == 0){
        if(!that.isFirstEnter){
          that.paramImg = '';
          that.loadingInfo();
          that.$refs.authform.resetFields();
          that.$refs.legalpCertFrontImg.clearFiles();
          that.$refs.legalpCertBackImg.clearFiles();
          that.$refs.merAgreementImg.clearFiles();
          that.$refs.licenceImg.clearFiles();
        }
      }
      that.isFirstEnter = false
    },

    created(){
      this.loadingInfo();
    }
  }
</script>
<style scoped>
.step {
  position: relative;
  width: 90%;
  margin: 0 auto;
  height: 120px;
  padding-top: 26px;
  box-sizing: border-box;
}

.authmain {
  position: relative;
  width: 88%;
  margin: 0 auto;
}

.CoInfo,
.CoInfo_top {
  position: relative;
  width: 100%;
}

.CoInfo,
.legalPerson,
.legalPersonCert {
  margin-top: 50px;
}

.subtitle {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 40px;
}

.verLine {
  width: 2.5px;
  height: 14px;
  background: #333333;
  margin-top: 8px;
}

.subtitle_topText {
  color: #333333;
  font-size: 16px;
  padding-left: 10px;
  font-weight: bold;
}

.verLine,
.subtitle_topText,
.legalmark {
  float: left;
  vertical-align: middle;
}

.cont {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.address {
  margin-bottom: 0;
}

.contBox {
  position: relative;
  width: 65%;
}

.ei_upImg {
  width: 100%;
  padding-right: 19px;
}

.ei_upImg .uploadImg {
  width: 140px;
  height: 140px;
  border: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ei_upImg button {
  width: 100px;
  height: 40px;
  margin-top: 20px;
}

.textbtn {
  color: #333333;
}

.textbtn:hover {
  color: #409eff;
}

.mark {
  font-size: 14px;
}

.mark,
.legalmark {
  color: #a7a7a7;

  letter-spacing: 1px;
}

.legalmark {
  font-size: 12px;
  display: inline-block;
  padding-left: 28px;
}

.authbtn {
  position: relative;
  width: 100%;
  text-align: center;
  display: inline-block;
  padding-top: 72px;
  padding-bottom: 70px;
}
.relabel_ {
  text-align: right;
}
.eLabel {
  font-size: 14px;
  color: #606266;
}
.eLabel:before {
  content: "*";
  color: red;
  font-size: 12px;
  margin-right: 5px;
}
.lLable,
.rCont {
  float: left;
}

.lLable {
  width: 107px;
  padding-right: 12px;
  box-sizing: border-box;
  text-align: right;
}
.imgData {
  position: absolute;
  left: 0;
  top: 0;
  width: 148px;
  height: 148px;
}
</style>
