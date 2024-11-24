import React from "react";
import Button from "../Button/Button";

const Card = ({ header, description, icon }) => {
  return (
    <div className=" flex-grow max-w-[600px] basis-[300px] mt-2 bg-white rounded-md py-3 pl-4 pr-3">
      <div className="w-full flex justify-center items-center gap-6">
        <div className="w-[70%] flex justify-start items-start">
          <h1 className="satoshi-700 text-[26px]">{header}</h1>
          {/* <p className="text-[12px] mt-2">{description}</p> */}
        </div>
        <div className="w-[90px]">
          <img className="w-full h-[90px]" src={icon} alt="Document Icon" />
        </div>
      </div>

      <Button text="Get Started" customClasses="!text-[12px] !px-4 !mt-3" />
    </div>
  );
};

export default Card;
