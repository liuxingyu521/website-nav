import { useGithubAccess, useGlobalFeedbackVisible } from './store'
import { getAccessToken } from './apis/github'

export const checkGithubAccess = async function getGithubAccess () {
  const params = Object.fromEntries(new URL(location.href).searchParams)
  const githubAccessToken = useGithubAccess()
  const globalFeedbackVisible = useGlobalFeedbackVisible()

  if (params.code) {
    const accessToken = await getAccessToken(params.code)

    if (accessToken) {
      githubAccessToken.value = accessToken
      globalFeedbackVisible.value = true

      history.replaceState(
        null,
        document.title,
        `${location.origin}${location.pathname}`,
      )
    }
  }
}
