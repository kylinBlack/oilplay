<template>
  <div class="myProduct">
    <el-row class="pcontent">
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
      <el-col :xs="22" :sm="22" :md="16" :lg="16" :xl="16">
        <!-- 产品列表 -->
        <div class="productList"   >
          <el-table
            v-loading="loading"
            :data="productListData"
            border
            style="width: 100%;text-align: center">
            <el-table-column
              prop="productType"
              label="产品名称"
              header-align="center"
              width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.productType == '01'">易收</span>
                <span v-if="scope.row.productType == '02'">易付</span>
                <span v-if="scope.row.productType == '03'">易查</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="businessTypeList"
              label="业务类型"
              header-align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="status"
              header-align="center"
              label="审核进度">
              <template slot-scope="scope">
                <span v-if="scope.row.status  == 'SAVE'">暂存</span>
                <span v-if="scope.row.status  == 'SUBMITED'">提交</span>
                <span v-if="scope.row.status  == 'CONFIRMED'">审核</span>
                <span v-if="scope.row.status  == 'PASSED'">通过</span>
                <span v-if="scope.row.status  == 'FAIL'">不通过</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="isOpen"
              header-align="center"
              label="开通情况">
              <template slot-scope="scope">
                <span v-if="scope.row.isOpen  == 'Y'">已开通</span>
                <span v-if="scope.row.isOpen  == 'N'">未开通</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="enableTime"
              header-align="center"
              label="开通日期">
            </el-table-column>
            <el-table-column
              prop="validTime"
              header-align="center"
              label="有效期至">
            </el-table-column>
            <el-table-column
              header-align="center"
              label="API文档">
              <template slot-scope="scope">
                <el-button type="text" @click="goApi">查看API</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
        <pre> </pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: "myProduct",
    data(){
      return {
        isShow:false,
        productListData: [],
        loading:true
      }
    },
    methods: {
      isHideProtol(){
        this.isShow = !this.isShow
      },

      getProducts(){
        var that = this;
        that.$axios.post('/merchant/mpProductApply/queryMyProduct').then(function (result) {

          that.loading = false
          var res = result.data;
          if(res.code == '0000'){
            that.productListData = res.data;
          }else {
            that.$message.error(res.message)
          }
        }).catch(function (error) {
          console.log("getProductError:",error)
        })
      },

      goApi(){
        window.open('http://docs.open.iebt.net/template/api/apiMenu.html','_blank')
      }
    },
    created(){
      this.$emit('changewindowSize', '','产品申请');
      this.getProducts()
    }
  }
</script>
<style scoped>
  .productList, .productProtos, .myProduct .el-table {
    position: relative;
    width: 100%;
  }
  .productList{
    margin-top:52px;
    margin-bottom:50px;
  }
  .productProtos{
    margin-bottom:50px;
  }
  .productBtnH{
    text-align: right;
  }
</style>
