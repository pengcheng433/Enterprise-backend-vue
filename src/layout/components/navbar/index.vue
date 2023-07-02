<template>
  <div class="navbar" :class="set.layoutMod + '-nav-section'">
    <div v-if="set.layoutMod === 'horizontal'" class="horizontal-sidebar-container">
      <Logo :class="set.layoutMod + '-logo'" :collapse="set.isCollapse" />
      <MenuBar />
    </div>

    <HamBurger
      v-if="set.layoutMod === 'vertical'"
      id="hamburger-container"
      :is-active="set.sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <BreadCrumb v-if="set.layoutMod === 'vertical'" id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu" :class="{ mobile: set.device === 'mobile' }">
      <HeaderSearch id="header-search" class="p8" v-if="set.device !== 'mobile'" />

      <ScreenFull id="screenfull" class="p8 hover-effect" />

      <el-tooltip content="全局size设置" effect="dark" placement="bottom">
        <size-select id="size-select" class="p8 hover-effect" />
      </el-tooltip>

      <el-dropdown class="p8 avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" class="user-avatar" />

          <div class="username">
            {{ set.userName }}
            <el-icon class="arrow">
              <ArrowDown />
            </el-icon>
          </div>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首 页</el-dropdown-item>
            </router-link>

            <el-dropdown-item divided @click="changgepwd">
              <span style="display: block">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="p8 el-icon-setting hover-effect" @click="openSettings">
        <el-icon class="setting">
          <Setting />
        </el-icon>
      </div>
    </div>
  </div>
  <!-- 密码重置对话框 -->
  <CustomDialog v-model:visible="Visible" title="修改密码" width="20%">
    <CustomForm :form-items="formresetItem" :form="formreset" :rules="formPwdRules" ref="customFormPwd"></CustomForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Visible = false">退出</el-button>
        <el-button type="primary" @click="resetPasswordFun"> 确定 </el-button>
      </span>
    </template>
  </CustomDialog>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useAppStore, useUserStore, useSettingsStore } from '@/store'
import { useRouter } from 'vue-router'
import HamBurger from './components/HamBurger'
import BreadCrumb from './components/BreadCrumb'
import HeaderSearch from './components/HeaderSearch'
import ScreenFull from './components/Screenfull'
import SizeSelect from './components/SizeSelect'
import { emitter } from '@/utils/mitt'
import CustomDialog from '@/components/DDialog'
import CustomForm from '@/components/DForm'
import Logo from '@/layout/components/sidebar/Logo'
import MenuBar from '../sidebar/Menu'
import { changePersonalPassword } from '@/api/user'
import { ElMessage } from 'element-plus/lib'
const formreset = reactive( {
  oldpwd : '',
  pwd : '',
  pwdagagin : ''
} )
const customFormPwd = ref( null )
const formPwdRules = ref( {} )
const Visible = ref( false )
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
const changgepwd = () => {
  Visible.value = true
}
const formresetItem = [
  {
    prop : 'oldpwd',
    label : '原密码',
    span : 20,
    rules : [{ trigger : 'blur', required : true, message : '输入原密码' }]
  },
  {
    prop : 'pwd',
    label : '新密码',
    span : 20,
    type : 'password',
    showPassword : true,
    rules : [{ validator : validatePass, trigger : 'blur', required : true }]
  },
  {
    prop : 'pwdagagin',
    label : '确认新密码',
    span : 20,
    type : 'password',
    showPassword : true,
    rules : [{ validator : validatePass2, trigger : 'blur', required : true }]
  }
]

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const toggleSideBar = () => {
  appStore.TOGGLE_SIDEBAR()
}

const set = reactive( {
  showLogo : computed( () => {
    return settingsStore.sidebarLogo
  } ),
  layoutMod : computed( () => {
    return settingsStore.layoutMod
  } ),
  sidebar : computed( () => {
    return appStore.sidebar
  } ),
  avatar : computed( () => {
    return userStore.avatar
  } ),
  userName : computed( () => {
    return userStore.name
  } ),
  device : computed( () => {
    return appStore.device
  } )
} )

const resetPasswordFun = async() => {
  const flag = await customFormPwd.value.form.validate()
  if ( flag ) {
    const res = await changePersonalPassword( {
      userId : userStore.uid,
      oldPassword : formreset.oldpwd,
      newPassword : formreset.pwdagagin
    } )
    if ( res.data ) {
      ElMessage.success( '修改成功' )
      Visible.value = false
      setTimeout( async() => {
        await logout()
      }, 2000 )
    } else {
      ElMessage.error( res.msg )
    }
  }
}

// 退出登录
const logout = async() => {
  await userStore.LOGIN_OUT()
  // localStorage.clear()
  localStorage.removeItem( 'token' )
  localStorage.removeItem( 'uid' )
  router.push( '/login' )
  window.location.reload()
}

const openSettings = () => {
  emitter.emit( 'openSettings' )
}

defineOptions( {
  name : 'NavBar'
} )
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;
    display: flex;
    min-width: 280px;
    align-items: center;
    color: #000000d9;
    justify-content: flex-end;
    padding-right: 10px;

    .icons {
      height: 100%;
      line-height: 50px;
      display: inline-block;
    }

    &:focus {
      outline: none;
    }

    .hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .p8 {
      padding: 0 8px;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        vertical-align: middle;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          vertical-align: middle;
          display: inline-block;
        }

        .username {
          margin-left: 12px;
          vertical-align: middle;
          display: inline-block;
          font-size: 14px;
          position: relative;
        }

        .arrow {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 0;
          font-size: 12px;
        }
      }
    }

    .el-icon-setting {
      font-size: 16px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .setting {
        color: #000;
      }
    }
  }

  &.horizontal-nav-section {
    height: 50px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    .hamburger-container {
      display: none;
    }

    .horizontal-sidebar-container {
      flex: 1 1;
      min-width: 0;
      height: 50px;
      background: rgba(0, 0, 0, 0.2);
      position: relative !important;
      align-items: center;
      .horizontal-logo {
        float: left;
        width: 210px;
      }
      .sidebar-menus {
        float: left;
        width: calc(100% - 210px) !important;
      }
      .scrollbar-wrapper {
      }
      ::v-deep(.el-menu) {
        .el-menu-item,
        .submenu-title-noDropdown,
        .el-sub-menu__title {
          height: 50px;
          line-height: 50px;
        }
      }
    }

    .right-menu {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      /*min-width: 690px;*/
      color: #fff;
      ::v-deep(.header-search) {
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
      ::v-deep(.svg-icon) {
        color: #fff;
      }
      .icons {
        color: #fff;
      }

      .hover-effect {
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
      .right-menu-item {
        color: #fff;
      }
      .el-icon-setting {
        .setting {
          color: #fff;
        }
      }
    }
  }
}
</style>
