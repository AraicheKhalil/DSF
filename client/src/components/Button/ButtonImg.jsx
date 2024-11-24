import React from "react";

const ButtonImg = ({
  text,
  onClick,
  type = "button",
  imageRef,
  customClasses,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex-grow satoshi-700 text-[14px] sm:text-[16px] text-[--black] flex justify-start items-center gap-4  rounded-md py-2 transition-all ease-in-out duration-500 hover:bg-gray-200 hover:text-[black] border border-slate-400 ${customClasses}`}
    >
      <img src={imageRef} className="w-[25px] h-[25px] object-fill ml-4" />
      <p className="satoshi-500">{text}</p>
    </button>
  );
};

export default ButtonImg;
