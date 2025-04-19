import React from 'react';
import { useNavigate } from 'react-router-dom';
import wave from "../assets/wave.png"; // Optional: If you want to use the imported image later

const Login = () => {
    const navigate = useNavigate();

    const Signredirect = () => {
        navigate('/SignUp');
    };

    const HandleLogin = (e) => {
        e.preventDefault();
        navigate("/Home");
    };

    return (
        <>
            <div className="absolute top-10 w-full text-center z-10">
                <h1 className="text-4xl font-semibold text-blue-600 mb-6">
                    Smart Resume
                </h1>
            </div>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative overflow-hidden">
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
                        d="M0,369L60,348.5C120,328,240,287,360,280.2C480,273,600,301,720,266.5C840,232,960,137,1080,109.3C1200,82,1320,123,1440,129.8C1560,137,1680,109,1800,143.5C1920,178,2040,273,2160,300.7C2280,328,2400,287,2520,266.5C2640,246,2760,246,2880,225.5C3000,205,3120,164,3240,123C3360,82,3480,41,3600,41C3720,41,3840,82,3960,116.2C4080,150,4200,178,4320,157.2C4440,137,4560,68,4680,75.2C4800,82,4920,164,5040,205C5160,246,5280,246,5400,266.5C5520,287,5640,328,5760,341.7C5880,355,6000,342,6120,321.2C6240,301,6360,273,6480,273.3C6600,273,6720,301,6840,314.3C6960,328,7080,328,7200,334.8C7320,342,7440,355,7560,355.3C7680,355,7800,342,7920,293.8C8040,246,8160,164,8280,136.7C8400,109,8520,137,8580,150.3L8640,164L8640,410L0,410Z"
                    />
                    <path
                        fill="url(#sw-gradient-1)"
                        style={{ transform: "translate(0, 50px)", opacity: 0.9 }}
                        d="M0,164L60,157.2C120,150,240,137,360,109.3C480,82,600,41,720,54.7C840,68,960,137,1080,170.8C1200,205,1320,205,1440,225.5C1560,246,1680,287,1800,273.3C1920,260,2040,191,2160,136.7C2280,82,2400,41,2520,75.2C2640,109,2760,219,2880,225.5C3000,232,3120,137,3240,136.7C3360,137,3480,232,3600,280.2C3720,328,3840,328,3960,314.3C4080,301,4200,273,4320,246C4440,219,4560,191,4680,150.3C4800,109,4920,55,5040,27.3C5160,0,5280,0,5400,47.8C5520,96,5640,191,5760,246C5880,301,6000,314,6120,287C6240,260,6360,191,6480,170.8C6600,150,6720,178,6840,157.2C6960,137,7080,68,7200,34.2C7320,0,7440,0,7560,0C7680,0,7800,0,7920,27.3C8040,55,8160,109,8280,116.2C8400,123,8520,82,8580,61.5L8640,41L8640,410L0,410Z"
                    />
                </svg>

                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md z-10 relative">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Welcome Back
                    </h2>
                    <form className="space-y-5" onSubmit={HandleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
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
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={Signredirect}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Sign up
                                </button>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
                                            alt="Google logo"
                                            className="h-5 mr-3"
                                        />
                                        Continue with Google
                                    </button>
                                </div>

                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
