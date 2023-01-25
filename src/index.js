import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import SortContextProvider from './Components/Context/sortContext';
import CategoryContextProvider from './Components/Context/categoryContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <SortContextProvider>
      <CategoryContextProvider>
        <App />
      </CategoryContextProvider>
    </SortContextProvider>
  </React.StrictMode>
);

