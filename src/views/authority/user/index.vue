<template>
  <div>
    <el-card>
      <el-form :model="queryParams" :label-width="0" inline>
        <el-row class="row-bg" justify="space-between">
          <el-col :span="6">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="queryParams.username" placeholder="请输入" />
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
      <el-button type="primary" icon="Plus" @click="handleAdd">添加用户</el-button>
      <el-button type="danger" icon="Plus" :disabled="tableSelected.length==0" @click="batchDelete" >批量删除</el-button>
      <el-table :data="tableData" :border="true" style="width: 100%" class="mt20" @selection-change="tableSelection">
        <el-table-column type="selection" label="" width="60" align="center" />
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="name" label="用户名字" />
        <el-table-column prop="username" label="用户名称" />
        <el-table-column prop="roleName" label="用户角色" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="操作" label="操作" width="250">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleAllocation(row)">分配角色</el-button>
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
    <el-drawer v-model="drawer" size="40%" :title="formData.id ? '编辑信息' : '新增信息'" :before-close="handleClose"
      @close="drawerClose">
        <el-form :model="formData" :rules="rules" ref="formDataRef" :label-width="120">
          <el-form-item label="用户名字" prop="name">
            <el-input v-model="formData.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="formData.username" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="showPassword">
            <el-input v-model="formData.password" placeholder="请输入" />
          </el-form-item>
        </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="roleDrawer" size="40%" :title="'分配角色'" :before-close="rolehandleClose" @close="roleClose"
      >
        <el-form :model="roleFormData" :rules="rules" ref="roleFormDataRef" :label-width="120">
          <el-form-item label="用户名字" prop="name">
            <el-input v-model="roleFormData.name" disabled placeholder="请输入" />
          </el-form-item>
          <el-form-item label="用户名称" prop="username">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
             全选
            </el-checkbox>
            <el-checkbox-group
              v-model="selected"
              @change="handleCheckedRoleChange"
            >
              <el-checkbox v-for="item in allRoleList" :key="item"  :value="item">
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="roleDrawer=false">取消</el-button>
          <el-button type="primary" @click="roleConfirm">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'
import { userListApi, userAddApi, userEditApi, userDeleteApi, userBatchDeleteApi,userRoleListApi,userShareRoleApi } from "@/api/auth/user"
import type { userList_type, userListItem_type,userRoleList_type,userRoleListItem_type,userRoleRuqParams_type } from "@/api/auth/user/type"
import { ElMessage } from 'element-plus'
// const { proxy } = getCurrentInstance();
const formDataRef = ref<any>(null)
const roleFormDataRef = ref<any>(null)

const showPassword = computed<boolean>(() => {
  return formData.id == '' ? true : false
})
const queryParams = ref({
  page: 1,
  limit: 10,
  username:''
})
const tableData = ref<userListItem_type[]>([])
const total = ref<number>(1)
const tableSelected = ref<string[]|number[]>([])

const roleDrawer = ref<boolean>(false)
const roleFormData = reactive<userListItem_type>({
  name: "",
  id: '',
})
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(false)
const userRoleList = ref<userRoleListItem_type[]>([])
const selected = ref<userRoleListItem_type[]>([])
const allRoleList = ref<userRoleListItem_type[]>([])

const drawer = ref<boolean>(false)
const formData = reactive<userListItem_type>({
  name: "",
  username: "",
  password: '',
  id: '',
})
const rules = {
  name: [
    { required: true, message: '用户名字不能为空', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在5-12之间', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '用户名称不能为空', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在5-12之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '用户密码不能为空', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度在6-12之间', trigger: 'blur' },
  ]
}
onMounted(() => {
  getList()
})
// 获取表格数据
const getList = () => {
  const params = {
    username:queryParams.value.username
  }
  userListApi(queryParams.value.page, queryParams.value.limit,params).then((res: userList_type) => {
    if (res.code == 200) {
      tableData.value = res.data.records
      total.value = res.data.total
    }
  })
}
// 搜索重置
const searchReset = ()=>{
  queryParams.value.username = ''
  getList();
}
// 表格选择变化
const tableSelection = (value:any)=>{
  tableSelected.value = value.map((item:userListItem_type)=>{
    return item.id as string
  })
}
// 批量删除
const batchDelete = ()=>{
  userBatchDeleteApi(tableSelected.value).then((res: any)=>{
    if (res.code == 200) {
      ElMessage.success('删除成功')
      getList()
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 用户drawer关闭前回调
const handleClose = (done: any) => {
  reset();
  done(false)
}
// 用户drawer关闭
const drawerClose = () => {
  formDataRef.value.resetFields();
  reset();
}
// 分配权限
const handleAllocation = (row: userListItem_type)=>{
  userRoleListApi(row.id as string).then((res:userRoleList_type)=>{
    if (res.code == 200) {
      userRoleList.value = res.data.assignRoles
      allRoleList.value = res.data.allRolesList
    } else {
      ElMessage.error(res.message)
    }
  })
  roleDrawer.value = true
  Object.assign(roleFormData, row)
}
// 全选切换
const handleCheckAllChange = (val:boolean)=>{
  selected.value = val? allRoleList.value : []
  isIndeterminate.value = false
}
// 角色切换
const handleCheckedRoleChange = (value:string[])=>{
  checkAll.value = value.length == allRoleList.value.length && value.length!= 0
  isIndeterminate.value = value.length > 0 && value.length<allRoleList.value.length
}
// 角色分配确定
const roleConfirm = ()=>{
  const params:userRoleRuqParams_type = {
    roleIdList:selected.value.map((item:userRoleListItem_type)=>item.id) as number[],
    userId:roleFormData.id
  }
  // return
  userShareRoleApi((params)).then((res: any) => {
    if (res.code == 200) {
      ElMessage.success('分配成功')
      roleDrawer.value = false
      getList()
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 角色drawer关闭前回调
const rolehandleClose = (done:any)=>{
  roleReset()
  done(false)
}
// 角色drawer关闭
const roleClose = ()=>{
  roleReset()
}
// 新增用户
const handleAdd = () => {
  drawer.value = true
}
// 用户编辑
const handleEdit = (row: userListItem_type) => {
  drawer.value = true
  // formData.name =row.name
  // formData.username = row.username
  // formData.id = row.id
  Object.assign(formData, row)
}
// 用户删除
const handleDelete = (id: number) => {
  userDeleteApi(id).then((res: any) => {
    if (res.code == 200) {
      ElMessage.success('删除成功')
      getList()
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 用户取消
const cancel = () => {
  formDataRef.value.resetFields()
  drawer.value = false
}
// 用户确认
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
        userAddApi(formData).then((res) => callback(res, 1))
      } else {
        userEditApi(formData).then((res) => callback(res, 2))
      }
    } else {
      ElMessage.error('请填写正确信息')
    }
  })
}
// 用户表单重置
const reset = () => {
  formDataRef.value.resetFields()
  formData.id = ''
  formData.name = ''
  formData.username = ''
  formData.password = ''
}
// 角色表单重置
const roleReset = ()=>{
  roleFormDataRef.value.resetFields()
  roleFormData.id = ''
  roleFormData.name = ''
  selected.value = []
  isIndeterminate.value = false
}
</script>
<style scoped lang="scss"></style>