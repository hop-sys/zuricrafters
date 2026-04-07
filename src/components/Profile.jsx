import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    axios.get("http://hope.alwaysdata.net/profile")
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = () => {
    axios.put("https://hope.alwaysdata.net/update-profile", user)
      .then(() => {
        alert("Profile updated successfully");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        className="w-full border p-3 mb-4 rounded"
      />

      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        className="w-full border p-3 mb-4 rounded"
      />

      <input
        name="phone"
        value={user.phone}
        onChange={handleChange}
        className="w-full border p-3 mb-4 rounded"
      />

      <input
        name="location"
        value={user.location}
        onChange={handleChange}
        className="w-full border p-3 mb-4 rounded"
      />

      <button
        onClick={updateProfile}
        className="bg-[#8B5E3C] text-white px-6 py-3 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;