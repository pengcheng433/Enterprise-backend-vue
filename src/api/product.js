import http from '@/utils/request'

// 添加产品
export function addProduct( data ) {
  return http.request( {
    method : 'post',
    url : '/product/addProduct',
    data
  } )
}

// 查询产品列表
export function getProductList( data ) {
  return http.request( {
    method : 'get',
    url : '/product/getProductList',
    data
  } )
}

// 查询产品
export function getProductById( data ) {
  return http.request( {
    method : 'get',
    url : '/product/getProductById',
    data
  } )
}

// 更新产品
export function updateProduct( data ) {
  return http.request( {
    method : 'post',
    url : '/product/updateProduct',
    data
  } )
}

// 删除产品
export function deleteProduct( data ) {
  return http.request( {
    method : 'post',
    url : '/product/deleteProduct',
    data
  } )
}

// 改变产品状态
export function enableProduct( data ) {
  return http.request( {
    method : 'post',
    url : '/product/enableProduct',
    data
  } )
}

export default {
  addProduct,
  getProductList,
  getProductById,
  updateProduct,
  deleteProduct,
  enableProduct
}
