import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; 

const Nav = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem("authToken");
  const [isOpen, setIsOpen] = useState(false);

  const GoLogin = () => navigate("/Login");
  const ProfileView = () => navigate("/Profile");
  const SignupGo = () => navigate("/signup");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-500 sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Smart Resume</h1>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <motion.div
          className="hidden md:flex gap-3 mr-10 items-center"
          animate={{ x: 50 }}
          transition={{ duration: 0.8 }}
        >
          <a href="Home" className="text-white hover:underline">
            Home
          </a>
          <button
            onClick={Token ? handleLogout : GoLogin}
            className="text-white bg-blue-800 hover:bg-white hover:text-black px-6 py-2 rounded-lg shadow"
          >
            {Token ? "Logout" : "Login"}
          </button>
          <button
            onClick={Token ? ProfileView : SignupGo}
            className="text-blue-600 bg-white border border-blue-600 px-6 py-2 rounded-lg shadow hover:bg-blue-800 hover:text-white"
          >
            {Token ? "Profile" : "SignUp"}
          </button>
        </motion.div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-start gap-4 px-4  pb-4">
          <a href="Home" className="text-white hover:underline">
            Home
          </a>
          <button
            onClick={Token ? handleLogout : GoLogin}
            className="text-white bg-blue-800 hover:bg-white hover:text-black px-6 py-2 rounded-lg shadow w-full"
          >
            {Token ? "Logout" : "Login"}
          </button>
          <button
            onClick={Token ? ProfileView : SignupGo}
            className="text-blue-600 bg-white border border-blue-600 px-6 py-2 rounded-lg shadow w-full hover:bg-blue-800 hover:text-white"
          >
            {Token ? "Profile" : "SignUp"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
