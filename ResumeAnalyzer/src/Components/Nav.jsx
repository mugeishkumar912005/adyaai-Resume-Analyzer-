import { useNavigate } from "react-router-dom";

const Nav=()=>{
    const navigate=useNavigate();
    const GoLogin=()=>{
        navigate('/Login')
    }
    return(
        <>
        <div className="flex item-centre flex-row justify-between pl-10 pt-4 bg-blue-500 h-15">
            <div>
                <h1 className="text-2xl font-bold text-white">Smart Resume</h1>
            </div>

            <div className=" flex item-centre gap-10 mr-10">
                <a href="#" className="text-white hover:underline pt-3">Home</a>
                <div className="flex gap-4">
                        <button
                            onClick={GoLogin}
                            className="text-white bg-blue-800 hover:bg-white hover:text-black px-6 py-2 rounded-lg shadow"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate("/signup")}
                            className="text-blue-600 bg-white border border-blue-600 px-6 py-2 rounded-lg shadow hover:bg-blue-800 hover:text-white"
                        >
                            Signup
                        </button>
                        </div>
            </div>
        </div>
        </>
    )
}

export default Nav;