<template>
  <div class="changeBaseInfo">
    <el-row class="pcontent">
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16">
        <p class="ciMark">
          <img src="../../../assets/img/tips.png" alt="">
          企业如需更新信息, 请联系客服 (400-877-500) 进行更新
        </p>
        <div class="infoBlock">
          <div class="infoBlockTitle">企业基本信息</div>
          <div class="infoBlockCont">
            <div class="infoBlockForm">
              <el-form ref="changeBaseInfoform" :model="changeBaseInfoform" :rules="cInfoformRules" label-width="107px">
                <el-form-item label="企业名称"  >
                  <div class="enterpriseName">{{changeBaseInfoform.merchantName}}</div>
                </el-form-item>
                <el-form-item label="简称" prop="merchantShortName">
                  <el-input v-model="changeBaseInfoform.merchantShortName" placeholder="请输入企业简称"></el-input>
                </el-form-item>
                <el-form-item label="公司地址" class="address" required>
                  <el-col :span="7">
                    <el-form-item prop="provinceName">
                      <el-select v-model="changeBaseInfoform.provinceName" placeholder="省份" @input="changeProvince">
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
                      <el-select v-model="changeBaseInfoform.cityName" placeholder="城市" @input="changeCity">
                        <el-option v-for="item in cityData" :label="item.cityName" :value="item.cityName"
                                   :key="item.cityCode"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">
                    <pre> </pre>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="areaName">
                      <el-select v-model="changeBaseInfoform.areaName" placeholder="区县">
                        <el-option v-for="item in countyData" :label="item.areaName" :value="item.areaName"
                                   :key="item.areaCode"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item label="" prop="detailAddress">
                  <el-input v-model="changeBaseInfoform.detailAddress" placeholder="请填写详细地址"></el-input>
                </el-form-item>
                <el-form-item label="官网地址">
                  <el-input v-model="changeBaseInfoform.website " placeholder="请输入官网地址,无则可不填"></el-input>
                </el-form-item>
                <el-form-item label="客服电话" prop="servicePhone">
                  <el-input v-model="changeBaseInfoform.servicePhone" placeholder="请输入客服电话"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="leaderName">
                  <el-input v-model="changeBaseInfoform.leaderName" placeholder="请输入主要联系人"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="leaderMobile">
                  <el-input v-model="changeBaseInfoform.leaderMobile" placeholder="请输入主要联系人手机号码" :maxlength="11"></el-input>
                </el-form-item>

                <div class="infoBlockFormBtn">
                  <el-button type="primary" @click="changeBaseInfoformfn('changeBaseInfoform')" :disabled="isSubmit">确认提交</el-button>
                  <el-button class="secondBtn"  @click="changeBaseInfoformfn('baseInfo')">取消</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
var qs = require("querystring");

export default {
  name: "changeBaseInfo",
  data() {
    return {
      provinceData: "",
      cityData: "",
      countyData: "",
      pageParams: "",
      fnum: 0,
      isSubmit: false,
      changeBaseInfoform: {
        merchantName: "",
        areaName: "",
        cityName: "",
        detailAddress: "",
        leaderMobile: "",
        leaderName: "",
        merchantShortName: "",
        provinceName: "",
        servicePhone: "",
        website: ""
      },
      cInfoformRules: {
        merchantShortName: [
          { required: true, message: "请填写简称", trigger: "blur" }
        ],
        detailAddress: [
          { required: true, message: "请填写公司详细地址", trigger: "blur" }
        ],
        province: [{ required: true, message: "请选择省份", trigger: "blur" }],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
        county: [{ required: true, message: "请选择区县", trigger: "blur" }],
        servicePhone: [
          { required: true, message: "请填写客服电话", trigger: "blur" }
        ],
        leaderName: [
          { required: true, message: "请填写联系人", trigger: "blur" }
        ],
        leaderMobile: [
          { required: true, message: "请填写手机号码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    changeBaseInfoformfn(formName) {
      var that = this;
      if(formName == 'baseInfo'){
        that.$router.push('/'+formName);
        return false;
      }
      that.$refs[formName].validate(valid => {
        if (valid) {
          delete that.changeBaseInfoform.merchantName;
          that.isSubmit = true;
          that
            .$axios({
              url: "/merchant/merchantInfo/updateMerchantInfo",
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              data: that.changeBaseInfoform
            })
            .then(function(result) {
              var res = result.data;
              if (res.code && res.code == "0000") {
                that.$router.push("/changeInfosuc");
              } else if (res.code && res.code == "1000") {
                that.$router.push("/changeInfofail");
              } else {
                that.$message.error(res.message);
              }
            })
            .catch(function(error) {
              console.log("error:", error);
            });
          setTimeout(function() {
            that.isSubmit = false;
          }, 800);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getProvince() {
      var that = this;
      that.$axios
        .post("/combine/baseData/queryProvinceList")
        .then(function(result) {
          var res = result.data;
          if (res.code == "0000") {
            that.provinceData = res.data;
            if (that.fnum == 0) {
              that.changeProvince(that.changeBaseInfoform.provinceName);
              that.fnum++;
            }
          }
        })
        .catch(function(error) {
          console.log("getProvinceError:", error);
        });
    },

    getCity(province) {
      var that = this;
      var params = {
        provinceId: province
      };
      that
        .$axios({
          url: "/combine/baseData/queryCity",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: qs.stringify(params)
        })
        .then(function(result) {
          var res = result.data;
          if (res.code == "0000") {
            that.cityData = res.data;
            if (that.fnum == 1) {
              that.changeCity(that.changeBaseInfoform.cityName);
            }
          }
        })
        .catch(function(error) {
          console.log("getCityError:", error);
        });
    },

    getCountry(city) {
      console.log("city:", city);
      var that = this;
      var params = {
        cityId: city
      };
      that
        .$axios({
          url: "/combine/baseData/queryArea",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: qs.stringify(params)
        })
        .then(function(result) {
          var res = result.data;
          if (res.code == "0000") {
            that.countyData = res.data;
          }
        })
        .catch(function(error) {
          console.log("getCountryError:", error);
        });
    },

    changeCity(val) {
      let obj = {};
      obj = this.cityData.find(item => {
        return item.cityName === val;
      });
      this.getCountry(obj.id);
    },

    changeProvince(val) {
      let obj = {};
      obj = this.provinceData.find(item => {
        return item.provinceName === val;
      });
      this.getCity(obj.id);
    }
  },
  created() {
    var that = this;
    that.$emit("changewindowSize", "", "更改企业信息");
    that.getProvince(); // 获取省份
    that.changeBaseInfoform = that.$route.params;
  }
};
</script>
<style scoped>
.ciMark,
.infoBlock,
.infoBlockTitle,
.infoBlockCont,
.enterpriseName {
  position: relative;
  width: 100%;
}

.ciMark {
  font-size: 15px;
  color: #666666;
  margin: 38px 0;
  letter-spacing: 1px;
}

.ciMark img {
  margin-right: 5px;
}
a {
  color: #999999;
}
.infoBlockTitle {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d5d5d5;
  padding-left: 8px;
}

.infoBlockCont {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.infoBlockForm {
  position: relative;
  width: 66%;
}
.infoBlockCont .address {
  margin-bottom: 0;
}
.infoBlockFormBtn {
  margin-bottom: 86px;
  margin-top: 40px;
  text-align: center;
}
.enterpriseName {
  background: #f3f3f3;
  padding-left: 15px;
  color: #999999;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  box-sizing: border-box;
}
.infoBlockFormBtn .secondBtn {
  margin-left: 20px;
}
</style>
