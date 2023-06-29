<template>
  <div class="common-layout">
    <el-container>
      <el-header class="h-auto">
        <el-row class="flex-row flex-between">
          <div class="flex-row">
            <el-input class="w-50" v-model="searchform.search" placeholder="输入产品名称" />
            <el-select class="w-50 ml-1" v-model="searchform.category" placeholder="选择分类" size="large" clearable>
              <el-option v-for="item in options.list" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-button class="ml-2" :icon="Search" circle @click="getProductsListFun" />
          </div>
          <div>
            <el-button type="primary" :icon="Plus" circle @click="gotoadd"></el-button>
            <el-button type="danger" :icon="Delete" circle @click="dels"></el-button>
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
        <el-pagination
          class="flex justify-end"
          v-if="total > 10"
          v-model:current-page="searchform.currentPage"
          v-model:page-size="searchform.pagesize"
          :background="true"
          :page-sizes="[10, 25, 50, 100]"
          layout="total,sizes, prev, pager, next"
          :total="total"
          @size-change="getProductsListFun"
          @current-change="getProductsListFun"
        />
      </el-main>
    </el-container>
    <!-- 添加修改产品话框 -->
    <CustomDialog v-model:visible="dialogVisible" :title="title" width="60%" destroy-on-close>
      <div>
        <CustomForm :form-items="formItems" :form="form" :rules="formRules" ref="customFormref"></CustomForm>
        <div class="flex justify-start leftbtn">
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

import { addProduct, getProductList, getProductById, updateProduct, deleteProduct, enableProduct } from '@/api/product'
import { getProductsCategoryDict } from '@/api/productsCategory'
import CustomTable from '@/components/DTable'
// import formatTime from '@/utils/fomattime'

import { ElMessage, ElMessageBox } from 'element-plus/lib'

const loading = ref( false )
onMounted( () => {
  getProductsListFun()
  getProductsCategoryDicFun()
} )
const options = reactive( {
  list : []
} )

// 使用 reactive 创建响应式对象
const list = reactive( {
  list : [],
  label : 'name',
  value : 'id'
} )
const getProductsCategoryDicFun = async() => {
  const { data } = await getProductsCategoryDict()
  options.list = data
  list.list = data
}
const title = computed( () => {
  return form.id ? '修改产品' : '添加产品'
} )
const form = reactive( {
  name : '',
  conver_img : '',
  category_id : '',
  price : '',
  description : ''
} )

const formItems = ref( [
  {
    prop : 'name',
    label : '产品型号',
    rules : [{ required : true, message : '必须输入产品型号', trigger : 'blur' }]
  },
  {
    prop : 'conver_img',
    label : '产品缩略图',
    is : 'upload'
  },

  {
    prop : 'category_id',
    is : 'select',
    option : list,
    label : '产品种类',
    rules : [{ required : true, message : '必须选择产品种类', trigger : 'blur' }]
  },
  {
    prop : 'price',
    label : '价格',
    is : 'number'
  },

  {
    prop : 'description',
    label : '详细介绍',
    is : 'textarea'
  }
] )
const dialogVisible = ref( false )

const getProductsListFun = async() => {
  loading.value = true
  const { data } = await getProductList( searchform )
  loading.value = false
  tableData.value = data.data
  total.value = data.total
}

const tableData = ref( [] )
const tableItemSelectionRef = ref( null )

const selectionTable = computed( () => {
  return tableItemSelectionRef?.value?.multipleSelection || []
} )

const tableColumns = ref( [
  { type : 'selection' },
  { prop : 'id', label : 'ID', width : 80 },
  { prop : 'name', label : '产品型号' },

  // { prop : 'name', label : '标题' },
  {
    prop : 'conver_img',
    label : '封面预览',
    render : row => {
      return (
        <div class='image-container-news'>
          {row.conver_img ? (
            <el-image
              src={row.conver_img}
              fit='cover'
              z-index={10001}
              preview-src-list={[row.conver_img]}
              preview-teleported={true}
            ></el-image>
          ) : (
            '无'
          )}
        </div>
      )
    }
  },
  {
    prop : 'category_id',
    label : '产品分类',
    render : row => {
      const title = options.list.find( item => item.id == row.category_id ) || { name : '' }
      return title.name
    }
  },
  {
    prop : 'created_at',
    label : '创建时间'
  },
  {
    prop : 'updated_at',
    label : '修改时间'
  },
  {
    width : 120,
    prop : 'state',
    label : '状态',
    render : row => {
      return <div>{row.state == 1 ? '启用' : '禁用'}</div>
    }
  },

  {
    prop : 'setting',
    label : '操作',
    render : row => {
      return (
        <div class='flex'>
          <el-button type='primary' onClick={() => edit( row )}>
            编辑
          </el-button>
          {row.state == 1 ? (
            <el-button type='warning' onClick={() => changgestateFun( row )}>
              禁用
            </el-button>
          ) : (
            <el-button type='success' onClick={() => changgestateFun( row )}>
              启用
            </el-button>
          )}

          <el-button type='danger' onClick={() => dels( row )}>
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
      const res = await updateProduct( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getProductsListFun()
      }
    } else {
      // 添加
      const res = await addProduct( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getProductsListFun()
      } else {
        ElMessage.error( res.msg )
      }
    }
  }
}

// 编辑
const edit = async row => {
  const res = await getProductById( { id : row.id } )
  const { id, name, description, conver_img, price, category_id } = res.data
  form.id = id
  form.name = name
  form.conver_img = conver_img
  form.category_id = category_id
  form.price = price
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
  ElMessageBox.confirm( `确定要删除这些选中产品吗吗`, {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } ).then( async() => {
    const res = await deleteProduct( { ids : arr } )
    if ( res.code == 200 ) {
      ElMessage( {
        type : 'success',
        message : `删除成功`
      } )
      getProductsListFun()
    }
  } )
}
const total = ref( 0 )
const searchform = reactive( {
  search : '',
  category : '',
  pagesize : 10,
  currentPage : 1
} )

const changgestateFun = async row => {
  const { id } = row
  const res = await enableProduct( { id } )
  if ( res.data ) {
    ElMessage( {
      type : 'success',
      message : res.msg
    } )
    getProductsListFun()
  }
}
const gotoadd = () => {
  form.id = ''
  form.name = ''
  form.conver_img = ''
  form.category_id = ''
  form.price = ''
  form.description = ''
  dialogVisible.value = true
}
defineExpose( { tableItemSelectionRef } )
</script>

<style lang="scss">
.leftbtn {
  margin-left: 100px;
}
</style>
