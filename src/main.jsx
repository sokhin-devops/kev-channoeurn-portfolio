import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/inter'
// Only the Latin italic style of Instrument Serif is used (for small accents).
import '@fontsource/instrument-serif/latin-400-italic.css'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
