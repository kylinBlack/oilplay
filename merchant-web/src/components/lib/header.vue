<template>
  <div class="cop-header">
    <el-row>
      <el-col :xs="2" :sm="2" :md="3" :lg="3" :xl="3">
        <pre> </pre>
      </el-col>
      <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="20" class="header-content">
        <img src="../../assets/img/logo.png" alt="" @click="goFirstPage" title="点击回到首页">
        <div class="fline" v-show="isShowTitle"></div>
        <div class="fText" v-show="isShowTitle">{{title}}</div>
      </el-col>

    </el-row>
  </div>
</template>
<script>
  export default{
    name: "",

    data(){
      return {
        isShowTitle: false,
        title:'',
      }
    },
    methods: {
      goFirstPage(){
        location.assign('index.html')
//        if(this.url_ && this.url_ !==''){
//         location.assign(this.url_+'.html')
//        }else {
//          this.$router.push('/myAccount')
//        }


      },
      changetiltes(t){
        if ( t && t !== '') {
          this.isShowTitle = true;
          this.title = t
        }else {
          this.isShowTitle = false;
        };

      }
    },
    created(){

      this.changetiltes();
    }
  }
</script>
<style scoped>

  .cop-header {
    position: relative;
    width: 100%;
    height: 80px;
    background: #0067b8;
    box-sizing: border-box;
    display: inline-block;
  }

  .header-content {
    position: relative;
    height: 80px;
    line-height: 80px;
    text-align: left;
  }

  .header-content img {
    top: 50%;
    margin-top: 19px;
    cursor: pointer;
  }

  .fline {
    height: 25px;
    width: 1px;
    background: white;
    margin-top:29px;
    margin-left:10px;
    margin-right:10px;
  }

  .fText {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  .header-content img, .fText, .fline {
    float: left;

  }
</style>
