import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactGA from "react-ga4";

if (import.meta.env.VITE_GOOGLE_ANALYTICS) {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
