import React from "react";

const Index = ({ imageReference }) => {
  return (
    <div className="flex justify-start items-center">
      <div className="p-3">
        <img
          className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] object-contain"
          src={imageReference}
          alt="Logo"
        />
      </div>
      <h4 className="satoshi-900 ml-3 text-[13px] sm:text-[15px] md:text-[16px]">
        SMARTDOC
      </h4>
    </div>
  );
};

export default Index;
