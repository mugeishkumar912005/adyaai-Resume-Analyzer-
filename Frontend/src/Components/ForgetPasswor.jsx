import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token=localStorage.getItem('authToken');
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      toast.error('Please provide both email and new password');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.patch('http://localhost:6200/api/user/Reset-Password', {
        Email: email,
        NewPass: newPassword,
      },{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      
      console.log(response); 
      
      if (response.status === 200) {
        toast.success(response.data.Msg || 'Password reset successfully');
        navigate('/login');
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.Msg || 'Failed to reset password');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <header className="text-center py-6">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">Smart Resume</h1>
        <p className="text-md text-gray-600 mt-1">Crack jobs with us</p>
      </header>
      <div className="flex justify-start px-6">
        <button
          onClick={() => navigate('/Login')}
          className="text-blue-700 hover:text-blue-900 flex items-center font-medium"
        >
          <ArrowLeft className="mr-1 h-5 w-5" /> Back
        </button>
      </div>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Your Password</h2>
          <form className="space-y-5" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </main>
      <footer className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()} Smart Resume . All rights reserved.
      </footer>
    </div>
  );
};

export default ForgetPassword;
