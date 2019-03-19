<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="产品名称" v-model="listQuery.name"> </el-input>
    <el-select v-model="listQuery.status" style="width: 200px;" class="filter-item" placeholder="状态">
      <el-option 
        v-for="item in selectStatus"
        :key="item.value"
        :label="item.label" 
        :value="item.value">
      </el-option>
    </el-select>
    <el-date-picker 
      v-model="handletime" 
      @keyup.enter.native="handleFilter"
      @change="changeTime"  
      class="filter-item" 
      type="daterange" 
      placeholder="选择时间范围" 
      range-separator="至" 
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    <el-button class="filter-item"  v-if="userManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="排序编号" width="65"> <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template> </el-table-column>
    <el-table-column width="" align="center" label="产品名称"> <template scope="scope">
        <span>{{scope.row.name}}</span>
      </template> </el-table-column>
    <el-table-column width="" align="center" label="所属平台"> <template scope="scope">
            <span>{{scope.row.platformAgentName}}</span>
          </template> </el-table-column>
    <el-table-column width="150" align="center" label="额度范围"> <template scope="scope">
            <span>{{scope.row.lowAmount	+ '-' + scope.row.highAmount}}</span>
          </template> </el-table-column>
    <el-table-column width="180" align="center" label="费率"> <template scope="scope">
            <span v-if="scope.row.rateType == 2 ">日利率{{scope.row.lowRate != scope.row.highRate ? scope.row.lowRate+'%-'+scope.row.highRate+'%':scope.row.highRate+'%'}}</span>
            <span v-if="scope.row.rateType == 3 ">月利率{{scope.row.lowRate != scope.row.highRate ? scope.row.lowRate+'%-'+scope.row.highRate+'%':scope.row.highRate+'%'}}</span>
            <span v-if="scope.row.rateType == 4 ">年利率{{scope.row.lowRate != scope.row.highRate ? scope.row.lowRate+'%-'+scope.row.highRate+'%':scope.row.highRate+'%'}}</span>
          </template> </el-table-column>
    <el-table-column width="" align="center" label="期限"> <template scope="scope">
          <span>{{scope.row.startMonth != scope.row.endMonth ? scope.row.startMonth+'-'+scope.row.endMonth : scope.row.endMonth}}{{scope.row.timeUnit == 1 ? '天' : '个月'}}</span>
        </template> </el-table-column>
    <el-table-column width="170" align="center" label="创建时间"> <template scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template> </el-table-column>
    <el-table-column width="170" align="center" label="更新时间"> <template scope="scope">
            <span>{{scope.row.updateTime}}</span>
          </template> </el-table-column>
    <el-table-column width="80" align="center" label="申请人数"> <template scope="scope">
            <span>{{scope.row.applyNum}}</span>
          </template> </el-table-column>
    <el-table-column width="120" align="center" label="状态"> <template scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusTextFilter}}</el-tag>
          </template> </el-table-column>
    <el-table-column width="150" align="center" label="备注"> <template scope="scope">
            <span>{{scope.row.remark}}</span>
          </template> </el-table-column>

    <el-table-column align="center" fixed="right" label="操作" width="212"> 
      <template scope="scope">
        <el-button v-if="scope.row.status == 1" size="small" type="primary" @click="handleStatus(scope.row,2)">下架</el-button>
        <el-button v-if="scope.row.status != 1" size="small" type="primary" @click="handleStatus(scope.row,1)">上架</el-button>
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
      :page-sizes="[10,20,30, 50]" 
      :page-size="listQuery.pageSize" 
      layout="total, sizes, prev, pager, next, jumper" 
      :total="total"> 
    </el-pagination>
  </div>
  <el-dialog class="flux" top="10%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="proForm" :rules="rules" ref="proForm" label-width="120px">
      <el-form-item label="产品名称" prop="name">
        <el-input v-if="dialogStatus == 'create'" v-model="proForm.name" placeholder="请输入"></el-input>
        <el-input v-else v-model="proForm.name" placeholder="请输入" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所属平台" prop="platformAgentId">
        <el-select v-model.number="proForm.platformAgentId" :disabled="dialogStatus == 'update'">
          <el-option 
            v-for="item in jgList"
            :label="item.platformName" 
            :value="item.id"
            :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="URL地址" prop="productUrl">
        <el-input v-model="proForm.productUrl" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="最低额度(元)" prop="lowAmount" style="display:inline-block;width: 50%;">
        <el-input v-model.number="proForm.lowAmount" type="number" min="0" placeholder="最低贷款额度"></el-input>
      </el-form-item>
      <el-form-item label="最高额度(元)" prop="highAmount" style="display:inline-block;width: 49%;">
        <el-input v-model.number="proForm.highAmount" type="number" min="0"  placeholder="最高贷款额度"></el-input>
      </el-form-item>
      <el-form-item label="费率类别" prop="rateType" style="display:inline-block;width: 33%;">
        <el-select v-model.number="proForm.rateType">
          <el-option label="日利率" :value="2"></el-option>
          <el-option label="月利率" :value="3"></el-option>
          <el-option label="年利率" :value='4'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最低费率(%)" prop="lowRate" style="display:inline-block;width: 33%;">
        <el-input v-model.number="proForm.lowRate"  type="number" min="0" placeholder="最低费率"></el-input>
      </el-form-item>
      <el-form-item label="最高费率(%)" prop="highRate" style="display:inline-block;width: 33%;">
        <el-input v-model.number="proForm.highRate" type="number" min="0" placeholder="最高费率"></el-input>
      </el-form-item>
      <el-form-item label="最低贷款期限" prop="startMonth" style="display:inline-block;width: 50%;">
        <el-input v-model.number="proForm.startMonth"  type="number" min="0" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="最高贷款期限" prop="endMonth" style="display:inline-block;width: 49%;">
        <el-input v-model.number="proForm.endMonth"  type="number" min="0" placeholder="请输入"></el-input>
      </el-form-item>
      <!-- <el-form-item label="贷款期限" prop="time">
        <el-input v-model="form.startMonth" type="number" style="width: 200px;" placeholder="开始时间"></el-input> ~ 
        <el-input v-model="form.endMonth" type="number" style="width: 200px;" placeholder="结束时间"></el-input>
      </el-form-item> -->
      <el-form-item label="贷款时间单位" prop="timeUnit">
        <el-radio-group v-model.number="proForm.timeUnit">
          <el-radio :label="1" >天</el-radio>
          <el-radio :label="2" >月</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="到账说明" prop="arriRemark">
        <el-input v-model="proForm.arriRemark" placeholder="如：平均一个小时到账"></el-input>
      </el-form-item>
      <el-form-item label="排序编号" prop="orderNum">
        <el-input v-model.number="proForm.orderNum" placeholder="请输入APP用户端产品展示的顺序"></el-input>
      </el-form-item>
      <el-form-item label="申请人数" prop="applyNum">
        <el-input v-model="proForm.applyNum" type="number" min="0" placeholder="申请人数"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="proForm.remark"  placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('proForm')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('proForm')">确 定</el-button>
      <el-button v-else type="primary" @click="update('proForm')">确 定</el-button>
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
  getAllObj
} from 'api/fluxPlat/product/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger',
        0: 'warning'
      }
      return statusMap[status]
    },
    statusTextFilter(status){
      const statusTextMap = {
        1: '已上架',
        2: '已下架',
        0: '未上架'
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
      proForm: {
        name:undefined,	// 产品名称
        platformAgentId:undefined, // 所属平台id
        productUrl:undefined,	// 产品URL地址
        lowAmount:undefined,	// 额度范围：最低金额
        highAmount:undefined,	// 额度范围：最高金额
        rateType:undefined,	// 产品费率类型：1=最低费率；2=日费率；3=月费率；4=年费率；5=最高费率
        lowRate:null,	// 产品费率：最低费率
        highRate:null,	// 产品费率：最高费率
        startMonth:undefined,	// 贷款期限：开始时间
        endMonth:undefined,	// 贷款期限：结束时间
        timeUnit:2,	// 贷款期限时间单位：1=天；2=月
        arriRemark:undefined,	// 到账说明
        orderNum:undefined,	// 排序编号
        remark:undefined,// 备注
        applyNum:undefined
      },
      rules: {
        name: [  { required: true,  message: '必填',  trigger: 'blur' }],
        platformAgentId: [{required: true, type: 'number', message: '必填',trigger: 'change'}],
        productUrl: [{required: true,message: '必填',trigger: 'blur'}],
        lowAmount: [{required: true,type: 'number', message: '必填',trigger: 'blur'}],
        highAmount: [{required: true,type: 'number', message: '必填',trigger: 'blur'}],
        lowRate: [{required: true, type: 'number',message: '必填',trigger: 'blur'}],
        highRate: [{required: true, type: 'number',message: '必填',trigger: 'blur'}],
        rateType: [{required: true, type: 'number', message: '必填',trigger: 'change'}],
        startMonth: [{required: true,type: 'number', message: '必填',trigger: 'blur'}],
        endMonth: [{required: true, type: 'number',message: '必填',trigger: 'blur'}],
        timeUnit: [{required: true,type: 'number',message: '必填',trigger: 'change'}],
        arriRemark: [{required: true,message: '必填',trigger: 'blur'}],
        orderNum: [{required: true,type: 'number',message: '必填',trigger: 'blur'}]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        platformName: null,	// 平台名称
        platformNo:null,// 平台机构号
        status:null,	// 状态：1=启用；2=禁用
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
      selectStatus:[
        {value:'',label:'--全部--'},
        {value:'0',label:'未上架'},
        {value:'1',label:'已上架'},
        {value:'2',label:'已下架'},
      ],
      jgList :[]
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
    changeTime(time){
      let arr = time.split('至')
      this.listQuery.createTime1 = arr[0]
      this.listQuery.createTime2 = arr[1]
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
    getAlljg(){
      return getAllObj().then(res=>{
        if(res.code != '0000'){
          this.$message.error(res.message)
        }else{
          this.jgList = res.data
        }
      })
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.getAlljg()
    },
    handleUpdate(row) {
      this.getAlljg().then(()=>{
      getObj(row.id)
        .then(response => {
          if(response.code != '0000'){
            this.$message.error(response.message)
          }else{
            this.proForm = response.data;
            this.dialogFormVisible = true;
            this.dialogStatus = 'update';
          }
        });
      })
    },
    handleStatus(row,num){
      let obj = {
        id:row.id,
        status:num
      }
      updateStatus(obj).then(response=>{
        if(response.code === '0000'){
          this.getList();
          this.$notify({
            title: '成功',
            message: '状态修改成功',
            type: 'success',
            duration: 2000
          });
        }else{
          this.$message.error(response.message)
        }
      })
    },
    handleDelete(row) {
      if(row.status == 1){
        this.$message.warning('已上架产品不能删除。');
        return
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              if(res.code != '0000'){
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
          addObj(this.proForm)
            .then((res) => {
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
          this.proForm.password = undefined;
          putObj(this.proForm).then(res => {
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
      this.proForm = {
        name:undefined,	// 产品名称
        platformAgentId:undefined, // 所属平台id
        productUrl:undefined,	// 产品URL地址
        lowAmount:undefined,	// 额度范围：最低金额
        highAmount:undefined,	// 额度范围：最高金额
        rateType:undefined,	// 产品费率类型：1=最低费率；2=日费率；3=月费率；4=年费率；5=最高费率
        lowRate:undefined,	// 产品费率：最低费率
        highRate:undefined,	// 产品费率：最高费率
        startMonth:undefined,	// 贷款期限：开始时间
        endMonth:undefined,	// 贷款期限：结束时间
        timeUnit:2,	// 贷款期限时间单位：1=天；2=月
        arriRemark:undefined,	// 到账说明
        orderNum:undefined,	// 排序编号
        remark:undefined,	// 备注
        applyNum:undefined
      };
    }
  }
}
</script>
