import React from "react";

const ButtonLarge = ({ text, onClick, type = "button", customClasses }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex-grow satoshi-700 text-[14px] sm:text-[16px] bg-[--black] text-[--golden] rounded-md py-3 transition-all ease-in-out duration-500 hover:bg-[--golden] hover:text-[black] border border-[--black] ${customClasses}`}
    >
      {text}
    </button>
  );
};

export default ButtonLarge;
