import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem("authToken");

  const GoLogin = () => {
    navigate("/Login");
  };

  const ProfileView=()=>{
    navigate("/Profile")
  }
  const SignupGo=()=>{
    navigate("/signup");
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex items-center flex-row pl-10 pt-4 bg-blue-500 h-18 sticky top-0 z-50">
      <div>
        <h1 className="text-2xl font-bold text-white">Smart Resume</h1>
      </div>

      <motion.div
        className="flex items-center gap-10 mr-10"
        animate={{ x: 850 }}
        transition={{ duration: 1 }}
      >
        <a href="Home" className="text-white hover:underline pb-5">
          Home
        </a>
        <div className="flex gap-4 pb-5">
          <button
            onClick={Token ? handleLogout : GoLogin}
            className="text-white bg-blue-800 hover:bg-white hover:text-black px-6 py-2 rounded-lg shadow"
          >
            {Token ? "Logout" : "Login"}
          </button>

          <button
            onClick={(Token) ?ProfileView:SignupGo}
            className="text-blue-600 bg-white border border-blue-600 px-6 py-2 rounded-lg shadow hover:bg-blue-800 hover:text-white"
          >
            {Token?"Profile":"SignUp"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Nav;
