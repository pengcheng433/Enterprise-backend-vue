<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <CustomForm :form-items="formItems" :form="form" :rules="formRules" ref="customFormref"></CustomForm>
        <div class="flex justify-Start pl-5">
          <el-button type="primary" @click="submitForm" size="large">确定</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="jsx">
import { ref, onMounted, defineExpose, reactive } from 'vue'
import CustomForm from '@/components/DForm'
import { ElMessage } from 'element-plus/lib'
import { addNews } from '@/api/news'
import { getNewsCategorydic } from '@/api/newCategory'

onMounted( () => {
  getNewsCategoryDicFun()
} )

const getNewsCategoryDicFun = async() => {
  const { data } = await getNewsCategorydic()
  list.list = data
}

const tableItemSelectionRef = ref( null )

// const dialogVisible = ref( false )
const customFormref = ref( null )
const customFormPwd = ref( null )

// 使用 reactive 创建响应式对象
const list = reactive( {
  list : [],
  label : 'name',
  value : 'id'
} )
const formItems = ref( [
  {
    prop : 'title',
    label : '文章标题',
    rules : [{ required : true, message : '必须输入标题', trigger : 'blur' }]
  },
  {
    prop : 'coverImage',
    label : '文章封面',
    is : 'upload'
  },
  {
    prop : 'views',
    label : '点击数量',
    is : 'number'
  },

  {
    prop : 'category',
    is : 'select',
    option : list,
    label : '文章种类',
    rules : [{ required : true, message : '必须选择角色', trigger : 'blur' }]
  },
  {
    prop : 'content',
    label : '文章内容',
    is : 'textarea'
  }
] )

const form = reactive( {
  title : '',
  coverImage : '',
  views : 1,
  category : '',
  content : ''
} )

const submitForm = async() => {
  const flag = await customFormref.value.form.validate()

  // 添加
  if ( flag ) {
    const res = await addNews( form )

    if ( res.data ) {
      ElMessage( {
        message : res.msg,
        type : 'success'
      } )
    } else {
      ElMessage.error( res.msg )
    }
  }
}

const formRules = ref( {
  // Custom form validation rules if needed
} )

defineExpose( { tableItemSelectionRef, customFormPwd } )
</script>

<style lang="scss" scoped>
.pl-5 {
  padding-left: 97px;
}
</style>
