import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  // base: mode === "development" ? "/" : "/kneidl/", //assuming deployed to github pages
  build: {
    emptyOutDir: true
  },
  server: {
    port: 3131
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kneidle',
        short_name: 'Kneidle',
        description: 'Word guessy thing',
        display: "standalone",
        theme_color: '#261e0e',
        background_color: "#ffd680",
        icons: [
          {
            src: 'favicon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __VERCEL_GIT_COMMIT_SHA__: JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA ?? 'COMMIT_#'),
    __VERCEL_GIT_COMMIT_MESSAGE__: JSON.stringify(process.env.VERCEL_GIT_COMMIT_MESSAGE ?? 'VERCEL_GIT_COMMIT_MESSAGE'),
    __VERCEL_GIT_COMMIT_REF__: JSON.stringify(process.env.VERCEL_GIT_COMMIT_REF ?? 'VERCEL_GIT_COMMIT_REF'),
    __VERCEL_ENV__: JSON.stringify(process.env.VERCEL_ENV ?? 'development'),
  },
}))
