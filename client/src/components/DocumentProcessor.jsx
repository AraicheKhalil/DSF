
import { uploadFiles } from '@/api/DocumentResquest';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DocumentProcessor = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [previews, setPreviews] = useState([]); // For storing preview images

  const onDrop = async (acceptedFiles) => {
    const previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previews);
    setImages([]); // Clear previous images
    setSelectedImageIndex(0); // Display the first image by default

    try {
      const uploadedData = await uploadFiles(acceptedFiles);
      setImages(uploadedData);
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex">
      <div className="w-1/4">
        <button onClick={() => setSelectedImageIndex(null)} className="btn btn-primary mb-2">Back</button>
        <div className="overflow-y-auto h-full">
          {previews.map((preview, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer ${selectedImageIndex === index ? 'bg-blue-500 rounded' : ''}`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img src={preview} alt={`Document ${index + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4 flex flex-col">
        {selectedImageIndex !== null ? (
          <div className="flex flex-grow">
            <div className="w-1/2 pr-4">
              <img src={previews[selectedImageIndex]} alt={`Selected Document ${selectedImageIndex + 1}`} className="w-full h-auto" />
            </div>
            <div className="w-1/2 pl-4 border-l-2 border-gray-300">
              {images[selectedImageIndex] ? (
                <div>
                  <h2 className="text-xl font-bold mb-4">Extracted Data</h2>
                  {/* Display data from the API for the selected image */}
                  {/* Customize this part based on the data structure returned by your API */}
                  <pre>{JSON.stringify(images[selectedImageIndex], null, 2)}</pre>
                </div>
              ) : (
                <p>No data available for this document.</p>
              )}
            </div>
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
    </div>
  );
};

export default DocumentProcessor;
