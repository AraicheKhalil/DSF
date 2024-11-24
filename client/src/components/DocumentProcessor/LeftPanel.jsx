import React from 'react';

const LeftPanel = ({ previews, selectedImageIndex, setSelectedImageIndex }) => {
  return (
    <div className="w-1/4">
      <button onClick={() => setSelectedImageIndex(null)} className="btn btn-primary mb-2">Back</button>
      <div className="overflow-y-auto h-full">
        {previews.map((preview, index) => (
          <div
            key={index}
            className={`p-2 cursor-pointer ${selectedImageIndex === index ? 'bg-blue-500 rounded' : ''}`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img src={preview} alt={`Document ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;