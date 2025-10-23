// IMPORTS (Notes for each on right)
import React from 'react';                          // React: helps build dynamic, interactive web pages that feel like a single page
import ReactDOM from 'react-dom/client';            // ReactDOM: Necessary to launch site, in this file, createRoote is used to connect application to specific part of the website 
import App from './components/app/App.jsx';                        // App: main component of the app
import './index.css';                              
import { BrowserRouter } from 'react-router-dom';   // BrowserRouter: handles navigation between pages without reloading


ReactDOM.createRoot(document.getElementById('root')).render(
  
  //Wrapping the app component with the BrowserRouter allows for client-side routing
  //Client-side routing: lets the app switch pages without reloading the entire website
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>
);