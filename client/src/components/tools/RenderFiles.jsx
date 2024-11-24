

import React from 'react'
import { format } from 'date-fns';

function RenderFiles(files,handleDelete,handleDownload) {
  return (
    <div className="w-full rounded-lg mt-4">
        <ul>
            {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between mb-4 rounded-lg p-4 mt-4 bg-white gap-4 shadow-xl">
                    <div className='flex items-center  bg-white gap-4 '>
                        <div className='w-[130px] h-[85px] bg-[#eaecf1] rounded-lg flex justify-center items-center'>
                            {
                            file.type.slice(0,5) === "image" ?
                            <img src={file.preview} alt="preview" className="w-full h-full rounded-lg object-contain" /> :
                            <FaFileLines className='text-gray-500 text-3xl' />}

                        </div>
                        <div className="flex-1 text-[#8194aa] text-sm">
                            <p className='font-medium text-gray-600'>{file.name}</p>
                            <div className='flex gap-3'>
                                <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                                <p>Modified Time: {format(file.lastModified, 'Pp')}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(file)}
                                className="text-red-500 text-sm mt-1 hover:underline"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                    {
                    convertedFiles?.length >= 1 &&
                    <Button 
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                        onClick={() => handleDownload(convertedFiles[index])}
                    >
                        Downloads 
                    </Button>
                    }
                </li>
            ))}
        </ul>
    </div>
    )
}

export default RenderFiles