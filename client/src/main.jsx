import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import UserStore from './store/UserStore.js';
import NewsStore from './store/NewsStore.js';
import DocumentStore from './store/DocumentStore.js';

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider value={{ user: new UserStore(), newsStore: new NewsStore(), documentStore: new DocumentStore() }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

