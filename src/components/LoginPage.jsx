import React, { useState } from "react";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";
import "./Temp.css";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();
    const rawdata = new FormData(e.target);
    const data = Object.fromEntries(rawdata.entries());

    try {
      const userdata = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      if (userdata) {
        const token = userdata.data.token;
        const userData = userdata.data.rows;
        localStorage.setItem("jwttoken", token);

        localStorage.setItem("userdata", JSON.stringify(userData));

        navigate("/profile");
      }
    } catch (err) {
      setError("Invalid Credentials");
    }
  };
  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handlelogin}>
          <label>
            Mobile:
            <input type="text" name="mobile" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <button type="submit">Login</button>
        </form>
        {error}
      </div>
    </>
  );
};

export default LoginPage;
