<template>
  <el-form ref="ruleForm" :model="formState" :rules="rules" label-width="0" status-icon class="login-ruleForm">
    <el-form-item prop="account">
      <el-input
        ref="account"
        v-model="formState.account"
        class="h40"
        name="account"
        placeholder="请输入账号"
        :clearable="true"
        tabindex="1"
        type="text"
        maxlength="100"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        ref="password"
        v-model="formState.password"
        class="h40"
        show-password
        name="password"
        placeholder="请输入密码"
        :clearable="true"
        tabindex="2"
        maxlength="16"
        type="password"
        autocomplete="off"
        @keyup.enter="loginHandle"
      />
    </el-form-item>

    <el-form-item v-if="showCaptcha" prop="captcha">
      <div style="position: relative">
        <div class="code-inp">
          <el-input
            ref="captcha"
            v-model="formState.captcha"
            class="h40"
            type="text"
            name="captcha"
            placeholder="请输入校验码"
            :clearable="true"
            tabindex="3"
            maxlength="6"
            autocomplete="off"
            @keyup.enter="loginHandle"
          />
        </div>
        <div class="code">
          <img :src="captchaImg" alt="" @click="updateImage" />
        </div>
      </div>
    </el-form-item>

    <el-form-item style="margin-bottom: 0">
      <el-button
        class="h40"
        :loading="loading"
        :disabled="disabledLogin"
        type="primary"
        style="width: 100%"
        @click.prevent="loginHandle"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onBeforeMount, reactive, computed } from 'vue'
import { login, hasPermission } from '@/api/user' // UserList
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus/lib'

// import axios from 'axios'
const router = useRouter()
const userStore = useUserStore()

const ruleForm = ref()
const trigger = ['blur', 'change']
const formState = reactive( {
  country : '86',
  captcha : '',
  account : '123456',
  password : '123456Sb'
} )
const rules = {
  account : [{ required : true, message : '请输入账号', trigger }],
  password : [{ required : true, message : '请输入密码', trigger }]
  // captcha : [{ required : true, message : '请输入校验码', trigger }]
}
const showCaptcha = ref( false )
const captchaImg = ref( '' )
const loading = ref( false )

const disabledLogin = computed( () => {
  const { captcha, account, password } = formState
  if ( showCaptcha.value ) {
    return !captcha || !account || !password
  } else {
    return !account || !password
  }
} )

onBeforeMount( () => {
  const useracount = localStorage.getItem( 'useracount' )
  if ( useracount ) {
    formState.account = useracount
  }
} )

function loginHandle() {
  loading.value = true
  ruleForm.value.validate( async valid => {
    if ( valid ) {
      try {
        const params = {
          userid : formState.account,
          userpwd : formState.password
        }

        // if ( showCaptcha.value ) {
        //   params.captchaId = captchaId.value
        //   params.captchaValue = formState.captcha
        // }
        const res = await login( params )
        if ( !res.data ) {
          ElMessage.error( res.msg )
          return
        }
        localStorage.setItem( 'token', res.data.token )
        localStorage.setItem( 'uid', res.data.userid )
        localStorage.setItem( 'useracount', res.data.useracount )
        userStore.SET_UID( res.data.userid )
        userStore.SET_TOKEN( res.data.token )
        userStore.SET_NAME( res.data.username )

        const data = await hasPermission()
        userStore.SET_PERMIT( data.data )
        console.log( data )
        router.push( '/' )
      } catch ( e ) {
        ElMessage.error( e )
      } finally {
        loading.value = false
        // if ( showCaptcha.value ) {
        //   await updateImage()
        // }
      }
    }
  } )
}

defineOptions( {
  name : 'LoginPwd'
} )
</script>

<style lang="scss" scoped>
.code-inp {
  width: calc(100% - 125px);
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
}
.code {
  display: inline-block;
  height: 40px;
  width: 110px;
  cursor: pointer;
  vertical-align: middle;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  &:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
