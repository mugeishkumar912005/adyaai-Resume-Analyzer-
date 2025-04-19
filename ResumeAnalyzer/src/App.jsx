import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Home from './Components/Home';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
