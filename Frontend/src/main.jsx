import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop'
import { NotificationProvider } from './components/NotificationCenter'
import { NavPagesProvider } from './contexts/NavPagesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <NavPagesProvider>
          <ScrollToTop />
          <App />
        </NavPagesProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
)
