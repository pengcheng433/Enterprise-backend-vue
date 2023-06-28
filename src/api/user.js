import http from '@/utils/request'

// 管理员用户列表
export function UserList( data ) {
  return http.request( {
    method : 'get',
    url : '/user/list',
    data
  } )
}
// 登录账号
export function login( data ) {
  return http.request( {
    method : 'post',
    url : '/api/getinfo',
    data
  } )
}
// 修改状态
export function changgestate( data ) {
  return http.request( {
    method : 'post',
    url : '/user/changgestate',
    data
  } )
}

// 添加用户
export function adduser( data ) {
  return http.request( {
    method : 'post',
    url : '/user/adduser',
    data
  } )
}
// 查询用户数据详情
export function finduserinfo( data ) {
  return http.request( {
    method : 'get',
    url : '/user/finduserinfo',
    data
  } )
}
// 修改更新用户数据
export function updateUser( data ) {
  return http.request( {
    method : 'post',
    url : '/user/updateUser',
    data
  } )
}

// 批量删除
export function delUser( data ) {
  return http.request( {
    method : 'post',
    url : '/user/delsUser',
    data
  } )
}
export function getInfo( data ) {
  return http.request( {
    method : 'get',
    url : '/getUserInfo',
    data
  } )
}

// 重置密码
export function resetPassword( data ) {
  return http.request( {
    method : 'post',
    url : '/user/resetPassword',
    data
  } )
}

// 获取销售
export function getSalesUsers( data ) {
  return http.request( {
    method : 'get',
    url : '/user/getSalesUsers',
    data
  } )
}

export function logout() {
  return http.request( {
    url : '/logout',
    method : 'get'
  } )
}

export function loginHistory() {
  return http.request( {
    url : '/login/history',
    method : 'get'
  } )
}

export function testRequest() {
  return http.request( {
    url : '/test',
    method : 'get'
  } )
}
