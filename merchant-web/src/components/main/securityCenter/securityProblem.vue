<template>
  <div class="securitySet">
    <div class="securitySetCont">
      <ul class="sList">
        <li>
          <el-row >
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="wordStyle paddingH">安全问题</el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <p class="secondText paddingH">安全问题可用于重置支付密码</p>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="wordStyle sBtn">
                <el-button type="text" @click="resetInfo" v-show="isShowBtn&&isSet">设置</el-button>
                <el-button type="text" @click="resetInfo" v-if="!isShowBtn&&isEdit">更换</el-button>
            </el-col>
          </el-row>
        </li>

      </ul>
    </div>

    <el-dialog
      :title="problemsTitle"
      class="changePhoneD"
      :visible.sync="problemBox"
      @close="setBoxClose"
      width="520px">
      <component @thisComponents="thisComponents" v-bind:is="thisComp"  :problemParam="problemParam"></component>
    </el-dialog>

  </div>
</template>
<script>
import setProblem from './setProblems'
import changeProblem from './changeProblem'
import setNweProblems from './setNweProblems'

export default{
  name: 'securitySet',
  data () {
    return {
      isShowBtn: true,
      problemBox: false,
      thisComp: '',
      problemParam: '',
      problemsTitle: ''

    }
  },
  computed: {
    isSet () {
      return this.$formatFn.isPermission('sc_security_question_add_func')
    },
    isEdit () {
      return this.$formatFn.isPermission('sc_security_question_update_func')
    }
  },
  methods: {
    getUserProblems () {
      var that = this
      that.$axios.post('/merchant/questionSetting/queryQustion').then(function (result) {
        var res = result.data
        if (res.code && res.code == '0000') {
          if (res.data && res.data.isSetQuestion !== 'false') {
            that.isShowBtn = false
            that.problemsTitle = '设置新的安全问题'
            that.thisComp = 'changeProblem'
            that.problemParam = res.data
          }
        } else if (res.code && res.code == '1100') {
          that.thisComp = 'setProblem'
          that.problemsTitle = '设置安全问题'
        } else {
          that.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log('error:', error)
      })
    },

    resetInfo () {
      var that = this
      if (that.thisComp !== '') {
        that.problemBox = true
      } else {
        that.$message.error('系统异常')
      }
    },

    thisComponents (c, v, flag) {
      var that = this
      that.problemBox = flag
      if (c) {
        that.thisComp = c
        that.problemParam = v
      };
      if (!flag) {
        that.getUserProblems()
      }
    },

    setBoxClose () {
      var that = this
      if (that.thisComp == 'setNweProblems') {
        that.getUserProblems()
        that.thisComp = 'changeProblem'
      }
    }

  },

  components: {
    setProblem,
    changeProblem,
    setNweProblems
  },

  created () {
    this.getUserProblems()
  },
  mounted () {
    if (this.$route.params.sucSet) {
      this.problemBox = true
    }
  }
}
</script>
<style scoped>
.securitySet,
.securitySetCont,
.sList,
.sList li {
  position: relative;
  width: 100%;
}
.sList {
  display: inline-block;
}
.sList li {
  height: 55px;
  border-bottom: 1px solid #f4f4f4;
  padding-top: 5px;
  box-sizing: border-box;
}
.wordStyle {
  font-size: 15px;
}
.secondText {
  font-size: 14px;
  color: #999999;
}
.paddingH {
  padding: 12px 20px;
}
.sBtn {
  text-align: right;
}
.sBtn .el-button {
  color: #0067b8;
}
</style>
