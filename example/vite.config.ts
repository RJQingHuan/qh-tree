import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    UniPages(),
    uni(),
    UnoCSS(),
    UniManifest(),
  ],
})
