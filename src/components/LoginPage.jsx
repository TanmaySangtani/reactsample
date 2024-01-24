import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import helperFunctions from "../utils/HelperFunction";
const { isNumber } = helperFunctions;

const LoginPage = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = (details) => {
    const newErrors = {};

    //mobile validation
    if (
      details.mobile.trim().length !== 10 ||
      !isNumber(details.mobile.trim())
    ) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const details = Object.fromEntries(formData.entries());
    console.log(details);

    if (!validateForm(details)) {
      return;
    }

    //add user to db
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        details
      );
      console.log("Form submitted with data:", details);
      console.log("Token:", response.data.token);

      localStorage.setItem("token", response.data.token);

      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Login Page</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={onSubmit}
        >
          <div style={{ margin: "1rem" }}>
            <label htmlFor="mobile">
              Mobile:
              <input type="text" name="mobile" required />
            </label>
            {errors.mobile && (
              <span style={{ color: "red" }}>{errors.mobile}</span>
            )}
          </div>

          <div style={{ margin: "1rem" }}>
            <label htmlFor="password">
              Password:
              <input type="password" name="password" required />
            </label>
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

export default LoginPage;
