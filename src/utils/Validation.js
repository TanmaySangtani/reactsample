import isNumber from "./HelperFunction";

const disableErrors = (e, errors, setErrors) => {
  const name = e.target.name;
  setErrors({
    ...errors,
    [name]: "",
  });
};

const nameValidation = (e, errors, setErrors) => {
  if (!e.target.value.trim()) {
    setErrors({
      ...errors,
      [e.target.name]: "Name is required",
    });
  }
};

const emailValidation = (e, errors, setErrors) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!e.target.value.trim()) {
    setErrors({
      ...errors,
      [e.target.name]: "Email is required",
    });
  } else if (!emailRegex.test(e.target.value)) {
    setErrors({
      ...errors,
      [e.target.name]: "Invalid email address",
    });
  }
};

const mobileValidation = (e, errors, setErrors) => {
  if (e.target.value.trim().length !== 10 || !isNumber(e.target.value.trim())) {
    setErrors({
      ...errors,
      [e.target.name]: "Mobile number must be 10 digits",
    });
  }
};

const passwordValidation = (e, errors, setErrors) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;

  if (!e.target.value) {
    setErrors({
      ...errors,
      [e.target.name]: "Password is required",
    });
  } else if (e.target.value.length < 8) {
    setErrors({
      ...errors,
      [e.target.name]: "Password must be at least 8 characters long",
    });
  } else if (!passwordRegex.test(e.target.value)) {
    setErrors({
      ...errors,
      [e.target.name]:
        "Password must have atleast one capital ,one small, one digit & one symbol",
    });
  }
};

const confirmPasswordValidation = (e, errors, setErrors) => {
  const password = document.getElementById("password").value;
  if (e.target.value !== password) {
    setErrors({
      ...errors,
      confirmPassword: "Passwords do not match",
    });
  }
};

export default {
  nameValidation,
  emailValidation,
  mobileValidation,
  passwordValidation,
  confirmPasswordValidation,
  disableErrors,
};
