<template>
  <div class="common-layout">
    <el-container>
      <el-header class="h-auto">
        <el-row class="flex-row flex-between">
          <div class="flex-row">
            <el-input class="w-50" v-model="searchform.search" placeholder="输入标题" />

            <el-button
              class="ml-2"
              :icon="Search"
              circle
              @click="getNewsCategoryListFun"
              v-haspermission="'getNewsCategoryList'"
            />
          </div>
          <div>
            <el-button
              type="primary"
              :icon="Plus"
              circle
              @click="gotoadd"
              v-haspermission="'addNewsCategory'"
            ></el-button>
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="dels"
              v-haspermission="'deleteNewsCategory'"
            ></el-button>
          </div>
        </el-row>
      </el-header>
      <el-main
        ><CustomTable
          :loading="loading"
          ref="tableItemSelectionRef"
          :table-data="tableData"
          :table-title="tableColumns"
        ></CustomTable>
      </el-main>
    </el-container>
    <!-- 添加修改分类话框 -->
    <CustomDialog v-model:visible="dialogVisible" :title="title" width="60%" destroy-on-close>
      <div>
        <CustomForm :form-items="formItems" :form="form" :rules="formRules" ref="customFormref"></CustomForm>
        <div class="flex justify-end">
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </div>
    </CustomDialog>
  </div>
</template>

<script setup lang="jsx">
import CustomDialog from '@/components/DDialog'
import CustomForm from '@/components/DForm'
import { Plus, Delete, Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed, defineExpose, reactive } from 'vue'
import {
  addNewsCategory,
  getNewsCategoryList,
  getNewsCategoryById,
  updateNewsCategory,
  deleteNewsCategory,
  enableNewsCategory
} from '@/api/newCategory'
import CustomTable from '@/components/DTable'
import { useUserStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus/lib'
const userStore = useUserStore()
const loading = ref( false )
onMounted( () => {
  getNewsCategoryListFun()
} )
const title = computed( () => {
  return form.id ? '修改分类' : '添加分类'
} )
const form = reactive( {
  name : '',
  description : ''
} )

const formItems = ref( [
  {
    prop : 'name',
    label : '分类名称',
    rules : [{ required : true, message : '必须输入分类名称', trigger : 'blur' }]
  },
  {
    prop : 'description',
    label : '备注',
    type : 'textarea'
  }
] )
const dialogVisible = ref( false )

const getNewsCategoryListFun = async() => {
  const flag = await userStore.hasPermission( 'getNewsCategoryList' )
  console.log( flag )
  if ( flag ) {
    loading.value = true
    const { data } = await getNewsCategoryList( searchform )
    loading.value = false
    tableData.value = data
  }
}

const tableData = ref( [] )
const tableItemSelectionRef = ref( null )

const selectionTable = computed( () => {
  return tableItemSelectionRef?.value?.multipleSelection || []
} )

const tableColumns = ref( [
  { type : 'selection' },
  { prop : 'id', label : 'ID', width : 80 },
  { prop : 'name', label : '标题' },
  {
    prop : 'state',
    label : '状态',
    render : row => {
      return <div>{row.state == 1 ? '启用' : '禁用'}</div>
    }
  },
  {
    prop : 'created_time',
    label : '创建日期'
  },
  {
    prop : 'setting',
    label : '操作',
    render : row => {
      return (
        <div class='flex'>
          <el-button type='primary' onClick={() => edit( row )} v-haspermission={'getNewsCategoryById'}>
            编辑
          </el-button>
          {row.state == 1 ? (
            <el-button type='warning' onClick={() => changgestateFun( row )} v-haspermission={'enableNewsCategory'}>
              禁用
            </el-button>
          ) : (
            <el-button type='success' onClick={() => changgestateFun( row )} v-haspermission={'enableNewsCategory'}>
              启用
            </el-button>
          )}

          <el-button type='danger' onClick={() => dels( row )} v-haspermission={'deleteNewsCategory'}>
            删除
          </el-button>
        </div>
      )
    }
  }
] )
const customFormref = ref( '' )
const submitForm = async() => {
  const flag = await customFormref.value.form.validate()
  if ( flag ) {
    if ( form.id ) {
      // 编辑
      const res = await updateNewsCategory( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getNewsCategoryListFun()
      }
    } else {
      // 添加
      const res = await addNewsCategory( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getNewsCategoryListFun()
      } else {
        ElMessage.error( res.msg )
      }
    }
  }
}

// 编辑
const edit = async row => {
  const res = await getNewsCategoryById( { id : row.id } )
  const { id, name, description } = res.data
  form.id = id
  form.name = name
  form.description = description
  dialogVisible.value = true
}

// 批量删除数据
const dels = row => {
  const arr = selectionTable.value.length > 0 ? selectionTable.value.map( item => item.id ) : [row.id]
  if ( arr.length == 0 || arr[arr.length - 1] == undefined ) {
    ElMessage.warning( '至少选中一条数据' )
    return
  }
  ElMessageBox.confirm( `确定要删除这些选中分类吗吗`, {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } ).then( async() => {
    const res = await deleteNewsCategory( { ids : arr } )
    if ( res.code == 200 ) {
      ElMessage( {
        type : 'success',
        message : `删除成功`
      } )
      getNewsCategoryListFun()
    }
  } )
}

const searchform = reactive( {
  search : ''
} )

const changgestateFun = async row => {
  const { id } = row
  const res = await enableNewsCategory( { id } )
  if ( res.data ) {
    ElMessage( {
      type : 'success',
      message : res.msg
    } )
    getNewsCategoryListFun()
  }
}
const gotoadd = () => {
  dialogVisible.value = true
}
defineExpose( { tableItemSelectionRef } )
</script>

<style lang="scss"></style>
