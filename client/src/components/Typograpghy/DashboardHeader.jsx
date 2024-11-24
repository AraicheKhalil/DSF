import React from "react";

const DashboardHeader = ({ text }) => {
  return (
    <div className="max-w-max pr-3">
      <h1 className="satoshi-700 text-base sm:text-xl md:text-2xl">{text}</h1>
    </div>
  );
};

export default DashboardHeader;
