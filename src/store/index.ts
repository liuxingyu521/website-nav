import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import { Github_Access_Token_Storage_Key } from '@/config/constants'

/** localStorage 里的access_token */
export const useGithubAccess = createGlobalState(() => {
  return useLocalStorage(Github_Access_Token_Storage_Key, '', {
    mergeDefaults: true,
  })
})

/** 反馈提交的弹窗展示状态 */
export const useGlobalFeedbackVisible = createGlobalState(() => {
  return ref(false)
})
