<template>
  <div class="common-layout">
    <el-container>
      <el-header class="h-auto">
        <el-row class="flex-row flex-between">
          <div class="flex-row">
            <el-select
              v-model="searchform.type"
              class="ml-2"
              placeholder="Select"
              size="large"
              @change="getClientListFun"
            >
              <el-option label="客户公海" value="0" key="0" />
              <el-option label="我的客户" value="1" key="1" />
            </el-select>
            <el-input class="w-50 ml-2" v-model="searchform.search" placeholder="输入客户名称&手机&邮箱&公司名" />
            <el-select v-model="searchform.status" class="ml-2" placeholder="Select" size="large" clearable>
              <el-option v-for="item in list1.list" :key="item" :label="item.name" :value="item.id" />
            </el-select>
            <el-button class="ml-2" :icon="Search" circle @click="getClientListFun" />
          </div>
          <div>
            <el-button type="primary" :icon="Plus" circle @click="gotoadd"></el-button>
            <el-button type="success" :icon="Share" circle @click="shareFun"></el-button>
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
          @size-change="getClientListFun"
          @current-change="getClientListFun"
        />
      </el-main>
    </el-container>
    <!-- 添加修改客户话框 -->
    <CustomDialog v-model:visible="dialogVisible" :title="title" width="60%" destroy-on-close>
      <div>
        <CustomForm :form-items="formItems" :form="form" :rules="formRules" ref="customFormref"></CustomForm>
        <div class="flex justify-start leftbtn">
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </div>
    </CustomDialog>

    <!-- 分配客户对话框 -->
    <CustomDialog v-model:visible="assignDialogVisible" title="分配客户" width="30%" destroy-on-close>
      <el-row>
        <el-col :span="24">
          <el-form
            :model="assignForm"
            label-width="120px"
            ref="assignFormRef"
            :rules="{
              assignValue: [
                {
                  required: true,
                  message: '请选择分配类型/人员',
                  trigger: 'blur',
                },
              ],
            }"
          >
            <el-form-item label="分配类型/人员" prop="assignValue">
              <el-select v-model="assignForm.assignValue" placeholder="选择公海或者业务员">
                <el-option-group v-for="group in assignDoptions" :key="group.label" :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.userid"
                    :label="item.username"
                    :value="item.userid"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="assignDialogVisible = false">退出</el-button>
          <el-button type="primary" @click="assignSubmit"> 分配 </el-button>
        </span>
      </template>
    </CustomDialog>

    <!-- 跟进记录 -->
    <el-drawer v-model="rightTable" direction="rtl" size="50%">
      <template #header="{ titleId, titleClass }">
        <h3 :id="titleId" :class="titleClass">
          <el-row :gutter="20">
            <el-col :span="1"
              ><el-icon class="iconlg"><Document /></el-icon
            ></el-col>
            <el-col :span="6">
              <div>
                {{ objTitle.company_name }}
              </div>
              <div>
                {{ objTitle.name }}
              </div></el-col
            >
          </el-row>
          <div></div>
        </h3>
      </template>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-switch
            @change="changgeDealFun"
            style="margin: 0px 0px 12x 50px; --el-switch-on-color: #13ce66; --el-switch-off-color: gray"
            v-model="hasContract"
            size="large"
            inactive-text="是否成交客户"
          />
        </el-col>
      </el-row>
      <div>
        <CustomForm
          :form-items="formItemsFollow"
          :form="formFollow"
          :rules="formRulesFollow"
          ref="customFormrefFollow"
          :labelWidth="120"
        ></CustomForm>
        <div class="flex justify-start leftbtn1">
          <el-button type="primary" @click="addFollowFun">添加跟进记录</el-button>
        </div>
      </div>
      <!-- :icon="CircleCheck" -->
      <el-timeline
        style="margin-top: 28px"
        v-loading="isLoading"
        element-loading-text="加载中..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(122, 122, 122, 0.8)"
      >
        <el-timeline-item
          :key="item"
          v-for="item in followList"
          :timestamp="item.created_at"
          placement="top"
          size="large"
          color="#0bbd87"
        >
          <el-card>
            <h3>{{ item.context || '' }}</h3>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="5">
                <span>拜访人:{{ item.user_name || '' }} </span></el-col
              >
              <el-col :span="5">
                <span>拜访方式:{{ toContact_method(item.contact_method) || '' }} </span></el-col
              >
              <el-col :span="5">
                <span> 拜访日期:{{ item.date || '' }} </span></el-col
              >
              <el-col :span="5"> 下次拜访日期:{{ item.next_contact_date || '' }}</el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-drawer>
  </div>
</template>

<script setup lang="jsx">
import level from '@province-city-china/level'
import CustomDialog from '@/components/DDialog'
import CustomForm from '@/components/DForm'
import { Plus, Search, Share } from '@element-plus/icons-vue'
import { ref, onMounted, computed, defineExpose, reactive, watch } from 'vue'
import { getSalesUsers } from '@/api/user'
import { getProductsCategoryDict } from '@/api/productsCategory'
import CustomTable from '@/components/DTable'
// import formatTime from '@/utils/fomattime'
import {
  getClientList,
  addClient,
  createFollowUpRecord,
  getClientFollowUpRecords,
  findClient,
  updatedClient,
  changeSea,
  transferOwnClient,
  assignClient,
  changgeDeal
} from '@/api/client'
import { ElMessage, ElMessageBox } from 'element-plus/lib'
const assignFormRef = ref( '' )

const hasContract = ref( false )

// 主管或者管理员的操作业务
const assignSubmit = async() => {
  const res = await assignFormRef.value.validate()
  const clientIds = selectionTable.value.length != 0 ? selectionTable.value.map( item => item.id ) : assignForm.client_id
  if ( res ) {
    const flag = assignForm.assignValue
    if ( flag == 0 ) {
      const res = await changeSea( { clientIds } )
      if ( res.data ) {
        getClientListFun()
        ElMessage.success( res.msg )
        assignDialogVisible.value = false
      }
    } else {
      const res = await assignClient( { clientIds, userId : assignForm.assignValue } )
      getClientListFun()
      ElMessage.success( res.msg )
      assignDialogVisible.value = false
    }
  }
}
const changgeDealFun = async value => {
  const customer_id = formFollow.customer_id
  const hasDeal = value ? 1 : 0
  const res = await changgeDeal( { id : customer_id, hasDeal } )
  console.log( res )
  if ( res.data ) {
    getClientListFun()
  }
}
const nowuserid = localStorage.getItem( 'uid' )
const addressoptions = reactive( {
  list : []
} )
const toContact_method = id => {
  const name = list2.list.find( item => item.id == id )
  return name.name
}
const isLoading = ref( false )
const modifyKeyInArray = ( arr, keyMap ) => {
  // 递归修改数组对象
  function modifyObject( obj ) {
    // 遍历对象的所有属性
    for ( const prop in obj ) {
      if ( typeof obj[prop] === 'object' && Array.isArray( obj[prop] ) ) {
        // 如果属性值是数组，则递归调用修改数组对象
        obj[prop].forEach( item => modifyObject( item ) )
      } else if ( typeof obj[prop] === 'object' && obj[prop] !== null ) {
        // 如果属性值是对象，则递归调用修改对象
        modifyObject( obj[prop] )
      } else if ( prop in keyMap ) {
        // 如果属性名在 keyMap 中存在，则进行修改
        const newKey = keyMap[prop]
        obj[newKey] = obj[prop]
        delete obj[prop]
      }
    }
  }

  // 遍历数组对象
  arr.forEach( obj => modifyObject( obj ) )

  return arr
}
// 分配客户给公海或者是指定销售  销售主管或者是超级管理员的功能
const shareFun = () => {
  console.log()
  const flag = selectionTable.value.length !== 0
  if ( flag ) {
    assignDialogVisible.value = true
  } else {
    ElMessage.warning( '至少选中一条数据' )
  }
}
const loading = ref( false )
onMounted( async() => {
  getClientListFun()
  await getSalesUsersFun()
  console.log( userList.value )
  assignDoptions.value.push( { label : '销售列表', options : userList.value } )
  console.log( assignDoptions.value )

  getProductsCategoryDicFun()
  addressoptions.list = modifyKeyInArray( level, { code : 'value', name : 'label' } )
} )
const userList = ref( [] )
const assignDoptions = ref( [
  {
    label : '公海',
    options : [
      {
        userid : '0',
        username : '公海'
      }
    ]
  }
] )
const assignForm = reactive( {
  client_id : [],
  assignValue : ''
} )
const getSalesUsersFun = async() => {
  const res = await getSalesUsers()
  userList.value = res.data
}
watch( addressoptions, newValue => {
  formItems.value.forEach( item => {
    if ( item.is === 'cascader' ) {
      item.options = newValue.list
    }
  } )
} )
const options = reactive( {
  list : []
} )

// 使用 reactive 创建响应式对象
const list1 = reactive( {
  list : [
    { name : '潜在客户', id : '1' },
    { name : '正式客户', id : '2' },
    { name : '老客户', id : '3' },
    { name : '暂停客户', id : '4' },
    { name : '停止合作客户', id : '5' },
    { name : '其他', id : '6' }
  ],
  label : 'name',
  value : 'id'
} )

const list2 = reactive( {
  list : [
    { id : 1, name : '微信/QQ/社交软件' },
    { id : 2, name : '电话' },
    { id : 3, name : '上门拜访' },
    { id : 4, name : '邮箱' }
  ],
  label : 'name',
  value : 'id'
} )
const getProductsCategoryDicFun = async() => {
  const { data } = await getProductsCategoryDict()
  options.list = data
  // list2.list = data
}
const title = computed( () => {
  return form.id ? '修改客户' : '添加客户'
} )
const form = reactive( {
  name : '',
  conver_img : '',
  price : '',
  description : '',
  address_zh : [],
  phone : '',
  email : '',
  status : '',
  // belong_sea : '',
  address_en : '',
  company_name : ''
} )
const formFollow = reactive( {
  customer_id : '',
  date : '',
  content : '',
  next_contact_date : '',
  contact_method : ''
} )

const formItemsFollow = ref( [
  {
    prop : 'contact_method',
    is : 'select',
    option : list2,
    label : '跟进方式',
    span : 12,
    rules : [{ required : true, message : '选择跟进方式', trigger : 'blur' }]
  },
  {
    prop : 'date',
    is : 'datetime',
    label : '跟进日期',
    span : 12,
    rules : [{ required : true, message : '选择跟进日期', trigger : 'blur' }]
  },
  {
    prop : 'content',
    label : '跟进记录',
    type : 'textarea',
    span : 12
  },
  {
    prop : 'next_contact_date',
    is : 'datetime',
    label : '下次拜访记录',
    span : 12,
    rules : [{ required : true, message : '选择拜访记录', trigger : 'blur' }]
  }
] )
const formItems = ref( [
  {
    prop : 'name',
    label : '客户名称',
    span : 8,
    rules : [{ required : true, message : '必须输入客户名称', trigger : 'blur' }]
  },
  {
    prop : 'description',
    label : '备注',
    type : 'textarea',
    span : 8
  },
  {
    prop : 'conver_img',
    label : '客户头像',
    is : 'upload',
    span : 8
  },
  {
    prop : 'phone',
    label : '联系电话',
    span : 8
  },
  {
    prop : 'company_name',
    label : '公司名称',
    span : 8
  },
  {
    prop : 'email',
    label : '客户邮箱',
    span : 8
  },

  {
    prop : 'status',
    is : 'select',
    option : list1,
    label : '客户状态',
    span : 8,
    rules : [{ required : true, message : '必须选择客户状态', trigger : 'blur' }]
  },

  // {
  //   prop : 'belong_sea',
  //   is : 'select',
  //   option : list2,
  //   label : '客户所属',
  //   span : 8,
  //   rules : [{ required : true, message : '必须选择客户归属', trigger : 'blur' }]
  // },
  {
    prop : 'address_zh',
    is : 'cascader',
    options : addressoptions.list,
    span : 8,
    label : '国内地址'
  },

  {
    prop : 'address_details',
    label : '详细地址',
    placeholder : '请输入详细地址',
    span : 12
  },
  {
    prop : 'address_en',
    label : '国外地址',
    placeholder : '手动输入客户国外地址',
    span : 12
  }
] )
const dialogVisible = ref( false )
const assignDialogVisible = ref( false )
const getClientListFun = async() => {
  loading.value = true
  const { data } = await getClientList( searchform )
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
  {
    prop : 'name',
    label : '客户名称',
    width : 220,
    render : row => {
      return (
        <div>
          {row.has_deal ? <span class='dealTitle'>成交</span> : null}
          <span>{row.name}</span>
        </div>
      )
    }
  },
  { prop : 'company_name', label : '客户公司', width : 220 },
  {
    prop : 'phone',
    width : 220,
    label : '电话'
  },
  {
    width : 150,
    prop : 'status',
    label : '客户分类',
    render : row => {
      const obj = list1.list.find( item => item.id == row.status ) || { name : '', id : 7 }
      return (
        <el-alert
          class={obj.id == 1 ? 'blueCalss' : ''}
          title={obj.name}
          type={
            obj.id == 1
              ? 'success'
              : obj.id == 2
                ? 'warning'
                : obj.id == 3
                  ? 'success'
                  : ( obj.id == 4 ) | 5
                    ? 'error'
                    : 'info'
          }
          effect='dark'
          closable={false}
        />
      )
    }
  },
  {
    width : 150,
    prop : 'belong_sea',
    label : '客户归属',
    render : row => {
      const fllag = row.belong_sea
      const userobj = userList.value.find( item => item.userid == row.userid ) || { username : '' }

      return fllag == 0 ? '公海' : userobj.username
    }
  },
  {
    width : 170,
    prop : 'updated_at',
    label : '下次联系时间'
  },
  {
    width : 170,
    prop : 'created_at',
    label : '创建时间'
  },

  {
    width : 170,
    prop : 'updated_at',
    label : '客户分配时间'
  },
  {
    width : 170,
    prop : 'updated_at',
    label : '最后联系时间'
  },

  {
    prop : 'setting',
    label : '操作',
    width : 400,
    render : row => {
      return (
        <div class='flex'>
          <el-button type='primary' onClick={() => edit( row )}>
            编辑
          </el-button>
          {row.belong_sea == 1 ? (
            <el-button type='success' onClick={() => transferToSea( row )}>
              转移到公海
            </el-button>
          ) : (
            <el-button type='success' onClick={() => getClient( row )}>
              跟进客户
            </el-button>
          )}

          <el-button type='success' onClick={() => assignFun( row )}>
            分配客户
          </el-button>
          {row.belong_sea == 1 ? (
            <el-button type='success' onClick={() => followFun( row )}>
              跟进记录
            </el-button>
          ) : (
            ''
          )}
        </div>
      )
    }
  }
] )
const assignFun = row => {
  assignForm.client_id = [row.id]
  assignDialogVisible.value = true
}
const customFormref = ref( '' )
const customFormrefFollow = ref( '' )
const submitForm = async() => {
  const flag = await customFormref.value.form.validate()
  if ( flag ) {
    if ( form.id ) {
      // 编辑
      const res = await updatedClient( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getClientListFun()
      }
    } else {
      // 添加
      const res = await addClient( form )
      if ( res.data ) {
        ElMessage( {
          message : res.msg,
          type : 'success'
        } )
        dialogVisible.value = false
        getClientListFun()
      } else {
        ElMessage.error( res.msg )
      }
    }
  }
}
const transferToSea = row => {
  ElMessageBox.confirm( `确定要转移到客户公海吗`, {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } ).then( async() => {
    const res = await changeSea( { clientIds : [row.id] } )
    if ( res.data ) {
      getClientListFun()
    }
  } )
}

// 添加拜访记录
const addFollowFun = async() => {
  const flag = await customFormrefFollow.value.form.validate()
  if ( flag ) {
    const obj = {
      ...formFollow,
      user_id : nowuserid
    }
    const res = await createFollowUpRecord( obj )
    if ( res.data ) {
      getdetailFollow()
    }
  }
}
// 把这个客户转化为自己的客户
const getClient = row => {
  ElMessageBox.confirm( `确定要转移成自己的客户吗`, {
    confirmButtonText : '确定',
    cancelButtonText : '取消',
    type : 'warning'
  } ).then( async() => {
    const res = await transferOwnClient( { clientIds : [row.id] } )
    if ( res.data ) {
      getClientListFun()
    }
  } )
}
// 指定用户拜访详情时间顺序
const getdetailFollow = async() => {
  isLoading.value = true
  const res = await getClientFollowUpRecords( { client_id : formFollow.customer_id } )
  followList.value = res.data
  isLoading.value = false
}
// 编辑
const edit = async row => {
  const res = await findClient( { client_id : row.id } )
  const {
    id,
    name,
    phone,
    email,
    description,
    company_name,
    conver_img,
    address_zh,
    address_en,
    status,
    address_details
  } = res.data
  form.id = id
  form.name = name
  form.phone = phone
  form.email = email
  form.conver_img = conver_img
  form.address_zh = address_zh?.split( ',' )
  form.address_en = address_en
  form.status = status
  form.company_name = company_name
  form.description = description
  form.address_details = address_details
  dialogVisible.value = true
}

const total = ref( '' )
const searchform = reactive( {
  search : '',
  status : '',
  pagesize : 10,
  currentPage : 1,
  type : '1'
} )

// const changgestateFun = async row => {
//   console.log( selectionTable )

//   ElMessage( {
//     type : 'success',
//     message : 111
//   } )
// }
const rightTable = ref( false )
const objTitle = reactive( {
  name : '',
  company_name : ''
} )
const followList = ref( [] )
const followFun = async row => {
  isLoading.value = true

  formFollow.customer_id = row.id
  objTitle.name = row.name
  objTitle.company_name = row.company_name
  rightTable.value = true
  console.log( objTitle )
  hasContract.value = !!row.has_deal
  const res = await getClientFollowUpRecords( { client_id : row.id } )
  followList.value = res.data
  isLoading.value = false
}
const gotoadd = () => {
  form.id = ''
  form.name = ''
  form.conver_img = ''
  form.address_zh = []
  form.description = ''
  form.phone = ''
  form.email = ''
  form.status = ''
  // form.belong_sea = ''
  form.address_en = ''
  dialogVisible.value = true
}
defineExpose( { tableItemSelectionRef } )
</script>

<style lang="scss">
.iconlg {
  font-size: 36px;
}
.leftbtn {
  margin-left: 100px;
}
.leftbtn1 {
  margin-left: 120px;
}
.blueCalss {
  background-color: darkblue !important;
}
.el-drawer__header {
  margin-bottom: 10px;
}
.el-switch--large .el-switch__label {
  color: #000;
}
.dealTitle {
  background-color: #67c23a;
  color: white;
  margin-right: 10px;
  padding: 5px;
  border-radius: 10px;
}
</style>
