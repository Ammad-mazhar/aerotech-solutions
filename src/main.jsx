import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'

const container = document.getElementById('root')

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// server/prerenderApp.mjs writes real, route-specific markup into every
// dist/<route>/index.html, so in production `container` already has content
// and must be hydrated (not re-rendered from scratch). In `vite dev` / `vite
// preview`, the root is empty (no prerender step has run), so fall back to a
// plain client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

