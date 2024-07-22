<template>
  <div>
    <el-card>
      <el-form ref="formRef" :model="searchform" inline :label-width="100" class="demo-ruleForm">
        <el-form-item label="一级分类" prop="levelOneValue">
          <el-select v-model="searchform.levelOneValue" placeholder="请选择" size="large" style="width: 240px"
            :disabled="operationState" @change="cateOneChange">
            <el-option v-for="item in levelOne" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="levelTwoValue">
          <el-select v-model="searchform.levelTwoValue" placeholder="请选择" size="large" style="width: 240px"
            :disabled="operationState" @change="cateTwoChange">
            <el-option v-for="item in levelTwo" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类" prop="levelThreeValue">
          <el-select v-model="searchform.levelThreeValue" placeholder="请选择" size="large" style="width: 240px"
            :disabled="operationState" @change="cateThreeChange">
            <el-option v-for="item in levelThree" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt20">

      <div v-show="operationState">
        <!-- 可操作状态 -->
        <el-form ref="formRef" :model="addform" inline  :label-width="100" class="demo-ruleForm"
          status-icon>
          <el-form-item label="属性名称" prop="tmName">
            <el-input v-model="addform.addValue"  placeholder="请输入" />
          </el-form-item>
        </el-form>
        <el-button type="primary" 
        icon="Plus" 
        @click="handleAdd"
        :disabled="addform.addValue.trim()==''?true:false"
        >添加属性</el-button>
        <el-button type="default" @click="operationState = !operationState">取消</el-button>
        <el-table :data="addTableData" :border="true" style="width: 100%" class="mt20">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="addValue" label="属性值名称">
            <template #default="{ row,$index}">
              <el-input v-model="row.valueName" :ref="($event) => inputRefFn($event,$index)" @blur="$event=>valueNameBlur(row,$index)" v-show="row.edit" style="width: 240px" placeholder="请输入" />
              <div v-show="!row.edit" @click="goEdit($index,row)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="操作" label="操作">
            <template #default="{ row ,$index}">
              <el-popconfirm title="确定删除吗?" @confirm="addTableData.splice($index,1)">
                <template #reference>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" class="mt15" @click="handleSave" :disabled="addTableData.length<=0">保存</el-button>
        <el-button type="default" class="mt15" @click="operationState = !operationState">取消</el-button>
        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.limit"
          @pagination="getList" />
      </div>
      <div v-show="!operationState">
        <!-- 纯展示状态 -->
        <el-button type="primary" icon="Plus" :disabled="!searchform.levelThreeValue"
          @click="operationState=true">添加属性</el-button>
        <el-table :data="tableData" :border="true" style="width: 100%" class="mt20">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="attrName" label="属性名称" />
          <el-table-column prop="attrValueList" label="属性值名称">
            <template #default="{ row }">
              <el-tag v-for="tag in row.attrValueList" :key="tag.id" class="mg10" closable type="primary">
                {{ tag.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="操作" label="操作">
            <template #default="{ row }">
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
      </div>

    </el-card>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted,nextTick} from 'vue'
import { 
  oneLevelCateApi,
   twoLevelCateApi,
    threeLevelCateApi,
     reqAttrListApi,
      addOperationApi,
      deleteAttrApi
     } from "@/api/product/attr"

import type { 
  cateResponseData,
   attrListResponseType,
    attrResponseListType,
    attrListItemResponseType
   } from '@/api/product/attr/type'
import { ElMessage} from 'element-plus'
import pagination from "@/components/Pagination/index.vue"


const searchform = reactive({
  levelOneValue: '',
  levelTwoValue: '',
  levelThreeValue: '',
})
const levelOne = ref<any>([])
const levelTwo = ref<any>([])
const levelThree = ref<any>([])
const queryParams = ref({
  page: 1,
  limit: 10
})
const operationState = ref(false)
// const addBtnDisabled = ref<boolean>(false)
const tableData = ref<attrResponseListType>([])
const total = ref<number>(1)
const formRef = ref<any>(null)

onMounted(() => {
  // getList()
  getCateOne();
})
const getCateOne = () => {
  oneLevelCateApi().then((res: cateResponseData) => {
    if (res.code == 200) {
      levelOne.value = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}
const cateOneChange = (value: string | number) => {
  searchform.levelTwoValue = ''
  searchform.levelThreeValue = ''
  levelTwo.value = []
  levelThree.value = []
  twoLevelCateApi(value).then((res: cateResponseData) => {
    if (res.code == 200) {
      levelTwo.value = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}
const cateTwoChange = (value: string | number) => {
  searchform.levelThreeValue = ''
  levelThree.value = []
  threeLevelCateApi(value).then((res: cateResponseData) => {
    if (res.code == 200) {
      levelThree.value = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 三级分类切换事件
const cateThreeChange = () => {
  getList();
}
// 获取表格数据
const getList = () => {
  const { levelOneValue, levelTwoValue, levelThreeValue } = searchform
  reqAttrListApi(levelOneValue, levelTwoValue, levelThreeValue).then((res: attrListResponseType) => {
    if (res.code == 200) {
      tableData.value = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 新增表格的数据
const addform = ref<any>({
  addValue:'',
  id:'',
})
const addTableData = ref<any>([])
// 动态ref的值
const addTableDataRef = ref<any>([])

const handleAdd = () => {
  addTableData.value.push({
    valueName: '',
    edit:true
  })
  nextTick(()=>{
    addTableDataRef.value[addTableDataRef.value.length-1].focus()
  })
}
// 新增表格输入框失去焦点事件
const valueNameBlur = (row:any,index:number)=>{
  const ok = addTableData.value.findIndex((item:any)=>{
      return item.valueName == row.valueName
  })
  if(row.valueName.trim()==''){
    ElMessage.error('值名称不能为空')
    addTableData.value.splice(index,1)
    return
  }else if(ok!=-1 && ok!=index){
    ElMessage.error('值名称不能重复')
    addTableData.value.splice(ok,1)
    return
  }
  row.edit = false
}
// 新增表格点击单元格去编辑
const goEdit = (index:number,row:any)=>{
  addTableData.value[index].edit = true
  nextTick(()=>{
    addTableDataRef.value[index].focus()
  })
}
// 获取动态ref
const inputRefFn = (element:any,index:number)=>{
  addTableDataRef.value[index] = element
  
}
// 编辑属性
const handleEdit = (row:attrListItemResponseType) => {
  operationState.value = true
  addform.value.addValue = row.attrName
  addform.value.id = row.id
  addTableData.value = row.attrValueList
}
// 保存数据
const handleSave = ()=>{
   const params:attrListItemResponseType = {
    attrName: addform.value.addValue,
    attrValueList: addTableData.value,
    categoryId: searchform.levelThreeValue,
    categoryLevel: 3,
    id: addform.value.id, 
  }
  addOperationApi(params).then(res=>{
    if(res.code == 200){
      ElMessage.success(params.id?'编辑成功':'新增成功')
      operationState.value = false
      // reset();
      addform.value.addValue = ''
      addform.value.id = ''
      addTableData.value = []
      getList()
    }else{
      ElMessage.error(res.message)
    }
  })
}
// 删除数据
const handleDelete = (id: number) => {
  deleteAttrApi(id).then((res: any) => {
    if (res.code == 200) {
      ElMessage.success('删除成功')
      getList()
    } else {
      ElMessage.error(res.message)
    }
  })
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

.avatar {
  width: 100px;
  height: 100px;
}
</style>