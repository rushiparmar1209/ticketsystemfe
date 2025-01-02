import React, { useState } from "react";

function FilterPanel({ onFilter }) {
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
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Filter Tickets</h3>
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
            <label>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
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
  );
}

export default FilterPanel;
