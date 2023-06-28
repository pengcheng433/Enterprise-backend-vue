import http from '@/utils/request'

// 新闻分类列表
export function getNewsCategoryList( data ) {
  return http.request( {
    method : 'get',
    url : '/newCategory/getNewsCategoryList',
    data
  } )
}
// 添加新闻分类
export function addNewsCategory( data ) {
  return http.request( {
    method : 'post',
    url : '/newCategory/addNewsCategory',
    data
  } )
}

// 删除新闻分类
export function deleteNewsCategory( data ) {
  return http.request( {
    method : 'post',
    url : '/newCategory/deleteNewsCategory',
    data
  } )
}

// 查找新闻分类
export function getNewsCategoryById( data ) {
  return http.request( {
    method : 'get',
    url : '/newCategory/getNewsCategoryById',
    data
  } )
}

// 更新新闻分类
export function updateNewsCategory( data ) {
  return http.request( {
    method : 'post',
    url : '/newCategory/updateNewsCategory',
    data
  } )
}

// 改变新闻分类状态
export function enableNewsCategory( data ) {
  return http.request( {
    method : 'post',
    url : '/newCategory/enableNewsCategory',
    data
  } )
}

// 新闻分类字典
export function getNewsCategorydic( data ) {
  return http.request( {
    method : 'get',
    url : '/newCategory/getNewsCategorydic',
    data
  } )
}
