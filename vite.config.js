import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Conversor-de-Moedas-/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})