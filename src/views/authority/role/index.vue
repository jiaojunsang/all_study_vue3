<template>
  <div>
    <el-card>
      <el-form :model="queryParams" :label-width="0" inline>
        <el-row class="row-bg" justify="space-between">
          <el-col :span="6">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="queryParams.roleName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="getList()">查询</el-button>
            <el-button type="default" @click="searchReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <!-- 已注册的组件不需要引入，直接写字符串形式 -->
      <el-button type="primary" icon="Plus" @click="handleAdd">添加角色</el-button>
      <el-table :data="tableData" :border="true" style="width: 100%" class="mt20" >
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="操作" label="操作" width="250">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleAllocation(row)">分配权限</el-button>
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-popconfirm title="确定删除吗?" @confirm="handleDelete(row.id)">
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
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%" :before-close="handleClose" @close="dialogClose">
      <el-form
        ref="formDataRef"
        :model="formData"
        :rules="formRules"
        :label-width="120"
        class="demo-ruleForm"
        status-icon
      >
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="formData.roleName" placeholder="请输入" />
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
    <el-drawer v-model="drawer" size="40%" :title="'分配菜单'" :before-close="drawerHandleClose"
      @close="drawerClose">
      <el-tree
      ref="treeRef"
      v-loading="treeLoading"
      :data="treeData"
       :default-checked-keys="defaultChecked"
        style="max-width: 600px"
        :props="treeProps"
        default-expand-all
        node-key="id"
        show-checkbox
        @check-change="treeHandleCheckChange"
      />
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer=false">取消</el-button>
          <el-button type="primary" @click="drawerConfirm">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted} from 'vue'
import { roleListApi,roleAddApi,roleEditApi,roleDeleteApi,roleMenuListApi,roleShareMenuApi } from "@/api/auth/role"
import type {roleList_type,roleListItem_type,roleMenuList_type,roleMenuListItem_type,roleMenuRuqParams_type  } from "@/api/auth/role/type"
import { ElMessage } from 'element-plus'
const formDataRef = ref<any>(null)
const treeRef = ref<any>(null)
const queryParams = ref<any>({
  page: 1,
  limit: 10,
  roleName:''
})
const tableData = ref<roleListItem_type[]>([])
const total = ref<number>(1)
const dialogVisible = ref<boolean>(false)
const dialogTitle = ref<string>("品牌")
const formData = reactive<roleListItem_type>({
  roleName: "",
  id:''
})
const formRules = {
  roleName: [
    { required: true, message: '角色名字不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '长度在2-12之间', trigger: 'blur' },
  ],
}
const drawer = ref<boolean>(false)
const curRoleId = ref<string>('')
const treeData = ref<roleMenuListItem_type[]>([])
const treeLoading = ref<boolean>(false)
const treeProps = {
  children: 'children',
  label: 'name',
}
const defaultChecked = ref<number[]>([])

onMounted(() => {
  getList()
})
// 获取表格数据
const getList = () => {
  const params = {
    roleName:queryParams.value.roleName
  }
  roleListApi(queryParams.value.page, queryParams.value.limit,params).then((res: roleList_type) => {
    if (res.code == 200) {
      tableData.value = res.data.records
      total.value = res.data.total
    }
  })
}
// 搜索重置
const searchReset = ()=>{
  queryParams.value.roleName = ''
  getList();
}
const handleClose = (done:any)=>{
  done(false)
  reset();
}
const dialogClose = ()=>{
  reset();
}
const handleAllocation = (row:roleListItem_type)=>{
  drawer.value = true;
  treeLoading.value = true;
  curRoleId.value = row.id as string
  roleMenuListApi(row.id as string).then((res:roleMenuList_type)=>{
    if (res.code == 200) {
      treeData.value = res.data
      treeLoading.value = false;
      // console.log(format((res.data as roleMenuListItem_type[]),[]),'11111111');
      
      defaultChecked.value = format((res.data as roleMenuListItem_type[]),[])
        } else {
          treeLoading.value = false;
          ElMessage.error(res.message)
        }
  })
}
// 获取已选节点ID
const format = (arr:roleMenuListItem_type[],list:number[])=>{
  arr.forEach((item: any) => {
    if(item.select && item.children && item.children.length<=0){
      list.push(Number(item.id) as number)
    }
    if (item.children && item.children.length > 0) {
      format(item.children,list);
    }
  })
  return list
}
const treeHandleCheckChange = ()=>{

}
const drawerHandleClose = (done: any) => {
  done(false)
}
const drawerClose = () => {
  drawer.value = false;
  drawerReset();
}
const drawerReset = ()=>{
  curRoleId.value = ''
}
const drawerConfirm = ()=>{
  const checkedKeys = treeRef.value.getCheckedKeys() as number[]
  const halfCheckedNodes = treeRef.value.getHalfCheckedKeys() as number[]
  const params:roleMenuRuqParams_type = {
    roleId:Number(curRoleId.value) as number,
    permissionIdList:[...checkedKeys,...halfCheckedNodes] as number[] 
  }
  roleShareMenuApi(params).then((res: any) => {
    if (res.code == 200) {
      ElMessage.success('分配菜单成功')
      drawerClose();
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 角色新增
const handleAdd = () => {
  dialogVisible.value = true
}
// 角色编辑
const handleEdit = (row: any) => {
  dialogVisible.value = true
  Object.assign(formData,row)
}
// 角色删除
const handleDelete = (id: number) => {
  roleDeleteApi(id).then((res: any) => {
    if (res.code == 200) {
      ElMessage.success('删除成功')
      getList()
    } else {
      ElMessage.error(res.message)
    }
  })
}
const confirm = () => {
  formDataRef.value.validate((valid: boolean) => {
    if (valid) {
      const callback = (res: any, type: number) => {
        if (res.code == 200) {
          ElMessage.success(`${type == 1 ? '新增' : '编辑'}成功`)
          cancel();
          getList()
        } else {
          ElMessage.error(res.message)
        }
      }
      if (!formData.id) {
        roleAddApi(formData).then((res) => callback(res, 1))
      } else {
        roleEditApi(formData).then((res) => callback(res, 2))
      }
    } else {
      ElMessage.error('请填写正确信息')
    }
  })
}
const cancel = ()=>{
  reset();
  dialogVisible.value = false
}
const reset = ()=>{
  formDataRef.value.resetFields()
  formData.id = ''
}

</script>
<style scoped lang="scss">
</style>