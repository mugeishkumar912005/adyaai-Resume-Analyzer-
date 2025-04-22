import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Save, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import prof from "../assets/prof.jpeg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("https://adyaai-resume-analyzer-backend.onrender.com/api/user/GetData", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch user data");

        setUser(data.Data);
        setEditedUser(data.Data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get("https://adyaai-resume-analyzer-backend.onrender.com/api/History/GetData/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUploadHistory(response.data.Data || []);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchUserData();
    fetchHistory();
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    try {
      const response = await fetch("https://adyaai-resume-analyzer-backend.onrender.com/api/user/Update/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: editedUser.username,
          Email: editedUser.Email,
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.Msg || "Failed to update profile");

      setUser(editedUser);
      setEditable(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong while updating profile");
    }
  };

  if (loading) return <div className="text-center py-10 text-blue-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 to-blue-400 p-10 flex flex-col justify-between">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Smart Resume
      </motion.h1>

      <button
        className="mb-6 text-blue-700 hover:text-blue-900 flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Profile Card */}
        <motion.div
          className="bg-white shadow-2xl rounded-3xl p-5"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">User Profile</h2>

          <div className="flex justify-center mb-4">
            <img src={prof} alt="Profile" className="w-32 h-32 object-cover rounded-full shadow-md" />
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-blue-600 font-medium block mb-1">Name</label>
              {editable ? (
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                />
              ) : (
                <p className="text-lg font-semibold text-blue-900">{user.username}</p>
              )}
            </div>
            <div>
              <label className="text-blue-600 font-medium block mb-1">Email</label>
              {editable ? (
                <input
                  type="email"
                  className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  value={editedUser.Email}
                  onChange={(e) => setEditedUser({ ...editedUser, Email: e.target.value })}
                />
              ) : (
                <p className="text-lg font-semibold text-blue-900">{user.Email}</p>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {editable ? (
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                onClick={handleSave}
              >
                <Save size={18} /> Save Changes
              </button>
            ) : (
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                onClick={() => setEditable(true)}
              >
                <Pencil size={18} /> Edit Profile
              </button>
            )}
            <button
              className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg border border-blue-300 hover:bg-blue-200 flex items-center justify-center gap-2"
              onClick={() => {
                localStorage.removeItem("authToken");
                navigate("/login");
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </motion.div>

        {/* Upload History Card */}
        <motion.div
          className="bg-white shadow-2xl rounded-3xl p-8 max-h-[80vh] overflow-y-auto"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-800 text-center">Past Uploads</h2>

          <div className="space-y-6">
            {uploadHistory.length > 0 ? (
              uploadHistory.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-50 rounded-xl shadow-lg space-y-4 hover:shadow-xl transition-all p-6 flex flex-col"
                  whileHover={{ scale: 1.02 }}
                >
                  <h2 className="text-center text-lg font-semibold text-black">File Uploaded</h2>
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-white justify-center">
                    <span className="bg-green-500 px-3 py-1 rounded-full">Resume Degree: {item.Resume_Degree}</span>
                    <span className="bg-yellow-500 px-3 py-1 rounded-full">JD Degree: {item.JD_Degree}</span>
                    <span className="bg-indigo-500 px-3 py-1 rounded-full">Resume CGPA: {item.Resume_CGPA}</span>
                    <span className="bg-pink-500 px-3 py-1 rounded-full">JD CGPA: {item.JD_CGPA}</span>
                  </div>

                  <div className="flex justify-around items-center text-center">
                    {["Edu", "Overall", "skills"].map((key, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div style={{ width: 80, height: 80 }}>
                          <CircularProgressbar
                            value={item.Score?.[key] || 0}
                            maxValue={100}
                            text={`${item.Score?.[key] || 0}%`}
                            styles={buildStyles({
                              pathColor: key === "Edu" ? '#10B981' : key === "Overall" ? '#6366F1' : '#F59E0B',
                              textColor: '#1E3A8A',
                              trailColor: '#E5E7EB',
                              textSize: '14px',
                            })}
                          />
                        </div>
                        <p className="mt-2 text-sm text-blue-600 capitalize">{key}</p>
                      </div>
                    ))}
                  </div>

                  {item.Suggestions?.length > 0 && (
                    <div className="bg-white border border-blue-200 rounded-xl p-4 mt-4">
                      <p className="text-blue-700 font-medium mb-2">Suggestions:</p>
                      <ul className="list-disc list-inside text-blue-900 text-sm space-y-1">
                        {item.Suggestions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-center text-blue-600">No uploads found.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
