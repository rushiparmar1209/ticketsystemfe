import React, { useState } from "react";

function FilterPanel({ onFilter, onClose }) {
  const [selectedOptions, setSelectedOptions] = useState({
    project: false,
    team: false,
    dateRange: false,
  });
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    // Call onFilter with the selected options
    onFilter({ selectedOptions, dateRange });
    onClose(); // Close modal after filter (optional)
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
          Filter Tickets
        </h3>
        <div className="space-y-2">
          {["project", "team", "dateRange"].map((option) => (
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

        {selectedOptions.dateRange && (
          <div className="mt-4 flex space-x-4">
            <input
              type="date"
              name="start"
              value={dateRange.start}
              onChange={handleDateChange}
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="end"
              value={dateRange.end}
              onChange={handleDateChange}
              className="p-2 border rounded"
            />
          </div>
        )}

        <button
          onClick={handleFilter}
          className="bg-green-600 text-white px-6 py-2 rounded-xl mt-4"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;
