import React from "react";

const Radio = ({ label, value, name, id, checked, classes, onClick }) => {
  return (
    <div className={classes}>
      <label
        htmlFor={id}
        className={`${
          checked ? "bg-[--black] text-[--golden]" : ""
        } cursor-pointer rounded-md px-2 py-1 border border-[--black] text-[--black] transition-all ease-in-out duration-300 hover:bg-[--black] hover:text-[--golden] text-[14px] satoshi-500`}
      >
        {label}
      </label>
      <input
        value={value}
        checked={checked}
        type="radio"
        name={name}
        id={id}
        onClick={onClick}
        hidden
        className="w-full"
      />
    </div>
  );
};

export default Radio;
