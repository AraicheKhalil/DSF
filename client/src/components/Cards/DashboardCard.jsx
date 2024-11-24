import React from "react";

const DashboardCard = ({ data }) => {
  return (
    <div
      className={`flex-grow basis-[200px] max-w-[400px] py-3 pl-4 pr-2 rounded-md dashboardCards text-[--white] ${data?.customClases}`}
    >
      <h1 className="satoshi-900 text-[22px]">{data?.value}</h1>
      <h5 className="mt-1">{data?.label}</h5>
    </div>
  );
};

export default DashboardCard;
