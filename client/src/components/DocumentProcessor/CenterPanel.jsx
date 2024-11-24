// backend
import React from 'react';
import { useDropzone } from 'react-dropzone';

const CenterPanel = ({ onDrop, selectedImageIndex, previews, handleUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-3/4 p-4">
      {selectedImageIndex !== null ? (
        <div className="flex flex-grow flex-col">
          <div className="w-full pr-4 mb-4">
            <img src={previews[selectedImageIndex]} alt={`Selected Document ${selectedImageIndex + 1}`} className="w-full h-auto" />
          </div>
          <button onClick={handleUpload} className="btn btn-primary mt-4 self-center">Upload and Process</button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-dashed border-4 p-4 text-center flex-grow ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CenterPanel;