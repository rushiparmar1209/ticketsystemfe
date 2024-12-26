import React, { useState } from "react";
import "./App.css";
import TicketModal from "./components/TicketModal";
import UpdateTicketModal from "./components/UpdateTicketModal";
import axios from "axios";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null); // For updating specific ticket

  // Fetch all tickets
  const handleGetTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tickets");
      if (response.status === 200) {
        setTickets(response.data);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      alert("Failed to fetch tickets.");
    }
  };

  // Fetch ticket details
  const handleGetTicketDetails = async (ticketId) => {
    try {
      const response = await axios.get(`http://localhost:8080/tickets/${ticketId}`);
      if (response.status === 200) {
        setTicketDetails(response.data);
        alert("Ticket details fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      alert("Failed to fetch ticket details.");
    }
  };

  // Add new ticket
  const handleAddTicket = async (newTicket) => {
    try {
      const response = await axios.post("http://localhost:8080/tickets", newTicket);
      if (response.status === 201) {
        const timestamp = new Date().toLocaleString();
        const ticketWithTimestamp = { ...newTicket, timestamp };
        setTickets((prevTickets) => [...prevTickets, ticketWithTimestamp]);
        alert("Ticket created successfully!");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket.");
    }
  };

  // Update existing ticket
  const handleUpdateTicket = async (ticketId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/tickets/${ticketId}`, updatedData);
      if (response.status === 200) {
        // Update the ticket in the local state
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, ...updatedData } : ticket
          )
        );
        alert("Ticket updated successfully!");
        setIsUpdateModalOpen(false); // Close the modal after update
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 relative">
      {/* Created Tickets List */}
      <div className="absolute top-4 left-4 bg-white p-6 rounded-lg shadow-xl w-72 max-h-80 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Created Tickets</h3>
        {tickets.length > 0 ? (
          <ul className="space-y-4">
            {tickets.map((ticket, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition"
              >
                <div className="font-medium text-gray-900">Ticket {index + 1}</div>
                <div className="text-xs text-gray-600">Created on: {ticket.timestamp}</div>
                <button
                  onClick={() => handleGetTicketDetails(ticket.id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Ticket Details
                </button>
                <button
                  onClick={() => {
                    setSelectedTicket(ticket); // Set the ticket to be updated
                    setIsUpdateModalOpen(true);
                  }}
                  className="ml-2 bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tickets created yet</p>
        )}
      </div>

      {/* Buttons */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-xl hover:bg-blue-700 transition-all duration-300 mt-12"
      >
        Create New Ticket
      </button>
      <button
        onClick={handleGetTickets}
        className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl hover:bg-green-700 transition-all duration-300 mt-4"
      >
        View All Tickets
      </button>

      {/* Modals */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTicket}
      />
      {selectedTicket && (
        <UpdateTicketModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          ticket={selectedTicket}
          onSubmit={handleUpdateTicket}
        />
      )}
    </div>
  );
}

export default App;
