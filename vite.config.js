import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    {
      name: 'generate-sitemap-and-prerender',
      apply: 'build',
      // closeBundle runs after Vite has finished writing every file to dist/,
      // so this is guaranteed to be the last write — no race with Vite's own
      // public-dir copy, and dist/index.html is guaranteed to exist already
      // for the prerender step to use as its template.
      closeBundle() {
        console.log('Generating sitemap...')
        execSync('node server/generateSitemap.mjs', { stdio: 'inherit' })

        // Copy the freshly generated sitemap directly into dist/ as the final
        // step, so it can never be shadowed by a stale public/sitemap.xml copy.
        fs.copyFileSync(
          path.resolve(process.cwd(), 'public/sitemap.xml'),
          path.resolve(process.cwd(), 'dist/sitemap.xml')
        )

        console.log('Prerendering per-route metadata...')
        execSync('node server/prerenderMeta.mjs', { stdio: 'inherit' })
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
