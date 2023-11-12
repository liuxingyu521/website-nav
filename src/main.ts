import { ViteSSG } from 'vite-ssg/single-page'
import App from './app.vue'
import '@/css/index.less'
import 'virtual:uno.css'

export const createApp = ViteSSG(App, ({ isClient }) => {
  if (isClient) {
    import('./github-access-init')
  }
})
