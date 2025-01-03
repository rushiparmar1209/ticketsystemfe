import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white p-5">
      <h2 className="text-xl font-semibold mb-5">Mini Ticket System</h2>
      <ul>
        <li className="mb-3 hover:bg-blue-600 p-2 rounded">
          <a href="#">Dashboard</a>
        </li>
        <li className="mb-3 hover:bg-blue-600 p-2 rounded">
          <a href="#">Issues</a>
        </li>
        <li className="mb-3 hover:bg-blue-600 p-2 rounded">
          <a href="#">Projects</a>
        </li>
        <li className="mb-3 hover:bg-blue-600 p-2 rounded">
          <a href="#">Boards</a>
        </li>
        <li className="mb-3 hover:bg-blue-600 p-2 rounded">
          <a href="#">Reports</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
