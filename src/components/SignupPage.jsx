import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const isNumber = (str) => {
    let regex = /\D/;
    return !regex.test(str);
  };

  const validateForm = () => {
    const newErrors = {};

    //Name validation
    if (!details.name.trim()) {
      newErrors.name = "name is required";
    }

    //Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!details.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(details.email)) {
      newErrors.email = "Invalid email address";
    }

    //mobile validation
    if (
      details.mobile.trim().length !== 10 ||
      !isNumber(details.mobile.trim())
    ) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    //password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{6,}$/;

    if (!details.password) {
      newErrors.password = "Password is required";
    } else if (details.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!passwordRegex.test(details.password)) {
      newErrors.password =
        "Password must have atleast one capital ,one small, one digit & one symbol";
    }

    //Confirming password
    if (details.password !== details.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      //add user to db
      try {
        const response = await axios.post(
          "http://localhost:3000/users",
          details
        );
        console.log("Form submitted with data:", details);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }

      // Reset the form after submission
      setDetails({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
    setErrors({});
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
                value={details.name}
                onChange={handleInputChange}
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
                value={details.email}
                onChange={handleInputChange}
                required
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
                value={details.mobile}
                onChange={handleInputChange}
                required
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
                type="password"
                name="password"
                value={details.password}
                onChange={handleInputChange}
                required
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
                value={details.confirmPassword}
                onChange={handleInputChange}
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
