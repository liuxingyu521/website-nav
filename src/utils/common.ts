/** 判断是否dev模式 */
export function isDev () {
  // return location.host.includes('localhost')
  return import.meta.env.DEV
}
