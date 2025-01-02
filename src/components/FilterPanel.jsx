import React from 'react';

const FilterPanel = () => (
  <div className="filter-panel">
    <h3>Filter Tickets</h3>
    <label>
      <input type="checkbox" /> Project
    </label>
    <label>
      <input type="checkbox" /> Team
    </label>
    <label>
      <input type="checkbox" /> Date Range
    </label>
    {/* Add filter input fields as needed */}
  </div>
);

export default FilterPanel;
