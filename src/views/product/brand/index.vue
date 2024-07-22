<template>
  <div>
    <el-card>
      <!-- 已注册的组件不需要引入，直接写字符串形式 -->
      <el-button type="primary" icon="Plus" @click="handleAdd">添加品牌</el-button>
      <el-table :data="tableData" :border="true" style="width: 100%" class="mt20">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="tmName" label="品牌" />
        <el-table-column prop="logoUrl" label="logo">
          <template #default="{ row }">
            <el-image style="width: 100px; height: 100px" :src="row.logoUrl" fit="fill" />
          </template>
        </el-table-column>
        <el-table-column prop="操作" label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-popconfirm title="确定删除吗?"  @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
           
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.limit"
        @pagination="getList" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%" :before-close="handleClose" @close="dialogClose">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        :label-width="120"
        class="demo-ruleForm"
        status-icon
      >
    <el-form-item label="品牌名称" prop="tmName">
      <el-input v-model="formData.tmName" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="品牌logo" prop="logoUrl">
      <el-upload
        class="avatar-uploader"
        :action="baseURL+'/admin/product/fileUpload'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="formData.logoUrl" :src="formData.logoUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
  </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { reqBrandList,addBrandApi,editBrandApi ,deleteBrandApi} from "@/api/product/brand"
import type { brandResponseData, records,brand } from '@/api/product/brand/type'
import { ElMessage, type UploadProps } from 'element-plus'
const queryParams = ref({
  page: 1,
  limit: 10
})
const tableData = ref<records>([])
const total = ref<number>(1)

const dialogVisible = ref(false)

const dialogTitle = ref("品牌")

const formRef = ref<any>(null)
const baseURL = ref(import.meta.env.VITE_APP_BASE_API)
const formData = reactive<brand>({
  tmName: "",
  logoUrl: ""
})
const validateImg = (rule: any, value: any, callback: any)=>{
  if (value === '') {
    callback(new Error('图片不能为空'))
  }else {
    callback()
  }
}
const formRules = {
  tmName: [
    { required: true, message: '不能为空', trigger: 'blur' },
  ],
  logoUrl: [
    { required: true, validator: validateImg, },
  ],
}
onMounted(() => {
  getList()
})
const getList = () => {
  reqBrandList(queryParams.value.page, queryParams.value.limit).then((res: brandResponseData) => {
    if (res.code == 200) {
      console.log(res.data);
      tableData.value = res.data.records
      total.value = res.data.total
    }
  })
}
const handleAdd = ()=>{
  dialogVisible.value = true
  dialogTitle.value = "添加品牌"
}
const handleEdit = (row:brand) => {
  console.log(row,'www');
  
  dialogVisible.value = true
  dialogTitle.value = "修改品牌"
  Object.assign(formData,row)
}
const handleDelete = (id:number) => {
  deleteBrandApi(id).then((res:any)=>{
    if(res.code == 200){
      ElMessage.success('删除成功')
      getList()
    }else{
      ElMessage.error(res.message)
    }
  })
}
const handleClose = (done:any)=>{
  done(false)
  reset();
}
const dialogClose = ()=>{
  reset();
}
const handleAvatarSuccess:UploadProps['onSuccess']  = (res:any)=>{
  formData.logoUrl = res.data
  formRef.value.clearValidate('logoUrl');//上传成功之后清楚图片校验效果
}
const beforeAvatarUpload:UploadProps['beforeUpload'] = ()=>{

}
const confirm = ()=>{
  formRef.value.validate((valid:boolean)=>{
    if(valid){
      if(!formData.id){
    addBrandApi(formData).then((res:any)=>{
      if(res.code == 200){
        dialogVisible.value = false
        ElMessage.success('新增成功')
        getList()
      }else{
        ElMessage.error(res.message)
      }
    })
  }else{
    editBrandApi(formData).then((res:any)=>{
      if(res.code == 200){
        dialogVisible.value = false
        ElMessage.success('修改成功')
        getList()
      }else{
        ElMessage.error(res.message)
      }
    })
  }
    }else{
      ElMessage.error('请填写正确信息')
    }
  })
}
const reset = ()=>{
  formRef.value.resetFields()
  formData.id = ''
}
</script>
<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color) !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar{
  width: 100px;
  height: 100px;
}
</style>