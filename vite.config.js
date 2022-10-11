import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import content from '@originjs/vite-plugin-content'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

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
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        {
          '@vueuse/core': [
            // named imports
            'useFetch',
          ],
        },
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    visualizer(),
  ],
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ['element-plus'],
  },
})
