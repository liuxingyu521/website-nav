/** 判断是否dev模式 */
export function isDev() {
  return location.host.includes('localhost')
}

/** 获取应用路径前缀 */
export function getAppPrefix() {
  return isDev() ? '' : '/website-nav'
}
