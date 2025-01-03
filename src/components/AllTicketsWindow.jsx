import React, { useState } from "react";

function AllTicketsWindow({ tickets }) {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    // Show modal logic here
    console.log("Opening ticket details for:", ticket);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-lg mt-4">
      <h2 className="text-xl font-bold">All Tickets</h2>
      <div className="mt-4 space-y-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 bg-white rounded shadow flex justify-between"
            >
              <span>{ticket.title}</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => openTicketDetails(ticket)}
              >
                Ticket Details
              </button>
            </div>
          ))
        ) : (
          <p>No tickets available</p>
        )}
      </div>
    </div>
  );
}

export default AllTicketsWindow;
