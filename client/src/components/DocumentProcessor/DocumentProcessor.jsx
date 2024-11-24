// backend 

import { uploadFiles } from '@/api/DocumentResquest';
import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';

const DocumentProcessor = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [previews, setPreviews] = useState([]); // For storing preview images
  const [selectedFiles, setSelectedFiles] = useState([]); // For storing selected files

  console.log(selectedFiles)

  const onDrop = (acceptedFiles) => {
    const previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previews);
    setSelectedFiles(acceptedFiles); // Store the selected files
    setSelectedImageIndex(0); // Display the first image by default
  };

  const handleUpload = async () => {
    if (selectedImageIndex === null) return;

    if (selectedFiles.length == 1){
      console.log('its one file')
      try {
        const uploadedData = await uploadFiles(selectedFiles);
        const updatedImages = [...images];
        updatedImages = uploadedData;
        console.log(updatedImages)
        setImages(updatedImages);
      } catch (error) {
        console.error('Error processing files:', error);
      }
    }else{
      console.log("its multi files")
      try {
        const uploadedData = await uploadFiles(selectedFiles);
        const updatedImages = [...images];
        console.log(updatedImages)
        updatedImages = uploadedData;
        setImages(updatedImages);
      } catch (error) {
        console.error('Error processing files:', error);
      }
    };
    }

    // const fileToUpload = selectedFiles[selectedImageIndex];


  return (
    <div className="flex">
      <LeftPanel
        previews={previews}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />
      <CenterPanel
        onDrop={onDrop}
        selectedImageIndex={selectedImageIndex}
        previews={previews}
        handleUpload={handleUpload} // Pass the handleUpload function to the CenterPanel
      />
      {selectedImageIndex !== null && (
        <RightPanel
          images={images}
          selectedImageIndex={selectedImageIndex}
        />
      )}
    </div>
  );
};

export default DocumentProcessor;