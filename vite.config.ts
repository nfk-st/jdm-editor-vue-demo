import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves from /jdm-editor-vue-demo/
  base: '/jdm-editor-vue-demo/',
  plugins: [vue()],
})
