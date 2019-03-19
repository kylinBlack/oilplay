<template>
<div class="baseInfo">
  <update-operator v-if="userType == 21" :visible.sync="visible" :updateList="findManager" :updateObj="merchantData"></update-operator>
  <!-- 头部 -->
  <div class="auseinfo">
    <p class="acempty"></p>
    <div class="userico">
      <div class="outBorder">
        <div class="icon_">
          <el-upload
            class="avatar-uploader"
            :action="iconUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img width="100%" v-if="imageUrl" :src="imageUrl" class="handIcon" title="点击更换头像">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>

    </div>
    <p class="welText" v-if="userType != 21">注册时间: {{merchantData.registerTime }}</p>
    <p class="welText" v-if="userType != 21">注册时间: {{merchantData.status }}</p>
    <p class="welText" v-if="userType == 21">账户状态: {{merchantData.status === '20' ? '启用' : '禁用'}}</p>
  </div>

  <el-row v-if="userType != 21">
    <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
      <pre> </pre>
    </el-col>
    <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16">
      <!-- 基本信息 -->
      <div class="basic baseWidth">
        <div class="btitle">基本信息</div>
        <div class="bContent">
          <div class="bleft">
            <div class="bitem">
              <div class="blabel">账户名:</div>
              <div class="bcont">{{merchantData.userName}}</div>
            </div>
            <div class="bitem">
              <div class="blabel">联系人:</div>
              <div class="bcont">{{merchantData.leaderName}}</div>
            </div>
          </div>
          <div class="bright">
            <div class="bitem">
              <div class="blabel">商户号:</div>
              <div class="bcont">{{merchantData.merchantNo}}</div>
            </div>
            <div class="bitem">
              <div class="blabel">手机号码:</div>
              <div class="bcont">{{merchantData.leaderMobile }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 实名信息 -->
      <div class="realNameInfo baseWidth">
        <div class="btitle shimingTitle">
          实名信息
          <span class="changeInfo" @click="changeInfofn">更改</span>
        </div>
        <div class="bContent">
          <div class="bleft">
            <div class="bitem">
              <div class="blabel">企业名称:</div>
              <div class="bcont">{{merchantData.merchantName}}</div>
            </div>
            <div class="bitem">
              <div class="blabel">官网地址:</div>
              <div class="bcont">{{merchantData.website}}</div>
            </div>
            <div class="bitem">
              <div class="blabel">法人姓名:</div>
              <div class="bcont">{{merchantData.legalpersonName }}</div>
            </div>
            <div class="bitem">
              <div class="blabel">营业执照:</div>
              <div class="bcont">{{merchantData.licenceNo }}</div>
            </div>
          </div>
          <div class="bright">
            <div class="bitem">
              <div class="blabel">企业简称:</div>
              <div class="bcont">{{merchantData.merchantShortName}}</div>
            </div>
            <div class="bitem">
              <div class="blabel">公司地址:</div>
              <div class="bcont">{{merchantData.address}}</div>
            </div>
            <div class="bitem">
              <div class="blabel">客服电话:</div>
              <div class="bcont">{{merchantData.servicePhone }}</div>
            </div>
            <div class="bitem">
              <div class="blabel">身份证号:</div>
              <div class="bcont">{{merchantData.legalpersonCertNo }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 账户信息 -->
      <div class="accountInfo baseWidth">
        <div class="btitle">账户信息</div>
        <div class="bContent">
          <div class="bleft">
            <div class="bitem">
              <div class="blabel">开户名称:</div>
              <div class="bcont">{{merchantData.bankAcctName }}</div>
            </div>
            <div class="bitem">
              <div class="blabel">开户支行:</div>
              <div class="bcont">{{merchantData.subBankName}}</div>
            </div>

          </div>
          <div class="bright">
            <div class="bitem">
              <div class="blabel">银行名称:</div>
              <div class="bcont">{{merchantData.bankName }}</div>
            </div>
            <div class="bitem">
              <div class="blabel">银行账号:</div>
              <div class="bcont">{{merchantData.bankAcctNo }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
      <pre> </pre>
    </el-col>
  </el-row>

  <el-row v-if="userType == 21">
    <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
      <pre> </pre>
    </el-col>
    <el-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16">
      <div class="manager-box">
        <ul>
          <li>
            <span class="label">姓 名</span>
            <span class="info">{{merchantData.nickname}}</span>
          </li>
          <li>
            <span class="label">登录账号</span>
            <span class="info">{{merchantData.userName}}</span>
          </li>
          <li>
            <span class="label">身份证号码</span>
            <span class="info">{{merchantData.idCardNo}}</span>
          </li>
          <li>
            <span class="label">手机号码</span>
            <span class="info">{{merchantData.mobile}}&nbsp;&nbsp;&nbsp;<i v-if="isUpdateMobile" @click="changeMobile" class="el-icon-edit"></i></span>
          </li>
          <li>
            <span class="label">邮箱地址</span>
            <span class="info">{{merchantData.email}}</span>
          </li>
        </ul>
        <el-button type="primary" @click="updateInfo">更改个人信息</el-button>
      </div>
    </el-col>
    <el-col :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
      <pre> </pre>
    </el-col>
  </el-row>
</div>
</template>
<script>
import updateOperator from './updateOperator'
var qs = require('querystring')
export default{
  name: 'baseInfo',
  data () {
    return {
      visible: false,
      userType: '',
      bregisterTime: '2017-08-80',
      accType: '正常',
      merchantData: {},
      imageUrl: require('../../../assets/img/tx.png'),
      iconUrl: this.$imgCodeUrl + '/upload/image'
    }
  },
  components: {
    updateOperator
  },
  computed: {
    isUpdateMobile () {
      return this.$formatFn.isPermission('sc_bind_mobile_func')
    }
  },
  created () {
    let userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
    this.userType = userinfo.type
    if (this.userType === '21') {
      this.findManager()
      this.$emit('changewindowSize', '', '操作员个人信息')
    } else {
      this.$emit('changewindowSize', '', '企业基本信息')
      this.getMerchantData()
    }
  },
  methods: {
    // 更改操作员个人信息
    updateInfo () {
      this.visible = true
    },
    // 更改手机号
    changeMobile () {
      this.$router.push({name: 'securitySet', params: {changeMobile: true}})
    },
    // 查询操作员
    findManager () {
      let that = this
      this.$axios.post('/merchant/user/queryUserInfo').then(({data}) => {
        if (data.code && data.code === '0000') {
          that.merchantData = data.data
          if (data.data.picture && data.data.picture !== '') {
            that.imageUrl = that.$imgCodeUrl + '/download/image/' + that.merchantData.picture
          } else {
            that.imageUrl = require('../../../assets/img/tx.png')
          }
        } else {
          that.$message.error(data.message)
        }
      })
    },
    // 上传操作员头像
    uploadImg () {
      this.$axios.post('/combine/upload/image').then()
    },
    changeInfofn () {
      var nParams = {
        merchantName: this.merchantData.merchantName,
        merchantShortName: this.merchantData.merchantShortName,
        provinceName: this.merchantData.provinceName,
        cityName: this.merchantData.cityName,
        areaName: this.merchantData.areaName,
        detailAddress: this.merchantData.detailAddress,
        website: this.merchantData.website,
        servicePhone: this.merchantData.servicePhone,
        leaderName: this.merchantData.leaderName,
        leaderMobile: this.merchantData.leaderMobile
      }

      this.$router.push({
        name: 'changeBaseInfo',
        params: nParams
      })
    },
    getMerchantData () {
      var that = this
      that.$axios.post('/merchant/merchantInfo/detail').then(function (result) {
        var res = result.data
        if (res.code && res.code === '0000') {
          that.merchantData = res.data
          if (res.data.headImg && res.data.headImg !== '') {
            that.imageUrl = that.$imgCodeUrl + '/download/image/' + that.merchantData.headImg
          } else {
            that.imageUrl = require('../../../assets/img/tx.png')
          }
        } else {
          that.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log('error:', error)
      })
    },

    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.upHeaderImg(res.data)
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const size = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('请上传jpeg,jpg,png格式的图片')
        return false
      };
      if (!size) {
        this.$message.error('上传头像图片大小不能超过2MB')
        return false
      }
    },
    upHeaderImg (icon) {
      var that = this
      var params = {
        headImg: icon
      }
      that.$axios({
        url: '/merchant/user/updateHeadImg',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(params)
      }).then(function (result) {
        console.log('result:', result)
        var res = result.data
        if (res.code && res.code === '0000') {
          that.$message({
            message: '头像上传成功',
            type: 'success'
          })
          var userinfo = window.localStorage.getItem('userinfo')
          userinfo = JSON.parse(userinfo)
          userinfo.picUrl = res.data
          userinfo = JSON.stringify(userinfo)
          window.localStorage.setItem('userinfo', userinfo)
        } else {
          that.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log('error:', error)
      })
    }
  }

}
</script>
<style lang="scss" scoped>
/*  用户信息 */
.auseinfo {
  position: relative;
  width: 100%;
  height: 204px;
  background: #0067b8;
  color: white;
  padding-top: 23px;
}

.auseinfo p {
  position: relative;
  width: 100%;
  text-align: center;
  color: #ffffff;
  letter-spacing: 1px;
}
.userdetail li {
  float: left;
  padding-right: 10px;
}

.welText {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  opacity: 0.9;
}

.actext img {
  margin: 10px 5px;
}

.userico {
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}

.userico img {
  cursor: pointer;
  height: 86px;
}

.baseWidth,
.btitle,
.bContent,
.bitem {
  position: relative;
  width: 100%;
  display: inline-block;
}
.baseWidth {
  margin: 20px 0;
  border: 1px solid #f3f3f3;
  border-radius: 2px;
}

.btitle {
  background: #f3f3f3;
  color: #333333;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
}

.bleft,
.bright {
  position: relative;
  width: 49%;
  display: inline-block;
  vertical-align: top;
  padding-bottom: 34px;
}
.blabel,
.bcont {
  display: inline-block;
  position: relative;
  margin-top: 30px;
  float: left;
  font-size: 14px;
}
.blabel {
  width: 30%;
  text-align: right;
}
.bcont {
  width: 69%;
  text-align: left;
  color: #999999;
  box-sizing: border-box;
  padding-left: 20px;
}
.accountInfo {
  margin-bottom: 36px;
}
.shimingTitle {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.changeInfo {
  color: #0068b8;
  padding-right: 10px;
  cursor: pointer;
}
.avatar-uploader,
.el-upload {
  position: relative;
  width: 100%;
  height: 100%;
}

.icon_ {
  width: 86px;
  border-radius: 43px;
  overflow: hidden;
  height: 86px;
  border: 3px solid white;
  box-sizing: border-box;
}

.outBorder {
  display: flex;
  height: 100px;
  width: 100px;
  background: #3385c6;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  z-index: 10;
  box-sizing: border-box;
}
.manager-box {
  text-align: center;
  margin-bottom: 30px;
  ul {
    width: 300px;
    transform: translateX(-50%);
    position: relative;
    left: 50%;
    margin: 30px 10px;
    li {
      line-height: 50px;
      text-align: left;
      position: relative;
      span {
        display: inline-block;
      }
      span.label {
        margin-right: 40px;
        width: 90px;
        font-weight: 700;
        text-align: right;
      }
      span.info {
        position: absolute;
        i {
          cursor: pointer;
          color: #0067b8;
        }
      }
    }
  }
}
</style>
