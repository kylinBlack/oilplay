<template>
  <div class="singlePay">
    <el-form :model="singlePayForm" :rules="singlePayFormRules" ref="singlePayForm" label-width="100px"
             class="singlePayForm">
      <el-form-item label="账户类型">
        <p class="accountType">
          <template v-for="(item,index) in accountTypeData">
            <span class="accountType" @click="changeAccounType(index,item.val)" :class="{changetip:isChange == index}">{{item.name}}</span>
          </template>
        </p>
      </el-form-item>
      <div v-show="isShow">
        <el-form-item label="收款方名称" prop="bankAcctName">
          <el-input v-model="singlePayForm.bankAcctName" :maxlength="100" placeholder="请输入企业银行开户名称"></el-input>
        </el-form-item>
      </div>
      <div v-if="!isShow">
        <el-form-item label="收款方名称" prop="bankAcctName">
          <el-input v-model="singlePayForm.bankAcctName" :maxlength="10" placeholder="请输入收款方银行开户名称"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="银行名称" prop="bankCode">
        <el-select v-model="singlePayForm.bankCode " placeholder="请选择银行" @input="changeBank">
          <el-option v-for="item in bankData" :label="item.bankName" :value="item.bankCode"
                     :key="item.bankCode"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="银行账号" prop="bankAcctNo">
        <el-input v-model="singlePayForm.bankAcctNo" :maxlength="32" placeholder="请输入银行账号"></el-input>
      </el-form-item>
      <el-form-item label="开户地区" class="address">
        <el-col :span="12">
          <el-form-item prop="province">
            <el-select v-model="singlePayForm.province" placeholder="省份" @change="changeProvince">
              <el-option v-for="item in provinceData" :label="item.provinceName" :value="item.provinceCode"
                         :key="item.provinceCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <pre> </pre>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="city">
            <el-select v-model="singlePayForm.city" placeholder="城市">
              <el-option v-for="item in cityData" :label="item.cityName" :value="item.cityCode"
                         :key="item.cityCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="开户支行" prop="subBankName">
        <el-input :readonly="true" suffix-icon="el-icon-search" v-model="singlePayForm.subBankName"
                  @focus="openSubBankBox" placeholder="点击搜索支行名称"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="tradeAmt" >
        <el-input v-model="singlePayForm.tradeAmt" :maxlength="12" class="sgmoney" @change="getServicecharge"></el-input>
        元
      </el-form-item>
      <el-form-item label="服务费" prop="charges" v-show="isShowSev">
        <div class="charges">{{singlePayForm.charges}}</div>
      </el-form-item>
      <el-form-item label="备注" prop="tradeRmk">
        <el-input v-model="singlePayForm.tradeRmk" :maxlength="30" placeholder="最多填写30个汉字"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="nextPage('singlePayForm')" class="singlePayBtn" :disabled="isSubmit">下一步</el-button>
      </el-form-item>
    </el-form>
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
                      <el-button type="primary" size="small" class="searchBtn" @click="queryBranch">查询</el-button>
                      <el-button class="searchBtn" size="small" @click="seeBranch = false">确定</el-button>
                    </p>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <p class="seachMark">以下为查询结果, 如支行未在名单内, 请联系客服 400-8775-800</p>
          <div>
            <el-radio-group v-model="branchNames" @change="changeSubBankName">
              <p v-for="(item,index) in branchListData" class="banchRadio">
                <el-radio :label="item.bankName" :key="item.bankType"></el-radio>
              </p>

            </el-radio-group>
          </div>
        </div>
        <div class="branchLine"></div>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
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
    <div class="clear"></div>
  </div>
</template>
<script>
  var qs = require('querystring');

  export default{
    name: "singlePay",
    data(){
      var valifMoney = (rule, value, callback) => {
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

        if (!reg.test(value)) {
          callback(new Error('请输入正确的金额'));
        } else {
          this.isShowSev = true;
          callback();
        }
      };

      var valifBankAcctNo = (rule, value, callback) => {
          var reg = '';
          var errorMsg = '';
          if (this.singlePayForm.bankAcctType == 1) {
            reg = /(^[0-9]{13,19}$)/;
            errorMsg = '只能输入13~19位数字';
          } else {
            reg = /(^[0-9]{9,21}$)/;
            errorMsg = '只能输入9~21位数字';
          }

          if (!reg.test(value)) {
            callback(new Error(errorMsg));
          } else {
            callback();
          }
      };

      return {
        isChange: 1,
        isShow: true,
        isShowSev: false,
        seeBranch: false,
        isSubmit: false,
        pageCont:10,
        bankData: '',
        accountMoney: 100,
        branchNames: '',
        provinceData: '',
        cityData: '',
        currentPage: 1,
        branchListData: [],
        branchForm: {
          searchText: ''
        },
        singlePayForm: {
          charges: 0.00,
          tradeAmt: '',
          subBankName: '',
          bankCode: '',
          province: '',
          city: '',
          subBankCode: '',
          tradeRmk: '',
          bankAcctType: '2',
          bankName: '',
        },
        accountTypeData: [
          {name: '个人账户', val: 'private'},
          {name: '对公账户', val: 'public'},
        ],
        singlePayFormRules: {
          bankAcctName: [
            {required: true, message: "请输入收款方名称", trigger: 'blur'},
          ],
          bankCode: [
            {required: true, message: "请选择银行", trigger: 'blur'},
          ],
          bankAcctNo: [
            {required: true, message: "请输入银行账号", trigger: 'blur'},
            {validator: valifBankAcctNo, trigger: 'blur'},
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
          tradeAmt: [
            {required: true, message: "请输入代付金额", trigger: 'blur'},
            {validator: valifMoney, trigger: 'blur'}
          ],
          tradeRmk: [
            {required: true, message: "请输入备注", trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      nextPage(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = that.singlePayForm;
              that.isSubmit = true;
             that.$axios({
              url: '/order/proxypay/singleProxyPayPreview',
              method: 'post',
              headers: {
                'Content-Type': "application/json"
              },
              data: params
            }).then(function (result) {
              var res = result.data;
                if(res.code == '0000'){
                  var d = res.data;
                  that.$router.push({
                    name: 'singlePayInfo',
                    params:d
                  })
                }else {
                  that.$message.error(res.message)
                }
            }).catch(function (error) {
              console.log("error:", error)
            })
            setTimeout(function () {
              that.isSubmit = false;
            },800)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      queryBranch(){
        var that = this;
        that.currentPage = 1;
        // that.singlePayForm.subBankName = that.branchForm.searchText;
        that.getBranch();
      },

      changeAccounType(index, type){
        this.isChange = index;
        this.isShow = !this.isShow;
        this.singlePayForm.bankAcctType = parseInt(index) + 1;
      },

      getBank(){
        var that = this;
        that.$axios.post('/combine/baseData/queryBankList').then(function (result) {
          var res = result.data;
          if (res.code == '0000') {
            that.bankData = res.data;
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
        this.singlePayForm.bankName = obj.bankName

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

      changeProvince(val){
        let obj = {};
        obj = this.provinceData.find((item)=> {
          return item.provinceCode === val;
        });
        this.getCity(obj.id);

      },


      getBranch(){
        var that = this;
        var params = {
          bankCode: that.singlePayForm.bankCode,
          provinceCode: that.singlePayForm.province,
          cityCode: that.singlePayForm.city,
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
          }
        }).catch(function (error) {

        })
      },

      changeSubBankName(val){
        let obj = {};
        obj = this.branchListData.find((item)=> {
          return item.bankName === val;
        });
        this.singlePayForm.subBankCode = obj.paysysBankCode;
        this.singlePayForm.subBankName = val;

      },
      openSubBankBox(){
        if(this.singlePayForm.bankCode == ''){
          this.$message.error('请选择银行名称');
          return false
        }
        this.seeBranch = true;
        this.getBranch();

      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.getBranch();
      },
      handleSizeChange(val){
        console.log("val:", val);

      },
      getServicecharge(){
        var that = this;
        var params = {
          amount:that.singlePayForm.tradeAmt
        }

        that.$axios({
          url:'/merchant/payConfig/reckonProxyPayFee',
          method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:qs.stringify(params)
        }).then(function (result) {
          var res = result.data
          if(res.code == '0000'){
            that.singlePayForm.charges = res.data.feeAmt;
          }else {
            that.$message.error(res.message)
          }
        }).catch(function (error) {
          console.log("error:",error)
        })
      },

      isLoading(){
        this.$refs.singlePayForm.resetFields();
     //   this.$refs.branchForm.resetFields();
        this.getBank();
        this.getProvince();

      }
    },

    created(){
      this.getBank()
      this.getProvince()
    }
  }
</script>
<style scoped>
  .accountType {
    position: relative;
    width: 100%;
  }
.clear{
  clear: both;
}
  .singlePay {
    position: relative;
    width: 65%;
    margin: 0 auto;
  }

  .accountType {
    display: flex;
    justify-content: space-between;
  }

  .accountType span {

    position: relative;
    width: 48%;
    height: 100%;
    background: #ebebeb;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    cursor: pointer;
  }

  .changetip {
    background: #0066b8 !important;
    color: white !important;
  }

  .charges {
    position: relative;
    height: 100%;
    color: #999999;
    padding-left: 15px;
  }

  .sgmoney {
    position: relative;
    width: 65%;
  }

  .singlePayForm {
    margin-top: 10px;
  }

  .singlePayBtn {
    margin-top: 20px;
  }

  .address {
    margin-bottom: 0 !important;
  }

  /*  开户行弹框  */
  .banchcont {
    padding: 0 27px;
    box-sizing: border-box;
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

  .aBtn{
    height: 34px;
    position: relative;
    width: 100%;
  }
  .dlabel .el-form-item__content{
    position: relative;
    width: 93%;
  }


</style>
