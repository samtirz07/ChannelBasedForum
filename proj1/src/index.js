import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function initializeDB() {
  fetch('http://localhost:81/init', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded"}
  }).then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
}
initializeDB();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
