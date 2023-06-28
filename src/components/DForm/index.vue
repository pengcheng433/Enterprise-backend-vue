<template>
  <el-form :model="formData" :rules="rules" ref="form" :label-width="labelWidth">
    <el-row :gutter="rowGutter">
      <el-col
        v-for="item in formItems"
        :span="getColSpan(item)"
        :xs="getColSpan(item)"
        :sm="getColSpan(item)"
        :md="getColSpan(item)"
        :lg="getColSpan(item)"
        :key="item.prop"
      >
        <el-form-item :prop="item.prop" :label="item.label" :rules="item.rules" :required="item.required">
          <template v-if="item.is === 'radio'">
            <el-radio-group v-model="formData[item.prop]" :size="item.option?.size || 'default'">
              <el-radio
                v-for="option in item.option?.list"
                :key="option.value"
                :label="option.value"
                :disabled="option?.disabled || false"
                :border="item.option?.border || false"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.is === 'tree'">
            <el-tree
              :data="item.option.data"
              :props="item.option.props || { children: 'children', label: 'label' }"
              :show-checkbox="item.option.showCheckbox || true"
              :node-key="item.option.nodeKey || 'id'"
              :default-checked-keys="formData[item.prop]"
              @check="(obj1, obj2) => updateFormData(obj1, obj2, item.prop)"
            ></el-tree>
          </template>
          <template v-else-if="item.is === 'textarea'">
            <YuTinymce :value="formData[item.prop]" :height="500" @input="getEditorContent(item.prop, $event)" />
          </template>
          <template v-else-if="item.is === 'upload'">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="file => beforeAvatarUpload(file, item.prop)"
            >
              <img v-if="formData[item.prop]" :src="formData[item.prop]" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">+</el-icon>
            </el-upload>

            <el-button
              v-if="formData[item.prop]"
              type="primary"
              circle
              style="margin-left: 5px"
              @click="handlePictureCardPreview(formData[item.prop])"
            >
              <el-icon><Picture /></el-icon>
            </el-button>
          </template>
          <template v-else-if="item.is === 'number'">
            <el-input-number v-model="formData[item.prop]" :min="1" :controls="false" />
          </template>
          <template v-else-if="item.is === 'select'">
            <el-select v-model="formData[item.prop]" :placeholder="`选择${item.label}`">
              <el-option
                v-for="sitem in item.option.list"
                :key="sitem[item.option.value]"
                :label="sitem[item.option.label]"
                :value="sitem[item.option.value]"
              />
            </el-select>
          </template>
          <template v-else-if="item.is === 'cascader'">
            <el-cascader v-model="formData[item.prop]" :options="item.options" clearable />
          </template>
          <template v-else-if="item.is === 'datetime'">
            <el-date-picker v-model="formData[item.prop]" type="datetime" :placeholder="item.placeholder" format="YYYY/MM/DD HH:mm:ss" />
          </template>
          <template v-else>
            <el-input
              v-if="item.prop != ''"
              :disabled="item?.disabled || false"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :type="item.type || 'inpuit'"
              v-bind:show-password="item.showPassword || false"
            ></el-input>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-dialog v-model="uploaddialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { Picture } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import YuTinymce from '@/components/YuTinymce'
import { ElMessage } from 'element-plus/lib'
import { uoloadImg } from '@/api/news'
// import axios from 'axios'
const getColSpan = item => {
  return item.span ? Math.min( 24, item.span ) : 24
}
const form = ref( null )
const dialogImageUrl = ref( '' )
const uploaddialogVisible = ref( false )

const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile
  uploaddialogVisible.value = true
}
defineExpose( { form } )
const props = defineProps( {
  formItems : {
    type : Array,
    required : true
  },
  form : {
    type : Object,
    required : true
  },
  rules : {
    type : Object,
    default : () => ( {} )
  },
  labelWidth : {
    type : String,
    default : '100px'
  },
  rowGutter : {
    type : Number,
    default : 20
  }
} )

const formData = reactive( props.form )
const updateFormData = ( obj1, obj2, prop ) => {
  formData[prop] = obj2.checkedKeys
}
const getEditorContent = ( prop, info ) => {
  formData[prop] = info
}

const handleAvatarSuccess = ( response, file ) => {
  console.log( response )
  console.log( file )
  // const imageUrl = response.url // 假设响应中包含图片地址字段为 url
}

const beforeAvatarUpload = async( file, prop ) => {
  // 上传前的处理逻辑
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png']

  const isSizeValid = file.size <= maxSize
  const isTypeValid = allowedTypes.includes( file.type )

  if ( !isSizeValid ) {
    ElMessage.error( '文件大小超过限制，请选择较小的图片' )
    return false // 返回 false 阻止默认上传行为
  }

  if ( !isTypeValid ) {
    ElMessage.error( '只允许上传 JPEG 或 PNG 格式的图片' )
    return false // 返回 false 阻止默认上传行为
  }

  const formDatafile = new FormData()
  formDatafile.append( 'file', file ) // 将文件对象添加到 FormData 对象中

  const res = await uoloadImg( formDatafile )

  console.log( res )
  if ( res.data.url ) {
    formData[prop] = res.data.url
    ElMessage.success( res.msg )
  } else {
    ElMessage.warn( res.msg )
  }
  // 更新对应字段的值
  // formData[prop] = res.data.url
  return false // 返回 false 阻止默认上传行为
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
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
</style>
