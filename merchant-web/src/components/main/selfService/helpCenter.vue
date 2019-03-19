<template>
  <div class="help-center">
    <el-row>
      <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
        <pre></pre>
      </el-col>
      <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="16" :span="6" >
        <h5>自助服务</h5>
        <ul class="top-cl">
          <li @click="topLink(item)"
            @mouseover="mouseover(item)"
            @mouseout="mouseout(item)"
            v-for="item in headerList"
            :key="item.id"
            :class="{'active':item.active}"
            class="help-card">
          <i :class="item.img"></i>
          <div class="card-name">{{item.name}}</div>
          </li>
        </ul>
        <h5>常见问题</h5>
        <ul class="mid-query">
          <li v-for="(arr,index) in middleList" :key="index">
            <span @click="midLink(item)" v-for="item in arr" :key="item.id">
              <b>{{item.id}}</b>
              <span>{{item.name}}</span>
            </span>
          </li>
        </ul>
        <h5>问题分类</h5>
        <div class="query-category">
          <ul class="column" v-for="(list,index) in footerList" :key="index">
            <li @click="footLink(item)"
                @mouseover="mouseover(item)"
                @mouseout="mouseout(item)"
                v-for="item in list"
                :key="item.code"
                :class="{'active':item.active}"
                class="help-card">
              <div class="query-box">
                <i :class="item.img"></i>
                <span class="query-info">
                  <span>{{item.name}}</span>
                  <span>{{item.des}}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
        <pre></pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'peopleManagement',
  data () {
    return {
      headerList: [
        {name: '新手注册', img: 'icon-register', active: false, id: '001', code: '1-2', hash: 'queryDetails'},
        {name: '实名认证', img: 'icon-auth', active: false, id: '002', code: '1-4', hash: 'queryDetails'},
        {name: '重置密码', img: 'icon-securitySet', active: false, id: '003', code: '5-1', hash: 'queryDetails'},
        {name: '提现', img: 'icon-putForward', active: false, id: '004', code: '4-2', hash: 'queryDetails'}
      ],
      middleList: [
        [
          {name: '如何注册账号', id: '1', code: '1-2', hash: 'queryDetails'},
          {name: '如何进行实名认证', id: '2', code: '1-4', hash: 'queryDetails'},
          {name: '手机号码如何修改', id: '3', code: '2-1', hash: 'queryDetails'}
        ],
        [
          {name: '忘记登录密码怎么办', id: '4', code: '5-1', hash: 'queryDetails'},
          {name: '忘记支付密码怎么办', id: '5', code: '5-4', hash: 'queryDetails'},
          {name: '提现失败怎么办', id: '6', code: '4-2', hash: 'queryDetails'}
        ],
        [
          {name: '如何申请开通产品', id: '7', code: '3-1', hash: 'queryDetails'},
          {name: '成功开通产品后如何使用', id: '8', code: '3-2', hash: 'queryDetails'}
        ]
      ],
      footerList: [
        [
          {name: '新手指引', des: '账号注册/登录/实名认证', img: 'icon-rookie', active: false, code: '1-1', hash: 'queryDetails'},
          {name: '账号管理', des: '更换手机号码/基本信息', img: 'icon-account', active: false, code: '2-1', hash: 'queryDetails'},
          {name: '产品说明', des: '产品开通/开发接入', img: 'icon-product', active: false, code: '3-1', hash: 'queryDetails'}
        ],
        [
          {name: '交易管理', des: '提现/交易记录/对账单', img: 'icon-trade', active: false, code: '4-1', hash: 'queryDetails'},
          {name: '账号安全', des: '重置密码/安全问题/密钥管理', img: 'icon-safe', active: false, code: '5-1', hash: 'queryDetails'},
          {name: '其他', des: '人员管理', img: 'icon-other', active: false, code: '6-1', hash: 'queryDetails'}
        ]
      ]
    }
  },
  created () {
    this.$emit('changewindowSize', '', '', true, 'helpCenter')
  },
  methods: {
    mouseover (item) {
      item.active = true
    },
    mouseout (item) {
      item.active = false
    },
    topLink (item) {
      this.$router.push({name: item.hash, query: {index: item.code}})
    },
    midLink (item) {
      if (item.hash === 'queryDetails') {
        this.$router.push({name: item.hash, query: {index: item.code}})
      }
    },
    footLink (item) {
      if (item.hash === 'queryDetails') {
        this.$router.push({name: item.hash, query: {index: item.code}})
      }
    }
  }
}

</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
h5 {
  font-size: 16px;
  padding: 30px 0 15px 0;
  border-bottom: 1px solid #f3f3f3;
  margin-bottom: 10px;
}
.help-card {
  padding-top: 40px;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  width: 300px;
  height: 180px;
}
.top-cl {
  padding: 40px 5px 0;
}
.help-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .card-name {
    color: #0266b5;
  }
  .query-info > span {
    color: #0266b5;
  }
}
.card-name {
  margin-top: 24px;
}
.mid-query {
  display: flex;
  padding: 0 5px;
}
.mid-query > li {
  flex: 1;
  height: 200px;
  border-right: 1px solid #f3f3f3;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  padding-top: 30px;
  box-sizing: border-box;
}
.mid-query > li:last-child {
  border-right: none;
}
.mid-query > li > span {
  padding: 10px 0;
  transform: translateX(25%);
  font-size: 14px;
}
.mid-query > li > span:hover,
.mid-query > li > span:hover > b {
  color: #0266b5;
}
.mid-query > li > span > b {
  font-size: 26px;
  color: #999;
  margin-right: 5px;
}

.query-category {
  display: flex;
  align-content: space-around;
  flex-wrap: wrap;
  margin: 40px 0;
}
.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-around;
}
.query-box {
  display: flex;
  justify-content: center;
}
.query-box > i {
  margin: 0 20px;
}
.query-box .query-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
}
.query-box .query-info > span {
  align-self: flex-start;
  line-height: 24px;
  text-align: left;
}
</style>
