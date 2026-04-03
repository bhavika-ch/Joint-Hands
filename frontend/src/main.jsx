import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from './context/AuthContext.jsx';
import CurrentProvider from './context/Current.jsx';
import { BrowserRouter } from 'react-router-dom';

// ❌ Wrong import:
// import { ToastProvider } from '@radix-ui/react-toast'

// ✅ Correct import:
import { ToastProvider, ToastViewport } from './components/ui/toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CurrentProvider>
          <ToastProvider>
            <App />
            <ToastViewport /> {/* 👈 Must be inside ToastProvider */}
          </ToastProvider>
        </CurrentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
