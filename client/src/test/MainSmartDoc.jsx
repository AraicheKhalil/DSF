import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Slider } from '@/components/ui/slider';
import { CloudUpload, Feather, Minus, Plus, RotateCw, Scissors, Save, X, Crop } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// const base64ToBlob = (base64, mime) => {
//   // Decode base64 string
//   const byteCharacters = atob(base64);
//   const byteNumbers = new Array(byteCharacters.length);

//   for (let i = 0; i < byteCharacters.length; i++) {
//     byteNumbers[i] = byteCharacters.charCodeAt(i);
//   }

//   const byteArray = new Uint8Array(byteNumbers);

//   // Create a Blob from the byte array
//   return new Blob([byteArray], { type: mime });
// };


const MainSmartDoc = ({ onDrop, setFiles , activeFile , setActiveFile , setDocumentType , extractDocument  }) => {

  console.log([activeFile?.file]);
  const [zoom, setZoom] = useState(1);
  const [isCropping, setIsCropping] = useState(false);
  const cropperRef = useRef(null);


  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      setActiveFile(val => (
        {
          ...val,
          file: {
            ...val.file,  
            path: cropper.getCroppedCanvas().toDataURL() 
          },
          previewUrl : cropper.getCroppedCanvas().toDataURL()
        }
      ))
      setIsCropping(false);
    }
  };

  const rotateRight = () => {
    if (cropperRef.current) {
      cropperRef.current.cropper.rotate(90);
    }
  };

  const handleZoomChange = (value) => {
    if (cropperRef.current) {
      cropperRef.current.cropper.zoomTo(value[0]);
      setZoom(value[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={`basis-full bg-zinc-100 p-1.5`}>
      <div className='text-white bg-gray-800 rounded-md  shadow-gray-300 shadow-xl p-2  flex justify-between items-center flex-wrap gap-3'>
        <div className='flex gap-3'>
          <Button onClick={extractDocument} className=" bg-indigo-600 hover:bg-indigo-800">
            Extract Doc
          </Button>
          <Select
              onValueChange={(value) => {
                  setDocumentType(value)
              }}
            >
              <SelectTrigger className="w-[200px] hover:bg-primary border  text-white border-gray-500 bg-zinc-800">
                <SelectValue placeholder="Select Processing type" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  <SelectItem value="process-document">General Processor </SelectItem>
                  <SelectItem value="process-receipts">Receipts Processor </SelectItem>
                  <SelectItem value="process-invoices">Invoice Processor</SelectItem>
                  <SelectItem value="process-bank-statements">Bank Statements Processor </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
        <div className='flex gap-3  bg-zinc-800 border border-gray-500 rounded-md '>
          <div className="gap-3 flex items-center  py-2.5 px-4">
            <button onClick={() => cropperRef.current.cropper.zoom(-0.1)}>
              <Minus size={18} className='text-white border rounded-full p-0.5' />
            </button>
            {/* <Slider
              onValueChange={handleZoomChange}
              value={[zoom]}
              max={3}
              min={0.1}
              step={0.1}
              className="bg-gray-400 w-[150px] rounded-lg"
            /> */}
            <button onClick={() => cropperRef.current.cropper.zoom(0.1)}>
              <Plus size={18} className='text-white border rounded-full p-0.5' />
            </button>
            <div className='text-white w-6 text-sm'>
              {`${Math.round(zoom * 100)}%`}
            </div>
            <button className="text-white" onClick={rotateRight}>
              <RotateCw size={18} />
            </button>
            <button className="text-white" onClick={() => setIsCropping(true)}>
              <Crop size={18} />
            </button>
            {
              isCropping && (
                <div className='flex gap-3'>
                  <button className="text-white" onClick={handleCrop}>
                    <Save size={18} />
                  </button>
                  <button className="text-white" onClick={() => setIsCropping(false)}>
                    <X size={18} />
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
      {activeFile !== null ? (
        <div className="flex w-full h-full flex-col justify-center items-center">
          {/* <div className='flex p-2 gap-3'>
            <Button className={`text-xs px-1.5 py-1.5 h-fit hover:bg-blue-500 ${documentType === "process-document" ? "bg-blue-500" : ""}`} onClick={() => setDocumentType("process-document")}>General</Button>
            <Button className={`text-xs px-1.5 py-1.5 h-fit hover:bg-blue-500 ${documentType === "process-receipts" ? "bg-blue-500" : ""}`} onClick={() => setDocumentType("process-receipts")}>Receipts</Button>
            <Button className={`text-xs px-1.5 py-1.5 h-fit hover:bg-blue-500 ${documentType === "process-invoices" ? "bg-blue-500" : ""}`} onClick={() => setDocumentType("process-invoices")}>Invoice</Button>
            <Button className={`text-xs px-1.5 py-1.5 h-fit hover:bg-blue-500 ${documentType === "process-bank-statements" ? "bg-blue-500" : ""}`} onClick={() => setDocumentType("process-bank-statements")}>Bank Statements</Button>
            <Button className={`text-xs px-1.5 py-1.5 h-fit hover:bg-blue-500 ${documentType === "process-ids" ? "bg-blue-500" : ""}`} onClick={() => setDocumentType("process-ids")}>ID's</Button>
            <Button className={`text-xs px-1.5 py-1.5 h-fit hover:bg-blue-500 ${documentType === "process-passports" ? "bg-blue-500" : ""}`} onClick={() => setDocumentType("process-passports")}>Passports</Button>
          </div> */}
          {isCropping ? (
            <div className="flex flex-col items-center  h-full mx-auto 2xl:h-[700px] w-full mb-4 relative mt-2 ">
              <Cropper
                src={activeFile.previewUrl}
                style={{ height: '100%', width: '100%', margin: 'auto' }}
                initialAspectRatio={1}
                guides={false}
                ref={cropperRef}
                zoomTo={zoom}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              />
              {/* <div className='flex gap-3 mt-10'>
                <div className="gap-3 flex items-center bg-primary rounded-md py-2 px-4">
                  <button onClick={() => cropperRef.current.cropper.zoom(-0.1)}>
                    <Minus size={16} className='text-white border rounded-full p-0.5' />
                  </button>
                  <Slider
                    onValueChange={handleZoomChange}
                    value={[zoom]}
                    max={3}
                    min={0.1}
                    step={0.1}
                    className="bg-gray-400 w-[150px] rounded-lg"
                  />
                  <button onClick={() => cropperRef.current.cropper.zoom(0.1)}>
                    <Plus size={16} className='text-white border rounded-full p-0.5' />
                  </button>
                  <div className='text-white w-6 text-sm'>
                    {`${Math.round(zoom * 100)}%`}
                  </div>
                  <button className="text-white" onClick={rotateRight}>
                    <RotateCw size={16} />
                  </button>
                  <button className="text-white" onClick={handleCrop}>
                    <Save size={16} />
                  </button>
                  <button className="text-white" onClick={() => setIsCropping(false)}>
                    <X size={16} />
                  </button>
                </div>
              </div> */}
            </div>
          ) : (
            <div className="w-[full] h-[500px] 2xl:w-[800px]  mb-4 relative">
              <img src={activeFile.previewUrl} alt="Uploaded" style={{ height: '100%', width: '100%', objectFit: 'contain' , borderRadius : "12px" }} />
              
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-dashed border-4 p-8 w-[500px] h-70 flex items-center justify-center mx-auto mt-8 text-center flex-grow ${isDragActive ? 'border-blue-500' : 'border-gray-300 rounded-lg'} 2xl:max-w-[800px] 2xl:w-[800px] 2xl:h-[400px]`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <div className='flex-col text-sm items-center justify-center'>
              <div className="flex items-center justify-center flex-col">
                <CloudUpload size={50} className='text-blue-500' />
              </div>
              <p className='text-gray-600 mt-6'>
                <span className='font-semibold'>Drag</span> and <span className='font-semibold'>Drop</span> some files here to extract data from documents seamlessly. After extracting the data, you can edit it as needed and download the updated document. Our AI-powered solution ensures accuracy and efficiency in document processing.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainSmartDoc;
