/**
 * 构建数据集
 * 1. 从 src/config/websites 数据里收集所有网址
 * 2. 获取新增网址的 favicon 文件，写入 assets 文件夹，并记录到数据集里
 */

import { IIcon, parseFavicon } from 'parse-favicon'
import got from 'got'
import { extname, join, dirname } from 'node:path'
import { createWriteStream, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { pipeline as streamPipeline } from 'node:stream/promises'
import { IMenuItem } from '@/config/websites'
import ora from 'ora'

const originWebsitesDir = join(dirname(new URL(import.meta.url).pathname), '../src/config/websites')
const assetsDir = join(dirname(new URL(import.meta.url).pathname), '../public/assets')

function isSvg(path: string) {
  return extname(path) === '.svg'
}

function fetchText(url: string): Promise<string> {
  return got(url, { timeout: { request: 20000 } }).text()
}

function fetchBuffer(url: string): Promise<ArrayBuffer> {
  return got(url, { timeout: { request: 20000 } }).buffer()
}

function getIconSize(icon: IIcon) {
  if (!icon.size || typeof icon.size !== 'object') return {
    width: 0,
    height: 0,
  }

  if (Array.isArray(icon.size)) {
    return {
      width: icon.size[0].width,
      height: icon.size[0].height,
    }
  }

  return {
    width: icon.size.width,
    height: icon.size.height,
  }
}

const getFavicon = (url: string, { maxSize } = { maxSize: 100 }): Promise<IIcon> => {
  const observable = parseFavicon(url, fetchText, fetchBuffer)
  const icons: IIcon[] = []

  return new Promise((resolve, reject) => {
    observable.subscribe({
      next: (icon: IIcon) => {
        icons.push(icon)
      },
      complete: () => {
        const icon = icons.map((item) => {
          const size = getIconSize(item)
          return {
            ...item,
            size,
          }
        }).filter((item) => {
          if (item.url.startsWith('data:')) return false
          if (item.url.startsWith('//')) return false
          if (isSvg(item.url) && item.size.width > 100) return true
          return item.size.width && item.size.width < maxSize
        }).sort((a, b) => {
          return b.size.width - a.size.width
        })

        resolve(icon[0])
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

const formatIconUrl = (iconUrl: string, siteUrl: URL) => {
  if (iconUrl.startsWith('http')) return iconUrl

  if (iconUrl.startsWith('//')) return `${siteUrl.protocol}${iconUrl}`

  return `${siteUrl.origin}${iconUrl.startsWith('/') ? iconUrl : `/${iconUrl}`}`
}

const checkAndAddIcon = (dataset: IMenuItem) => {
  const tasks = dataset.subMenu?.map((item) => {
    return Promise.allSettled((item.links || []).map(async (link) => {
      if (link.logo) return Promise.resolve()

      try {
        const icon = await getFavicon(link.url)
        icon.url = formatIconUrl(icon.url, new URL(link.url))

        const logoFilename = `${link.title.replace(/ /g, '')}${extname(icon.url)}`
        const logoFilePath = join(assetsDir, logoFilename)

        await streamPipeline(
          got.stream(icon.url),
          createWriteStream(logoFilePath),
        )

        if ((await stat(logoFilePath)).size === 0) {
          unlinkSync(logoFilePath)
          throw new Error(`下载图标异常 => 大小为0 \n icon url: ${icon.url} \n`)
        }

        link.logo = logoFilename
      }
      catch (error) {
        console.log(`getFavicon error: `, error)
        link.logo = 'default-link.png'
      }
    }))
  }) || []

  return Promise.allSettled(tasks)
}

async function main() {
  const datasetFiles = readdirSync(originWebsitesDir).filter(filename => extname(filename) === '.json')
  const spinner = ora('构建数据集... ').start()

  // 每个分类的数据集进行 favicon 的检测获取和数据源 logo 回填
  for (const index in datasetFiles) {
    const filename = datasetFiles[index]
    // if (filename !== 'funny.json') continue
    spinner.suffixText = `${filename} (${Number(index) + 1}/${datasetFiles.length})`

    const filePath = join(originWebsitesDir, filename)
    const dataset = JSON.parse(readFileSync(filePath, { encoding: 'utf-8' }))

    await checkAndAddIcon(dataset)

    writeFileSync(filePath, JSON.stringify(dataset, null, 2), { encoding: 'utf-8' })
  }

  spinner.suffixText = ''
  spinner.succeed(`数据集构建完成 (${datasetFiles.length}/${datasetFiles.length})`)
}

main()
