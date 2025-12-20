import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import "./i18n";
import { ThemeProvider } from './store/theme/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)
