// import React from 'react';

// const MainSmartDoc = ({
//   activeFile,
//   canvasRef,
//   zoom,
//   rotation,
//   handleZoomChange,
//   rotateDocument,
//   extractDocument,
//   getRootProps,
//   getInputProps
// }) => {
//   return (
//     <div className=" w-full h-screen max-h-screen overflow-hidden ">
//       <div className="toolbar" style={{ backgroundColor: '#333', color: '#fff', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <button onClick={extractDocument} style={{ marginRight: '10px' }}>Extract</button>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <button onClick={() => setZoom(zoom + 0.1)}>Zoom In</button>
//           <button onClick={() => setZoom(zoom - 0.1)}>Zoom Out</button>
//           <input type="range" min="0.5" max="2" step="0.1" value={zoom} onChange={handleZoomChange} />
//           <button onClick={rotateDocument}>Rotate</button>
//         </div>
//       </div>
//       <div className={`file-preview  `} >
//         {!activeFile ? (
//           <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cccccc', backgroundColor: '#fafafa' }}>
//             <input {...getInputProps()} />
//             <p>Drag 'n' drop some files here, or click to select files</p>
//           </div>
//         ) : (
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
//             {activeFile.file?.type.startsWith('image/') ? (
//               <img src={activeFile.previewUrl} alt="Preview" style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, maxWidth: '100%', maxHeight: '100%' }} />
//             ) : (
//               <canvas ref={canvasRef} style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}></canvas>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MainSmartDoc;






















































import React, { useEffect, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const MainSmartDoc = ({
  activeFile,
  canvasRef,
  isCropping,
  setIsCropping,
  extractDocument,
  getRootProps,
  getInputProps,
  saveCroppedImage,
  setCropper
}) => {
  const cropperRef = useRef(null);

  useEffect(() => {
    if (activeFile && activeFile.file.type === 'application/pdf') {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const typedArray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
          pdf.getPage(1).then((page) => {
            const viewport = page.getViewport({ scale: 1 });
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

  const getCropData = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImageDataUrl = croppedCanvas.toDataURL();
      saveCroppedImage(croppedImageDataUrl);
    }
  };

  useEffect(() => {
    if (isCropping && cropperRef.current) {
      setCropper(cropperRef.current.cropper);
    }
  }, [isCropping, setCropper]);

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden">
      <div className="toolbar" style={{ backgroundColor: '#333', color: '#fff', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={extractDocument} style={{ marginRight: '10px' }}>Extract</button>
        {activeFile && activeFile.file.type.startsWith('image/') && (
          <>
            <button onClick={() => setIsCropping(!isCropping)} style={{ marginRight: '10px' }}>
              {isCropping ? 'Cancel Crop' : 'Crop'}
            </button>
            {isCropping && (
              <button onClick={getCropData} style={{ marginRight: '10px' }}>Save Crop</button>
            )}
          </>
        )}
      </div>
      <div className="file-preview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {!activeFile ? (
          <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cccccc', backgroundColor: '#fafafa' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {isCropping ? (
              <Cropper
                src={activeFile.previewUrl}
                style={{ height: 400, width: '100%' }}
                // Cropper.js options
                aspectRatio={1}
                guides={false}
                cropBoxResizable={true}
                viewMode={1}
                dragMode="move"
                ref={cropperRef}
              />
            ) : (
              activeFile.file?.type.startsWith('image/') ? (
                <img src={activeFile.previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              ) : (
                <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%' }}></canvas>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSmartDoc;

