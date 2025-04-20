import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    } else {
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:6200/api/user/GetData", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          setUser(data.Data);
          setEditedUser(data.Data); // set initial editable values
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(error.message);
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:6200/api/user/Update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.Msg || "Failed to update user data");
      }

      setUser(editedUser);
      setEditable(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">User Profile</h2>
        <div className="space-y-4">
          <div>
            <h4 className="text-gray-600">Name</h4>
            {editable ? (
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editedUser.username}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              />
            ) : (
              <p className="text-black font-medium">{user.username}</p>
            )}
          </div>
          <div>
            <h4 className="text-gray-600">Email</h4>
            {editable ? (
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                value={editedUser.Email}
                onChange={(e) => setEditedUser({ ...editedUser, Email: e.target.value })}
              />
            ) : (
              <p className="text-black font-medium">{user.Email}</p>
            )}
          </div>
        </div>

        {editable ? (
          <button
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            onClick={handleSave}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="mt-6 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
            onClick={() => setEditable(true)}
          >
            Edit Profile
          </button>
        )}

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
