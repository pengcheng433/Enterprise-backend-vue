import http from '@/utils/request'

// 角色列表
export function roleList( data ) {
  return http.request( {
    method : 'get',
    url : '/role/rolesAllList',
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
