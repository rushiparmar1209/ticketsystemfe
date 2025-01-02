import React from 'react';

const SearchPanel = () => (
  <div className="search-panel">
    <h3>Search Tickets</h3>
    <label>
      <input type="checkbox" /> Title
    </label>
    <label>
      <input type="checkbox" /> Status
    </label>
    <label>
      <input type="checkbox" /> Priority
    </label>
    <label>
      <input type="checkbox" /> Assignee
    </label>
    <label>
      <input type="checkbox" /> Tags
    </label>
    {/* Add search input fields as needed */}
  </div>
);

export default SearchPanel;
