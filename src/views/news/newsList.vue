<template>
  <div class="common-layout">
    <el-container>
      <el-header class="h-auto">
        <el-row class="flex-row flex-between">
          <div class="flex-row">
            <el-input class="w-50" v-model="searchform.search" placeholder="输入标题" />
            <el-select class="w-50 ml-1" v-model="searchform.category" placeholder="选择分类" size="large">
              <el-option v-for="item in options.list" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button class="ml-2" :icon="Search" circle @click="getnewList" />
          </div>
          <div>
            <el-button type="primary" :icon="Plus" circle @click="gotoadd"></el-button>
            <el-button type="danger" :icon="Delete" circle @click="dels"></el-button>
          </div>
        </el-row>
      </el-header>
      <el-main
        ><CustomTable ref="tableItemSelectionRef" :table-data="tableData" :table-title="tableColumns"></CustomTable>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="jsx">
import { Plus, Delete, Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed, defineExpose, reactive } from 'vue'
import { permissonTree } from '@/api/permisson'
import { getNewsList, deleteNews } from '@/api/news'
import CustomTable from '@/components/DTable'

import { ElMessage, ElMessageBox } from 'element-plus/lib'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted( () => {
  getnewList()
  getpermissonTree()
} )

const options = reactive( {
  list : [
    {
      value : 1,
      label : 'Option1'
    },
    {
      value : 2,
      label : 'Option2'
    },
    {
      value : 'Option3',
      label : 'Option3'
    },
    {
      value : 'Option4',
      label : 'Option4'
    },
    {
      value : 'Option5',
      label : 'Option5'
    }
  ]
} )
const getnewList = async() => {
  const { data } = await getNewsList( searchform )
  tableData.value = data.data
}
const getpermissonTree = async() => {
  const { data } = await permissonTree()
  treeoption.data = data
}

const tableData = ref( [] )
const tableItemSelectionRef = ref( null )

const selectionTable = computed( () => {
  return tableItemSelectionRef?.value?.multipleSelection || []
} )

const tableColumns = ref( [
  { type : 'selection' },
  { prop : 'id', label : 'ID', width : 80 },
  { prop : 'title', label : '标题' },
  {
    prop : 'coverImage',
    label : '封面预览',
    render : row => {
      return (
        <div class='image-container-news'>
          <el-image
            src={row.coverImage}
            fit='cover'
            z-index={10001}
            preview-src-list={[row.coverImage]}
            preview-teleported={true}
          ></el-image>{' '}
        </div>
      )
    }
  },

  { prop : 'category', label : '分类' },
  { prop : 'views', label : '点击数' },
  {
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
        <div>
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
          {row.priority == 1 ? (
            <el-button type='success' onClick={() => changgestateFun( row )}>
              置顶
            </el-button>
          ) : (
            <el-button type='warning' onClick={() => changgestateFun( row )}>
              取消置顶
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
// 编辑
const edit = row => {
  router.push( { path : '/news/editNews', query : { id : row.id }} )
  console.log( row )
}

// 批量删除数据
const dels = row => {
  const arr = selectionTable.value.length > 0 ? selectionTable.value.map( item => item.id ) : [row.id]

  if ( arr.length == 0 ) {
    ElMessage.warning( '至少选中一条数据' )
    return
  }

  ElMessageBox.confirm( `确定要删除这些选中文章吗吗`, {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } ).then( async() => {
    const res = await deleteNews( { ids : arr } )
    if ( res.code == 200 ) {
      ElMessage( {
        type : 'success',
        message : `删除成功`
      } )
      getnewList()
    }
  } )
}

const treeoption = reactive( {
  data : [],
  showCheckbox : true,
  nodekey : 'id',
  checked : '',
  props : { children : 'children', label : 'name' }
} )

const searchform = reactive( {
  search : '',
  category : '',
  pageSize : 10,
  currentPage : 1
} )

const changgestateFun = row => {
  console.log( row )
}
const gotoadd = () => {
  router.push( { path : '/news/addnews' } )
}
defineExpose( { tableItemSelectionRef } )
</script>

<style lang="scss">
.image-container-news {
  width: 200px;
  height: 200px;
}
.w-50 {
  width: 12.5rem;
}
.ml-1 {
  margin-left: 1rem;
}
</style>
