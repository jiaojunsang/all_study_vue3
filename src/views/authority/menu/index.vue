<template>
  <div>
    <el-card class="">
      <el-table :data="tableData" row-key="id" :border="true" style="width: 100%" class="mt20">
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="操作" label="操作" width="250">
          <template #default="{ row }">
            <el-button type="primary" size="small" :disabled="row.level == 4"
              @click="handleAdd(row)">{{ row.level == 3 ? '添加功能' : '添加菜单' }}</el-button>
            <el-button type="primary" size="small"  @click="handleEdit(row)">编辑</el-button>
            <el-popconfirm title="确定删除吗?"  @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button type="danger" size="small" >删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination v-show="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.limit"
        @pagination="getList" /> -->
    </el-card>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%" :before-close="handleClose"
      @close="dialogClose">
      <el-form ref="formDataRef" :model="formData" :rules="formRules" :label-width="120" class="demo-ruleForm"
        status-icon>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input v-model="formData.code" placeholder="请输入" />
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
import { menuListApi, menuAddApi, menuEditApi, menuDeleteApi } from "@/api/auth/menu"
import type { resMenuList_type, menuListItem_type ,menuRuqParams_type} from "@/api/auth/menu/type"
import { ElMessage } from 'element-plus'

const formDataRef = ref<any>(null)
const tableData = ref<menuListItem_type[]>([])

const formRules = {
  name: [
    { required: true, message: '不能为空', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '不能为空', trigger: 'blur' },
  ]
}
const dialogVisible = ref(false)
const dialogTitle = ref("菜单")
const formData = reactive<menuListItem_type>({
  name: "",
  code: "",
})

onMounted(() => {
  getList()
})
// 获取表格数据
const getList = () => {
  menuListApi().then((res: resMenuList_type) => {
    if (res.code == 200) {
      tableData.value = res.data
    }
  })
}
// 新增用户
const handleAdd = (row:menuListItem_type) => {
  dialogVisible.value = true
  dialogTitle.value = '新增菜单'
  formData.level = row.level
  formData.pid = row.id//pid为父级ID，新增是父ID为当前rowID
  
}
// 用户编辑
const handleEdit = (row: menuListItem_type) => {
  
  dialogVisible.value = true
  dialogTitle.value = '新增菜单'
  Object.assign(formData, row)
}
// 用户删除
const handleDelete = (id: number) => {
  menuDeleteApi(id).then((res: any) => {
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
          reset();
          dialogVisible.value = false
          getList()
        } else {
          ElMessage.error(res.message)
        }
      }
      const params:menuRuqParams_type = {
          "name": formData.name,
          "code": formData.code,
        }
      if (!formData.id) {
        params.level = formData.level as number + 1
        params.pid = formData.pid//pid为父级ID
        menuAddApi(params).then((res) => callback(res, 1))
      } else {
        params.id = formData.id as number;
        params.level = formData.level as number + 1
        params.pid = formData.pid//pid为父级ID
        menuEditApi(params).then((res) => callback(res, 2))
      }
    } else {
      ElMessage.error('请填写正确信息')
    }
  })
}
const handleClose = (done: any) => {
  done(false)
  reset();
}
const dialogClose = () => {
  reset();
}
const reset = () => {
  formDataRef.value.resetFields()
  formData.id = ''
  formData.name = ''
  formData.code = ''
}
</script>
<style scoped lang="scss"></style>