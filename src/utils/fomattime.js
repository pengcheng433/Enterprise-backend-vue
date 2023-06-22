const formatTime = ( time ) => {
  const date = new Date( time )
  const formattedDate = date.toISOString().replace( 'T', ' ' ).replace( /\.\d+Z$/, '' ) // 将时间转换为 ISO 8601 格式的字符串并去除毫秒和时区信息
  return formattedDate
}

export default formatTime
