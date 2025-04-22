import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [name, Setname] = useState("");
  const [Email, SetEmail] = useState("");
  const [Pass, SetPass] = useState("");
  const [Confirm_Password, setConPass] = useState("");
  const navigate = useNavigate();

  const SignupHandle = async (e) => {
    e.preventDefault();

    if (Pass !== Confirm_Password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      axios.post('https://adyaai-resume-analyzer-backend.onrender.com/api/user/AddUser/', {
        username: name,
        Email: Email,
        Password: Pass,
        Confirm_Password: Confirm_Password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success("Signup Successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <>
      <div className='absolute top-3 w-full text-center z-10'>
        <h1 className="text-4xl font-semibold text-blue-600 mb-6">
          Smart Resume
        </h1>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative overflow-hidden">
        <div className="max-w-md w-full bg-white p-5 h-130 mt-10 rounded-lg shadow-md z-10 relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Create Your Account
          </h2>
          <form className="space-y-5" onSubmit={SignupHandle}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => Setname(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={Email}
                onChange={(e) => SetEmail(e.target.value)}
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={Pass}
                onChange={(e) => SetPass(e.target.value)}
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={Confirm_Password}
                onChange={(e) => setConPass(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={SignupHandle}
            >
              Sign up
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>
        <svg
          id="wave"
          style={{ transform: "rotate(0deg)", transition: "0.3s" }}
          viewBox="0 0 1440 410"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(0, 11, 118, 1)" offset="0%" />
              <stop stopColor="rgba(0, 11, 118, 1)" offset="100%" />
            </linearGradient>
            <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(0, 153, 255, 1)" offset="0%" />
              <stop stopColor="rgba(0, 153, 255, 1)" offset="100%" />
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient-0)"
            d="M0,369L60,348.5C120,328,240,287,360,280.2C480,273,600,301,720,266.5C840,232,960,137,1080,109.3C1200,82,1320,123,1440,129.8V410H0Z"
          />
          <path
            fill="url(#sw-gradient-1)"
            style={{ transform: "translate(0, 50px)", opacity: 0.9 }}
            d="M0,164L60,157.2C120,150,240,137,360,109.3C480,82,600,41,720,54.7C840,68,960,137,1080,170.8C1200,205,1320,205,1440,225.5V410H0Z"
          />
        </svg>
      </div>
    </>
  );
};

export default SignUp;
