import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {AppContextProvider} from './contexts/AppContext';

const firebaseConfig = {
  apiKey: "AIzaSyBEyQbWUzaIRLztGvsH0i_tsrGg9vegkGE",
  authDomain: "partyjunction-13210.firebaseapp.com",
  projectId: "partyjunction-13210",
  storageBucket: "partyjunction-13210.firebasestorage.app",
  messagingSenderId: "118295552864",
  appId: "1:118295552864:web:4f5dafdd169154f100f405",
  measurementId: "G-WZVWZGW7JS"
};

ReactDOM.render(
  <React.StrictMode>
    

    <AppContextProvider value={{}}>
    <BrowserRouter>
    
      <App />
    
    </BrowserRouter>
    </AppContextProvider>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
