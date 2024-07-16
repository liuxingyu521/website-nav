import design from './design.json'
import fe from './fe.json'
import learn from './learn.json'
import util from './util.json'
import funny from './funny.json'
import ai from './ai.json'
import other from './other-nav.json'
// import be from './be.json'
// import devOps from './dev-ops.json'
// import download from './download.json'
// import qa from './qa.json'
// import relax from './relax.json'

export interface ILink {
  title: string
  description: string
  url: string
  logo?: string
}

export interface IMenuItem {
  title: string
  icon: string
  subMenu: {
    title: string
    top?: boolean
    links: ILink[]
  }[]
  isExpand?: boolean
}

/** 菜单导航数据 */
export const menus: IMenuItem[] = [
  util,
  ai,
  fe,
  // be, qa, devOps,
  design,
  learn,
  funny,
  other,
  // download, relax
]

/** 链接汇总，供查找 */
export const AllLinks = menus.reduce((acc, item) => {
  return [...acc, ...item.subMenu.map(it => it.links).flat(2)]
}, [] as ILink[])
