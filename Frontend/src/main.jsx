import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';  
import Nav from './Components/Nav';
import Home from './Components/Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>  
  </StrictMode>
);
