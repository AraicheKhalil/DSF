import React from "react";

const ErrorText = ({ text }) => {
  return (
    <p className="text-[12px] sm:text-[14px] mt-[1px] text-red-600">{text}</p>
  );
};

export default ErrorText;
