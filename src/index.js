import 'bootstrap';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import ClientApp from './components/ClientApp';

const clientAppRoot = ReactDOM.createRoot(document.getElementById('client-app-root'));

clientAppRoot.render(
  <React.StrictMode>
    <ClientApp />
  </React.StrictMode>
);
