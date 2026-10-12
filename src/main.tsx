import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log("[Mindscape] Initializing main.tsx...");

const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error("[Mindscape] Fatal: #root element not found in DOM");
} else {
  try {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("[Mindscape] App mounted successfully!");
  } catch (err) {
    console.error("[Mindscape] React mount error:", err);
    rootEl.innerHTML = `<div style="color:red;padding:20px;font-family:monospace;"><h3>React Mount Exception:</h3><pre>${err}</pre></div>`;
  }
}
