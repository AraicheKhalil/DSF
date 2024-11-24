



// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import TitlePage from '@/components/Custom/TitlePage';
// import { AdvencedToolsResponse, ToolsResponse } from '@/api/DocumentResquest';
// import { useDropzone } from 'react-dropzone';
// import { format } from 'date-fns';
// import { saveAs } from 'file-saver';
// import { Button } from '@/components/ui/button';
// import JSZip from 'jszip';
// import { ArrowUpLeftFromSquare, Files, Sparkles } from 'lucide-react';
// import { FaFileLines } from 'react-icons/fa6';
// import axios from 'axios';




// const ToolsTypes = () => {

//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const [convertedFiles, setConvertedFiles] = useState([]); 
//   const [jsonData, setJsonData] = useState('');
//   const params = useParams() // pdf-to-image  or  excel to pdf ....
//   // the use params its parametre that we need to pass to api function to complete the url in post request 


//   const validParams = ["merge-pdfs", "merge-ppts", "enhance-file", "split-pdf"];
//   const isValid = validParams.includes(params.type);

//   const validJSONParams = ["json-to-table" , "json-to-csv"];
//   const isValidJSON = validJSONParams.includes(params.type);

//   const title = `Convert Your ${params.type.split('-')            
//   .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
//   .join(' ')}`;

//   const onDrop = (acceptedFiles) => {
//     setFiles((prevFiles) => [
//         ...prevFiles,
//         ...acceptedFiles.map((file) =>
//             Object.assign(file, {
//                 preview: URL.createObjectURL(file),
//             })
//         ),
//     ]);
//   };
  
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     multiple: true,
//   });

//   const handleDelete = (file) => {
//     setFiles(files.filter((f) => f !== file));
//   };

// const handleUpload = async () => {
//   setUploading(true);
//   setError(null);
//   setConvertedFiles(null);  // Reset converted file before uploading
//   try {
//       console.log(files)
//       const result = await ToolsResponse(files,params.type); // work 
//       console.log(result) // work
//       setConvertedFiles(result);  // Store the converted file blob
//       console.log(convertedFiles) // work 
//   } catch (error) {
//       setError('Failed to upload files. Please try again.');
//   } finally {
//       setUploading(false);
//   }
// };


//   const handleDownload = (file) => {
//     if (file) {
//       const url = URL.createObjectURL(file.blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = file.filename;  // Set the correct filename
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);  // Clean up the URL object
//     }
//   };


//   const handleUploadForJSON = async (data) => {
//     const jsonData = data.jsonInput;
    
//     setUploading(true);
//     setError('');

//     try {
//       const response = await axios.post('https://www.dsfsmartdoc.com/json-to-csv/', { json: jsonData });
//       console.log('Conversion Successful:', response.data); 
//       setConvertedFiles(response.data);
//       // You can handle the response, like showing the converted file link
//     } catch (err) {
//       setError('Conversion failed. Please try again.');
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };



//   return (
//     <>
//       <div className='px-4 py-6 md:p-7'>
//         <Link to={'/dashboard/tools'} className='flex gap-3 items-center bg-gray-100 w-fit px-3 py-2 rounded-md font-medium mb-4 border shadow-lg '>
//           <ArrowUpLeftFromSquare size={20} />
//           <p>Back To Tools</p>
//         </Link>
//         {
//             isValid ? (
//             <div>hi</div>
//           ) : isValidJSON ? (
//             // json worksapce
//             // <div className='w-fit mx-auto flex flex-col items-center mb-8'>
//             //     <TitlePage title={title} />
//             //     <div className='-mt-8'>
//             //       <Button 
//             //           className="mt-4 px-6 shadow-xl  bg-gray-800 font-medium  text-white rounded-md"
//             //           onClick={handleUploadForJSON}
//             //           disabled={uploading}
//             //       >
//             //           {uploading ? 'Converting...' : <div className='flex items-center gap-3'>Convert Now <Sparkles size={18}/></div>}
//             //       </Button>
//             //       {error && <p className="text-red-500 mt-2">{error}</p>}
//             //     </div>
//             //   </div>
//             <div className=' mx-auto flex flex-col items-center mb-8'>
//               <div className="w-fit mx-auto">

//               </div>
//               <TitlePage title={title} />
//               <div className='-mt-8'>
//                 <Button 
//                   className="mt-4 px-6 shadow-xl  bg-gray-800 font-medium  text-white rounded-md"
//                   onClick={handleUploadForJSON}
//                   disabled={uploading}
//                 >
//                   {uploading ? 'Converting...' : <div className='flex items-center gap-3'>Convert Now <Sparkles size={18}/></div>}
//                 </Button>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//               </div>

//               {/* start here with highly focused CSS Tailwind and responsiveness */}
//               <div className="w-full  mt-6">
//                 <label htmlFor="jsonInput" className="block text-sm font-medium text-gray-700 mb-2">
//                   Paste or Write Your JSON Data
//                 </label>
//                 <textarea
//                   id="jsonInput"
//                   rows="10"
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-gray-200"
//                   placeholder="Paste your JSON here..."
//                   onChange={(e) => setJsonData(e.target.value)} // Updates the JSON data in state
//                 />
//                 {error && <p className="text-red-500 mt-1 text-sm">JSON input is required.</p>}
//                 {
//                   convertedFiles?.length >= 1 &&
//                   <Button 
//                     className="px-4 py-2 bg-green-600 text-white rounded-md mt-4"
//                     onClick={() => handleDownload(convertedFiles[0])}
//                   >
//                       Downloads 
//                   </Button>
//                 }
//               </div>
//               {/* end here */}
//             </div>
//           ) : (
//             <>
//               <div className='w-fit mx-auto flex flex-col items-center mb-8'>
//                 <TitlePage title={title} />
//                 <div className='-mt-8'>
//                     <Button 
//                         className="mt-4 px-6 shadow-xl  bg-gray-800 font-medium  text-white rounded-md"
//                         onClick={handleUpload}
//                         disabled={uploading}
//                     >
//                         {uploading ? 'Converting...' : <div className='flex items-center gap-3'>Convert Now <Sparkles size={18}/></div>}
//                     </Button>
//                   </div>
//                   {error && <p className="text-red-500 mt-2">{error}</p>}
//               </div>
//               <div className='font-Rubik p-4 border shadow-lg bg-gray-100 rounded-xl'>
              
//               <div
//                   {...getRootProps()}
//                   className={`w-full p-8 border-4 border-dashed rounded-lg text-center bg-white transition-colors ${
//                       isDragActive ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
//                   } hover:bg-blue-50`}
//               >
//                 <input {...getInputProps()} />
//                 <p className="text-lg">{`Drag and drop files and use our ${title.slice(12)} converter.`}</p>
//                 <Button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center mx-auto gap-2">Select files <Files size={17} /></Button>
//               </div>

//               {files.length > 0 &&  (
//                 <div className="w-full rounded-lg mt-4">
//                   <ul>
//                       {files.map((file, index) => (
//                           <li key={index} className="flex items-center justify-between mb-4 rounded-lg p-4 mt-4 bg-white gap-4 shadow-xl">
//                               <div className='flex items-center  bg-white gap-4 '>
//                                   <div className='w-[130px] h-[85px] bg-[#eaecf1] rounded-lg flex justify-center items-center'>
//                                       {
//                                         file.type.slice(0,5) === "image" ?
//                                         <img src={file.preview} alt="preview" className="w-full h-full rounded-lg object-contain" /> :
//                                       <FaFileLines className='text-gray-500 text-3xl' />}

//                                   </div>
//                                   <div className="flex-1 text-[#8194aa] text-sm">
//                                       <p className='font-medium text-gray-600'>{file.name}</p>
//                                       <div className='flex gap-3'>
//                                           <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
//                                           <p>Modified Time: {format(file.lastModified, 'Pp')}</p>
//                                       </div>
//                                       <button
//                                           onClick={() => handleDelete(file)}
//                                           className="text-red-500 text-sm mt-1 hover:underline"
//                                       >
//                                           Delete
//                                       </button>
//                                   </div>

//                               </div>
//                               {
//                                 convertedFiles?.length >= 1 &&
//                                 <Button 
//                                   className="px-4 py-2 bg-green-600 text-white rounded-md"
//                                   onClick={() => handleDownload(convertedFiles[index])}
//                                 >
//                                     Downloads 
//                                 </Button>
//                               }
//                           </li>
//                       ))}
//                   </ul>
//                   {/* <div className=''>
//                     <Button 
//                         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//                         onClick={handleUpload}
//                         disabled={uploading}
//                     >
//                         {uploading ? 'Uploading...' : 'Extract'}
//                     </Button>
//                   </div>
//                   {error && <p className="text-red-500 mt-2">{error}</p>} */}
//               </div>
//               )}
//               </div>         
//             </>
//           )
//         }
//       </div>
//     </>
//   );
// };

// export default ToolsTypes;



















import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TitlePage from '@/components/Custom/TitlePage';
import { MergeFiles, ToolsResponse } from '@/api/DocumentResquest';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import JSZip from 'jszip';
import { ArrowUpLeftFromSquare, Files, Sparkles } from 'lucide-react';
import { FaFileLines } from 'react-icons/fa6';
import axios from 'axios';
import { Input } from '@/components/ui/input';




const ToolsTypes = () => {

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [convertedFiles, setConvertedFiles] = useState([]); 
  const [jsonData, setJsonData] = useState('');
  const [mergedPdfs, setMergedPdfs] = useState(null); // Store the merged PDF URL
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null); // Store the merged PDF URL
  const [queries , setQueries] = useState({
    pages : "",
    rangeStart : "",
    rangeEnd : ""
  });
  const params = useParams(); // pdf-to-image  or  excel to pdf ....
  // the use params its parametre that we need to pass to api function to complete the url in post request 

  console.log(queries)

  // console.log(jsonData);
  const validJSONParams = ["json-to-csv"];
  const isValidJSON = validJSONParams.includes(params.type);

  const validSplit = ["split-pdf"];
  const isValidSplit = validSplit.includes(params.type);

  // const validMerge = ["merge-pdfs","merge-ppts"];
  // const isValidMerge = validMerge.includes(params.type);

  const title = `Convert Your ${params.type.split('-')            
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
  .join(' ')}`;

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        ),
    ]);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleDelete = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  console.log(mergedPdfUrl) 

const handleUpload = async () => {
  setUploading(true);
  setError(null);
  setConvertedFiles(null);  // Reset converted file before uploading
  try {
    if (params.type === "merge-pdfs") {
      const result = await MergeFiles(files,params.type); // work 
      console.log(result) // work
      const url = window.URL.createObjectURL(new Blob([result]));
      setMergedPdfUrl(url)
      
    } else {
      console.log(files)
      const result = await ToolsResponse(files,params.type,queries); // work 
      console.log(result) // work
      setConvertedFiles(result);  // Store the converted file blob
      console.log(convertedFiles) // work 
    }
  } catch (error) {
      setError('Failed to upload files. Please try again.');
  } finally {
      setUploading(false);
  }
};


  const handleDownload = (file) => {
    if (file) {
      const url = URL.createObjectURL(file.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename;  // Set the correct filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);  // Clean up the URL object
    }
  };

  const handleDownloadForCSV = (csvData) => {
    if (csvData) {
      // Create a Blob from the CSV data
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      // Create a link element for download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.csv'); // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Optionally revoke the URL to free up memory
      window.URL.revokeObjectURL(url);
    }
  };

    const handleUploadForJSON = async (data) => {
    // const jsonData = data.jsonInput;
    
    setUploading(true);
    setError('');

    try {
      const response = await axios.post('https://www.dsfsmartdoc.com/json-to-csv/', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response:', response.data);
      setConvertedFiles(response.data);
      setUploading(false);
      // Handle the response, e.g., download the CSV file or show success message
    } catch (error) {
      console.error('Error sending JSON to API:', error);
    }

    // try {
    //   const response = await fetch('https://www.dsfsmartdoc.com/json-to-csv/' , {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.parse(jsonData),
    //   });
    //   const responseData = await response.json();


    //   console.log('Conversion Successful:', responseData.data); 
    //   setConvertedFiles(responseData.data);
    //   // You can handle the response, like showing the converted file link
    // } catch (err) {
    //   setError('Conversion failed. Please try again.');
    //   console.error(err);
    // } finally {
    //   setUploading(false);
    // }
  };

  // const handleUploadForMerge = async () => {
  //   const formData = new FormData();

  //   // Append all files to 'files' key in the FormData
  //   files.forEach((file) => {
  //     formData.append('files', file); // Same key 'files' for all PDFs
  //   });

  //   try {
  //     // Make the request to merge PDFs
  //     const response = await axios.post('https://www.dsfsmartdoc.com/convert/merge-pdfs/', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       responseType: 'blob', // Get the merged file as a blob
  //     });

  //     // Create a URL from the response blob
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     setMergedPdfUrl(url); // Save the URL to state
  //   } catch (error) {
  //     console.error('Error merging PDFs:', error.response?.data || error.message);
  //   }
  // };

  console.log(convertedFiles);

  return (
    <>
      <div className='px-4 py-6 md:p-7'>
        <Link to={'/dashboard/tools'} className='flex gap-2 text-xs items-center bg-gray-100 w-fit px-3 py-2 rounded-md font-medium mb-4 border shadow-lg '>
          <ArrowUpLeftFromSquare size={12} />
          <p>Back To Tools</p>
        </Link>
        {
          isValidJSON ? (
            <>
              <div className=' mx-auto flex flex-col items-center mb-8'>
                <TitlePage title={title} />
                <div className='-mt-8'>
                  <Button 
                    className="mt-4 px-6 shadow-xl  bg-gray-800 font-medium  text-white rounded-md"
                    onClick={handleUploadForJSON}
                    disabled={uploading}
                  >
                    {uploading ? 'Converting...' : <div className='flex items-center gap-3'>Convert Now <Sparkles size={18}/></div>}
                  </Button>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                {/* start here with highly focused CSS Tailwind and responsiveness */}
                <div className="w-full  mt-6">
                  <label htmlFor="jsonInput" className="block text-sm font-medium text-gray-700 mb-2">
                    Paste or Write Your JSON Data
                  </label>
                  <textarea
                    id="jsonInput"
                    rows="10"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-gray-200"
                    placeholder="Paste your JSON here..."
                    onChange={(e) => setJsonData(e.target.value)} // Updates the JSON data in state
                  />
                  {error && <p className="text-red-500 mt-1 text-sm">JSON input is required.</p>}
                  {
                    convertedFiles?.length >= 1 &&
                    <Button 
                      className="px-4 py-2 bg-green-600 text-white rounded-md mt-4"
                      onClick={() => handleDownloadForCSV(convertedFiles)}
                    >
                        Downloads 
                    </Button>
                  }
                </div>
                {/* end here */}
              </div>
            </>
          ) : (
            <div>
              <div className='w-fit mx-auto flex flex-col items-center mb-8'>
                <TitlePage title={title} />
                <div className='-mt-8'>
                    <Button 
                        className="mt-4 px-6 shadow-xl  bg-gray-800 font-medium  text-white rounded-md"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? 'Converting...' : <div className='flex items-center gap-3'>Convert Now <Sparkles size={18}/></div>}
                    </Button>
                  </div>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
              <div className='font-Rubik p-4 border shadow-lg bg-gray-100 rounded-xl'>
              
              <div
                  {...getRootProps()}
                  className={`w-full p-8 border-4 border-dashed rounded-lg text-center bg-white transition-colors ${
                      isDragActive ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                  } hover:bg-blue-50`}
              >
                <input {...getInputProps()} />
                <p className="text-lg">{`Drag and drop files and use our ${title.slice(12)} converter.`}</p>
                <Button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center mx-auto gap-2">Select files <Files size={17} /></Button>
              </div>

              {files.length > 0 &&  (
                
                <div className="w-full rounded-lg mt-4">
                  {
                    isValidSplit && (
                      <>
                        <Input 
                          placeholder="Enter the Page that You want to Get. Ex: 5 "
                          value={queries.pages}
                          onChange={(e) => setQueries((prevValue) => {
                            return {
                              ...prevValue,
                              pages : e.target.value
                            }
                          })}
                        />
                        <p>or</p>
                        <Input 
                          className=" mb-2"
                          placeholder="Ex: 2"
                          value={queries.rangeStart}
                          onChange={(e) => setQueries((prevValue) => {
                            return {
                              ...prevValue,
                              rangeStart : e.target.value
                            }
                          })}
                        />
                        <Input 
                          placeholder="Ex: 6"
                          value={queries.rangeEnd}
                          onChange={(e) => setQueries((prevValue) => {
                            return {
                              ...prevValue,
                              rangeEnd : e.target.value
                            }
                          })}
                        />
                      </>
                    )
                  }
                  {mergedPdfUrl && (
                    <div className="mt-4">
                      <a
                        href={mergedPdfUrl}
                        download={params.type === 'merge-pdfs' ? 'merged.pdf' : 'merged.pptx'}
                        className="bg-green-500 text-white py-2 px-4 rounded inline-block"
                      >
                        Download Merged {params.type === 'merge-pdfs' ? 'PDF' : 'PPT'}
                      </a>
                    </div>
                  )}
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
                  {/* <div className=''>
                    <Button 
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Extract'}
                    </Button>
                  </div>
                  {error && <p className="text-red-500 mt-2">{error}</p>} */}
              </div>
              )}
              </div>         
            </div>
          )
        }
      </div>
    </>
  );
};

export default ToolsTypes;




















