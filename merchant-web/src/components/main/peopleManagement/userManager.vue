
<template>
  <div>
    <edit-user :userOptions="userOptions" ></edit-user>
    <scroll-top :scrollParam="scroll"></scroll-top>
    <el-row>
      <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
        <pre></pre>
      </el-col>
      <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="16" :span="6" >
        <div class="user-manager">
          <user-card :userObj="user" :updateList="getUserQueryAll" v-for="user in userList" :key="user.code" class="card"></user-card>
        </div>
        <div class="more-loading" v-show="moreLoading">
          <img src="../../../assets/img/loading.gif" width="100" height="100" alt="">
        </div>
      </el-col>
      <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="4">
        <pre></pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userCard from './userComponents/userCard'
import scrollTop from '@/components/lib/scrollTop'
import editUser from './userComponents/editUser'
export default {
  name: 'userManager',
  components: {
    userCard,
    scrollTop,
    editUser
  },
  data () {
    return {
      userList: [],
      scroll: {
        // 回到顶部的方式 0 - 马上回到顶部，css实现（默认） 1 - 匀速回到顶部，js实现
        way: 1,
        // 滚动多少像素显示“回到顶部”图标
        distance: 100,
        // 向上滚动间隔
        time: 300,
        // 回到顶部后回调方法
        callback: this.onScollTop,
        // 下面按钮的点击事件
        defaultfunc: this.addCard,
        // 数据加载是否完成完毕
        reloadComp: false
      },
      userOptions: {
        visible: false,
        close: this.close,
        updateList: this.getUserQueryAll
      },
      pageBean: {
        pageNo: 1,
        pageSize: 9
      },
      count: 1,
      moreLoading: false,
      stopScrollflag: false
    }
  },
  created () {
    let _this = this
    this.getUserQueryAll().then(() => {
      _this.loadMore()
    })
    this.$emit('changewindowSize', '', '', true, 'userManager')
  },
  methods: {
    // 操作员查询
    getUserQueryAll (count) {
      if (!count && this.stopScrollflag) return
      if (count) {
        this.pageBean.pageNo = count
      }
      let url = 'merchant/subUser/queryAll'
      let params = {
        pageBean: this.pageBean
      }
      let _this = this
      if (params.pageBean.pageNo > 1) {
        this.moreLoading = true
      }
      return this.$axios.post(url, params).then(({data}) => {
        if (params.pageBean.pageNo === 1) {
          _this.userList = data.data.dataList || []
          _this.stopScrollflag = false
          if (data.data.dataList && data.data.dataList.length < 9) {
            _this.userList.push({created: true})
            _this.scroll.reloadComp = false
          } else {
            _this.scroll.reloadComp = true
          }
        } else {
          if (data.data.dataList && data.data.dataList.length > 0) {
            _this.userList.push(...data.data.dataList)
            _this.count++
          } else {
            _this.pageBean.pageNo = _this.count
            _this.stopScrollflag = true
            _this.$message({
              center: true,
              type: 'warning',
              message: '已经没有更多内容了噢-_-!'
            })
          }
          _this.moreLoading = false
        }
      })
    },
    // 滑到底部加载更多
    loadMore () {
      let _this = this
      // document.addEventListener('mousewheel', function (e) {
      //   debugger
      //   _this.pageBean.pageNo++
      //   _this.getUserQueryAll()
      // }, false)
      window.onscroll = function () {
        let scrollTop = document.documentElement.scrollTop // 滚动条向下滚动的距离
        let scrollHeight = document.body.scrollHeight // 文档实际高度
        let clientHeight = document.documentElement.clientHeight // 文档可视高度
        if (clientHeight === scrollHeight || clientHeight + scrollTop > scrollHeight - 100) {
          _this.pageBean.pageNo++
          _this.getUserQueryAll()
        }
      }
    },
    onScollTop () {
      console.log('到达页面顶部了')
    },
    addCard () {
      console.log('点击创建卡片')
      this.userOptions.type = 'add'
      this.userOptions.visible = true
    },
    close () {
      this.userOptions.visible = false
    }
  }
}

</script>

<style lang="scss"  scoped>
.user-manager {
  display: flex;
  flex-wrap: wrap;
  .more-loading {
  }
}
.card {
  flex: 0 0 33.33333%;
}
.more-loading {
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
}
</style>
