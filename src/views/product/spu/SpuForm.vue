<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="100"
    status-icon
  >
    <el-form-item label="spu名称" prop="spuName">
      <el-input v-model="formData.spuName" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="spu品牌" prop="tmId">
      <el-select v-model="formData.tmId" placeholder="请选择">
        <el-option :label="item.tmName" :value="item.id" v-for="(item) in brandList" :key="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="spu描述" prop="description">
      <el-input v-model="formData.description" type="textarea" />
    </el-form-item>
    <el-form-item label="spu照片" prop="spuImageList">
      <el-upload
        v-model:file-list="formData.spuImageList"
        class="avatar-uploader"
        :action="baseURL+'/admin/product/fileUpload'"
        list-type="picture-card"
         :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
      >
        <el-icon  class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="imgDialog" width="600">
        <img style="width:500px" :src="dialogImageUrl" alt="查看图片" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="spu销售属性" prop="" >
      <div class="flex">
        <el-select v-model="addAttrValue" :placeholder="`还剩${notList.length}项未展示`" style="width: 200px;">
          <el-option 
          :label="item.name"
           :value="`${item.id}:${item.name}`"
           v-for="(item) in notList"
           :key="item.id"
             />
        </el-select>
        <el-button 
        type="primary" 
        class="ml15" 
        :disabled="addAttrValue==''?true:false"
        @click="addAttrFn"
        >添加属性</el-button>
      </div>
      <el-table :data="formData.spuSaleAttrList" :border="true" style="width: 100%" class="mt20">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="saleAttrName" label="属性名" />
        <el-table-column prop="logoUrl" label="属性值" >
          <template #default="{ row,$index }">
              <el-tag 
              v-for="(tag,index) in row.spuSaleAttrValueList" 
              :key="tag.id" 
              class="mg10" 
              closable 
              type="primary"
              @close="spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input  
              style="width: 100px;"
              v-model="row.saleAttrValue"
              placeholder="请输入"
               v-if="row.edit"
               @blur="saleAttrBlur(row)"
                />
              <el-button 
              type="success" 
              size="small" 
              icon="Plus" 
              @click="goEdit(row)"
              ></el-button>
            </template>
          </el-table-column>
        <el-table-column prop="操作" label="操作">
          <template #default="{ $index }">
          <el-button type="danger" size="small" @click="spuSaleAttrValueList.splice($index,1)">删除</el-button>
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
import { ref, reactive, toRefs, onMounted, computed} from 'vue'
import { ElMessage, type UploadProps } from 'element-plus'
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
import {
  brandListApi,
  spuImageListApi,
  spuSaleAttrListApi,
  baseSaleAttrListApi,
  editSpuApi,
  addSpuApi
  
} from '@/api/product/spu'

const $emit = defineEmits(['changeScene','save'])
const notList = computed<any>(()=>{
 return baseSaleAttrList.value.filter(item=>{
    return spuSaleAttrList.value.every(ele=>{
      return item.name != ele.saleAttrName
    })
  })
})
const formRef = ref<any>(null)
const formData = reactive<spu>({
  category3Id:'',
  description:'',
  spuImageList: [],
  spuName: '',
  spuSaleAttrList: [],
  tmId: ''
})
const addAttrValue = ref('')
const imgDialog = ref(false)
const dialogImageUrl = ref('')
const rules = {}
const baseURL = ref(import.meta.env.VITE_APP_BASE_API)
const brandList = ref<spuBrandResponseDataItem_type[]>([])
const spuImageList = ref<spuImageResponseDataItem_type[]>([])
const spuSaleAttrList = ref<spuAttrResponseDataItem_type[]>([])
const baseSaleAttrList = ref<spuSaleAttrDataItem_type[]>([])

const handlePictureCardPreview:UploadProps['onPreview'] = (file)=>{
  dialogImageUrl.value = file.url!
  imgDialog.value = true
}
const handleRemove:UploadProps['onRemove'] = (file)=>{
  console.log(file,'file');
  
}
const init = (row:spu)=>{
  if(row.id){
    spuImageListFn(row.id as number);
    spuSaleAttrListFn(row.id as number);
    formData.id = row.id ;
    formData.description = row.description;
    // formData.spuImageList = row.spuImageList;
    formData.spuName = row.spuName;
    // formData.spuSaleAttrList = row.spuSaleAttrList;
    formData.tmId = row.tmId;
  }
  formData.category3Id = row.category3Id ;
  brandListFn();
  baseSaleAttrListFn();
  
}
const brandListFn = ()=>{
  brandListApi().then((res:spuBrandResponseDataList_type)=>{
    if(res.code==200){
      brandList.value = res.data
    }else{
      ElMessage.error(res.message)
    }
  })
}
const spuImageListFn = (id:string|number)=>{
  spuImageListApi(id).then((res:spuImageResponseDataList_type)=>{
    if(res.code==200){
      spuImageList.value = res.data
      formData.spuImageList = res.data.map(item=>{
        return {
          name:item.imgName,
          url:item.imgUrl
        }
      })
    }else{
      ElMessage.error(res.message)
    }
  })
}
const spuSaleAttrListFn = (id:string|number)=>{
  spuSaleAttrListApi(id).then((res:spuAttrResponseDataList_type)=>{
    if(res.code==200){
      spuSaleAttrList.value = res.data
      formData.spuSaleAttrList = res.data as any
      console.log(formData.spuSaleAttrList,'formData.spuSaleAttrList',res.data);
      
    }else{
      ElMessage.error(res.message)
    }
  })
}
const baseSaleAttrListFn = ()=>{
  baseSaleAttrListApi().then((res:spuSaleAttrDataList_type)=>{
    if(res.code==200){
      baseSaleAttrList.value = res.data

    }else{
      ElMessage.error(res.message)
    }
  })
}
const addAttrFn = ()=>{
  let [baseSaleAttrId,saleAttrName] = addAttrValue.value.split(':')
  formData.spuSaleAttrList?.push({
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  })
  addAttrValue.value = ''
}
const goEdit = (row:spuSaleAttrList_type)=>{
  row.edit = true;
  row.saleAttrValue = '';
}
const saleAttrBlur = (row:spuSaleAttrList_type)=>{
  const {saleAttrValue,baseSaleAttrId} = row
  if(saleAttrValue?.trim()==''){
    return ElMessage.error('属性值不能为空')
  }
  if(row.spuSaleAttrValueList?.findIndex(item=>item.saleAttrValueName==saleAttrValue)!=-1){
    return ElMessage.error('属性值不能重复')
  }
  row.spuSaleAttrValueList?.push({
    saleAttrValueName:(saleAttrValue as string),
    baseSaleAttrId
  })
  row.edit = false;
}
const handelSave = ()=>{
  const params:any = {
    ...formData
  }
  params.spuImageList = formData.spuImageList?.map((item)=>{
    return {
      imgName:item.name,
      imgUrl:item.url
    }
  })
  console.log(params,'params');
  const callback = (res:any)=>{
    if(res.code==200){
      ElMessage.success(`${formData.id?'修改':'添加'}成功`)
      $emit('changeScene',1);
      $emit('save');
    }else{
      ElMessage.error(res.message)
    }
  }
  if(formData.id){
    editSpuApi(params).then(callback)
  }else{
    addSpuApi(params).then(callback)
  }
  // return 
  // editSpuApi(params).then(res=>{
  //   if(res.code==200){
  //     ElMessage.success('修改成功')
  //     $emit('changeScene',1);
  //     $emit('save');
  //   }else{
  //     ElMessage.error(res.message)
  //   }
  // })
}
const handleDelete = ()=>{

}
const cancel = ()=>{
  formRef.value.resetFields();
  formData.id = ''
  $emit('changeScene',1)
}
defineExpose({
  init
})
</script>
<style scoped lang="scss">
// .avatar-uploader .el-upload {
//   border: 1px dashed red !important;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
//   transition: var(--el-transition-duration-fast);
// }
:deep(.el-upload){
  border: 1px dashed rgb(203, 203, 203) !important;
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