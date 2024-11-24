
// import React, { useContext, useState } from 'react';
// import { Button } from './ui/button';
// import { BiLeftArrowAlt } from 'react-icons/bi';
// import { IoReload } from 'react-icons/io5';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import SideBarContext from '@/hooks/context/SideBarContext';

// const SmartDocSide = ({ previews, selectedImageIndex, setSelectedImageIndex, openSIDE , setOpenSIDE }) => {
//   const { open, setOpen } = useContext(SideBarContext);

//   return (
//     <div
//       className={`absolute border-r-2 border-gray-300 shadow-lg bg-gray-200  py-2  h-full w-[180px] max-w-[220px] ${
//         !openSIDE ? "-translate-x-40" : ""
//       } `}
//     >
//       <div className="flex item justify-between gap-2">
//         <Button
//           veriant={"outline"}
//           onClick={() => setSelectedImageIndex(null)}
//           className="btn btn-primary mb-2 ml-2 bg-gray-900"
//         >
//           {" "}
//           Reset <IoReload size={20} className="ml-2" />
//         </Button>
//         <Button
//           className={`-mr-5 bg-gray-900 p-1 transition-all $ ${
//             openSIDE ? "rotate-180" : "rotate-0"
//           }`}
//           onClick={() => {
//             setOpen(false)
//             setOpenSIDE((val) => !val)
//           }}
//         >
//           {" "}
//           <ChevronRight />{" "}
//         </Button>
//       </div>
//       <div className="s overflow-y-scroll h-full pt-2">
//         {previews.map((preview, index) => (
//           <div
//             key={index}
//             className="c cursor-pointer mx-1.5 mb-2 "
//             onClick={() => setSelectedImageIndex(index)}
//           >
//             <img
//               src={preview}
//               alt={`Document ${index + 1}`}
//               className={` object-contain  rounded-xl h-[160px] w-full border-[3px] bg-gray-300 ${
//                 selectedImageIndex === index ? "border border-[#FFFECA]" : ""
//               }`}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SmartDocSide;



// import { ChevronsLeft } from "lucide-react";
// import { useState } from "react";

// const SmartDocSide = ({files , setActiveFile }) => {
//   const [open,setOpen] = useState(false);
//     return (
//       <div
//         className={`smart-doc-side h-screen border-r-2 border-gray-300 shadow-lg bg-gray-200   py-2  relative transition ${!open ? "max-w-6 w-6 min-w-6 " : "w-[180px]  max-w-[180px] min-w-[180px]" } `}
//       >
//         <button
//           className={`absolute -right-6 top-8 p-1 ${!open && "rotate-180"} transition duration-200`}
//           onClick={() => setOpen(!open)}
//         >
//           <ChevronsLeft
//             size={30}
//             className={` bg-blue-600 cursor-pointer -right-3 top-0 p-0.5 border-dark-purple
//             border-2 rounded-full`}
//           />
//         </button>
//         <div className={`overflow-y-scroll h-full p-2 pr-0 transition duration-200 ${!open && "hidden "}`}>
//           {files.map((fileWrapper) => (
//             <div
//               key={fileWrapper.id}
//               onClick={() => setActiveFile(fileWrapper)}
//               className="p-1 cursor-pointer relative"
//             >
//               <img
//                 src={fileWrapper.previewUrl}
//                 alt="Preview"
//                 className="object-contain  rounded-xl h-[120px] w-full border-[3px] bg-gray-300 p-1.5  "
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

// export default SmartDocSide;


import { ChevronsLeft, CircleX, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const SmartDocSide = ({files , setActiveFile, extractDocument , deleteFile }) => {
  const [open,setOpen] = useState(false);

  // files = files.filter(file => {
  //   file.file
  // })

    return (
      <div
        className={`smart-doc-side  min-h-screen max-h-screen border-r-2 border-gray-300 shadow-lg bg-gray-200   py-2  relative transition ${!open ? "max-w-6 w-6 min-w-6 " : "w-[180px]  max-w-[180px] min-w-[180px]" } `}
      >
        <button
          className={`absolute -right-6 top-8 p-1 ${!open && "rotate-180"} transition duration-200 z-30`}
          onClick={() => setOpen(!open)}
        >
          <ChevronsLeft
            size={30}
            className={` bg-blue-600 cursor-pointer -right-3 top-0 p-0.5 border-dark-purple
            border-2 rounded-full`}
          />
        </button>
        {
          open && (
            <div className="w-full flex justify-center py-2">
              <Button onClick={() => extractDocument()} className="bg-gray-900 ">
                Extract All 
              </Button >
            </div>
          )
        }
        <div className={` h-full p-2 pr-0 pt-0  transition duration-200 ${!open && "hidden "} overflow-y-scroll pb-12`}>
          {files.map((fileWrapper) => (
            <div
              key={fileWrapper.id}
              onClick={() => setActiveFile(fileWrapper)}
              className="p-1 cursor-pointer relative"
            >
              <div className='absolute bottom-2 left-3 z-40'>
                <button 
                  onClick={() => deleteFile(fileWrapper.id)}
                  className=' '
                >
                 <Trash2 size={18} className="text-red-500" /> 
                </button>
              </div>
              <img
                src={fileWrapper.previewUrl}
                alt="Preview"
                className="object-contain  rounded-xl h-[120px] w-full border-[3px] bg-gray-300 p-1.5  "
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

export default SmartDocSide;