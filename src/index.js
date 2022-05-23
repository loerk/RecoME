import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { BrowserRouter } from "react-router-dom";
import { UserDataContextProvider } from './contexts/UserDataContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserDataContextProvider>
    <ThemeContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeContextProvider>
  </UserDataContextProvider>
);


