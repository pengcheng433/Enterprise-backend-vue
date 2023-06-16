import http from '@/utils/request'

// 所有功能权限树
export function permissonTree( data ) {
  return http.request( {
    method : 'get',
    url : '/permisson/permissionList',
    data
  } )
}
