import http from '@/utils/request'

// 产品分类列表
export function getProductsCategoryList( data ) {
  return http.request( {
    method : 'get',
    url : '/productsCategory/getProductsCategoryList',
    data
  } )
}

// 添加产品分类
export function addProductsCategory( data ) {
  return http.request( {
    method : 'post',
    url : '/productsCategory/addProductsCategory',
    data
  } )
}

// 删除产品分类
export function deleteProductsCategory( data ) {
  return http.request( {
    method : 'post',
    url : '/productsCategory/deleteProductsCategory',
    data
  } )
}

// 查找产品分类
export function getProductsCategoryById( data ) {
  return http.request( {
    method : 'get',
    url : '/productsCategory/getProductsCategoryById',
    data
  } )
}

// 更新产品分类
export function updateProductsCategory( data ) {
  return http.request( {
    method : 'post',
    url : '/productsCategory/updateProductsCategory',
    data
  } )
}

// 改变产品分类状态
export function enableProductsCategory( data ) {
  return http.request( {
    method : 'post',
    url : '/productsCategory/enableProductsCategory',
    data
  } )
}

// 产品分类字典
export function getProductsCategoryDict( data ) {
  return http.request( {
    method : 'get',
    url : '/productsCategory/getProductsCategoryDict',
    data
  } )
}
