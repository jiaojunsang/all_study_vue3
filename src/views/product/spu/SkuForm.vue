<template>
  <el-form ref="formRef" :model="formData" :rules="rules" label-width="100" status-icon>
    <el-form-item label="sku名称" prop="skuName">
      <el-input v-model="formData.spuName" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="价格(元)" prop="price">
      <el-input v-model="formData.price" type="number" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="重量(克)" prop="weight">
      <el-input v-model="formData.weight" type="number" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="sku描述" prop="skuDesc">
      <el-input v-model="formData.skuDesc" type="textarea" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="平台属性" prop="skuAttrValueList">
      <el-form ref=""  label-width="100" inline>
        <el-form-item :label="item.attrName" prop="" v-for="item in formData.skuAttrValueList" :key="item.id">
          <el-select v-model="item._params" placeholder="请选择" style="width: 150px;">
            <el-option 
            :label="i.valueName" 
            :value="`${item.id}:${i.id}`" 
            v-for="(i) in item.attrValueList" 
            :key="i.id" 
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性" prop="skuSaleAttrValueList">
      <el-form ref=""  label-width="100" inline>
        <el-form-item :label="item.saleAttrName" prop="" v-for="item in formData.skuSaleAttrValueList" :key="item.id">
          <el-select v-model="item._params" placeholder="请选择" style="width: 150px;">
            <el-option 
            :label="i.saleAttrValueName" 
            :value="`${item.id}:${i.id}`" 
            v-for="(i) in item.spuSaleAttrValueList" 
            :key="item.id" 
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称" prop="skuImageList">
      <el-table :data="formData.skuImageList" ref="imgTableRef" :border="true" style="width: 100%" class="mt20">
        <el-table-column type="selection" label="序号" width="100" />
        <el-table-column prop="logoUrl" label="图片">
          <template #default="{ row, $index }">
            <el-image style="width: 100px; height: 100px" :src="row.imgUrl" fit="fill" />
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" />
        <el-table-column prop="操作" label="操作">
          <template #default="{ row,$index }">
            <el-button type="primary" size="small" @click="setDefault(row)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="" prop="">
      <el-button type="primary" @click="handelSave">保存</el-button>
      <el-button type="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import {reqAttrListApi} from '@/api/product/attr'
import {
  spuImageListApi,
  spuSaleAttrListApi,
  saveSkuInfoApi
} from '@/api/product/spu'
import type { 
  spu,
  spuSaleAttrList_type,
  spuBrandResponseDataList_type,
  spuBrandResponseDataItem_type,
  spuImageResponseDataList_type,
  spuImageResponseDataItem_type,
  spuAttrResponseDataList_type,
  spuAttrResponseDataItem_type,
  spuSaleAttrDataList_type,
  spuSaleAttrDataItem_type
} from '@/api/product/spu/type'
import type {  attrListResponseType} from '@/api/product/attr/type'
import type {  spuSkuAddData} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

const $emit = defineEmits(['changeScene', 'save'])
const formRef = ref<any>(null)
const imgTableRef = ref<any>(null)
const rules = {}
const formData = reactive<spuSkuAddData>({
  spuId:'',
  tmId:'',
  category3Id:'',
  skuName:'',
  price:0,
  weight:0,
  skuDesc:'',
  skuDefaultImg:'',
  skuAttrValueList:[],
  skuSaleAttrValueList:[],
  skuImageList:[],
})
const brandList = ref<any>([])
const attrList = ref<any>([])
const spuImageList = ref<spuImageResponseDataItem_type[]>([])
const spuSaleAttrList = ref<spuAttrResponseDataItem_type[]>([])

const init = (row:any,cateId:string[])=>{
  if(row.id){
    spuImageListFn(row.id as number);
    spuSaleAttrListFn(row.id as number);
    formData.spuId = row.id ;
  }
  formData.tmId = row.tmId ;
  formData.category3Id = cateId[2] ;
  reqAttrList(cateId);
}
// 平台属性
const reqAttrList = (cateId:string[])=>{
  reqAttrListApi(cateId[0], cateId[1], cateId[2]).then((res: attrListResponseType) => {
    if (res.code == 200) {
      attrList.value = res.data
      // tableData.value = res.data
      formData.skuAttrValueList = res.data as any
    } else {
      ElMessage.error(res.message)
    }
  })
}
// 图片名称列表
const spuImageListFn = (id:string|number)=>{
  spuImageListApi(id).then((res:spuImageResponseDataList_type)=>{
    if(res.code==200){
      spuImageList.value = res.data
      formData.skuImageList = res.data as any
    }else{
      ElMessage.error(res.message)
    }
  })
}
// 销售属性列表
const spuSaleAttrListFn = (id:string|number)=>{
  spuSaleAttrListApi(id).then((res:spuAttrResponseDataList_type)=>{
    if(res.code==200){
      spuSaleAttrList.value = res.data
      formData.skuSaleAttrValueList = res.data as any
      
    }else{
      ElMessage.error(res.message)
    }
  })
}
const setDefault = (row:any)=>{
  formData.skuDefaultImg = row.imgUrl
  imgTableRef.value.clearSelection()
  imgTableRef.value.toggleRowSelection(row,true)
}
const handelSave = () => { 
  // 熟悉下reduce
  const skuAttrValueList = formData.skuAttrValueList.reduce((prev:any,item:any)=>{
    if(item?._params){
      const [attrId,valueId] = item._params.split(':')
      prev.push({attrId,valueId})
    }
    return prev
  },[])
  const skuSaleAttrValueList = formData.skuSaleAttrValueList.reduce((prev:any,item:any)=>{
    if(item?._params){
      const [saleAttrId,saleAttrValueId] = item._params.split(':')
      prev.push({saleAttrId,saleAttrValueId})
    }
    return prev
  },[])
  const params = {
    ...formData,
    skuAttrValueList,
    skuSaleAttrValueList,
  }
  saveSkuInfoApi(params).then(res=>{
    if(res.code==200){
      ElMessage.success('保存成功')
      formRef.value.resetFields();
      formData.id = ''
      $emit('changeScene', 1)
    }else{
      ElMessage.error(res.message)
    }
  })
}
const cancel = () => {
  formRef.value.resetFields();
  formData.id = ''
  $emit('changeScene', 1)
  console.log(formData,'formDataformData');
  
}
defineExpose({
  init
})
</script>
<style scoped lang="scss"></style>