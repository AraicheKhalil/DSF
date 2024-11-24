import React, { useState } from "react";
import {
  formatExtractedData,
  formatForCopy,
} from "../../Utils/ResponseFormatter";
import { IoCopy } from "react-icons/io5";
import { LuCopyCheck } from "react-icons/lu";

const ExtractedResponse = ({ data }) => {
  let formattedData = formatExtractedData(data);
  let copyData = formatForCopy(formattedData);

  const [copySuccess, setCopySuccess] = useState(false);

  async function copyToClipboard(e) {
    await navigator.clipboard.writeText(copyData);
    e.target.focus();
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }

  return formattedData ? (
    <div className="w-full overflow-x-hidden text-clip h-[350px] overflow-y-auto">
      <div className="flex justify-end items-center">
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
      </div>
      <pre className="text-clip whitespace-pre-wrap">{formattedData}</pre>
    </div>
  ) : (
    <h1>No formated data</h1>
  );
};

export default ExtractedResponse;
