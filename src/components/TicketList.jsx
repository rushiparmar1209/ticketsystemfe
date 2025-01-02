import React from "react";
import PropTypes from "prop-types";
import SearchPanel from "./SearchPanel";
import FilterPanel from "./FilterPanel";

function TicketList({ tickets, ticketCount, onGetTicketDetails, onDeleteTicket, onEditTicket }) {
  return (
    <div className="absolute top-4 left-4 bg-white p-6 rounded-lg shadow-xl w-72 max-h-80 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Created Tickets</h3>
      <div className="mb-4">
        <SearchPanel />
        <FilterPanel />
      </div>
      {ticketCount > 0 ? (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <div className="font-medium text-gray-800">{ticket.title}</div>
              <div className="text-gray-600">{ticket.description}</div>
              <div className="text-gray-500 text-xs">{ticket.timestamp}</div>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => onGetTicketDetails(ticket)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Details
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditTicket(ticket)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDeleteTicket(ticket.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No tickets available.</p>
      )}
    </div>
  );
}

TicketList.propTypes = {
  tickets: PropTypes.array.isRequired,
  ticketCount: PropTypes.number.isRequired,
  onGetTicketDetails: PropTypes.func.isRequired,
  onDeleteTicket: PropTypes.func.isRequired,
  onEditTicket: PropTypes.func.isRequired,
};

export default TicketList;
