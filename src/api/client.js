import http from '@/utils/request'
// 客户分页查询
export function getClientList( data ) {
  return http.request( {
    method : 'get',
    url : '/client/getClientList',
    data
  } )
}
// 添加客户
export function addClient( data ) {
  return http.request( {
    url : '/client/addClient',
    method : 'post',
    data
  } )
}

// 添加客户拜访
export function createFollowUpRecord( data ) {
  return http.request( {
    url : '/client/createFollowUpRecord',
    method : 'post',
    data
  } )
}

// 查询指定客户拜访记录
export function getClientFollowUpRecords( data ) {
  return http.request( {
    url : '/client/getClientFollowUpRecords',
    method : 'get',
    data
  } )
}

// 查询指定客户拜访记录
export function findClient( data ) {
  return http.request( {
    url : '/client/findClient',
    method : 'get',
    data
  } )
}

// 更新指定客户
export function updatedClient( data ) {
  return http.request( {
    url : '/client/updatedClient',
    method : 'post',
    data
  } )
}

// 把客户放到公海
export function changeSea( data ) {
  return http.request( {
    url : '/client/changeSea',
    method : 'post',
    data
  } )
}

// 把客户加入成自己的客户
export function transferOwnClient( data ) {
  return http.request( {
    url : '/client/transferOwnClient',
    method : 'post',
    data
  } )
}

// 分配客户
export function assignClient( data ) {
  return http.request( {
    url : '/client/assignClient',
    method : 'post',
    data
  } )
}

// 修改合同的状态
export function changgeDeal( data ) {
  return http.request( {
    url : '/client/changgeDeal',
    method : 'post',
    data
  } )
}
