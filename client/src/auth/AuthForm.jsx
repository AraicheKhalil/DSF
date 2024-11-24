import React from "react";
import logo from "../Assets/images/logo.png";

const AuthForm = ({ children, formHeader, onSubmit }) => {
  return (
    <div className="w-[85%] sm:w-[75%] md:w-[65%] lg:w-1/2 h-screen flex justify-evenly items-center flex-col mx-auto py-6">
      <img
        src={logo}
        alt="Smart Doc logo"
        className="w-[35px] h-[35px] sm:w-[55px] sm:h-[50px] md:w-[70px] md:h-[60px] lg:w-[90px] lg:h-[90px] gap-4"
      />

      <form
        onSubmit={onSubmit}
        className="w-[85%] sm:w-[75%] md:w-[80%] lg:w-[90%] text-center max-w-[530px] pt-1 pb-4"
      >
        <h1 className="satoshi-900 text-[23px] sm:text-[25px] md:text-[28px] lg:text-[33px] text-[--black] mb-5">
          {formHeader}
        </h1>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
