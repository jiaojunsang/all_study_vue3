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
      <!-- 场景一 -->
      <div v-show="scene==1">
        <el-button type="primary" icon="Plus" :disabled="!searchform.levelThreeValue"
          @click="handleAdd">添加属性</el-button>
        <el-table :data="tableData" :border="true" style="width: 100%" class="mt20">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="spuName" label="SPU名称" />
          <el-table-column prop="description" label="SPU描述" show-overflow-tooltip />
          <el-table-column prop="操作" label="操作">
            <template #default="{ row }">
              <el-button type="success" size="small" @click="handleAddSku(row)">添加</el-button>
              <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button type="info" size="small" @click="handleLook(row)">查看</el-button>
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
      <!-- 场景二 -->
      <div v-show="scene==2">
        <SpuForm ref="spuFormRef" @changeScene="(value:number)=>{scene=value}" @save="getList()"></SpuForm>
      </div>
      <!-- 场景三 -->
      <div v-show="scene==3">
        <SkuForm ref="skuFormRef" @changeScene="(value:number)=>{scene=value}"></SkuForm>
      </div>
      <el-dialog
      v-model="dialogVisible"
      title="sku列表"
      width="600"
      :before-close="handleClose"
  >
  <el-table :data="dialogTableData" :border="true" style="width: 100%" >
          <el-table-column prop="skuName" label="sku名字" width="100" />
          <el-table-column prop="price" label="sku价格" />
          <el-table-column prop="weight" label="sku重量"  />
          <el-table-column prop="skuDesc" label="sku描述"  />
          <el-table-column prop="skuDefaultImg" label="图片">
          <template #default="{ row, $index }">
            <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" fit="fill" />
          </template>
        </el-table-column>
        </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted,nextTick} from 'vue'
import { ElMessage} from 'element-plus'
import type { cateResponseData} from '@/api/product/attr/type'
import type { spuResponseData,spu,spuSkuAddData,skuListApi_Type} from '@/api/product/spu/type'
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'
import { 
  oneLevelCateApi,
  twoLevelCateApi,
  threeLevelCateApi
} from "@/api/product/attr"
import { reqSpuList,skuListApi,deleteSpuApi} from "@/api/product/spu"

const spuFormRef = ref<any>(null)
const skuFormRef = ref<any>(null)
const searchform = reactive({
  levelOneValue: '',
  levelTwoValue: '',
  levelThreeValue: '',
})
const levelOne = ref<any>([])
const levelTwo = ref<any>([])
const levelThree = ref<any>([])
const operationState = ref(false)
const scene = ref(1)//场景
const queryParams = ref({
  page: 1,
  limit: 10
})
const tableData = ref<any>([])
const total = ref<number>(0)
const dialogVisible = ref<boolean>(false)
const dialogTableData = ref<spuSkuAddData[]>([])

  onMounted(() => {
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
  threeLevelCateApi(value).then((res: any) => {
    if (res.code == 200) {
      levelThree.value = res.data
      // total.value = res.data.total
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 三级分类切换事件
const cateThreeChange = () => {
  nextTick(()=>{
    getList();
  })
  
}
// 获取表格数据
const getList = () => {
  const { levelThreeValue } = searchform
  reqSpuList(queryParams.value.page, queryParams.value.limit,levelThreeValue).then((res: spuResponseData) => {
    if (res.code == 200) {
      tableData.value = res.data.records
      total.value = res.data.total
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 添加数据
const handleAdd = () => {
  scene.value = 2
  spuFormRef.value.init({category3Id:searchform.levelThreeValue})
}
// 编辑数据
const handleEdit = (row:spu) => {
  scene.value = 2
  spuFormRef.value.init(row)
}
// 添加sku
const handleAddSku = (row:spu)=>{
  scene.value = 3
  const cateId:string[] = [
    searchform.levelOneValue,
    searchform.levelTwoValue,
    searchform.levelThreeValue
  ]
  skuFormRef.value.init(row,cateId)
}
const handleClose = (done:any)=>{
  done(false)
}
// 查看数据
const handleLook = (row:any) => {
  skuListApi(row.id).then((res:skuListApi_Type)=>{
    if(res.code == 200){
      dialogTableData.value = res.data
      dialogVisible.value = true
    }else{
      ElMessage.error(res.message)
    }
  })
}
// 删除数据
const handleDelete = (id: number) => {
  deleteSpuApi(id).then((res: any) => {
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
</style>