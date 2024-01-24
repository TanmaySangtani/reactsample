// import { useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../../molecules/Input";
import "../SignUp/SignUp.css"
import axios from "axios";
import { isStrongPass, validateEmail, validateMobile } from "../../Util/utils";
import { useInput } from "../../Hooks.jsx/UseInput";

const url = "http://localhost:3000/users";

const submit = async (formData) => {
  try {
    const result = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert(result);
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

function SignUp() {
  const navigate = useNavigate();
  const {
    handleOnChange: hanldeOnChangePass,
    handleOnBlur: handleOnBlurPass,
    error: strongPass,
  } = useInput(isStrongPass);
  const {
    handleOnChange: hanldeOnChangeEmail,
    handleOnBlur: handleOnBlurEmail,
    error: emailError,
  } = useInput(validateEmail);
  const {
    handleOnChange: hanldeOnChangeMobile,
    handleOnBlur: handleOnBlurMobile,
    error: mobileError,
  } = useInput(validateMobile);
  const [errorState, setErrorState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const fdata = {};
    formData.forEach((value, key) => {
      fdata[key] = value;
    });

    const { firstName, lastName, confirmPassword, ...rest } = fdata;
    if (formData.get("password") !== confirmPassword) {
      setErrorState("Password and Confirm Password did not match");
      return;
    }
    const formDataObject = {
      name: firstName + " " + lastName,
      ...rest,
    };

    try {
      const response = await submit(formDataObject);
      setErrorState("");
      navigate("/login");
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <div className="container" id="parentContainer">
      <h2 id="heading">SIGN UP</h2>
      <div className="container" id="formContainer">
        <form action="submit" onSubmit={handleSubmit}>
          <Input
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter First Name"
            required={true}
            className="field"
            htmlFor="firstName"
          />

          <Input
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name"
            required={true}
            className="field"
            htmlFor="firstName"
          />

          <Input
            label="Email"
            className="field"
            htmlFor="email"
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            required={true}
            handleOnBlur={handleOnBlurEmail}
            handleOnChange={hanldeOnChangeEmail}
          />

          {emailError && <div className="error">Invalid Email</div>}

          <Input
            label="Mobile"
            className="field"
            htmlFor="mobile"
            type="number"
            id="mobile"
            name="mobile"
            placeholder="Enter Mobile"
            pattern="/^[6-9]\d{9}$/"
            required={true}
            handleOnBlur={handleOnBlurMobile}
            handleOnChange={hanldeOnChangeMobile}
          />

          {mobileError && <div className="error">Invalid Mobile</div>}

          <Input
            label="Password"
            className="field"
            htmlFor="password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            minLength={6}
            required={true}
            handleOnBlur={handleOnBlurPass}
            handleOnChange={hanldeOnChangePass}
          />
          {strongPass && <div className="error">Weak Password</div>}

          <Input
            label="Confirm Password"
            className="field"
            htmlFor="confirmPassword"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required={true}
          />
          <button type="submit" id="submit">
            Submit
          </button>
        </form>
      </div>
        <div id="genericError">{errorState}</div>
    </div>
  );
}

export default SignUp;
