// import '../SignUp/SignUp.css'
export const Input = (props) => {
  const {
    className,
    htmlFor,
    type,
    id,
    name,
    placeholder,
    required,
    minlength,
    pattern,
    label,
    handleOnChange,
    handleOnBlur,
  } = props;
  // console.log(pattern);
   return (
   <div className={className}>
    <label htmlFor={htmlFor}>{label}</label>
    <input
      type={type}
      id={id ? id : ""}
      name={name}
      placeholder={placeholder ? placeholder : ""}
      required={required ? required : false}
      minLength={minlength ? minlength : 1}
      
      onChange={handleOnChange?handleOnChange:(e)=>undefined}
      onBlur={handleOnBlur?handleOnBlur:(e)=>undefined}
    />
  </div>);
};
