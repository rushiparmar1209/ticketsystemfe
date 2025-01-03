import React, { useState } from "react";

function SearchPanel({ onSearch, onClose }) {
  const [selectedOptions, setSelectedOptions] = useState({
    title: false,
    status: false,
    priority: false,
    assignee: false,
    tags: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSearch = () => {
    // Call onSearch with the selected options
    onSearch(selectedOptions);
    onClose(); // Close modal after search (optional, you can remove this if not needed)
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-2xl w-full md:w-96 max-w-lg max-h-[90vh] overflow-y-auto transition-all transform">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl font-bold"
        >
          ×
        </button>

        <h3 className="text-lg font-semibold mb-4 text-white text-center">
          Search Tickets
        </h3>
        <div className="space-y-2">
          {["title", "status", "priority", "assignee", "tags"].map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                name={option}
                checked={selectedOptions[option]}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="text-white">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl mt-4"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchPanel;
