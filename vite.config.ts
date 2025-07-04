import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@components': path.resolve(__dirname,'./src/components'),
      '@hooks': path.resolve(__dirname,'./src/hooks'),
      '@utils':path.resolve(__dirname,'./src/utils'),
      '@constants':path.resolve(__dirname,'./src/constants')
    }
  },
  server:{
    port: 3000,
    open: true
  }
})
