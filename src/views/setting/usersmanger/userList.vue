<template>
  <div class="common-layout">
    <el-container>
      <el-header> </el-header>
      <el-main
        ><CustomTable ref="tableItemSelectionRef" :table-data="tableData" :table-title="tableColumns"></CustomTable>
      </el-main>
    </el-container>
    <CustomDialog v-model:visible="dialogVisible" :title="title" width="80%">
      <div>
        <CustomForm :form-items="formItems" :form="form" :rules="formRules" ref="customForm"></CustomForm>
        <el-button type="primary" @click="submitForm">Submit</el-button>
      </div>
    </CustomDialog>

    <CustomDialog v-model:visible="resetVisible" :title="titlerest" width="20%">
      <CustomForm :form-items="formresetItem" :form="formreset" :rules="formPwdRules" ref="customFormPwd"></CustomForm>
    </CustomDialog>

    <el-button @click="openDialog">Open Dialog</el-button>
    <el-button @click="closeDialog">Close Dialog</el-button>
  </div>
</template>

<script setup lang="jsx">
import { ref, onMounted, computed, defineExpose, nextTick, reactive } from 'vue'
import { UserList } from '@/api/user'

import CustomTable from '@/components/DTable'
import CustomDialog from '@/components/DDialog'
import CustomForm from '@/components/DForm'
import formatTime from '@/utils/fomattime'
onMounted( () => {
  getuserList()
} )

const getuserList = async() => {
  const userListr = await UserList( { pagesize : 10, currentPage : 1 } )
  tableData.value = userListr?.data?.data || []
}
const tableData = ref( [] )
const tableItemSelectionRef = ref( null )
defineExpose( { tableItemSelectionRef } )

const selectionTable = computed( () => {
  return tableItemSelectionRef?.value?.multipleSelection || []
} )
const add = row => {
  console.log( tableItemSelectionRef.value )
  console.log( selectionTable )
  // nextTick( () => {
  //   openDialog()
  // } )

  console.log( customFormPwd.value )
  // selectionTable.value.toggleAllSelection()
}

const tableColumns = ref( [
  { type : 'selection' },
  { prop : 'userid', label : 'ID' },
  { prop : 'useracount', label : '账号' },
  { prop : 'username', label : '姓名' },
  {
    prop : 'lastlogintime',
    label : '登陆时间',
    render : row => {
      return <div>{formatTime( row.lastlogintime )}</div>
    }
  },
  {
    prop : 'setting',
    label : '操作',
    render : row => {
      return (
        <div>
          <el-button onClick={() => add( row )}> 编辑 </el-button>
          <el-button onClick={() => openreest( row )}> 密码重置 </el-button>
        </div>
      )
    }
  }
] )

const dialogVisible = ref( false )
const customFormPwd = ref( null )
const resetVisible = ref( false )
const title = ref( '添加用户' )
const titlerest = ref( '重置密码' )
const openDialog = () => {
  dialogVisible.value = true
  nextTick( () => {
    console.log( dialogVisible.value ) // 输出 true
    // 这里可以执行其他对话框相关的操作
  } )
  console.log()
}
// 打开密码重置对话框
const openreest = row => {
  resetVisible.value = true
}

const closeDialog = () => {
  resetVisible.value = true
}

const formItems = [
  {
    prop : 'name',
    label : 'Name',
    span : 8,
    rules : [{ required : true, message : 'Please enter name', trigger : 'blur' }]
  },
  {
    prop : 'email',
    label : 'Email',
    span : 8,
    rules : [{ required : true, message : 'Please enter email', trigger : 'blur' }]
  },
  { prop : 'test', label : 'test', span : 8, rules : [{ required : true, message : 'Please enter email', trigger : 'blur' }] }
  // Add more form items as needed
]

const validatePass = ( rule, value, callback ) => {
  if ( value === '' ) {
    callback( new Error( 'Please input the password' ) )
  } else {
    if ( formreset.pwdagagin !== '' ) {
      if ( !customFormPwd.value ) return
      customFormPwd.value.$refs.form.validateField( 'pwdagagin', () => null )
    }
    callback()
  }
}
const validatePass2 = ( rule, value, callback ) => {
  if ( value === '' ) {
    callback( new Error( 'Please input the password again' ) )
  } else if ( value !== formreset.pwd ) {
    callback( new Error( "Two inputs don't match!" ) )
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
    rules : [{ required : true, message : 'Please enter name', trigger : 'blur' }]
  },
  {
    prop : 'pwdagagin',
    label : '确认密码',
    span : 20,
    type : 'password',
    rules : [{ required : true, message : 'Please enter name', trigger : 'blur' }]
  }
]

const form = reactive( {
  name : 'erd二年的',
  email : ''
  // Initialize other form fields
} )

const submitForm = () => {
  console.log( form.name )
}

const formreset = reactive( {
  pwd : '',
  pwdagagin : ''
} )

const formRules = ref( {
  // Custom form validation rules if needed
} )

const formPwdRules = ref( {
  pwd : [{ validator : validatePass, trigger : 'blur' }],
  pwdagain : [{ validator : validatePass2, trigger : 'blur' }]
} )
</script>

<style lang="scss" scoped></style>
