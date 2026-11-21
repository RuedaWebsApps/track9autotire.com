import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

const rootEl = document.getElementById('root');

if (rootEl) {
  // If prerendered HTML exists, hydrate; otherwise render
  if (rootEl.hasChildNodes()) {
    ReactDOM.hydrateRoot(
      rootEl,
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
}
