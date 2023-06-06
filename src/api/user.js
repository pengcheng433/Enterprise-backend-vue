import http from '@/utils/request'

// 用户列表
export function UserList( data ) {
  return http.request( {
    method : 'get',
    url : '/user',
    data
  } )
}

export function login( data ) {
  return http.request( {
    method : 'post',
    url : '/getinfo',
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
