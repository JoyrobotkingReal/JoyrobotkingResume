import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to '/' for custom domain, or '/<repo>/' for GitHub Pages without custom domain
export default defineConfig({
  base: '/JoyrobotkingResume/',
  plugins: [react()],
})
