import React, { useState, useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileUp, FileText } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


export default function Component() {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const {auth , setfileContext} = useContext(AppContext);
    const navigate = useNavigate()
    const {token } = auth;
    const maxSize = 5 * 1024 * 1024; 
    
    const renderPdfAsImage = async (pdfFile) => {
      const fileReader = new FileReader();
  
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        const page = await pdf.getPage(1);
        const scale = 4.5;
        const viewport =  page.getViewport({ scale });
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

    
  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    // if (selectedFile.size > maxSize) {
    //   setFile(null);
    //   setPreview(null);
    //   setError("Error: You cannot upload files larger than 5MB.")
    //   return;
    // }
  
    setFile(selectedFile);
    // setError(null)

    if (selectedFile.type === 'application/pdf') {
      renderPdfAsImage(selectedFile);
    } else if (selectedFile.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(selectedFile));
    }

    
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  // const handleUpload = async () => {
  //   if (file) {
  //     const formData = new FormData()
  //     formData.append('file', file)

  //     console.log(file)
      
  //     try {
  //       const response = await fetch('http://localhost:5000/api/v1/docs/upload', {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           'Authorization': `Bearer ${token}`
  //         },
  //       })
  //       if (response.ok) {
  //         console.log('File uploaded successfully')
  //         // Handle successful upload (e.g., show a success message)
  //       } else {
  //         console.error('File upload failed')
  //         // Handle upload failure (e.g., show an error message)
  //       }
  //     } catch (error) {
  //       console.error('Error uploading file:', error)
  //       // Handle upload error (e.g., show an error message)
  //     }
  //   }
  // }

  const handleUpload = async () => {
    if(file){
      setfileContext(file)
      navigate('/dashboard/smart-doc')
      // const formData = new FormData();
      // formData.append('file', file);

      // console.log(file)
      // try {
      //     await axios.post('http://localhost:5000/api/v1/docs/upload', formData, {
      //         headers: {
      //             'Content-Type': 'multipart/form-data'
      //         }
      //     });
      //     alert('File uploaded successfully.');
      // } catch (err) {
      //     alert('Error uploading file.');
      // }
    }
};

console.log(preview)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={"./Logo.png"} className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Smart Doc</span>
          </div>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
            Book a Live Demo
          </button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div className="h-2 w-1/2 bg-blue-600 rounded-full"></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">STEP 1 OF 2</p>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, <span className="text-blue-600">Upload your document</span> to get started.
          </h1>
          <p className="text-gray-600 mb-8">For example, upload an image of an invoice</p>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 ${
              isDragActive ? 'bg-blue-50' : ''
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex flex-col items-center">
                {preview ? (
                  <img src={preview} alt="File preview" className="max-w-full max-h-64 object-contain mb-4" />
                ) : (
                  <div className="flex items-center justify-center w-64 h-64 bg-gray-100 rounded-lg mb-4">
                    <FileText className="h-24 w-24 text-gray-400" />
                  </div>
                )}
                <p className="text-sm text-gray-500">{file.name}</p>
              </div>
            ) : (
              <div className="text-center">
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {isDragActive
                    ? 'Drop the file here'
                    : 'Drag and drop or click here to add a file'}
                </p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG or PDF</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    document.querySelector('input[type="file"]').click()
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Upload a file
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Don't have any files to test? Request a Demo
            </a>
            <button
              onClick={handleUpload}
              disabled={!file}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}