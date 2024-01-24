const isNumber = (str) => {
  let regex = /\D/;
  return !regex.test(str);
};

export default isNumber;
