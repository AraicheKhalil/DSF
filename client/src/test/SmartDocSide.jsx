import { ChevronsLeft } from "lucide-react";
import { useState } from "react";

const SmartDocSide = ({files , setActiveFile }) => {
  const [open,setOpen] = useState(false);
    return (
      <div
        className={`smart-doc-side h-screen border-r-2 border-gray-300 shadow-lg bg-gray-200   py-2  relative transition ${!open ? "max-w-6 w-6 min-w-6 " : "w-[180px]  max-w-[180px] min-w-[180px]" } `}
      >
        <button
          className={`absolute -right-6 top-8 p-1 ${!open && "rotate-180"} transition duration-200`}
          onClick={() => setOpen(!open)}
        >
          <ChevronsLeft
            size={30}
            className={` bg-blue-600 cursor-pointer -right-3 top-0 p-0.5 border-dark-purple
            border-2 rounded-full`}
          />
        </button>
        <div className={`overflow-y-scroll h-full p-2 pr-0 transition duration-200 ${!open && "hidden "}`}>
          {files.map((fileWrapper) => (
            <div
              key={fileWrapper.id}
              onClick={() => setActiveFile(fileWrapper)}
              className="p-1 cursor-pointer relative"
            >
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