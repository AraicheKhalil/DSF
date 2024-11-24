

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import * as XLSX from 'xlsx';
import SectionTitle from '@/components/SectionTitle';
import { PlayGroundResponse } from '@/api/DocumentResquest';
import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import ResponseFormat from "@/components/ExtractTabs/ResponseFormat";
import DataTable from '@/components/DataTable';
import { CloudUpload, Minus, MinusCircle, Plus, PlusCircle, RotateCcw } from "lucide-react";
import { SkeletonResponseLD } from "@/components/Custom/skeleton";
import { formatResponse } from "@/Utils/ResponseFormatter";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";


pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;




// Utility functions to convert JSON to table data
const flattenObject = (obj, parent = '', res = {}) => {
  for (let key in obj) {
    let propName = parent ? `${parent}.${key}` : key;
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        flattenObject(item, `${propName}[${index}]`, res);
      });
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

const jsonToTableData = (json) => {
  if (!json || !Array.isArray(json) || json.length === 0) {
    return { headers: [], rows: [] };
  }

  const flattenedJson = json.map(item => flattenObject(item));
  const headers = Array.from(new Set(flattenedJson.flatMap(item => Object.keys(item))));
  const rows = flattenedJson.map(item => headers.map(header => item[header] || ''));

  return { headers, rows };
};

const jsonToExcel = (json) => {
  const { headers, rows } = jsonToTableData(json);
  // console.log('Headers:', headers);
  // console.log('Rows:', rows);
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  return workbook;
};

const downloadExcel = (workbook, filename) => {
  XLSX.writeFile(workbook, filename);
};

export default function PlayGround() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [copied, setCopied] = useState(false);
  const [Response,setResponse] = useState("");
  const [loading,setLoading] = useState(false);
  // const [zoomLevel, setZoomLevel] = useState(1);
  const [error, setError] = useState('');
  const maxSize = 3 * 1024 * 1024; 

  console.log(Response)
  // console.log("response is :",Response?.map(item => formatResponse(item)))



  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile.size > maxSize) {
      setFile(null);
      setPreview(null);
      setError("Error: You cannot upload files larger than 3MB.")
      return;
    }
  
    setFile(selectedFile);
    setError(null)

    if (selectedFile.type === 'application/pdf') {
      renderPdfAsImage(selectedFile);
    } else if (selectedFile.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(selectedFile));
    }



  };

  const renderPdfAsImage = async (pdfFile) => {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const page = await pdf.getPage(1);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const imgUrl = canvas.toDataURL();
      setPreview(imgUrl);
    };

    fileReader.readAsArrayBuffer(pdfFile);
  };

  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1, // Accept only one file

  });


  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJsonDownload = () => {
    const blob = new Blob([JSON.stringify(Response, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.json';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  
  const handleExport = () => {
    const workbook = jsonToExcel(Response);
    downloadExcel(workbook, 'export.xlsx');
  };

  const { headers, rows } = jsonToTableData(Response);

  // const handleZoomIn = () => {
  //   setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 3));
  // };

  // const handleZoomOut = () => {
  //   setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 1));
  // };

  const handleExtract = async () => {
    try {
      setLoading(true);
      const response = await PlayGroundResponse([file]);
      // const parseData = response.map(item => formatResponse([item]));
      setResponse(response);
      console.log('API Response:', response?.map(item => formatResponse([item])));
    } catch (error) {
      console.error('Error extracting files:', error);
    }finally {
      setLoading(false);
    }
  };

  // const { zoomIn, zoomOut, resetTransform } = useControls();

  const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="flex flex-nowrap gap-2 mt-4 w-full">
      <div className="flex gap-2 w-fit">
        <button
          // onClick={handleZoomIn}
          onClick={() => zoomIn()}
          className='bg-[#28282B] text-[#FFFECA] p-2 rounded'
        >
          <PlusCircle />
        </button>
        <button
          // onClick={handleZoomOut}
          onClick={() => zoomOut()}
          className='bg-[#28282B] text-[#FFFECA] p-2 rounded'
        >
          <MinusCircle />
        </button>
      </div>
      <button
        onClick={() => setFile(null)}
        className='bg-[#28282B] text-[#FFFECA] p-2 rounded '
      >
        <RotateCcw />
      </button>
      <button
        onClick={handleExtract}
        className='bg-[#28282B] text-[#FFFECA] p-2 rounded w-full'
      >
        {loading ? "Extract ..." : "Extract"}
      </button>
    </div>
  );
};
  
  return (
    <div className="">
      <div className='container'>
        <SectionTitle
          badge={"Quick PlayGround"}
          titleSection={"Playground"}
          description={"Extract & Structure any document with precision and speed"}
        />

        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-10'>
          {/* Upload Section */}
          <div className='bg-gray-200 basis-1/2 shadow-lg shadow-slate-700 rounded-lg p-4 min-h-[550px] max-h-[550px]'>
            {
              file == null ? (
                <div {...getRootProps({ className: 'dropzone' })} className={`h-full border-dashed border-4 p-8 w-full  flex items-center justify-center  text-center flex-grow ${isDragActive ? 'border-blue-500' : 'border-gray-500 rounded-lg'} min-h-[515px]  `}>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop the file here...</p> :
                      <div className='flex-col text-sm items-center justify-center'>
                        <div className="flex items-center justify-center flex-col">
                          <CloudUpload size={50} className='text-blue-600' />
                        </div>
                        <p className=' text-base mt-6'>
                          <span className='font-semibold'>Click Here or Drop</span> some files here to extract data from documents seamlessly. After extracting the data, you can edit it as needed and download the updated document. Our AI-powered solution ensures accuracy and efficiency in document processing.
                        </p>
                      </div>
                  }
                </div>
              ) : (
                <div className='w-full max-h-[500px] '>
                {/* {preview && (
                  <div className="flex flex-col ">
                    <div className="flex justify-center w-full">

                      <img src={preview} alt="File preview" className="max-h-[370px]" />
                    </div>
                    <div className="flex gap-6">
                    <button
                      onClick={handleExtract}
                      className='mt-4 bg-[#28282B] text-[#FFFECA]  p-2 rounded w-full'>
                      {loading ? "Extract ..." : "Extract"}
                    </button>
                    <button
                      onClick={() => setFile()}
                      className='mt-4 bg-[#28282B] text-[#FFFECA]  p-2 rounded w-full'>
                       Reset 
                    </button>
                    </div>
                  </div>
                )} */}
                {preview && (
                  <div className="flex flex-col items-center w-full">
                    <div
                      className="w-full flex justify-between items-center overflow-auto flex-col "
                      style={{ minHeight : '510px', height: '100%', position: 'relative' }}
                    >
                    <TransformWrapper >
                      <TransformComponent >
                        <img
                          src={preview}
                          alt="File preview"
                          className="max-h-[470px] h-full w-full  object-cover  relative overflow-hidden"
                          style={{
                            cursor: 'grab' 
                          }}
                        />
                      
                      </TransformComponent>
                      <Controls />
                    </TransformWrapper>
                    </div>
                    {/* <div className="flex flex-nowrap gap-2 mt-4 w-full">
                      <div className="flex gap-2 w-fit">
                        <button
                          // onClick={handleZoomIn}
                          onClick={() => zoomIn()}
                          className='bg-[#28282B] text-[#FFFECA] p-2 rounded'
                        >
                          <PlusCircle />
                        </button>
                        <button
                          // onClick={handleZoomOut}
                          onClick={() => zoomOut()}
                          className='bg-[#28282B] text-[#FFFECA] p-2 rounded'
                        >
                          <MinusCircle />
                        </button>
                      </div>
                      <button
                        onClick={handleExtract}
                        className='bg-[#28282B] text-[#FFFECA] p-2 rounded w-full'
                      >
                        {loading ? "Extract ..." : "Extract"}
                      </button>
                      <button
                        onClick={() => setFile(null)}
                        className='bg-[#28282B] text-[#FFFECA] p-2 rounded w-full'
                      >
                        Reset
                      </button>
                    </div> */}
                  </div>
                )}
              </div> 
              )
            }
            <div className="text-red-500 font-Rubik mx-auto my-4 w-fit ">{error} </div>
          
          </div>
          
          {/* Response Section */}
          <div className='bg-gray-200 basis-1/2 shadow-lg shadow-slate-700 rounded-lg p-4 min-h-[550px] max-h-[550px] overflow-auto '>
            {/* Response will be displayed here later */}
            <Tabs defaultValue="JSON" className="w-full ">
               <TabsList className="grid w-full grid-cols-3">
                 <TabsTrigger className="data-[state=active]:bg-[#28282B] data-[state=active]:text-white data-[state=active]:shadow-sm" value="JSON">JSON</TabsTrigger>
                 <TabsTrigger className="data-[state=active]:bg-[#28282B] data-[state=active]:text-white data-[state=active]:shadow-sm" value="Key-Pair">Key-Pair</TabsTrigger>
                 <TabsTrigger className="data-[state=active]:bg-[#28282B] data-[state=active]:text-white data-[state=active]:shadow-sm" value="Excel">Excel</TabsTrigger>
               </TabsList>
               {/* json */}
               <TabsContent value="JSON">
                
                <CopyToClipboard
                  text={JSON.stringify(Response, null, 2)}
                  onCopy={handleCopy}
                >
                  <Button className="text-xs px-3 py-2.5 h-fit bg-[#28282B] ">{copied ? "Copied!" : "Copy JSON"}</Button>
                </CopyToClipboard>
                <Button onClick={handleJsonDownload} className="ml-2 text-xs px-3 py-2.5 h-fit bg-[#28282B]">
                  Download JSON
                </Button>
                <div className=" mt-3 h-full">
                  {
                    !loading ? (
                      <pre className=" p-4 rounded overflow-auto shadow-md bg-muted h-[320px] min-h-[410px]">
                      {JSON.stringify(Response, null, 2)}
                    </pre>
                    ) : (
                      <SkeletonResponseLD />
                    )
                  }
                 
                </div>
               </TabsContent>
               <TabsContent value="Key-Pair">
                {!loading ? (
                  <ResponseFormat data={Response} />
                ) : (
                  <SkeletonResponseLD />
                )
                
                }
               </TabsContent>
               <TabsContent value="Excel">
                 <div className=' h-full'>
                 <div>
                  <Button onClick={handleExport} className="mb-2 ml-2 bg-[#28282B] text-xs px-3 py-2.5 h-fit">Download Excel</Button>
                  <DataTable headers={headers} rows={rows} />
                </div>
                 </div>
               </TabsContent>
             </Tabs> 
          </div>
        </div>
      </div>
    </div>
  );
}
