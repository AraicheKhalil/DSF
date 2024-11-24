// import React, { useState, useEffect, useRef } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { v4 as uuidv4 } from 'uuid';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import 'pdfjs-dist/build/pdf.worker.entry';
// import { uploadFilesTest } from '@/api/DocumentResquest';
// import MainSmartDoc from './MianPn';
// import SmartDocSide from './leftPn';
// import DocResult from './rightPn';
// import { formatResponse } from '@/Utils/ResponseFormatter';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// const SmartDoc = () => {
//   const [files, setFiles] = useState([]);
//   const [activeFile, setActiveFile] = useState(null);
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const canvasRef = useRef(null);

//   const onDrop = (acceptedFiles) => {
//     const newFiles = acceptedFiles.map(file => {
//       const fileWithId = {
//         id: uuidv4(),
//         file: file,
//         previewUrl: ''
//       };

//       if (file.type === 'application/pdf') {
//         const previewCanvas = document.createElement('canvas');
//         const previewContext = previewCanvas.getContext('2d');
        
//         const fileReader = new FileReader();
//         fileReader.onload = function () {
//           const typedArray = new Uint8Array(this.result);
//           pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
//             pdf.getPage(1).then((page) => {
//               const viewport = page.getViewport({ scale: 0.5 });
//               previewCanvas.height = viewport.height;
//               previewCanvas.width = viewport.width;
              
//               const renderContext = {
//                 canvasContext: previewContext,
//                 viewport: viewport,
//               };
//               page.render(renderContext).promise.then(() => {
//                 fileWithId.previewUrl = previewCanvas.toDataURL();
//                 setFiles(prevFiles => [...prevFiles, fileWithId]);
//               });
//             });
//           });
//         };
//         fileReader.readAsArrayBuffer(file);
//       } else {
//         fileWithId.previewUrl = URL.createObjectURL(file);
//         setFiles(prevFiles => [...prevFiles, fileWithId]);
//       }

//       return fileWithId;
//     });

//     if (files.length === 0) {
//       setActiveFile(newFiles[0]);
//     } else {
//       setActiveFile(files[0]);
//     }
//   };

//   useEffect(() => {
//     if (activeFile && activeFile.file.type === 'application/pdf') {
//       const fileReader = new FileReader();
//       fileReader.onload = function () {
//         const typedArray = new Uint8Array(this.result);
//         pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
//           pdf.getPage(1).then((page) => {
//             const viewport = page.getViewport({ scale: zoom });
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');
//             canvas.height = viewport.height;
//             canvas.width = viewport.width;

//             const renderContext = {
//               canvasContext: context,
//               viewport: viewport,
//             };
//             page.render(renderContext);
//           });
//         });
//       };
//       fileReader.readAsArrayBuffer(activeFile.file);
//     }
//   }, [activeFile, zoom, rotation]);

//   const deleteFile = (id) => {
//     setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
//     if (activeFile && activeFile.id === id) {
//       setActiveFile(null);
//     }
//   };

//   const handleZoomChange = (e) => {
//     setZoom(parseFloat(e.target.value));
//   };

//   const rotateDocument = () => {
//     setRotation(prevRotation => prevRotation + 90);
//   };

//   const extractDocument = async () => {
//     if (activeFile) {
//       try {
//         setLoading(true);
//         const responseData = await uploadFilesTest([activeFile.file]);
//         setResponse(formatResponse(responseData) );
//       } catch (error) {
//         console.error('Error extracting document:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div className="flex min-h-screen relative bg-gray-100 transition" >
//       <SmartDocSide
//         files={files}
//         setActiveFile={setActiveFile}
//         deleteFile={deleteFile}
//       />
//       <MainSmartDoc
//         activeFile={activeFile}
//         canvasRef={canvasRef}
//         zoom={zoom}
//         rotation={rotation}
//         handleZoomChange={handleZoomChange}
//         rotateDocument={rotateDocument}
//         extractDocument={extractDocument}
//         getRootProps={getRootProps}
//         getInputProps={getInputProps}
//       />
//       <DocResult response={response} loading={loading} />
//     </div>
//   );
// };

// export default SmartDoc;




































import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import { uploadFilesTest } from '@/api/DocumentResquest';
import MainSmartDoc from './MianPn';
import SmartDocSide from './leftPn';
import DocResult from './rightPn';
import { formatResponse } from '@/Utils/ResponseFormatter';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const SmartDoc = () => {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropper, setCropper] = useState(null);
  const canvasRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => {
      const fileWithId = {
        id: uuidv4(),
        file: file,
        previewUrl: ''
      };

      if (file.type === 'application/pdf') {
        const previewCanvas = document.createElement('canvas');
        const previewContext = previewCanvas.getContext('2d');
        
        const fileReader = new FileReader();
        fileReader.onload = function () {
          const typedArray = new Uint8Array(this.result);
          pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
            pdf.getPage(1).then((page) => {
              const viewport = page.getViewport({ scale: 0.5 });
              previewCanvas.height = viewport.height;
              previewCanvas.width = viewport.width;
              
              const renderContext = {
                canvasContext: previewContext,
                viewport: viewport,
              };
              page.render(renderContext).promise.then(() => {
                fileWithId.previewUrl = previewCanvas.toDataURL();
                setFiles(prevFiles => [...prevFiles, fileWithId]);
              });
            });
          });
        };
        fileReader.readAsArrayBuffer(file);
      } else {
        fileWithId.previewUrl = URL.createObjectURL(file);
        setFiles(prevFiles => [...prevFiles, fileWithId]);
      }

      return fileWithId;
    });

    if (files.length === 0) {
      setActiveFile(newFiles[0]);
    } else {
      setActiveFile(files[0]);
    }
  };

  const deleteFile = (id) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    if (activeFile && activeFile.id === id) {
      setActiveFile(null);
    }
  };

  const extractDocument = async () => {
    if (activeFile) {
      try {
        setLoading(true);
        const responseData = await uploadFilesTest([activeFile.file]);
        setResponse(formatResponse(responseData));
      } catch (error) {
        console.error('Error extracting document:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const saveCroppedImage = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImageDataUrl = croppedCanvas.toDataURL();
      const croppedBlob = dataURLToBlob(croppedImageDataUrl);
      const newFile = {
        id: uuidv4(),
        file: new File([croppedBlob], activeFile.file.name, { type: activeFile.file.type }),
        previewUrl: croppedImageDataUrl
      };
      setFiles(prevFiles => prevFiles.map(file => file.id === activeFile.id ? newFile : file));
      setActiveFile(newFile);
      setIsCropping(false);
    }
  };

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="flex min-h-screen relative bg-gray-100 transition">
      <SmartDocSide
        files={files}
        setActiveFile={setActiveFile}
        deleteFile={deleteFile}
      />
      <MainSmartDoc
        activeFile={activeFile}
        canvasRef={canvasRef}
        isCropping={isCropping}
        setIsCropping={setIsCropping}
        extractDocument={extractDocument}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        saveCroppedImage={saveCroppedImage}
        setCropper={setCropper}
      />
      <DocResult response={response} loading={loading} />
    </div>
  );
};

export default SmartDoc;



