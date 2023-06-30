<template>
  <div class="common-layout">
    <el-container>
      <el-header class="h-auto">
        <el-row class="flex-row flex-between">
          <div class="flex-row">
            <el-input class="w-50" v-model="searchform.search" placeholder="输入标题" />
            <el-select class="w-50 ml-1" v-model="searchform.category" placeholder="选择分类" size="large" clearable>
              <el-option v-for="item in options.list" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-button class="ml-2" :icon="Search" circle @click="getnewList" v-haspermission="'getNewsList'" />
          </div>
          <div>
            <el-button type="primary" :icon="Plus" circle @click="gotoadd" v-haspermission="'addNews'"></el-button>
            <el-button type="danger" :icon="Delete" circle @click="dels" v-haspermission="'deleteNews'"></el-button>
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
          v-model:page-size="searchform.pageSize"
          :background="true"
          :page-sizes="[10, 25, 50, 100]"
          layout="total,sizes, prev, pager, next"
          :total="total"
          @size-change="getnewList"
          @current-change="getnewList"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="jsx">
import { Plus, Delete, Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed, defineExpose, reactive } from 'vue'
import { getNewsList, deleteNews, setTopNews, cancelTopNews, enableNews } from '@/api/news'
import { getNewsCategorydic } from '@/api/newCategory'
import CustomTable from '@/components/DTable'
import { useUserStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus/lib'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const loading = ref( false )
onMounted( () => {
  getnewList()
  getNewsCategoryDicFun()
} )

const options = reactive( {
  list : []
} )
const getnewList = async() => {
  const flag = await userStore.hasPermission( 'getNewsList' )
  if ( flag ) {
    loading.value = true
    const { data } = await getNewsList( searchform )
    loading.value = false
    tableData.value = data.data
    total.value = data.total
  }
}
const getNewsCategoryDicFun = async() => {
  const { data } = await getNewsCategorydic()
  options.list = data
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
            preview-teleported={true}></el-image>{' '}
        </div>
      )
    }
  },

  {
    prop : 'category',
    label : '分类',
    width : 150,
    render : row => {
      const title = options.list.find( item => item.id == row.category ) || { name : '' }
      return title.name
    }
  },
  { prop : 'views', label : '点击数' },
  {
    width : 120,
    prop : 'state',
    label : '状态',
    render : row => {
      return <div>{row.state == 1 ? '启用' : '禁用'}</div>
    }
  },
  {
    prop : 'publish_date',
    label : '发布日期'
  },
  {
    prop : 'setting',
    label : '操作',
    render : row => {
      return (
        <div class='flex'>
          <el-button type='primary' onClick={() => edit( row )} v-haspermission={'getNewsById'}>
            编辑
          </el-button>
          {row.state == 1 ? (
            <el-button type='warning' onClick={() => changgestateFun( row )} v-haspermission={'enableNews'}>
              禁用
            </el-button>
          ) : (
            <el-button type='success' onClick={() => changgestateFun( row )} v-haspermission={'enableNews'}>
              启用
            </el-button>
          )}
          {row.priority == 0 ? (
            <el-button type='success' onClick={() => stickyFun( row )} v-haspermission={'setTopNews'}>
              置顶
            </el-button>
          ) : (
            <el-button type='warning' onClick={() => cancelTopfun( row )} v-haspermission={'cancelTopNews'}>
              取消置顶
            </el-button>
          )}
          <el-button type='danger' onClick={() => dels( row )} v-haspermission={'deleteNews'}>
            删除
          </el-button>
        </div>
      )
    }
  }
] )
// 置顶
const stickyFun = async row => {
  const { id } = row
  const res = await setTopNews( { newsId : id } )
  if ( res.data ) {
    ElMessage( {
      type : 'success',
      message : res.msg
    } )
    getnewList()
  }
}
// 取消置顶
const cancelTopfun = async row => {
  const { id } = row
  const res = await cancelTopNews( { newsId : id } )
  if ( res.data ) {
    ElMessage( {
      type : 'success',
      message : res.msg
    } )
    getnewList()
  }
}

// 编辑
const edit = row => {
  router.push( { path : '/news/editNews', query : { id : row.id }} )
  console.log( row )
}

// 批量删除数据
const dels = row => {
  const arr = selectionTable.value.length > 0 ? selectionTable.value.map( item => item.id ) : [row.id]
  if ( arr.length == 0 || arr[arr.length - 1] == undefined ) {
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

const total = ref( 0 )
const searchform = reactive( {
  search : '',
  category : '',
  pageSize : 10,
  currentPage : 1
} )

const changgestateFun = async row => {
  console.log( row )
  const { id, state } = row
  const res = await enableNews( { id, enable : state } )
  if ( res.data ) {
    ElMessage( {
      type : 'success',
      message : res.msg
    } )
    getnewList()
  }
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
