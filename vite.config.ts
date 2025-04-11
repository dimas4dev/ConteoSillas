// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ConteoSillas/', // 👈 obligatorio para que GH Pages funcione bien
})

