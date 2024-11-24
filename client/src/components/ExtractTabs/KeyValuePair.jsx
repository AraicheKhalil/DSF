import React, { useState } from "react";
import ButtonCopy from "../Button/ButtonCopy";

const KeyValuePair = ({ data }) => {
  const [extractedData, setExtractedData] = useState([data]);

  function handleInputChange(e) {
    setExtractedData((pre) => {
      const updatedArray = [...pre];

      updatedArray[0] = {
        ...updatedArray[0],
        [e.target.name]: e.target.value,
      };

      return updatedArray;
    });
  }

  return (
    <h1>Hello</h1>
    // <div className="w-full">
    //   <div className="flex justify-end items-center">
    //     <ButtonCopy data={extractedData} />
    //   </div>
    //   <div className="w-full !overflow-x-auto mt-2">
    //     <table className="w-full border-collapse !overflow-x-auto ">
    //       <thead className="text-[--white]">
    //         <tr className="border border-black bg-gray-600">
    //           <th className="py-2 text-left pl-3 pr-2">Key</th>
    //           <th className="py-2 text-left px-2">Value</th>
    //         </tr>
    //       </thead>
    //       {extractedData?.length ? (
    //         <tbody>
    //           {Object.entries(extractedData[0])?.map(([key, value], index) => {
    //             if (Array.isArray(value)) {
    //               return value?.map((item, idx) => {
    //                 return (
    //                   <React.Fragment key={idx}>
    //                     {Object.entries(item)?.map(
    //                       ([itemKey, itemValue], itemIndex) => (
    //                         <tr key={`${idx}-${itemIndex}`}>
    //                           <td className="py-2 px-2 text-[14px] capitalize border">
    //                             {itemKey}
    //                           </td>
    //                           <td className="py-2 px-2 text-[14px] capitalize max-w-[120px] border">
    //                             {itemValue}
    //                           </td>
    //                         </tr>
    //                       )
    //                     )}
    //                   </React.Fragment>
    //                 );
    //               });
    //             } else {
    //               return (
    //                 <tr key={index}>
    //                   <td className="py-2 px-3 text-[14px] capitalize border">
    //                     {key}
    //                   </td>
    //                   <td className="py-2 px-3 text-[14px] capitalize max-w-[120px] border">
    //                     <input
    //                       onChange={handleInputChange}
    //                       name={key}
    //                       className="w-[95%] overflow-ellipsis outline-none"
    //                       type="text"
    //                       value={value}
    //                     />
    //                   </td>
    //                 </tr>
    //               );
    //             }
    //           })}
    //         </tbody>
    //       ) : null}
    //     </table>
    //   </div>
    // </div>
  );
};

export default KeyValuePair;
