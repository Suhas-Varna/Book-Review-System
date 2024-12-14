import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import App from './App';
//import './index.css'; // Ensure this file exists for global styles

// Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
