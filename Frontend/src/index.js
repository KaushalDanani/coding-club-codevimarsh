import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import backgound_video from './video/bg_large.mp4'
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <video autoPlay loop muted id='bg_video'>
      <source src={backgound_video} type='video/mp4' />
    </video>
    <App />
  </React.StrictMode>
);


// reportWebVitals();
