import { validateEmail, validateMobile } from "../util";
import { useState } from "react";

const useInput = (initialValue, validationFn) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    // Validate input on blur
    if (validationFn) {
      const isValid = validationFn(value);
      if (!isValid) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  const handleFocus = () => {
    // Clear error on focus
    setError(false);
  };

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    error,
  };
};

export default useInput;
