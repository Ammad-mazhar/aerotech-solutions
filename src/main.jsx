import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'

<HelmetProvider>
  <App />
</HelmetProvider>

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
