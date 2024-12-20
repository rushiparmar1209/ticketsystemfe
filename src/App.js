import React, { useState } from 'react';
import './App.css';
import TicketModal from './components/TicketModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]); // Tickets list

  const handleAddTicket = (newTicket) => {
    const timestamp = new Date().toLocaleString(); // Generate current date and time
    const ticketWithTimestamp = { ...newTicket, timestamp }; // Add timestamp to the ticket

    setTickets((prevTickets) => [...prevTickets, ticketWithTimestamp]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 relative">
      {/* Top-left Corner Tickets List */}
      <div className="absolute top-4 left-4 bg-white p-6 rounded-lg shadow-xl w-72 max-h-80 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Created Tickets</h3>
        {tickets.length > 0 ? (
          <ul className="space-y-2">
            {tickets.map((ticket, index) => (
              <li key={index} className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
                <div className="font-medium text-gray-900">Ticket {index + 1}</div>
                <div className="text-xs text-gray-600">Created on: {ticket.timestamp}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tickets created yet</p>
        )}
      </div>

      {/* Create Ticket Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-xl hover:bg-blue-700 transition-all duration-300 mt-12"
      >
        Create New Ticket
      </button>

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTicket} // Pass the addTicket function
      />
    </div>
  );
}

export default App;
