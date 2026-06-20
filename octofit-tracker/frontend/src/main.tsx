import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

// Environment configuration:
// Set VITE_CODESPACE_NAME in .env.local for Codespaces deployment
// Example: VITE_CODESPACE_NAME=your-codespace-name
// Falls back to localhost:8000 if not set

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
