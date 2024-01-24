import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateMobile, validatePassword } from "../util";
import useInput from "../Hooks/UseInput";
import "./Temp.css";
//import "../App.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const emailInput = useInput("", validateEmail);
  const passwordInput = useInput("", validatePassword);
  const mobileInput = useInput("", validateMobile);

  const onSubmit = async (e) => {
    e.preventDefault();
    const rawdata = new FormData(e.target);
    const data = Object.fromEntries(rawdata.entries());
    try {
      const response = await axios.post("http://localhost:3000/users", data);
      console.log("Form submitted with data:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Signup Page</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={onSubmit}
        >
          <div style={{ margin: "1rem" }}>
            <label htmlFor="name">
              Name:
              <input type="text" name="name" required />
            </label>
          </div>

          <div style={{ margin: "1rem" }}>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={emailInput.value}
                onChange={emailInput.onChange}
                onBlur={emailInput.onBlur}
                onFocus={emailInput.onFocus}
                required
              />
            </label>
            {emailInput.error && (
              <span style={{ color: "red" }}>"Invalid Email"</span>
            )}
          </div>

          <div style={{ margin: "1rem" }}>
            <label htmlFor="mobile">
              Mobile:
              <input
                type="text"
                name="mobile"
                value={mobileInput.value}
                onChange={mobileInput.onChange}
                onBlur={mobileInput.onBlur}
                onFocus={mobileInput.onFocus}
                required
              />
            </label>
            {mobileInput.error && (
              <span style={{ color: "red" }}>Invalid Mobile</span>
            )}
          </div>

          <div style={{ margin: "1rem" }}>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={passwordInput.value}
                onChange={passwordInput.onChange}
                onBlur={passwordInput.onBlur}
                onFocus={passwordInput.onFocus}
                required
              />
            </label>
            {passwordInput.error && (
              <span style={{ color: "red" }}>"Enter Strong password"</span>
            )}
          </div>

          <div>
            <button style={{ margin: "1rem" }} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
