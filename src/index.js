import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store.js';
import { Provider } from 'react-redux';

// Création du Provider pour que l'App entière est accès au store redux.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
