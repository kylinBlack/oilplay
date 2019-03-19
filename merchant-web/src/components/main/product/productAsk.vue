<template>
  <div class="productAsk">
    <el-row class="pcontent">
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="22" :sm="22" :md="16" :lg="16" :xl="16">
        <div class="producaLeft">
          <el-menu
            :default-active="productName"
            class="el-menu-vertical-demo proMenu"
            @select="handleSelect"
            @close="handleClose">
            <el-menu-item index="yishou">
              <span slot="title">易收</span>
            </el-menu-item>
            <el-menu-item index="yifu">
              <span slot="title">易付</span>
            </el-menu-item>
            <el-menu-item index="yicha">
              <span slot="title">易查</span>
            </el-menu-item>
            <el-menu-item index="seeHave">
              <span slot="title">查看已开通的产品 <i class="el-icon-d-arrow-right"></i></span>

            </el-menu-item>
          </el-menu>
        </div>
        <div class="producaRight">
          <router-view></router-view>
        </div>
        <div class="bottomLine"></div>
        <div class="productBtn">
          <el-button type="primary" :disabled="isClick" :class="{ableStyle:isAble}" :title="btnTitle" @click="productApply">立即接入</el-button>
        </div>
      </el-col>
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre>  </pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: "productAsk",
    data(){
      return {
        isClick: false,
        isAble: false,
        productName: 'yishou',
        btnTitle:'',
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);

      },

      handleClose(key, keyPath){
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath){

        this.productName = key;
        if (key == 'seeHave') {
          this.$router.push('/myProduct')
        } else {
          this.$router.push('/productAsk/' + key)
        }
        if (key == 'yicha') {
          this.isClick  = true;
          this.isAble   = true;
          this.btnTitle = '此产品暂不能开通';
        } else {
          this.isClick  = false;
          this.isAble   = false;
          this.btnTitle = '';
        }
      },
      productApply(){
        var that = this;
        var n = this.productName;
        var p = '';
        var productType = '';
        switch (n) {
          case 'yishou':
            p = '易收';
            productType = '01'
            break;
          case 'yifu':
            p = '易付';
            productType = '02'
            break;
        }
        var data = {
          name: p,
          productType: productType
        }
        that.$router.replace({
          name: 'prodictsApply',
          params: data
        })
      }
    },
    created(){
      this.$emit('changewindowSize', '','产品申请')
      var r = this.$route.params.name;
      if (r) {
        this.$router.replace('/productAsk/' + r);
        this.productName = r;
        if(r == 'yicha'){
          this.isClick  = true;
          this.isAble   = true;
          this.btnTitle = '此产品暂不能开通';
        }
      }

    }
  }
</script>
<style scoped>
  .producaLeft, .producaRight {
    position: relative;
    box-sizing: border-box;
    float: left;
    padding-top: 15px;
  }

  .producaLeft {

    width: 23%;
  }

  .producaRight {
    width: 77%;
    padding-left: 30px;

  }

  .proMenu .el-menu-item {
    border-bottom: 1px solid #f3f3f3;
    color: #333333;
  }

  .proMenu .el-menu-item.is-active {
    background: #f3f3f3;

  }

  .bottomLine {
    height: 1px;
    background: #f8f8f8;
    position: relative;
    width: 100%;

    display: inline-block;
  }

  .productBtn {
    position: relative;
    width: 100%;
    text-align: right;
    margin: 25px 0;

  }
  .ableStyle{
    opacity:0.8;
  }

</style>
