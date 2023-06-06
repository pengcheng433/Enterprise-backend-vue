const formatTime = time => {
  const date = new Date( time )

  const year = date.getFullYear() // 获取年份
  const month = String( date.getMonth() + 1 ).padStart( 2, '0' ) // 获取月份（注意月份从0开始，需要加1）
  const day = String( date.getDate() ).padStart( 2, '0' ) // 获取日期
  const hours = String( date.getHours() ).padStart( 2, '0' ) // 获取小时
  const minutes = String( date.getMinutes() ).padStart( 2, '0' ) // 获取分钟
  const seconds = String( date.getSeconds() ).padStart( 2, '0' ) // 获取秒钟

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDate
}

export default formatTime
