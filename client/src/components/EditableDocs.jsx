// EditableDocs
// src/components/EditableForm.js
import React, { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';

const EditableDocs = ({ documentData }) => {
  const [formData, setFormData] = useState(documentData);
  const [isEditing, setIsEditing] = useState({});

  const handleChange = (e, key) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEdit = (key) => {
    setIsEditing({
      ...isEditing,
      [key]: !isEditing[key],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Data:', formData);
    // You can send the updated data back to the backend here.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-md">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleEdit(key)}
              className="text-gray-700 focus:outline-none"
            >
              {isEditing[key] ? <FaSave /> : <FaEdit />}
            </button>
            {isEditing[key] ? (
              <input
                type="text"
                name={key}
                value={key}
                onChange={(e) => handleChange(e, key)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            ) : (
              <span className="font-semibold text-gray-700">{key}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleEdit(key)}
              className="text-gray-700 focus:outline-none"
            >
              {isEditing[key] ? <FaSave /> : <FaEdit />}
            </button>
            {isEditing[key] ? (
              <input
                type="text"
                name={key}
                value={value}
                onChange={(e) => handleChange(e)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            ) : (
              <span className="text-gray-700">{value}</span>
            )}
          </div>
        </div>
      ))}
      <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Save
      </button>
    </form>
  );
};

export default EditableDocs;
