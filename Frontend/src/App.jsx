import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Default toast styles

import Login from './Components/Login';
import SignUp from './Components/Signup';
import Home from './Components/Home';
import Profile from './Components/Profile';
import UploadSection from './Components/UploadSection';
import ForgetPassword from './Components/ForgetPasswor.jsx';
import AnalysisResult from './Components/AnalysisResult';
import Nav from './Components/Nav';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Nav' element={<Nav/>}/>
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/UploadSection' element={<UploadSection />} />
        <Route path='/Reset-Password' element={<ForgetPassword />} />
        <Route path='/Analysis' element={<AnalysisResult />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
