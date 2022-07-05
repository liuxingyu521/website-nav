import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import content from '@originjs/vite-plugin-content'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/website-nav/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    vue(),
    content({
      YAML: {
        enable: true,
      },
    }),
  ],
})
