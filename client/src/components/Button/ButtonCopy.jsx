import React, { useState } from "react";
import { IoCopy } from "react-icons/io5";
import { LuCopyCheck } from "react-icons/lu";

const ButtonCopy = ({ data }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  async function copyToClipboard(e) {
    await navigator.clipboard.writeText(data);
    e.target.focus();
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }

  return (
    <button
      onClick={copyToClipboard}
      className={`${
        copySuccess
          ? "bg-[--black] text-green-400"
          : "bg-[--black] text-[--golden] hover:bg-[--golden] hover:text-[--black]"
      } satoshi-700 py-1 px-4  rounded-md transition-all ease-in-out duration-500  flex justify-center items-center gap-2`}
    >
      {copySuccess ? (
        <>
          <LuCopyCheck />
          Copied
        </>
      ) : (
        <>
          <IoCopy />
          Copy
        </>
      )}
    </button>
  );
};

export default ButtonCopy;
