<template>
  <div class="batchPay">
    <el-form :model="batchPayForm" :rules="batchPayRules" ref="batchPayForm" label-width="100px" class="batchPayForm">
      <el-form-item label="上传批量文件">
        <el-upload
          class="uploadfiles"
          :before-remove="removeFiles"
          action="a"
          :limit="1"
          :http-request="upFiles">
          <el-button  class="upFlies">选择文件</el-button>
        </el-upload>

        <a class="batchDownload" :href="downLoadFile">
          <img src="../../../assets/img/download.png" alt="">
          批量模板
        </a>

      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="batchPayForm.tradeRmk" :maxlength="30" placeholder="最多填写30个汉字"></el-input>
      </el-form-item>
      <el-form-item label="" class="batchBtn">
        <el-button type="primary" @click="nextPage" :disabled="isSubmit">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

  export default{
    name: "batchPay",
    data(){
      return {
        downLoadFile:this.$filesUrl+'/order/proxypay/downloadBatchPayFile',
        isSubmit:false,
        batchPayForm:{
          tradeRmk:''
        },
        upfiles:'',
        batchPayRules: {}

      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      handlePreview(file) {
        console.log(file);
      },

      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      removeFiles(file, fileList){
        that.upfiles.delete('file');
      },

      upFiles(files){
        var that = this;
        that.upfiles = new FormData();
        that.upfiles.set('file',files.file);
      },

      nextPage(){
        var that = this;
        that.isSubmit = true;
        that.$axios({
          url:'/order/proxypay/batchProxyPayPreview',
          method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:that.upfiles
        }).then(function (result) {
          var res = result.data;
          var p = res.data;
          p.tradeRmk = that.batchPayForm.tradeRmk;
          if(res.code == '0000'){
            window.localStorage.setItem('batchPayInfo_p',JSON.stringify(p));
            that.$router.push({
              name: 'batchPayInfo',
              params:p
            })
          }else {
            that.$message.error(res.message)
          }
        }).catch(function (error) {
          console.log('error:',error);
          that.$message.error('系统异常')
        });
        setTimeout(function () {
          that.isSubmit = false;
        },800)

      },
      isLoading(){
        this.$refs.batchPayForm.resetFields();
      }
    }
  }
</script>
<style scoped>
.batchPay {
  position: relative;
  width: 65%;
  margin: 0 auto;
  padding-top: 40px;
}

.uploadfiles {
  display: inline-block;
}

.batchDownload {
  font-size: 15px;
  color: #333333;
  position: absolute;
  left: 113px;
}

.batchDownload img {
  margin-left: 15px;
  margin-right: 7px;
  margin-top: 13px;
}
.upFlies {
  color: #333333;
}
.batchBtn {
  margin-top: 40px;
}
</style>
