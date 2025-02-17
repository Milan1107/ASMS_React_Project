import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

console.log("main.jsx is running...");

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ToastContainer />
      <App />
  </StrictMode>
)
