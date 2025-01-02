import React, { useState } from "react";

function SearchPanel({ onSearch }) {
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
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Search Tickets</h3>
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
            <label>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
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
  );
}

export default SearchPanel;
