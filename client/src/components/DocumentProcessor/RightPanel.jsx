// export default RightPanel;
import React from 'react';
import JsonFormat from '../ExtractTabs/JsonFormat';
import ResponseFormat from '../ExtractTabs/ResponseFormat';
import ExtractedResponse from '../ExtractTabs/extractedResponse';

const RightPanel = ({ images, selectedImageIndex }) => {
  const selectedImage = images[selectedImageIndex];

  return (
    <div className="w-full lg:w-2/3 xl:w-3/4 pl-4 border-l-2 border-gray-300 h-full overflow-auto">
      {selectedImage ? (
        <div className="space-y-6 p-4">
          <h2 className="text-2xl font-bold mb-4">Extracted Data</h2>
          <div className="p-4 bg-white shadow rounded-lg overflow-auto">
            <h3 className="text-lg font-semibold mb-2">JSON Format</h3>
            <JsonFormat data={selectedImage} />
          </div>
          <div className="p-4 bg-white shadow rounded-lg overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Response Format</h3>
            <ResponseFormat data={selectedImage} />
          </div>
          <div className="p-4 bg-white shadow rounded-lg overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Extracted Response</h3>
            <ExtractedResponse data={selectedImage} />
          </div>
        </div>
      ) : (
        <p className="p-4">No data available for this document.</p>
      )}
    </div>
  );
};

export default RightPanel;
