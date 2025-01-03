import React, { useState } from "react";
import SearchPanel from "./SearchPanel";

function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (selectedOptions) => {
    console.log("Search options:", selectedOptions);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl"
      >
        Open Search
      </button>
      {isModalOpen && (
        <SearchPanel
          onSearch={handleSearch}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ParentComponent;
