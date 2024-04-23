import { ViteSSG } from 'vite-ssg/single-page'
import App from './app.vue'
import '@/css/index.less'
import 'virtual:uno.css'

export const createApp = ViteSSG(App, async ({ isClient }) => {
  if (isClient) {
    const { checkGithubAccess } = await import('./github-access-init')
    checkGithubAccess()
  }
})
