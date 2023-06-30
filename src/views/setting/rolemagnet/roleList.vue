<template>
  <div class="common-layout">
    <el-container>
      <el-header class="h-auto">
        <el-row class="flex-row flex-between">
          <div class="flex-row">
            <el-input v-model="searchform.search" placeholder="输入名称或者备注" />
            <el-button class="ml-2" :icon="Search" circle @click="getroleList" />
          </div>
          <div>
            <el-button type="primary" :icon="Plus" circle @click="openDialog" v-haspermission="'addRole'"></el-button>
            <el-button type="danger" :icon="Delete" circle @click="dels" v-haspermission="'delRole'"></el-button>
          </div>
        </el-row>
      </el-header>
      <el-main
        ><CustomTable ref="tableItemSelectionRef" :table-data="tableData" :table-title="tableColumns"></CustomTable>
      </el-main>
    </el-container>
    <!-- 添加修改角色对话框 -->
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
import { Plus, Delete, Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed, defineExpose, reactive } from 'vue'
import { permissonTree } from '@/api/permisson'
import { roleList, addRole, delRole, findRole, updateUser } from '@/api/role'
import CustomTable from '@/components/DTable'
import CustomDialog from '@/components/DDialog'
import CustomForm from '@/components/DForm'
import { ElMessage, ElMessageBox } from 'element-plus/lib'
import { useUserStore } from '@/store'
const userStore = useUserStore()

onMounted( () => {
  getroleList()
  getpermissonTree()
} )

const getroleList = async() => {
  const flag = await userStore.hasPermission( 'getAllRoles' )
  if ( flag ) {
    const { data } = await roleList( searchform )
    tableData.value = data
  }
}
const getpermissonTree = async() => {
  const flag = await userStore.hasPermission( 'permissionList' )
  if ( flag ) {
    const { data } = await permissonTree()
    treeoption.data = data
  }
}

const tableData = ref( [] )
const tableItemSelectionRef = ref( null )

const selectionTable = computed( () => {
  return tableItemSelectionRef?.value?.multipleSelection || []
} )

const edit = async row => {
  const { id } = row
  const { data } = await findRole( { roleId : id } )
  form.id = id
  form.name = data.name
  form.description = data.description
  form.permission = data.permission
  dialogVisible.value = true
}

const tableColumns = ref( [
  { type : 'selection' },
  { prop : 'id', label : 'ID' },
  { prop : 'name', label : '角色名' },
  { prop : 'description', label : '备注' },

  {
    prop : 'setting',
    label : '操作',
    render : row => {
      return (
        <div class='flex'>
          <el-button type='primary' onClick={() => edit( row )} v-haspermission={'findRole'}>
            编辑
          </el-button>

          <el-button type='danger' onClick={() => dels( row )} v-haspermission={'delRole'}>
            删除
          </el-button>
        </div>
      )
    }
  }
] )

const dialogVisible = ref( false )
const customFormref = ref( null )
const customFormPwd = ref( null )

const title = computed( () => {
  return form.id ? '编辑角色' : '添加角色'
} )
const openDialog = () => {
  delete form.id
  form.name = ''
  form.permission = []
  form.description = ''
  dialogVisible.value = true
}
// 批量删除数据
const dels = row => {
  const arr = selectionTable.value.length > 0 ? selectionTable.value.map( item => item.id ) : [row.id]
  if ( arr.length == 0 || arr[arr.length - 1] == undefined ) {
    ElMessage.warning( '至少选中一条数据' )
    return
  }

  ElMessageBox.confirm( `确定要删除这些选中角色吗`, {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } ).then( async() => {
    const res = await delRole( { roleIds : arr } )
    if ( res.code == 200 ) {
      ElMessage( {
        type : 'success',
        message : `删除成功`
      } )
      getroleList()
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
const formItems = ref( [
  {
    prop : 'name',
    label : '角色名',
    rules : [{ required : true, message : '必须输入账号', trigger : 'blur' }]
  },

  {
    prop : 'permission',
    is : 'tree',
    option : treeoption,
    label : '权限'
  },

  {
    prop : 'description',
    label : '备注',
    type : 'textarea'
  }
] )

const searchform = reactive( {
  search : ''
} )
const form = reactive( {
  description : '',
  name : '',
  permission : []
} )

const submitForm = async() => {
  const flag = await customFormref.value.form.validate()
  if ( flag ) {
    if ( form.id ) {
      // 编辑
      const res = await updateUser( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getroleList()
      }
    } else {
      // 添加
      const res = await addRole( form )

      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getroleList()
      } else {
        ElMessage.error( res.msg )
      }
    }
  }
}

const formRules = ref( {
  // Custom form validation rules if needed
} )

defineExpose( { tableItemSelectionRef, customFormPwd } )
</script>

<style lang="scss" scoped></style>
