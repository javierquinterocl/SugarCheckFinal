import { fileURLToPath, URL } from 'node:url'
import topLevelAwait from 'vite-plugin-top-level-await';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    topLevelAwait()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    
    
    build: {
      target: ["chrome89", "edge89", "firefox89", "safari15"]
   },
   base: 'https://javierquinterocl.github.io/SugarCheckFinal/'
  }
})
