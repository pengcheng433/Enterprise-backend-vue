import http from '@/utils/request'
// 客户分页查询
export function getContactUsList( data ) {
  return http.request( {
    method : 'get',
    url : '/contactUs/getContactUsList',
    data
  } )
}

// 加入到客户公海
export function addClientSea( data ) {
  return http.request( {
    method : 'post',
    url : '/contactUs/addClientSea',
    data
  } )
}
