import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import { GITHUB_ACCESS_TOKEN_STORAGE_KEY } from '@/config/constants'

/** localStorage 里的access_token */
export const useGithubAccess = createGlobalState(() => {
  return useLocalStorage(GITHUB_ACCESS_TOKEN_STORAGE_KEY, '', {
    mergeDefaults: true,
  })
})

/** 反馈提交的弹窗展示状态 */
export const useGlobalFeedbackVisible = createGlobalState(() => {
  return ref(false)
})
