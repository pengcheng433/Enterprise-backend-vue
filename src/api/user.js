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

// 获取登录用户的角色权限 的url
export function hasPermission( data ) {
  return http.request( {
    method : 'get',
    url : '/permisson/hasPermission',
    data
  } )
}
