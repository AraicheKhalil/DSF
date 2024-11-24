import React, { useState } from "react";

const TableWithPagination = () => {
  // Sample data (you can replace this with your API data)
  const data = [
    { id: 1, name: "Document1.pdf", type: "file" },
    { id: 2, name: "Folder1", type: "folder" },
    { id: 3, name: "Document2.pdf", type: "file" },
    { id: 4, name: "Folder2", type: "folder" },
    { id: 5, name: "Document3.pdf", type: "file" },
    { id: 6, name: "Document4.pdf", type: "file" },
  ];

  const [filter, setFilter] = useState("all"); // Default filter is 'all'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Items per page

  // Filter data based on filter type
  const filteredData =
    filter === "all"
      ? data
      : data.filter((item) => item.type === filter);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle filter change
  const handleFilterChange = (type) => {
    setFilter(type);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  return (
    <div className="container mx-auto p-4">
      {/* Button Group for Filtering */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded ${
            filter === "file" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("file")}
        >
          Files
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "folder" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("folder")}
        >
          Folders
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Type</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{item.name}</td>
              <td className="py-2 px-4 border capitalize">{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableWithPagination;
