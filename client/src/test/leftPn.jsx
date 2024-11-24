import { Trash2 } from 'lucide-react';
import React from 'react';


const SmartDocSide = ({ files, setActiveFile, deleteFile }) => {
  return (
    <div className="smart-doc-side border-r-2 border-gray-300 shadow-lg bg-gray-200  py-2  h-full min-h-screen max-h-screen overflow-auto min-w-[180px] max-w-[180px]">
      <div className="overflow-y-scroll h-full pt-2">
        {files.map((fileWrapper) => (
          <div
            key={fileWrapper.id}
            onClick={() => setActiveFile(fileWrapper)}
            className="cursor-pointer mx-1.5 mb-2 relative "
          >
            <img
              src={fileWrapper.previewUrl}
              alt="Preview"
              className="object-contain  rounded-xl h-[160px] w-full border-[3px] bg-gray-300"
            />
            <button 
              onClick={() => deleteFile(fileWrapper.id)}
              className='absolute left-2 bottom-2'
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartDocSide;

