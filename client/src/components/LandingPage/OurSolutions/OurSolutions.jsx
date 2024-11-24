import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { FaFilePdf, FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';
import { BsShieldCheck } from 'react-icons/bs';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { ArrowBigDown } from 'lucide-react';
import { FaCircleArrowDown, FaEllipsis, FaFileImage } from 'react-icons/fa6';
import "./OutSolution.css"
import { IoCodeDownloadOutline, IoDownloadOutline, IoEllipseSharp } from 'react-icons/io5';
import { MdIosShare, MdOutlineFileDownload } from 'react-icons/md';


const CartContent = [
  {
    title : "Easy Document Upload",
    step : "Step 1",
    role :[" Quickly upload PDFs, images, and scanned documents, supporting a variety of formats.",
    ],
    Icon : <div className='text-blue-500 text-6xl '> <BsShieldCheck /></div>
  },
  {
    title : "Smart Pre-Processing",
    step : "Step 2",
    role :[" Automatically enhance document quality for clearer, more accurate data extraction.",
    ],
    Icon : (
      <div className="  text-red-500 text-6xl relative ">
            <FaFilePdf />
            <div className='text-green-500 absolute top-0 -right-8 rotate-12'>
              <FaFileImage />
            </div>
        </div>
    )
  },
  {
    title : "One-Click Data Extraction",
    step : "Step 3",
    role :["Extract text, tables, and key information swiftly and securely with advanced AI ."
    ],
    Icon : <div className='text-yellow-500 text-6xl'><FaFileAlt /></div>
  },
  {
    title : "Customizable Export",
    step : "Step 4",
    role :[" Review, customize, and export your data in formats like JSON and Excel for seamless integration.",
    ],
    Icon : <div className='text-green-500 text-6xl'><MdIosShare /> </div>
  },
]

function OurSolutions() {
  return (
    <div className='py-16'>
      <div className="container mx-auto px-6">
        <SectionTitle
          badge={"Our Solution"}
          titleSection={"How It Works"}
          description={"AI-powered document processing that accelerates review time, minimizes human intervention, and enhances the data capture process."}
        />

        {/* boxes container  */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8  md:px-14 justify-center items-center">
          {CartContent.map(item => (
            <div className="flex flex-col items-center  gap-12  w-fit mx-auto mb-9  ">
            <div className="font-extrabold text-4xl text-gray-600 lg:px-6  min-w-[120px]">
              {item.step}
            </div>
            <div className='flex flex-col  justify-between items-center max-w-[550px] py-12 px-10 gap-8 shadow-lg shadow-gray-400 rounded-xl text-[#28282B] bg-gray-100 '>
                <h3 className='font-bold text-2xl '>{item.title}</h3>
                <ul className="">
                   {item.role.map(item => (
                       <li className=''>{item}</li>
                    //  <div className='flex items-center gap-2.5 mb-2'>
                    //     <IoEllipseSharp size={8} />
                    //  </div>
                   ))}
                </ul>
                {item.Icon}
            </div>
          </div>
          ))}          
        </div>
      </div>

      
    </div>
  );
}

export default OurSolutions;
