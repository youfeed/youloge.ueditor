import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [vue(),UnoCSS()],
  build:{
    sourcemap:false,
    lib: {
      format: 'umd',
      entry: 'lib/index.js',
      name: 'youloge',
      fileName: (format) => `youloge.${format}.js`,
    },
    cssCodeSplit:true,
    rollupOptions: { 
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData: `@import "./lib/style/index.scss";`
      },
    }
  }
})
