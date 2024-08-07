import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isEnableAnalyze = process.env.ANALYZE === 'true'

  return {
    base: '/',
    resolve: {
      alias: {
        '@': resolve(import.meta.dirname, 'src/'),
      },
    },
    plugins: [
      vue(),
      UnoCSS(),
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
      isEnableAnalyze && visualizer({
        open: true,
        gzipSize: true,
      }),
    ],
    server: {
      port: 3000,
    },
    ssr: {
      noExternal: ['element-plus'],
    },
  }
})
