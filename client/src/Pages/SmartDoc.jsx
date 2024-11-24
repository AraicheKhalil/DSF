// import { uploadFiles } from '@/api/DocumentResquest';
// import React, { useState, useCallback } from 'react';
// import { formatResponse } from '@/Utils/ResponseFormatter';
// import DocResult from '@/components/DocResult';
// import MainSmartDoc from '@/components/MainSmartDoc';
// import SmartDocSide from '@/components/SmartDocSide';

// const SmartDoc = () => {
//   const [images, setImages] = useState([]);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [previews, setPreviews] = useState([]); // For storing preview images
//   const [selectedFiles, setSelectedFiles] = useState([]); // For storing selected files
//   const [documentType,setDocumentType] = useState("process-document")
//   const [loading,setLoading] = useState(false)
//   const [open,setOpen] = useState(false)
  
//   const [gero,setSero] = useState(null);
//   console.log(gero)

//   const onDrop = useCallback((acceptedFiles) => {
//     const previews = acceptedFiles.map(file => URL.createObjectURL(file));
//     setPreviews(previews);
//     setSelectedFiles(acceptedFiles); // Store the selected files
//     setSelectedImageIndex(0); // Display the first image by default
//   }, []);

//   const handleUpload = async () => {
//     if (selectedImageIndex === null) return;

//     const isMultiple = selectedFiles.length > 1;
//     const filesToUpload = isMultiple ? selectedFiles : [selectedFiles[selectedImageIndex]];
//     try {
//       setLoading(true); // Set loading to true before the API call
//       const uploadedData = await uploadFiles(filesToUpload,documentType);
//       setSero(uploadedData)
//       const parsedData = uploadedData.map(data => formatResponse([data]));

//       setImages(parsedData);
      
//     } catch (error) {
//       console.error('Error processing files:', error);
//     } finally {
//       setLoading(false); // Set loading to false after the API call
//     }
//   };

//   console.log(documentType)

//   return (
//     <div className="flex min-h-screen relative bg-gray-100 transition">
//       <SmartDocSide
//         previews={previews}
//         selectedImageIndex={selectedImageIndex}
//         setSelectedImageIndex={setSelectedImageIndex}
//         openSIDE={open}
//         setOpenSIDE={setOpen}
//       />
//       <MainSmartDoc
//         onDrop={onDrop}
//         selectedImageIndex={selectedImageIndex}
//         previews={previews}
//         setDocumentType={setDocumentType}
//         documentType={documentType}
//         handleUpload={handleUpload} // Pass the handleUpload function to the CenterPanel
//         loading={loading} // Pass the loading state to the CenterPanel
//         open={open}
//       />
//       {/* {selectedImageIndex !== null && ( */}
//         <DocResult
//           images={images}
//           selectedImageIndex={selectedImageIndex}
//           loading={loading}
//         />
//       {/* // )} */}
//     </div>
//   );
// };

// export default SmartDoc;


// import React, { useState, useEffect, useRef } from 'react';
// import { useDropzone } from 'react-dropzone';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import 'pdfjs-dist/build/pdf.worker.entry';
// import { v4 as uuidv4 } from 'uuid';
// import { uploadFilesTest } from '@/api/DocumentResquest'; // Import your extraction function
// import { formatResponse } from '@/Utils/ResponseFormatter';
// import DocResult from '@/components/DocResult';
// import SmartDocSide from '@/components/SmartDocSide';
// import MainSmartDoc from '@/components/MainSmartDoc';
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable"




// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;




// const SmartDoc = () => {
//   const [files, setFiles] = useState([]);
//   const [activeFile, setActiveFile] = useState(null);
//   const [loading,setLoading] = useState(false);
//   const [documentType , setDocumentType]  = useState("process-document")
//   const [extractionResults, setExtractionResults] = useState([]);
//   const canvasRef = useRef(null);

//   // console.log(files)
//   // console.log(activeFile)
//   console.log(loading)
//   console.log(extractionResults)
//   console.log(JSON.stringify(extractionResults[0]?.file))


//   const onDrop = (acceptedFiles) => {
//     const newFiles = acceptedFiles.map(file => {
//       const fileId = uuidv4(); // Generate a unique ID for the file
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
//                 const previewUrl = previewCanvas.toDataURL();
//                 setFiles(prevFiles => [...prevFiles, { id: fileId, file, previewUrl }]);
//               });
//             });
//           });
//         };
//         fileReader.readAsArrayBuffer(file);
//       } else {
//         const previewUrl = URL.createObjectURL(file);
//         return { id: fileId, file, previewUrl };
//       }
//       return null;
//     }).filter(fileWrapper => fileWrapper !== null); // Filter out any null entries

//     // Set the files and the first file as active
//     setFiles(prevFiles => [...prevFiles, ...newFiles]);
//   };

//   useEffect(() => {
//     if (files.length > 0) {
//       // Set the first file as the active file
//       setActiveFile(files[0]);
//     }
//   }, [files]);

//   useEffect(() => {
//     if (activeFile && activeFile.file && activeFile.file.type === 'application/pdf') {
//       const fileReader = new FileReader();
//       fileReader.onload = function () {
//         const typedArray = new Uint8Array(this.result);
//         pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
//           pdf.getPage(1).then((page) => {
//             const viewport = page.getViewport({ scale: 1.5 });
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
//   }, [activeFile]);

//   const extractDocument = async () => {
//       try {
//         setLoading(true)
//         const response = await uploadFilesTest(files,documentType); // [ "data1" , "data2" , "da..],
//         // setExtractionResults(response)


//         // const parseData = response.map(item => ({
//         //   ...item,
//         //   file: formatResponse([item.file])
//         // }));
//         setExtractionResults(response)
//         console.log(parseData.file)
        
//       } catch (error) {
//         console.error('Error extracting document:', error);
//       } finally {
//         setLoading(false)
//       }
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (

//     <div>
//       <ResizablePanelGroup
//       direction="horizontal"
//       >
//       <ResizablePanel defaultSize={70} >
//         <div className="flex w-full transition ">
//           <SmartDocSide files={files} setActiveFile={setActiveFile} />
//           <MainSmartDoc onDrop={onDrop} activeFile={activeFile} setActiveFile={setActiveFile} extractDocument={extractDocument} documentType={documentType} setDocumentType={setDocumentType} />
//         </div>
//       </ResizablePanel>
//       <ResizableHandle withHandle className={"w-0.5"}  />
//       <ResizablePanel defaultSize={30} className='min-w-[450px]' >
//         <DocResult activeFile={activeFile} extractionResults={extractionResults} loading={loading}  />
//       </ResizablePanel>
//     </ResizablePanelGroup>
//     </div>

//   );
// };

// export default SmartDoc;

import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import { v4 as uuidv4 } from 'uuid';
import { TrackUserSubmissions, uploadFilesTest } from '@/api/DocumentResquest'; // Import your extraction function
import { formatResponse } from '@/Utils/ResponseFormatter';
import DocResult from '@/components/DocResult';
import MainSmartDoc from '@/components/MainSmartDoc';
import SmartDocSide from '@/components/SmartDocSide';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { AppContext } from '@/context/AppContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';




pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;




const SmartDoc = () => {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [loading,setLoading] = useState(false);
  // const [documentType , setDocumentType]  = useState("process-document")p
  const [extractionResults, setExtractionResults] = useState([]);
  const [error,setError] = useState(null)
  const canvasRef = useRef(null);
  const { auth , documentType , setDocumentType } = useContext(AppContext)
  const {token} = auth;
  const Tool = "SmartDoc"

  // console.log(files)
  // console.log(activeFile)
  // console.log(loading)
  // console.log(extractionResults)
  // console.log(JSON.stringify(extractionResults[0]?.file))

  // const deleteFile = (id) => {
  //   setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  //   // if (activeFile && activeFile.id === id) {
  //   //   setActiveFile(null);
  //   // }
  // };


  // useEffect(() => {
  //   const fetchPdf = async () => {
      
  //     try {
  //       // Fetch the file metadata
  //       const response = await fetch(`http://localhost:5000/api/v1/docs/files/6716d957ff65c49f4edf1317`);
  //       if (!response.ok) {
  //         throw new Error('File not found');
  //       }

  //       const fileData = await response.json();
  //       console.log(fileData);

  //     } catch (error) {
  //       console.error('Error fetching file:', error);
  //     }
  //   }

  //   fetchPdf();
  // })


  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => {
      const fileId = uuidv4(); // Generate a unique ID for the file
      if (file.type === 'application/pdf') {
        // const previewCanvas = document.createElement('canvas');
        // const previewContext = previewCanvas.getContext('2d');

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
    
          const previewUrl = canvas.toDataURL();
          setFiles(prevFiles => [...prevFiles, { id: fileId, file, previewUrl }]);
        };
        // fileReader.onload = async function () {
        //   const typedArray = new Uint8Array(this.result);
        //   pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
        //     pdf.getPage(1).then(async (page) => {
        //       const viewport = page.getViewport({ scale: 0.5 });
        //       previewCanvas.height = viewport.height;
        //       previewCanvas.width = viewport.width;

        //       const renderContext = {
        //         canvasContext: previewContext,
        //         viewport: viewport,
        //       };
        //       await page.render(renderContext).promise.then(() => {
        //         const previewUrl = previewCanvas.toDataURL();
        //         setFiles(prevFiles => [...prevFiles, { id: fileId, file, previewUrl }]);
        //       });
        //     });
        //   });
        // };
        fileReader.readAsArrayBuffer(file);
      } else {
        const previewUrl = URL.createObjectURL(file);
        return { id: fileId, file, previewUrl };
      }
      return null;
    }).filter(fileWrapper => fileWrapper !== null); // Filter out any null entries

    // Set the files and the first file as active
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  useEffect(() => {
    if (files.length > 0) {
      // Set the first file as the active file
      setActiveFile(files[0]);
    }
  }, [files]);

  useEffect(() => {
    if (activeFile && activeFile.file && activeFile.file.type === 'application/pdf') {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const typedArray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
          pdf.getPage(1).then((page) => {
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            page.render(renderContext);
          });
        });
      };
      fileReader.readAsArrayBuffer(activeFile.file);
    }
  }, [activeFile]);

  const deleteFile = (id) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    // if (activeFile && activeFile.id === id) {
    //   setActiveFile(null);
    // }
  };


  // edit hre 
  // const TrackUserSubmissions = async () => {
  //   const response = await fetch("http://localhost:5000/api/v1/activities/track",{
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       "toolCategory": "SmartDoc",
  //       "toolType": documentType
  //     }),
  //   })
    
  //   if(!response.ok){
  //     return false
  //   }
  
  //   const data = await response.json();
  //   console.log("hhhhhhhhhhhhhhhhh", data.access)
  //   return data.access
  // }

  const extractDocument = async () => {
      try {
          setLoading(true)
          const response = await uploadFilesTest(files,documentType); // [ "data1" , "data2" , "da..],
          console.log(response)
          

          let nonEmptyItemCount = 0;
          const processedResponse = response.map(item => {
            if (item.file !== "") {
              nonEmptyItemCount++;
              return item; // Keep non-empty items as they are
            } else {
              return { ...item, file: "" }; // Override empty items
            }
          });

          // Log or use the count as needed
          console.log("Number of non-empty items:", nonEmptyItemCount);

          const trackResponse = await TrackUserSubmissions(token, "SmartDoc", documentType, nonEmptyItemCount);

          console.log("tracker : ",trackResponse)

          // console.log("SaaSy", trackResponse)

          // Check the result of TrackUserSubmissions and update the state accordingly
          if (trackResponse.access) {
            setExtractionResults(processedResponse)
          } else {
            setError(trackResponse.message);
          }
          
        
      } catch (error) {
        console.error('Error extracting document:', error);
      } finally {
        setLoading(false);
      }
  };


  const extractDocumentOnes = async () => {
    try {
      setLoading(true)
      const response = await uploadFilesTest([activeFile],documentType); // [ "data1" , "data2" , "da..],
      setExtractionResults(response)

      let nonEmptyItemCount = 0;
          const processedResponse = response.map(item => {
            if (item.file !== "") {
              nonEmptyItemCount++;
              return item; // Keep non-empty items as they are
            } else {
              return { ...item, file: "" }; // Override empty items
            }
          });

          // Log or use the count as needed
          console.log("Number of non-empty items:", nonEmptyItemCount);

          const trackResponse = await TrackUserSubmissions(token, "SmartDoc", documentType, nonEmptyItemCount);

          console.log("tracker : ",trackResponse)

          // console.log("SaaSy", trackResponse)

          // Check the result of TrackUserSubmissions and update the state accordingly
          if (trackResponse.access) {
            setExtractionResults(processedResponse)
          } else {
            setError(trackResponse.message);
          }
      
      
    } catch (error) {
      console.error('Error extracting document:', error);
    } finally {
      setLoading(false)
    }
};

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (error ) {
      const timer = setTimeout(() => {
        setError("")
      }, 10000) // Clear messages after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [error])

  return (

    <div>
      <div className="w-full max-w-md fixed top-4 z-50 px-4">
        {error && (
          <Alert variant="destructive" className="bg-orange-100 opacity-95 border-orange-400 text-orange-800 animate-in fade-in-50 slide-in-from-top-full duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upgrade membership</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <ResizablePanelGroup
      direction="horizontal"
      >
      <ResizablePanel defaultSize={70} >
        <div className="flex w-full transition ">
          <SmartDocSide files={files} setActiveFile={setActiveFile} extractDocument={extractDocument} deleteFile={deleteFile} />
          <MainSmartDoc onDrop={onDrop} setFiles={setFiles} activeFile={activeFile} setActiveFile={setActiveFile} extractDocumentOnes={extractDocumentOnes} documentType={documentType} setDocumentType={setDocumentType}   />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className={"w-0.5 transition-all hover:bg-blue-400"}  />
      <ResizablePanel defaultSize={30} className='min-w-[450px]' >
        <DocResult activeFile={activeFile} extractionResults={extractionResults} loading={loading}  />
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>

  );
};

export default SmartDoc;





