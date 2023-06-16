import http from '@/utils/request'

// 角色列表
export function roleList( data ) {
  return http.request( {
    method : 'get',
    url : '/role/rolesAllList',
    data
  } )
}
// 添加角色
export function addRole( data ) {
  return http.request( {
    method : 'post',
    url : '/role/addRole',
    data
  } )
}

// 删除角色
export function delRole( data ) {
  return http.request( {
    method : 'post',
    url : '/role/delRole',
    data
  } )
}

// 查找角色
export function findRole( data ) {
  return http.request( {
    method : 'get',
    url : '/role/findRole',
    data
  } )
}

// 更新角色
export function updateUser( data ) {
  return http.request( {
    method : 'post',
    url : '/role/updateUser',
    data
  } )
}
