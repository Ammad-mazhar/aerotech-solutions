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
      name: 'generate-sitemap-and-prerender',
      apply: 'build',
      // closeBundle runs after Vite has finished writing every file to dist/,
      // so this is guaranteed to run last — no race with Vite's own
      // public-dir copy. Deterministic order:
      //   (1) full-body + <head> prerender, since it needs dist/index.html
      //       as a template (already written by Vite's main build phase by
      //       the time closeBundle fires);
      //   (2) sitemap generation, writing directly into dist/sitemap.xml —
      //       there is no public/sitemap.xml for Vite's own public-dir copy
      //       to ever shadow this with on a later build;
      //   (3) sitemap validation — a failure here throws (execSync exits
      //       non-zero), which fails this whole `vite build`.
      closeBundle() {
        console.log('Prerendering full route HTML...')
        execSync('node server/prerenderApp.mjs', { stdio: 'inherit' })

        console.log('Generating sitemap...')
        execSync('node server/generateSitemap.mjs', { stdio: 'inherit' })

        console.log('Validating sitemap...')
        execSync('node server/validateSitemap.mjs', { stdio: 'inherit' })
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
