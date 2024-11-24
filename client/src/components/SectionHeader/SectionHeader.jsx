import React from "react";

const SectionHeader = ({ headertext, customClasses, sectionId }) => {
  return (
    <div
      className={`w-full flex justify-center items-center text-[--golden] ${customClasses}`}
    >
      <h1
        id={sectionId}
        className="satoshi-900 text-[20px] sm:text-[23px] md:text-[25px] lg:text-[27px]"
      >
        {headertext}
      </h1>
    </div>
  );
};

export default SectionHeader;
