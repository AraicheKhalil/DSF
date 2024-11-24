import React from "react";
import ErrorText from "../Typograpghy/ErrorText";
import "./inputs.css";

const Input = ({
  name,
  value,
  type,
  onChange,
  onBlur,
  error,
  touch,
  id,
  placeholder,
  disabled = false,
  isLabeled = false,
  label = null,
  inptWraperClasses,
  inputClasses,
  labelClasses,
}) => {
  return (
    <div className={`flex-grow basis-[350px] text-left ${inptWraperClasses}`}>
      {isLabeled && (
        <label
          htmlFor={id}
          className={`satoshi-500 text-[12px] sm:text-[14px] ${labelClasses}`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        className={`py-2 px-3 text-[12px] sm:text-[14px] xl:text-[16px] outline-none border border-gray-300 rounded-md w-full ${inputClasses}`}
      />
      {error && touch && <ErrorText text={error} />}
    </div>
  );
};

export default Input;
