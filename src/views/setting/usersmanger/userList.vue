<template>
  <div class="common-layout">
    <el-container>
      <el-header class="h-auto">
        <el-row class="flex-row flex-between">
          <div class="flex-row">
            <el-input v-model="searchform.search" placeholder="输入账户或者名称" />
            <el-button class="ml-2" :icon="Search" circle @click="getuserList" />
          </div>
          <div>
            <el-button type="primary" :icon="Plus" circle @click="openDialog" v-haspermission="'addUser'"></el-button>
            <el-button type="danger" :icon="Delete" circle @click="dels" v-haspermission="'delsUser'"></el-button>
          </div>
        </el-row>
      </el-header>
      <el-main
        ><CustomTable ref="tableItemSelectionRef" :table-data="tableData" :table-title="tableColumns"></CustomTable>
      </el-main>
    </el-container>
    <!-- 添加修改用户对话框 -->
    <CustomDialog v-model:visible="dialogVisible" :title="title" width="60%">
      <div>
        <CustomForm :form-items="getFormItems" :form="form" :rules="formRules" ref="customFormref"></CustomForm>
        <div class="flex justify-end">
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </div>
    </CustomDialog>
    <!-- 密码重置对话框 -->
    <CustomDialog v-model:visible="resetVisible" :title="titlerest" width="20%">
      <CustomForm :form-items="formresetItem" :form="formreset" :rules="formPwdRules" ref="customFormPwd"></CustomForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetVisible = false">退出</el-button>
          <el-button type="primary" @click="resetPasswordFun" v-haspermission="'resetPassword'"> 确定 </el-button>
        </span>
      </template>
    </CustomDialog>
  </div>
</template>

<script setup lang="jsx">
import { Plus, Delete, Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed, defineExpose, reactive } from 'vue'
import { UserList, resetPassword, changgestate, adduser, finduserinfo, updateUser, delUser } from '@/api/user'
import { roleList } from '@/api/role'
import CustomTable from '@/components/DTable'
import CustomDialog from '@/components/DDialog'
import CustomForm from '@/components/DForm'
import { transformArray } from '@/utils/formeData'
import { ElMessage, ElMessageBox } from 'element-plus/lib'
import { useUserStore } from '@/store'
onMounted( () => {
  getDicList()
  getuserList()
} )
const userStore = useUserStore()
const getDicList = async() => {
  const list = await roleList( { search : '' } )
  console.log( list )
  rolelist.list = transformArray( list.data )
  rolelist.list = rolelist.list.filter( item => item.id !== 1 )
}
const getuserList = async() => {
  const flag = await userStore.hasPermission( 'getUser' )
  if ( flag ) {
    const userListr = await UserList( searchform )
    tableData.value = userListr?.data?.data || []
  }
}

const tableData = ref( [] )
const tableItemSelectionRef = ref( null )

const selectionTable = computed( () => {
  return tableItemSelectionRef?.value?.multipleSelection || []
} )
// 判断是否使用密码框
const showPassword = ref( false )
const getFormItems = computed( () => {
  // 根据 showPassword 的值来动态控制密码字段的显示与隐藏
  return showPassword.value ? formItems.value : formItems.value.filter( item => item.prop !== 'pwd' )
} )

// eslint-disable-next-line no-unused-vars
const add = row => {
  console.log( customFormPwd.value )
  console.log( selectionTable.value )
}

const edit = async row => {
  const { userid } = row
  const { data } = await finduserinfo( { userid } )
  form.userid = userid
  form.name = data.username
  form.role = parseInt( data.role )
  form.useracount = data.useracount
  form.mobile = data.mobile
  form.email = data.email
  showPassword.value = false
  dialogVisible.value = true
}

const tableColumns = ref( [
  { type : 'selection' },
  { prop : 'userid', label : 'ID' },
  { prop : 'useracount', label : '账号' },
  { prop : 'username', label : '姓名' },
  {
    prop : 'state',
    label : '状态',
    render : row => {
      return <div>{row.state == 1 ? '启用' : '禁用'}</div>
    }
  },
  {
    prop : 'createtime',
    label : '创建时间'
  },
  {
    prop : 'setting',
    label : '操作',
    width : 280,
    render : row => {
      return (
        <div class='flex'>
          <el-button type='primary' onClick={() => edit( row )} v-haspermission={'finduserinfo'}>
            编辑
          </el-button>
          {row.state == 1 ? (
            <el-button type='warning' onClick={() => changgestateFun( row )} v-haspermission={'changuserstate'}>
              禁用
            </el-button>
          ) : (
            <el-button type='success' onClick={() => changgestateFun( row )} v-haspermission={'changuserstate'}>
              启用
            </el-button>
          )}
          <el-button type='info' onClick={() => openreest( row )} v-haspermission={'resetPassword'}>
            {' '}
            密码重置{' '}
          </el-button>
        </div>
      )
    }
  }
] )

const dialogVisible = ref( false )
const customFormref = ref( null )
const customFormPwd = ref( null )
const resetVisible = ref( false )

const title = computed( () => {
  return form.userid ? '编辑用户' : '添加用户'
} )
const titlerest = ref( '重置密码' )
const openDialog = () => {
  delete form.userid
  form.name = '' // 根据需要进行赋值
  form.email = '' // 根据需要进行赋值
  // form.pwd = '' // 根据需要进行赋值
  form.role = '' // 根据需要进行赋值
  form.useracount = '' // 根据需要进行赋值
  form.mobile = '' // 根据需要进行赋值
  showPassword.value = true
  dialogVisible.value = true
}
// 批量删除数据
const dels = () => {
  if ( selectionTable.value.length == 0 ) {
    ElMessage.warning( '至少选中一条数据' )
    return
  }
  const arr = selectionTable.value.map( item => item.userid )

  ElMessageBox.confirm( `确定要删除这些选中账户吗`, {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } ).then( async() => {
    const res = await delUser( { ids : arr } )
    if ( res.code == 200 ) {
      ElMessage( {
        type : 'success',
        message : `删除成功`
      } )
      getuserList()
    }
  } )
}
// 打开密码重置对话框
const openreest = row => {
  formreset.userid = row.userid
  resetVisible.value = true
}
// 改变状态
const changgestateFun = row => {
  const TEXT = row.state == 1 ? '禁用' : '启用'
  ElMessageBox.confirm( `确定要对该账户进行${TEXT}的操作吗`, {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } ).then( async() => {
    const res = await changgestate( { userid : row.userid } )
    if ( res.code == 200 ) {
      ElMessage( {
        type : 'success',
        message : `${TEXT}成功`
      } )
      getuserList()
    }
  } )
}

// 使用 reactive 创建响应式对象
const rolelist = reactive( {
  list : [],
  border : true,
  size : 'large'
} )

const formItems = ref( [
  {
    prop : 'useracount',
    label : '账号',
    rules : [{ required : true, message : '必须输入账号', trigger : 'blur' }]
  },
  {
    prop : 'name',
    label : '姓名',
    rules : [{ required : true, message : '必须输入姓名', trigger : 'blur' }]
  },
  {
    prop : 'pwd',
    label : '密码',
    disabled : true,
    rules : [{ required : true, message : '必须输入密码', trigger : 'blur' }]
  },
  {
    prop : 'email',
    label : '邮箱',
    placeholder : '输入邮箱'
  },
  {
    prop : 'mobile',
    label : '手机号',
    placeholder : '输入手机号'
  },
  {
    prop : 'role',
    is : 'radio',
    option : rolelist,
    label : '角色',
    rules : [{ required : true, message : '必须选择角色', trigger : 'blur' }]
  }
] )

const validatePass = ( rule, value, callback ) => {
  var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if ( formreset.pwd === '' ) {
    callback( new Error( '输入密码' ) )
  } else if ( reg.test( formreset.pwd ) == false ) {
    callback( new Error( '密码至少包含 数字和英文，长度6-20' ) )
  } else {
    if ( formreset.pwdagagin !== '' ) {
      if ( !customFormPwd.value ) return
      customFormPwd.value.$refs.form.validateField( 'pwdagagin', () => null )
    }
    callback()
  }
}
const validatePass2 = ( rule, value, callback ) => {
  if ( formreset.pwdagagin === '' ) {
    callback( new Error( '输入二次密码' ) )
  } else if ( formreset.pwdagagin !== formreset.pwd ) {
    callback( new Error( '密码不一致' ) )
  } else {
    callback()
  }
}

const formresetItem = [
  {
    prop : 'pwd',
    label : '密码',
    span : 20,
    type : 'password',
    showPassword : true,
    rules : [{ validator : validatePass, trigger : 'blur', required : true }]
  },
  {
    prop : 'pwdagagin',
    label : '确认密码',
    span : 20,
    type : 'password',
    showPassword : true,
    rules : [{ validator : validatePass2, trigger : 'blur', required : true }]
  }
]
const searchform = reactive( {
  search : '',
  pagesize : 10,
  currentPage : 1
} )
const form = reactive( {
  name : '',
  email : '',
  pwd : 123456,
  role : '',
  useracount : '',
  mobile : ''
} )

const submitForm = async() => {
  const flag = await customFormref.value.form.validate()
  if ( flag ) {
    if ( form.userid ) {
      // 编辑
      const res = await updateUser( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getuserList()
      }
    } else {
      // 添加
      const res = await adduser( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getuserList()
      } else {
        ElMessage.error( res.msg )
      }
    }
  }
}

const resetPasswordFun = async() => {
  const flag = await customFormPwd.value.form.validate()
  if ( flag ) {
    const res = await resetPassword( { ...formreset } )
    console.log( res )
    if ( res.code == 200 ) {
      ElMessage.success( '修改成功' )
      resetVisible.value = false
      resetformvalue()
    }
  }
}
const resetformvalue = () => {
  formreset.userid = ''
  formreset.pwd = ''
  formreset.pwdagagin = ''
}
const formreset = reactive( {
  pwd : '',
  pwdagagin : ''
} )

const formRules = ref( {} )

const formPwdRules = ref( {} )
defineExpose( { tableItemSelectionRef, customFormPwd } )
</script>

<style lang="scss" scoped></style>
