import React, { useState } from "react";
import TicketList from "./TicketList";
import FilterPanel from "./FilterPanel";
import SearchPanel from "./SearchPanel";

const Dashboard = () => {
  const [isSearchPanelVisible, setIsSearchPanelVisible] = useState(false);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Search and Filter Buttons */}
      <div className="flex mb-4 space-x-4">
        <button
          onClick={() => setIsFilterPanelVisible(!isFilterPanelVisible)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Filter Tickets
        </button>
        <button
          onClick={() => setIsSearchPanelVisible(!isSearchPanelVisible)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search Tickets
        </button>
      </div>

      {/* Search Panel */}
      {isSearchPanelVisible && <SearchPanel />}
      
      {/* Filter Panel */}
      {isFilterPanelVisible && <FilterPanel />}

      {/* Ticket List */}
      <TicketList />
    </div>
  );
};

export default Dashboard;
