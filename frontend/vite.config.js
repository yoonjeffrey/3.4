import fs from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  server: {
    https: {
      key: fs.readFileSync(new URL('../certs/key.pem', import.meta.url)),
      cert: fs.readFileSync(new URL('../certs/cert.pem', import.meta.url)),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:3003',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
