<template>
  <div class="container">
    <scrollTop :scrollParam="scroll"></scrollTop>
    <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
        <pre></pre>
    </el-col>
    <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="16" :span="6" >
      <aside>
        <el-menu
          :default-active="activeIndex"
          class=""
          @open="open"
          @select="select">
          <template >
            <el-submenu v-for="menu in menuList" :key="menu.index" :index="menu.index">
              <template slot="title"><span>{{menu.name}}</span></template>
              <el-menu-item v-for="item in menu.list" :key="item.index" :index="item.index">{{item.subname}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <span class="babel">你当前的位置：</span>
          <el-breadcrumb-item :to="{ path: '/helpCenter' }">帮助中心</el-breadcrumb-item>
          <el-breadcrumb-item >{{queryInfo.subname}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="info">
          <h5>{{queryInfo.subname}}</h5>
          <p>{{queryInfo.info}}</p>
        </div>
      </section>
    </el-col>
    <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
        <pre></pre>
    </el-col>
  </div>

</template>

<script>
import menuList from './menu.json'
import details from './details.json'
import scrollTop from '../../lib/scrollTop'
export default {
  name: 'queryDetails',
  components: {
    scrollTop
  },
  data () {
    return {
      menuList,
      details,
      activeIndex: '1-1',
      scroll: {
        // 滚动多少像素显示“回到顶部”图标
        distance: 30,
        // 向上滚动间隔
        time: 600,
        // 数据加载完成与否,
        reloadComp: true,
        // 回到顶部后回调方法
        callback: Function,
        // 下面按钮的点击事件
        defaultfunc: this.goFeedback
      },
      queryInfo: {
        subname: '了解智企银通',
        info: '国油众盈（北京）支付科技有限公司，简称“国油支付｜COP”，2016年9月成立。目前，公司团队组建公司运营部，科技开发部，产品运营部，市场合作部，交互体验部及机构合作中心近60余人的团队规模，平均年龄26.3岁，核心成员平均行业经验5年以上。公司服务主要以中小型企业群经营服务产品智企银通为核心， 展开对国内外中小型企业客户群日常经营服务， 场景化促进银行存、 贷、 汇、 获客、 消费需求。 团队崇尚“ 尊客户， 优产品， 快迭代， 重创造” 的基本原则， 以科技生产为核心， 链接银行与企业的深度服务。 运营至今已与BATJ、 中国银联、 网商银行、 浦发银行、 南粤银行、 微众银行、 SIB国际银行、 泰国皇家银行， 中国电信、 移动、 联通、 烟草、 Visa / Mastercard / JCB / AE / DC等36家国内外机构建立深度合作关系， 并拥有微小零售商户30多万家， 中大型企业客户2300多家， 场景应用解决方案20余案例。公司致力于科技生产为核心， 为2B市场行业生态发展， 提供智能， 安全， 高效的市场链接服务， 遵从与合作伙伴互通， 互融、 互赢的理念， 为更加优质的市场环境而贡献力量。'
      }
    }
  },
  created () {
    this.activeIndex = this.$route.query.index
    this.select(this.activeIndex)
    this.$emit('changewindowSize', '', '', true, 'helpCenter')
  },
  methods: {
    select (key, keypath) {
      this.details.forEach(el => {
        if (el.index === key) Object.assign(this.queryInfo, el)
      })
    },
    open (key, keypath) {
    },
    goFeedback () {
      this.$router.push({
        name: 'feedback'
      })
    }
  }
}

</script>

<style scoped>
.container {
  margin-top: 35px;
}
aside {
  width: 180px;
  font-size: 16px;
  float: left;
}
aside .el-submenu .el-menu-item {
  min-width: 180px;
}
aside .el-submenu__title span {
  font-size: 16px;
}
aside .el-submenu .el-menu-item {
  font-size: 16px;
}
section {
  margin-left: 300px;
}
section .el-breadcrumb {
  font-size: 16px;
  height: 16px;
}
section .el-breadcrumb .babel {
  float: left;
}
section h5 {
  font-size: 18px;
  padding-bottom: 10px;
  margin: 30px 0 40px 0;
  border-bottom: 1px solid #f6f6f6;
}
</style>
