import React, { useState } from "react";
import { Input } from "../../molecules/Input";
import "../SignUp/SignUp.css";
import axios from "axios";

const submit = async (formData) => {
  const url = "http://localhost:3000/auth/login";

  try {
    const result = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { token, rows:userData } = result.data;
    console.log(result.data, userData);
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

function Login() {
  const [errorState, setErrorState] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await submit(formDataObject);
      setErrorState("")
      alert("Logged In");
    } catch (error) {
      setErrorState(error.message);
    }
  };
  return (
    <div className="container" id="parentContainer">
      <div id="formContainer">
        <h2 id="heading">LOGIN</h2>
        <form action="submit" onSubmit={handleSubmit}>
          <Input
            className="field"
            label="Mobile"
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Enter Mobile Number"
            required={true}
          />
          <Input
            className="field"
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            required={true}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div id="genericError">{errorState}</div>
    </div>
  );
}

export default Login;
