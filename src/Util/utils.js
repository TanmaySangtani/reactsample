export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const validateMobile = (mobile) => {
  const regex = /^[6-9]\d{9}$/;

  // Example usage
  return regex.test(mobile);
};

export const isStrongPass = (pass) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+]).{8,}$/;

  // Example usage
  return regex.test(pass);
};
