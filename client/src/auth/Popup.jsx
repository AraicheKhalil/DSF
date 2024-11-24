// Popup.jsx
import React from 'react';

const Popup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <p className="mb-4">{message}</p>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default Popup;
