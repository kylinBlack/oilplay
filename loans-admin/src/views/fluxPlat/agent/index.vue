<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="平台名称" v-model="listQuery.platformName"> </el-input>
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="平台机构号" v-model="listQuery.platformNo"> </el-input>
    <el-select v-model="listQuery.status" style="width: 200px;" class="filter-item" placeholder="状态">
      <el-option label="--全部--" value=""></el-option>
      <el-option label="启用" value='1'></el-option>
      <el-option label="禁用" value="2"></el-option>
    </el-select>
    <el-date-picker
      v-model="handletime"
      type="daterange"
      class="filter-item" 
      @keyup.enter.native="handleFilter"
      @change="changeTime"
      align="right"
      unlink-panels
      range-separator="至"
      placeholder="选择日期范围"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    <el-button class="filter-item"  v-if="userManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="序号" width="65"> <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template> </el-table-column>
    <el-table-column width="" align="center" label="平台名称"> <template scope="scope">
        <span>{{scope.row.platformName}}</span>
      </template> </el-table-column>
    <el-table-column width="" align="center" label="平台机构号"> <template scope="scope">
            <span>{{scope.row.platformNo}}</span>
          </template> </el-table-column>
    <el-table-column width="200" align="center" label="官网地址"> <template scope="scope">
            <span>{{scope.row.websiteUrl}}</span>
          </template> </el-table-column>
    <el-table-column width="" align="center" label="联系人姓名"> <template scope="scope">
            <span>{{scope.row.contactName}}</span>
          </template> </el-table-column>
    <el-table-column width="" align="center" label="联系人电话"> <template scope="scope">
          <span>{{scope.row.contactPhone}}</span>
        </template> </el-table-column>
    <el-table-column width="154" align="center" label="客服电话"> <template scope="scope">
            <span>{{scope.row.customerPhone}}</span>
          </template> </el-table-column>
    <el-table-column width="170" align="center" label="创建时间"> <template scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template> </el-table-column>
    <el-table-column width="170" align="center" label="更新时间"> <template scope="scope">
            <span>{{scope.row.updateTime}}</span>
          </template> </el-table-column>
    <el-table-column width="90" align="center" label="状态"> <template scope="scope">
            <!-- <span>{{scope.row.status}}</span> -->
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusTextFilter}}</el-tag>
          </template> </el-table-column>
    <el-table-column width="80" align="center" label="备注"> <template scope="scope">
            <span>{{scope.row.remark}}</span>
          </template> </el-table-column>

    <el-table-column align="center" fixed="right" label="操作" width="220"> <template scope="scope">
        <el-button size="small" type="primary" @click="handleStatus(scope.row)">{{ scope.row.status == 1 ? '禁用' : '启用'}}
        </el-button>
        <el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
        </el-button>
        <el-button v-if="userManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
        </el-button>
      </template> </el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page.sync="listQuery.pageNo" 
      :page-sizes="[10,20,30,50]" 
      :page-size="listQuery.pageSize" 
      layout="total, sizes, prev, pager, next, jumper" 
      :total="total"> 
    </el-pagination>
  </div>
  <el-dialog class="flux" top="5%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="平台名称" prop="platformName">
        <el-input v-if="dialogStatus == 'create'" v-model="form.platformName" placeholder="请输入平台名称"></el-input>
        <el-input v-else v-model="form.platformName" placeholder="请输入平台机构号" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="平台机构号" prop="platformNo">
        <el-input v-if="dialogStatus == 'create'" v-model="form.platformNo" placeholder="请输入平台机构号"></el-input>
        <el-input v-else v-model="form.platformNo" placeholder="请输入平台机构号" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="简称">
        <el-input v-model="form.shortName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="平台logo" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/web/upload"
          :show-file-list="false"
          :on-success="cropUploadSuccess"
          :before-upload="cropSuccess">
          <img v-if="form.logoUrl" :src=" '/web' +form.logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="官网地址">
        <el-input  placeholder="请输入内容" v-model="form.websiteUrl"> </el-input>
      </el-form-item>
      <el-form-item label="APP名称">
        <el-input  placeholder="请输入内容" v-model="form.appName"> </el-input>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="contactName">
        <el-input  placeholder="请输入内容" v-model="form.contactName"> </el-input>
      </el-form-item>
      <el-form-item label="联系人电话" prop="contactPhone">
        <el-input  placeholder="请输入内容" v-model="form.contactPhone"> </el-input>
      </el-form-item>
      <el-form-item label="客服电话">
        <el-input  placeholder="请输入内容" v-model="form.customerPhone"> </el-input>
      </el-form-item>
      <el-form-item label="所在省市">
        <el-select class="filter-item" v-model="form.proCode" @change="checkProvince" placeholder="省">
          <el-option 
            v-for="item in provinces"
            :label="item.provinceName"
            :value="item.provinceCode"
            :key="item.provinceCode">
          </el-option>
        </el-select>
        <el-select class="filter-item" v-model="form.cityCode" placeholder="市">
          <el-option 
            v-for="item in citys"
            :label="item.cityName"
            :value="item.cityCode"
            :key="item.cityCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input  placeholder="请输入内容" v-model="form.address"> </el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input  placeholder="请输入内容" v-model="form.remark"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
      <el-button v-else type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  updateStatus,
  findProvince,
  findCity
} from 'api/fluxPlat/agent/index';
import myUpload  from "vue-image-crop-upload";
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  components: {
    myUpload
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusTextFilter(status){
      const statusTextMap = {
        1: '启用',
        2: '禁用'
      }
      return statusTextMap[status]
    }
  },
  data() {
    return {
      handletime:'',
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
      form: {
        platformName: undefined,// 平台名称
        platformNo: undefined,// 平台编号
        shortName: '',// 简称
        logoUrl: undefined,// logo图标
        appName: undefined,// app名称
        address: undefined,// 地址
        websiteUrl: undefined,// 官网地址
        contactName: undefined,// 联系人
        contactPhone: undefined,// 联系电话
        customerPhone: undefined,// 客服电话
        remark: undefined,//  备注
        proCode:'',	// 省份code
        cityCode:''	// 城市code
      },
      rules: {
        platformName: [{required: true, message: '请输入', trigger: 'blur'}],
        platformNo: [{required: true, message: '请输入',trigger: 'blur'}],
        logoUrl:[{required: true, message: '请上传logo',trigger: 'blur,change'}],
        contactName: [{required: true,message: '请输入',trigger: 'blur'}],
        contactPhone: [{required: true,message: '请输入',trigger: 'blur'}]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        platformName: null,	// 平台名称
        platformNo:null,// 平台机构号
        status:undefined,	// 状态：1=启用；2=禁用
        createTime1:null,	// 开始时间（yyyy-MM-dd）
        createTime2:null// 结束时间（yyyy-MM-dd）
      },
      dialogFormVisible: false,
      dialogStatus: '',
      userManager_btn_status:false,
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      provinces:[],
      citys:[]
    }
  },
  created() {
    this.getList();
    this.userManager_btn_edit = this.elements['userManager:btn_edit'];
    this.userManager_btn_del = this.elements['userManager:btn_del'];
    this.userManager_btn_add = this.elements['userManager:btn_add'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    checkProvince(val){
      if(!val)return
      findCity(val).then(res=>{
        if(res.code === '0000'){
          this.citys = res.data
        }else{
          this.$message.error(res.message)
        }
      })
    },
    changeTime(time){
      let arr = time.split('至')
      this.listQuery.createTime1 = arr[0]
      this.listQuery.createTime2 = arr[1]
    },
    cropSuccess(file){
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    cropUploadSuccess(res, file){
      // this.imgDataUrl = URL.createObjectURL(file.raw);
      this.form.logoUrl = res.data
    },
    getList() {
      this.listLoading = true;
      page(this.listQuery)
        .then(response => {
          if(response.code === '0000'){
            this.list = response.data.rows;
            this.total = response.data.total;
          }else{
            this.$message({
              message: response.message,
              type:'error'
            })
          }
          this.listLoading = false;
        })
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.getList();
    },
    findAllProvince(){
     return findProvince().then(res=>{
        if(res.code === '0000'){
          this.provinces = res.data
        }else{
          this.$message.error(res.message)
        }
        return res
      })
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.findAllProvince()
    },
    handleUpdate(row) {
      this.findAllProvince().then(()=>{
        findCity(row.proCode).then(res=>{
          if(res.code === '0000'){
            this.citys = res.data
          }else{
            this.$message.error(res.message)
          }
        })
        getObj(row.id)
          .then(response => {
            if(response.code !== '0000'){
              this.$message.error(res.message)
            }else{
            this.form = response.data;
            this.dialogFormVisible = true;
            this.dialogStatus = 'update';
            }
          });
      })

    },
    handleStatus(row){
      let obj = {
        id:row.id,
        status:row.status == 1 ? 2 : 1
      }
      updateStatus(obj).then(response=>{
        if(response.code !== '0000'){
            this.$message.error(res.message)
          }else{
            this.getList();
            this.$notify({
              title: '成功',
              message: '状态修改成功',
              type: 'success',
              duration: 2000
            });
          }
      })
    },
    handleDelete(row) {
      if(row.status == 1){
        this.$message.warning('启用状态下不能删除。');
        return
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(res => {
              if(res.code !== '0000'){
                this.$message.error(res.message)
              }else{
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                });
                const index = this.list.indexOf(row);
                this.list.splice(index, 1);
              }
            });
        });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then(res => {
              if(res.code !== '0000'){
                this.$message.error(res.message)
              }else{
                this.getList();
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                });
              }
              this.dialogFormVisible = false;
            })
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form).then((res) => {
            this.dialogFormVisible = false;
            if(res.code != '0000'){
              this.$message.error(res.message)
            }else{
              this.getList();
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {
        platformName: undefined,// 平台名称
        platformNo: undefined,// 平台编号
        shortName: '',// 简称
        logoUrl: undefined,// logo图标
        appName: undefined,// app名称
        address: undefined,// 地址
        websiteUrl: undefined,// 官网地址
        contactName: undefined,// 联系人
        contactPhone: undefined,// 联系电话
        customerPhone: undefined,// 客服电话
        remark: undefined,//  备注
        proCode:'',	// 省份id
        cityCode:''	// 城市id
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader{
  height: 100px;
}
</style>
