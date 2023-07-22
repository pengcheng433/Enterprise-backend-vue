import http from '@/utils/request'

// 新闻列表
export function getNewsList( data ) {
  return http.request( {
    method : 'get',
    url : '/news/getNewsList',
    data
  } )
}
// 添加新闻
export function addNews( data ) {
  return http.request( {
    method : 'post',
    url : '/news/addNews',
    data
  } )
}

// 删除新闻
export function deleteNews( data ) {
  return http.request( {
    method : 'post',
    url : '/news/deleteNews',
    data
  } )
}

// 查找新闻
export function getNewsById( data ) {
  return http.request( {
    method : 'get',
    url : '/news/getNewsById',
    data
  } )
}

// 更新新闻
export function updateNews( data ) {
  return http.request( {
    method : 'post',
    url : '/news/updateNews',
    data
  } )
}

// 改变新闻状态
export function enableNews( data ) {
  return http.request( {
    method : 'post',
    url : '/news/enableNews',
    data
  } )
}
// 上传接口
export function uoloadImg( formData ) {
  return http.request( {
    method : 'post',
    url : '/news/upload',
    data : formData,
    type : 'upload'
  } )
}
// 上传exl 导入产品
export function uoloadexl( formData ) {
  return http.request( {
    method : 'post',
    url : '/product/uploadXlsx',
    data : formData,
    type : 'upload'
  } )
}
// 置顶新闻
export function setTopNews( data ) {
  return http.request( {
    method : 'post',
    url : '/news/setTopNews',
    data
  } )
}
// 取消置顶新闻
export function cancelTopNews( data ) {
  return http.request( {
    method : 'post',
    url : '/news/cancelTopNews',
    data
  } )
}
