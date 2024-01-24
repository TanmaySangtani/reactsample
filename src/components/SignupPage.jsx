import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "../utils/Validation";

const {
  nameValidation,
  emailValidation,
  mobileValidation,
  passwordValidation,
  confirmPasswordValidation,
  disableErrors,
} = Validation;

const SignupPage = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const details = Object.fromEntries(formData.entries());

    if (
      errors.name ||
      errors.email ||
      errors.mobile ||
      errors.password ||
      errors.confirmPassword
    ) {
      console.log(errors);
      return;
    }

    //add user to db
    try {
      const response = await axios.post("http://localhost:3000/users", details);
      console.log("Form submitted with data:", details);
      console.log("Response:", response.data);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
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
              <input
                type="text"
                name="name"
                onBlur={(e) => nameValidation(e, errors, setErrors)}
                onFocus={(e) => {
                  disableErrors(e, errors, setErrors);
                }}
                required
              />
            </label>
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>

          <div style={{ margin: "1rem" }}>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                required
                onBlur={(e) => {
                  emailValidation(e, errors, setErrors);
                }}
                onFocus={(e) => {
                  disableErrors(e, errors, setErrors);
                }}
              />
            </label>
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>

          <div style={{ margin: "1rem" }}>
            <label htmlFor="mobile">
              Mobile:
              <input
                type="text"
                name="mobile"
                required
                onBlur={(e) => mobileValidation(e, errors, setErrors)}
                onFocus={(e) => {
                  disableErrors(e, errors, setErrors);
                }}
              />
            </label>
            {errors.mobile && (
              <span style={{ color: "red" }}>{errors.mobile}</span>
            )}
          </div>

          <div style={{ margin: "1rem" }}>
            <label htmlFor="password">
              Password:
              <input
                id="password"
                type="password"
                name="password"
                required
                onBlur={(e) => passwordValidation(e, errors, setErrors)}
                onFocus={(e) => {
                  disableErrors(e, errors, setErrors);
                }}
              />
            </label>
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </div>

          <div style={{ margin: "1rem" }}>
            <label htmlFor="password">
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                onBlur={(e) => confirmPasswordValidation(e, errors, setErrors)}
                onFocus={(e) => {
                  disableErrors(e, errors, setErrors);
                }}
                required
              />
            </label>
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>{errors.confirmPassword}</span>
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
