export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
};

export const validateMobile = (mobile) => {
  const mobileRegex = /^[0-9]{10}$/;
  console.log(mobileRegex.test(mobile));
  return mobileRegex.test(mobile);
};

export const validatePassword = (password) => {
  const passwordRegex = "/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$/";
  console.log(passwordRegex.test(password));
  return passwordRegex.test(password);
};
