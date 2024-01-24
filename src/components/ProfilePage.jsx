import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const fetchDetails = async () => {
    try {
      const details = {
        headers: {
          authorization: token,
        },
      };

      const response = await axios.get("http://localhost:3000/me", details);

      setAuthorized(true);
      setUserInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserInfo({});
    setAuthorized(false);

    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchDetails();
    }
  }, [token]);

  return (
    <>
      {authorized && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Profile Page</h1>
            <div style={{ margin: "1rem" }}>Name: {userInfo.name}</div>
            <div style={{ margin: "1rem" }}>Email: {userInfo.email}</div>
            <div style={{ margin: "1rem" }}>Mobile: {userInfo.mobile}</div>
            <div style={{ margin: "1rem" }}>
              <button onClick={onLogout}>Logout</button>
            </div>
          </div>
        </>
      )}

      {!authorized && <h1>You are not authorized not access this page</h1>}
    </>
  );
};

export default ProfilePage;
