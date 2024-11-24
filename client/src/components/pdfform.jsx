import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import 'pdfjs-dist/build/pdf.worker.entry';

const PDFPreview = ({ pdfUrl }) => {
  pdfUrl = pdfUrl.slice(5)
  console.log(pdfUrl)
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const imageUrls = [];

      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
        imageUrls.push(canvas.toDataURL());
      }

      setImages(imageUrls);
    };

    loadPdf();
  }, [pdfUrl]);

  return (
    <div>
      
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default PDFPreview;
