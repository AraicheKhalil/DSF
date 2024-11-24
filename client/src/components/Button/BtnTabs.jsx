import React from "react";

const BtnTabs = ({ text, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        active ? "bg-[--black] text-[--golden]" : ""
      }  flex-grow text-[12px] py-2 sm:text-[14px] md:text-[15px] lg:text-[16px] transition-all ease-in-out duration-500 hover:bg-[--black] hover:text-[--golden] satoshi-700 uppercase`}
    >
      {text}
    </button>
  );
};

export default BtnTabs;
