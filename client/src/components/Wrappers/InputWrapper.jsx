import React from "react";

const InputWrapper = ({ customClasses, children }) => {
  return (
    <div className={`flex gap-4 w-full flex-wrap px-3 ${customClasses}`}>
      {children}
    </div>
  );
};

export default InputWrapper;
