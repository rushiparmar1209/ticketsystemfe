import React from "react";
import PropTypes from "prop-types";
import SearchPanel from "./SearchPanel";
import FilterPanel from "./FilterPanel";

function TicketList({ tickets, ticketCount, onGetTicketDetails, onDeleteTicket, onEditTicket }) {
  return (
    <div className="absolute top-0 left-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 p-6 rounded-3xl shadow-md w-full h-[50vh] max-h-[50vh] overflow-y-auto transform transition-transform duration-300">
    <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Created Tickets</h3>
  
    {ticketCount > 0 ? (
      <ul className="space-y-4">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="text-base text-gray-700 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-102"
          >
            <div className="font-semibold text-gray-800 text-lg mb-2">{ticket.title}</div>
            <div className="text-gray-600 text-sm mb-3">{ticket.description}</div>
            <div className="text-gray-500 text-xs mb-4">{ticket.timestamp}</div>
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => onGetTicketDetails(ticket.id)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300 py-1 px-3 rounded-lg hover:bg-indigo-100"
              >
                View Details
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEditTicket(ticket)}
                  className="text-yellow-600 hover:text-yellow-800 font-semibold transition-colors duration-300 py-1 px-3 rounded-lg hover:bg-yellow-100"
                >
                  Update
                </button>
                <button
                  onClick={() => onDeleteTicket(ticket.id)}
                  className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-300 py-1 px-3 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-lg text-gray-300 text-center">No tickets available.</p>
    )}
  </div>
  
  
  
  )}

TicketList.propTypes = {
  tickets: PropTypes.array.isRequired,
  ticketCount: PropTypes.number.isRequired,
  onGetTicketDetails: PropTypes.func.isRequired,
  onDeleteTicket: PropTypes.func.isRequired,
  onEditTicket: PropTypes.func.isRequired,
};
 
export default TicketList;
