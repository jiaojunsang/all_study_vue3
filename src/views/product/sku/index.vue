<template>
  <div>
    <el-card>
      <el-table :data="tableData" :border="true" style="width: 100%" class="mt20">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="skuName" label="sku名称" />
        <el-table-column prop="skuDesc" label="sku描述" show-overflow-tooltip />
        <el-table-column prop="skuDefaultImg" label="图片">
          <template #default="{ row }">
            <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" fit="fill" />
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" show-overflow-tooltip />
        <el-table-column prop="price" label="价格" show-overflow-tooltip />
        <el-table-column prop="price" label="当前状态">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.isSale == 1">上架</el-tag>
            <el-tag type="info" v-else>下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="操作" label="操作" fixed="right" width="280">
          <template #default="{ row }">
            <el-button type="success" size="small" @click="handleUp(row)">{{ row.isSale == 0 ? '上架' : '下架'
              }}</el-button>
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
    </el-card>
    <el-drawer v-model="drawer" size="40%" title="查看信息" :before-close="handleClose">
      <el-descriptions class="" title="查看商品详情" :column="2" size="small" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon >
                <user />
              </el-icon>
              名称
            </div>
          </template>
          {{skuDetails.skuName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon >
                <iphone />
              </el-icon>
              描述
            </div>
          </template>
          {{skuDetails.skuDesc}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon >
                <location />
              </el-icon>
              价格
            </div>
          </template>
          {{skuDetails.price}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon >
                <tickets />
              </el-icon>
              平台属性
            </div>
          </template>
          <el-tag 
              v-for="(tag) in skuDetails.skuAttrValueList" 
              :key="tag.id" 
              class="mg10" 
              type="primary"
              >
                {{ tag.attrName }}
              </el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon >
                <office-building />
              </el-icon>
              销售属性
            </div>
          </template>
          <el-tag 
              v-for="(tag) in skuDetails.skuSaleAttrValueList" 
              :key="tag.id" 
              class="mg10" 
              type="primary"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <template v-if="skuDetails?.skuImageList?.length>0">
      <el-carousel :interval="4000" type="card" height="200px" class="mt20">
          <el-carousel-item v-for="item in skuDetails.skuImageList" :key="item">
          <img :src="item.imgUrl" alt="image" style="width: 100%;height: 100%;" />
        </el-carousel-item>
      </el-carousel>
    </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { skuListApi, skuCancelApi, skuUpApi, lookSkuApi ,deletesKUApi} from "@/api/product/sku"
import type { skuReqData, skuListItem_type } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

const queryParams = ref({
  page: 1,
  limit: 10
})
const tableData = ref<skuListItem_type[]>([])
const total = ref<number>(0)
const drawer = ref<boolean>(false)
const skuDetails = ref<skuListItem_type>({})
onMounted(() => {
  getList()
})
const getList = () => {
  skuListApi(queryParams.value.page, queryParams.value.limit).then((res: skuReqData) => {
    if (res.code == 200) {
      console.log(res.data);
      tableData.value = res.data.records
      total.value = res.data.total
    }
  })
}
// 上下架
const handleUp = (row: skuListItem_type) => {
  if (row.isSale == 0) {
    skuUpApi(row.id as number).then((res: any) => {
      if (res.code == 200) {
        getList()
        ElMessage.success('上架成功')
      } else {
        ElMessage.error(res.message)
      }
    })
  } else {
    skuCancelApi(row.id as number).then((res: any) => {
      if (res.code == 200) {
        getList()
        ElMessage.success('下架成功')
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}
const handleEdit = () => { }
const handleLook = (row:skuListItem_type) => {
  drawer.value = true
  lookSkuApi(row.id as number).then((res: any) => {
      if (res.code == 200) {
        skuDetails.value = res.data
        
      } else {
        ElMessage.error(res.message)
      }
    })
 }

const handleClose = (done: any) => {
  done(false)
}
const handleDelete = (id:number) => {
  deletesKUApi(id).then((res:any)=>{
    if(res.code == 200){
      ElMessage.success('删除成功')
      getList()
    }else{
      ElMessage.error(res.message)
    }
  })
}
</script>
<style scoped lang="scss"></style>