import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    {
      name: 'generate-sitemap',
      apply: 'build',
      buildStart() {
        console.log('Generating sitemap...')
        execSync('node server/generateSitemap.js', { stdio: 'inherit' })
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          helmet: ['react-helmet-async'],
        }
      }
    },
    chunkSizeWarningLimit: 600,
  }
})