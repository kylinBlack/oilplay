<template>
  <div class="authent">
    <el-row ref="comp">
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="22" :sm="22" :md="16" :lg="16" :xl="16">
        <div class="authmain">
          <div class="step">
            <steps ref="stepsfn"></steps>
          </div>

          <el-form ref="authNextform" :model="authNextform" :rules="authNextformRules" label-width="108px">
            <!-- 企业信息 -->
            <div class="CoInfo">
              <div class="subtitle">
                <div class="verLine"></div>
                <div class="subtitle_topText">银行账户信息</div>
              </div>
              <p class="bankMark">本账户将用于银行结算, 请填写与企业主体一致的银行账户信息,只支持对公账户.请认真填写并核对,提交成功后将不能通过线上修改</p>
              <div class="cont">
                <div class="contBox">
                  <el-form-item label="银行开户名" prop="accountName">
                    <div :title="bankAcctName" class="accountName">{{bankAcctName}}</div>
                  </el-form-item>
                  <el-form-item label="银行账号" prop="bankAcctNo">
                    <el-input v-model="authNextform.bankAcctNo" placeholder="请输入对公银行账号"></el-input>
                  </el-form-item>
                  <el-form-item label="银行名称" prop="bankCode">
                    <el-select v-model="authNextform.bankCode" placeholder="请选择银行名称" @input="changeBank">
                      <el-option v-for="item in bankData" :label="item.bankName" :value="item.bankCode"
                                 :key="item.bankCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="开户地区" class="address" required>
                    <el-col :span="11">
                      <el-form-item label="" prop="province">
                        <el-select v-model="authNextform.province" placeholder="省份" @input="changeProvince">
                          <el-option v-for="item in provinceData" :label="item.provinceName" :value="item.provinceCode"
                                     :key="item.id"></el-option>

                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <pre> </pre>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item label="" prop="city">
                        <el-select v-model="authNextform.city" placeholder="城市" @input="changeCity">
                          <el-option v-for="item in cityData" :label="item.cityName" :value="item.cityCode"
                                     :key="item.cityCode"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="开户支行名称" prop="subBankName">
                    <el-input :readonly="true" suffix-icon="el-icon-search" v-model="authNextform.subBankName"
                              @focus="openSubBankBox" placeholder="点击搜索支行名称"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="authbtn">
              <p>
                <el-button type="primary" @click="submintAuth" :disabled="isSubmit">提交认证</el-button>
              </p>
              <p>
                <el-button type="text" @click="prePage"> << 返回上一步</el-button>
              </p>
            </div>

          </el-form>
        </div>

      </el-col>
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>
    <el-dialog
      title="选择银行开户支行"
      :visible.sync="seeBranch"
      width="500px">
      <div class="branchBox">
        <div class="banchcont">
          <div>
            <el-form :inline="true" :model="branchForm" class="demo-form-inline">
              <el-row>
                <el-col :span="15">
                  <el-form-item label="">
                    <el-input v-model="branchForm.searchText" class="searchBox" placeholder="请输入关键字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" class="dlabel">
                  <el-form-item>
                    <p class="aBtn">
                      <el-button type="primary" class="searchBtn" size="small" @click="queryBranch">查询</el-button>
                      <el-button class="searchBtn" size="small" @click="searchSave">确定</el-button>

                    </p>
                   </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <p class="seachMark">以下为查询结果, 如支行未在名单内, 请联系客服 400-8775-800</p>
          <div>
            <el-radio-group v-model="subBankName" @change="changeSubBankName">
                <p class="banchRadio"  v-for="item in branchListData" :key="item.paysysBankCode">
                  <el-radio :label="item.bankName" :key="item.paysysBankCode"></el-radio>
                </p>
            </el-radio-group>
            <div class="noData" v-show="isHaveData">无查询结果</div>
          </div>
        </div>
        <div class="branchLine"></div>
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :pager-count="5"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="pageCont">
          </el-pagination>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>

  </div>
</template>
<script>
  import steps from '../../lib/copSteps.vue'
  var qs = require('querystring');
  export default{
    name: "authNext",
    data(){
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        subBankName: '',
        seeBranch: false,
        isSubmit: false,
        isFirstEnter: true,
        isHaveData: true,
        bankData: '',
        branchNames: '',
        provinceData: '',
        cityData: '',
        currentPage: 1,
        pageCont:10,
        branchListData: [],
        bankAcctName: '',
        paramsData:'',
        isAuth:'',
        authNextform: {
          accountName: '',
          bankAcctNo: '',
          bankName: '',
          bankCode: '',
          province: '',
          city: '',
          county: '',
          subBankName: '',
          subBankCode:''
        },
        branchForm: {
          searchText: ''
        },
        authNextformRules: {
          bankAcctNo: [
            {required: true, message: "请输入银行账号", trigger: 'blur'},
            {min: 9, max: 21, message: "请输入9-21位数字", trigger: 'blur'},
            {pattern:/^[0-9]+$/, message: "请输入数字",trigger: 'blur'},
          ],
          bankCode: [
            {required: true, message: "请输入银行名称", trigger: 'blur'},
          ],
          province: [
            {required: true, message: "请选择省份", trigger: 'blur'},
          ],
          city: [
            {required: true, message: "请选择城市", trigger: 'blur'},
          ],
          subBankName: [
            {required: true, message: "请选择开户支行", trigger: 'change'},
          ],
        }
      }
    },
    methods: {
      changeSteps(){
        this.$refs.stepsfn.changeStepsIndex('', '1')
      },

      prePage(){
        this.$router.push('/auth')
      },

      getBank(){
        var that = this;
        that.$axios.post('/combine/baseData/queryBankList').then(function (result) {
          var res = result.data;
          if (res.code == '0000') {
            that.bankData = res.data;
            if(that.isAuth == 3){
              that.getLastAuthInfo('bank',that.authNextform.bankName)
            }
          }

        }).catch(function (error) {
          console.log("getBackError:", error)
        })
      },

      changeBank(val){
        let obj = {};
        obj = this.bankData.find((item)=> {
          return item.bankCode === val;
        });

        this.authNextform.bankName = obj.bankName;
        this.authNextform.subBankName = '';

        this.getBranch();
      },

      getProvince(){
        var that = this;
        that.$axios.post('/combine/baseData/queryProvinceList').then(function (result) {
          var res = result.data;
          if (res.code == '0000') {
            that.provinceData = res.data;
            if(that.isAuth == 3){
              that.getLastAuthInfo('province', that.authNextform.bankProvinceName);

            }
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
            if(that.isAuth == 3){
              that.getLastAuthInfo('city',that.authNextform.bankCityName)
            }
          }else {
            that.$message.error(res.message);
          }
        }).catch(function (error) {
          console.log("getCityError:", error)
        })
      },

      changeProvince(val){
        let obj = {};
        obj = this.provinceData.find((item)=> {
          return item.provinceCode === val;
        });

        this.getCity(obj.id);
        this.authNextform.subBankName = ''
        this.getBranch();
      },

      changeCity(val){

        this.getBranch();
        this.authNextform.subBankName = ''
      },

      openSubBankBox(){
        if(this.authNextform.bankCode == ''){
          this.$message.error('请选择银行名称');
          return false
        }
        this.seeBranch = true;
        this.authNextform.subBankName = '';
        this.getBranch();
      },

      getBranch(){
        var that = this;
        var params = {
          bankCode: that.authNextform.bankCode,
          provinceCode: that.authNextform.province,
          cityCode: that.authNextform.city,
          subBankName: that.branchForm.searchText,
          pageBean: {
            pageNo: that.currentPage,
            pageSize: 10
          },
        }
        that.$axios({
          url: '/combine/baseData/querySubBankPage',
          method: 'post',
          headers: {
            'Content-Type': "application/json"
          },
          data: params
        }).then(function (result) {
          var res = result.data;
          if (res.code == '0000') {
            that.branchListData = res.data.dataList;
            that.pageCont = res.data.pageBean.totalCount;
            if(that.branchListData == ''){
              that.isHaveData = true;
            }else {
              that.isHaveData = false;
            }
            if(that.isAuth == 3){
              that.getLastAuthInfo('subBank',that.authNextform.subBankName)
            }
          }else {
            that.isHaveData = true
          }
        }).catch(function (error) {

        })
      },

      submintAuth(){
        var that = this;
        this.$refs.authNextform.validate((valid) => {
          if (valid) {
            if(that.isAuth == 3){
              var MerchantAuthReq     = that.authNextform;
//              MerchantAuthReq.subBankCode = that.authNextform.bankCode;
              delete MerchantAuthReq.legalpCertBackImgPath;
              delete MerchantAuthReq.legalpCertFrontImgPath;
              delete MerchantAuthReq.merAgreementImgPath;
              delete MerchantAuthReq.licenceImgPath;
              delete MerchantAuthReq.registerTime;
              delete MerchantAuthReq.status;
              delete MerchantAuthReq.headImg;
              delete MerchantAuthReq.province;
              delete MerchantAuthReq.userName;
              delete MerchantAuthReq.city;
              delete MerchantAuthReq.address;
              delete MerchantAuthReq.merchantNo;

            }else {
              var MerchantAuthReq               = that.paramsData;
              MerchantAuthReq.bankAcctNo        = that.authNextform.bankAcctNo;
              MerchantAuthReq.bankName          = that.authNextform.bankName;
              MerchantAuthReq.bankProvinceCode  = that.authNextform.province;
              MerchantAuthReq.bankCityCode      = that.authNextform.city;
              MerchantAuthReq.bankCode          = that.authNextform.bankCode;
              MerchantAuthReq.subBankName       = that.authNextform.subBankName;
              MerchantAuthReq.subBankCode       = that.authNextform.subBankCode ;
            }
            that.isSubmit = true;
            that.$axios({
              url:'/merchant/merchantInfo/auth',
              method:'post',
              headers: {
                'Content-Type': "application/json;charset=UTF-8"
              },
              data:MerchantAuthReq
            }).then(function (result) {
              var res = result.data;
              if(res.code=='0000'){
                var userinfo = window.localStorage.getItem('userinfo');
                    userinfo  = JSON.parse(userinfo);
                userinfo.auditStatus  = 1;
                userinfo.merchantName = that.paramsData.merchantName;
                userinfo = JSON.stringify(userinfo);
                window.localStorage.setItem('userinfo',userinfo);
                that.$router.push('/authSuc')

              }else if(res.code=='1100'){
                that.$message.error(res.message)

              }else if(res.code=='1000'){
                that.$router.push('/authFail')
              }
            }).catch(function (error) {
              console.log("submintAuthError:",error)
            })
            setTimeout(function () {
              that.isSubmit = false;
            },800)
          } else {
            console.log('verfiError')

          }
        })

      },

      changeSubBankName(val){
        let obj = {};
        obj = this.branchListData.find((item)=> {
          return item.bankName === val;
        });
        this.authNextform.subBankCode = obj.paysysBankCode;
        // this.authNextform.subBankName = val;
      },

      searchSave(){
        this.seeBranch = false
        this.authNextform.subBankName = this.subBankName;
      },
      queryBranch(){
        var that = this;
        that.currentPage = 1;
        that.getBranch();
      },

      //分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getBranch();
      },

      getLastAuthInfo(type,val){
        var that = this;
        let obj = {};
        if(type == 'bank'){
          obj = that.bankData.find((item)=> {
            return item.bankName === val;
          });
          that.authNextform.bankCode = obj.bankCode;

        }else if(type=='province'){
          obj = that.provinceData.find((item)=> {
            return item.provinceName === val;
          });
          that.authNextform.province = obj.provinceCode;
          that.getCity(obj.id);
        }else if(type == 'city'){
          obj = that.cityData.find((item)=> {
            return item.cityName === val;
          });
          that.authNextform.city = obj.cityCode;
        }else if(type == 'subBank'){
          obj = that.branchListData.find((item)=> {
            return item.bankName === val;
          });
          that.authNextform.subBankCode = obj.paysysBankCode;
        }
      },
      getAuthInfo(){
        var that = this;
        var t = window.localStorage.getItem('userinfo');
        t = JSON.parse(t);
        that.isAuth  = t.auditStatus;

        if(t && t.auditStatus == 3){
          that.authNextform = that.$route.params;
        }else {
          that.paramsData   = that.$route.params;
        }
        that.getBank();
        that.getProvince();
        setTimeout(function () {
          that.getBranch()
        },400)
        that.$emit('changewindowSize', '','实名认证');
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
          that.$refs.authNextform.resetFields();
        }
      }
      that.getAuthInfo();
      that.bankAcctName = that.$route.params.merchantName;
      that.isFirstEnter = false;
      window.localStorage.setItem('isBackHomePage',1);

    },

    created(){
      var that = this;
      setTimeout(function () {
        that.changeSteps();
        var height = that.$refs['comp'].$el.clientHeight;
        that.$emit('changewindowSize', height)
      }, 500);

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
  width: 80%;
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
  margin-bottom: 9px;
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

.authbtn {
  position: relative;
  width: 100%;
  text-align: center;
  display: inline-block;
  padding-top: 72px;
  padding-bottom: 70px;
}

.accountName {
  position: relative;
  overflow: hidden;
  height: 40px;
  color: #bfbfbf;
  font-size: 15px;
  background: #f3f3f3;
  padding: 0 15px;
}

.bankMark {
  color: #bfbfbf;
  font-size: 13px;
  position: relative;
  width: 100%;
  margin-bottom: 34px;
}

.sicon {
  cursor: pointer;
}

.aBtn {
  height: 34px;
  position: relative;
  width: 100%;
}

.searchBtn {
  width: 55px;
  float: left;
}

.seachMark {
  font-size: 12px;
  color: #999999;
  letter-spacing: 1px;
  padding-bottom: 22px;
}

.banchRadio {
  line-height: 30px;
}

.banchcont {
  padding: 0 27px;
  box-sizing: border-box;
}

.branchLine {
  position: relative;
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-top: 20px;
}

.pagination {
  position: relative;
  width: 100%;
  text-align: right;
  padding-top: 20px;
}

.subBankName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dlabel {
  padding-left: 10px;
}
.branchForm .el-form-item {
  position: relative;
  width: 100%;
}
.noData {
  margin: 0 auto;
  text-align: center;
}
</style>
