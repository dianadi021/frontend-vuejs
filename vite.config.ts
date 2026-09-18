import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VUE_APP_BASE_URL || '/',
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      port: 5173,
      // Proxy support for Laravel 12 API during development
      proxy: {
        '/api': {
          target: env.VITE_DEV_API_PROXY_TARGET || 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
        '/sanctum': {
          target: env.VITE_DEV_API_PROXY_TARGET || 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('assets/scripts/vendor')) {
              return 'vendor-fontawesome'
            }
            if (id.includes('node_modules')) {
              if (id.includes('vue') || id.includes('pinia')) {
                return 'vendor-vue'
              }
              if (
                id.includes('sweetalert2') ||
                id.includes('vue-toastification') ||
                id.includes('nprogress')
              ) {
                return 'vendor-ui'
              }
              if (id.includes('ag-grid')) {
                return 'vendor-aggrid'
              }
              if (id.includes('swiper')) {
                return 'vendor-swiper'
              }
              return 'vendor'
            }
          },
        },
      },
    },
  }
})
