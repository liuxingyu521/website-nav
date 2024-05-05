import design from './design.yml'
import fe from './fe.yml'
import learn from './learn.yml'
import util from './util.yml'
import funny from './funny.yml'
import ai from './ai.yml'
import other from './other-nav.yml'
// import be from './be.yml'
// import devOps from './dev-ops.yml'
// import download from './download.yml'
// import qa from './qa.yml'
// import relax from './relax.yml'

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
