import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Home from './Components/Home';
import Profile from './Components/Profile';
import UploadSection from './Components/UploadSection';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/UploadSection' element={<UploadSection/>}/>
      </Routes>
    </Router>
  );
}

export default App;
