import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import dashboardSideBarData from "../../Assets/Data/sideBarData";
import logo from "../../Assets/images/logo-secondary.png";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="min-w-[70px] h-screen  bg-[--black] transition-all ease-in-out duration-300 fixed top-0 left-0 overflow-y-auto  sm:w-[80px] md:border-none md:w-[95px] xl:w-[18%] ">
      <div className="flex justify-center items-center w-full">
        <Link
          to="/"
          className="w-full p-1 h-[70px]  flex justify-center items-center"
        >
          <div className="flex justify-start items-center">
            <div className="p-2">
              <img
                className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] object-contain"
                src={logo}
                alt="Logo"
              />
            </div>
            <h4 className="satoshi-700 ml-1 text-[13px] sm:text-[15px] md:text-[16px] text-[--golden]">
              SMARTDOC
            </h4>
          </div>
        </Link>
      </div>
      <ul className="mt-2 w-full px-1 xl:px-0 text-center pb-0">
        {dashboardSideBarData.map((navitem, index) => {
          return (
            <li
              key={index}
              className="mx-auto my-3 w-full xl:w-[80%] flex justify-center items-center "
            >
              <NavLink
                to={navitem.url}
                className={`${
                  "/".concat(location.pathname.split("/")[1].split("-")[0]) ===
                  navitem.url
                    ? "bg-[--golden] text-[--black]"
                    : "text-[--white] hover:bg-[--golden] hover:text-[--black] transition-all ease-in-out duration-300 "
                }
                  capitalize relative rounded-md w-full py-2 text-base sm:text-lg md:text-xl font-medium flex justify-start flex-col xl:flex-row items-center pl-0 xl:pl-3
                  `}
              >
                <span className="pl-0 xl:pl-2 text-[9px] md:text-[13px] lg:text-sm satoshi-500">
                  {navitem.label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <ul className="mt-12 w-full px-1 xl:px-0 text-center pb-0">
        <li className="mx-auto my-3 w-full xl:w-[80%] flex justify-center items-center cursor-pointer">
          <p
            className="text-[--golden] hover:bg-[--golden] hover:text-red-600 transition-all ease-in-out duration-300 
                  capitalize relative rounded-md w-full py-2 text-base sm:text-lg md:text-xl font-medium flex justify-start flex-col xl:flex-row items-center pl-0 xl:pl-3"
          >
            <span className="pl-0 xl:pl-2 text-[9px] md:text-[13px] lg:text-sm satoshi-700">
              Logout
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
