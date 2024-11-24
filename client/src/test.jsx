import React, { useState } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const GetDocComponent = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const renderPdfAsImage = async (pdfFile) => {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const page = await pdf.getPage(1);
      const scale = 4.5;
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

  const handleGetDoc = async () => {
    setLoading(true);

    try {
      // Make the GET request to fetch the document
      const response = await axios.get('http://localhost:5000/api/v1/docs/6717e23263306979e904fdde', {
        responseType: 'blob', // to handle file response
      });
      
      const file = response.data;
      const fileType = file.type;

      if (fileType === 'application/pdf') {
        // Handle PDF rendering
        renderPdfAsImage(file);
      } else if (fileType.startsWith('image/')) {
        // Handle image preview
        const url = URL.createObjectURL(file);
        setPreview(url);
      }

    } catch (error) {
      console.error('Error fetching document:', error);
      alert('Failed to fetch document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Fetch and Preview Document
        </h1>

        <button
          onClick={handleGetDoc}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Fetch Document'}
        </button>

        {preview && (
          <div className="mt-8">
            {preview.endsWith('.pdf') ? (
              <p>PDF preview not available. File saved as image for rendering.</p>
            ) : (
              <img src={preview} alt="Preview" className="max-w-full max-h-64 object-contain" />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default GetDocComponent;
