import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx'; 

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router> 
      <AuthProvider> 
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
