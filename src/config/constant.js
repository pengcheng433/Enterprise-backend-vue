export const WX_APPID = 'appid'
export const COOKIE_PREFIX = 'vite_'
export const TOKEN = `${COOKIE_PREFIX}_token`
export const AVATAR = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

export const GLOBAL_DATA = {
  env : 'fat',
  // dev : {
  //   baseUrl : '/api'
  // },
  fat : {
    baseUrl : '/api'
  },
  uat : {
    baseUrl : '/api'
  },
  pro : {
    baseUrl : '/api'
  }
}

export const WHITE_CODE_LIST = [
  {
    code : 200,
    msg : ''
  },
  {
    code : 5006,
    msg : '验证码错误或已过期'
  },
  {
    code : 5005,
    msg : '没有访问权限'
  }
]

export const LOGIN_ERROR_CODE = [
  {
    code : 5004,
    msg : '无效token'
  }
]

// export const DOMAIN_REAL = 'http://124.222.60.105:8080/exl/'
// export const DOMAIN_REAL = 'http://admin.japannetgo.xyz'
export const DOMAIN_REAL = 'http://localhost:3031'

