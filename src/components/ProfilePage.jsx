// src/ProfilePage.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userInfo, setUserData] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function profile() {
    const storedToken = localStorage.getItem("jwttoken");
    const result = axios.get("http://localhost:3000/user/me", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
    });
    if (result) {
      setUserData(JSON.parse(localStorage.getItem("userdata")));
      console.log(userInfo);
    } else {
      setError("Invalid User access");
    }
  }
  const handlelogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };
  useEffect(() => {
    profile();
  }, []);

  return (
    <div>
      <div>
        {userInfo && (
          <div>
            <h1>User Profile</h1>
            <p>UserId:{userInfo.id}</p>
            <p>Username: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Mobile:{userInfo.mobile}</p>
          </div>
        )}
        {error && (
          <div>
            <p>Error: {error.message}</p>
          </div>
        )}
        <button type="sumbmit" onClick={handlelogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
