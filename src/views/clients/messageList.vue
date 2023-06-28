<template>
  <div class="common-layout">
    <el-container>
      <el-header class="h-auto">
        <el-row class="flex-row flex-between">
          <div class="flex-row">
            <el-input v-model="searchform.search" placeholder="名称/公司/留言内容/电话/邮箱" />
            <el-button class="ml-2" :icon="Search" circle @click="getMessageListFun" />
          </div>
          <div>
            <el-button type="primary" :icon="Plus" circle @click="addSea"></el-button>
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
  </div>
</template>

<script setup lang="jsx">
import { Plus, Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed, defineExpose, reactive } from 'vue'

import { getContactUsList, addClientSea } from '@/api/contactUs'

import { getProductsCategoryDict } from '@/api/productsCategory'
import CustomTable from '@/components/DTable'
import formatTime from '@/utils/fomattime'

import { ElMessage, ElMessageBox } from 'element-plus/lib'

const loading = ref( false )
onMounted( () => {
  getMessageListFun()
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

const getMessageListFun = async() => {
  loading.value = true
  const { data } = await getContactUsList( searchform )
  console.log( data )
  loading.value = false
  tableData.value = data.data
}

const tableData = ref( [] )
const tableItemSelectionRef = ref( null )
const selectionTable = computed( () => {
  return tableItemSelectionRef?.value?.multipleSelection || []
} )
const tableColumns = ref( [
  { type : 'selection' },
  { prop : 'id', label : 'ID', width : 80 },
  { prop : 'name', label : '姓名' },
  {
    prop : 'interestedProducts',
    label : '意向产品',
    render : row => {
      if ( row.interestedProducts ) {
        const productNames = row.productName.split( ',' )
        const categoryNames = row.CategoriesNames.split( ',' )

        const result = productNames.map( ( productName, index ) => ( {
          productName : productName.trim(),
          CategoriesNames : categoryNames[index].trim()
        } ) )

        return result.map( item => (
          <el-badge is-dot class='badgeMg'>
            {item.CategoriesNames}:{item.productName}
          </el-badge>
        ) )
      }
    }
  },
  { prop : 'messageContent', label : '留言内容' },
  { prop : 'phone', label : '联系电话' },
  { prop : 'email', label : '邮箱号码' },
  {
    prop : 'created_at',
    label : '留言日期',
    render : row => {
      return formatTime( row.created_at )
    }
  },
  { prop : 'companyName', label : '公司名称' },
  { prop : 'fax', label : '传真号码' },
  { prop : 'ip', label : '网络IP归属' },

  {
    prop : 'setting',
    label : '操作',
    render : row => {
      return (
        <div class='flex'>
          <el-button type='primary' onClick={() => addSea( row )}>
            加入客户公海
          </el-button>
        </div>
      )
    }
  }
] )

const searchform = reactive( {
  search : '',
  pagesize : 10,
  currentPage : 1
} )
const addSea = async row => {
  const messageIds =
    selectionTable.value.length != 0 ? selectionTable.value.map( item => item.id ) : row.id ? [row.id] : []
  if ( messageIds.length == 0 ) {
    ElMessage.warning( '至少选中一条数据' )
    return false
  }
  ElMessageBox.confirm( '确定把这个留言客户移入到客户公海?', '', {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } )
    .then( async() => {
      const res = await addClientSea( { messageIds } )
      ElMessage( {
        type : 'success',
        message : res.msg
      } )
      getMessageListFun()
    } )
    .catch( () => {} )
}
defineExpose( { tableItemSelectionRef } )
</script>

<style lang="scss">
.leftbtn {
  margin-left: 100px;
}
.badgeMg {
  margin: 10px;
}
</style>
