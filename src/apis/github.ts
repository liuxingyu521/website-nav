import { useFetch } from '@vueuse/core'
import { useGithubAccess } from '@/store'
import { isDev } from '@/utils/common'

/** github oauth2 */
function goAuthorize() {
  const url = isDev()
    ? 'http://localhost:7001/github/authorize?type=nav'
    : 'http://api.xuer.tech/github/authorize?type=nav'

  window.location.href = url
}

/** 获取 githubToken */
async function getAccessToken(code: string) {
  const url = isDev()
    ? `http://localhost:7001/github/access-token?code=${code}&type=nav`
    : `https://api.xuer.tech/github/access-token?code=${code}&type=nav`

  const res = await fetch(url).then((res) => res.json())

  return res.access_token
}

/** 提交新网站 */
async function createWebsite(websiteInfo: {
  title: string
  url: string
  desc?: string
}) {
  const githubAccessToken = useGithubAccess()
  const markdownText = `
  - 标题: ${websiteInfo.title}
  - 链接: ${websiteInfo.url}
  - 描述: ${websiteInfo.desc ? websiteInfo.desc : '空'}
  `

  const url = isDev()
    ? 'http://localhost:7001/github/website'
    : 'https://api.xuer.tech/github/website'

  const { error } = await useFetch(url, {
    headers: {
      'auth-token': githubAccessToken.value,
    },
  })
    .post({
      content: markdownText,
      title: websiteInfo.title,
      type: 'nav',
    })
    .json()

  return { error }
}

export { goAuthorize, getAccessToken, createWebsite }
