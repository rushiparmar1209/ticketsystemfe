import React, { useState } from "react";
import "./App.css";
import TicketModal from "./components/TicketModal";
import UpdateTicketModal from "./components/UpdateTicketModal";
import TicketList from "./components/TicketList";
import axios from "axios";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Create New Ticket modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]); // State for tickets
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [ticketCount, setTicketCount] = useState(0); // Ticket count

  // Fetch all tickets
  const handleGetTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tickets");
      if (response.status === 200) {
        setTickets(response.data);
        setTicketCount(response.data.length); // Update ticket count
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      alert("Failed to fetch tickets.");
    }
  };

  // Add a new ticket
  const handleAddTicket = async (newTicket) => {
    try {
      const response = await axios.post("http://localhost:8080/tickets", newTicket);
      if (response.status === 201) {
        const timestamp = new Date().toLocaleString();
        const ticketWithTimestamp = { ...newTicket, timestamp };
        setTickets((prevTickets) => [...prevTickets, ticketWithTimestamp]);
        setTicketCount((prevCount) => prevCount + 1); // Increment ticket count
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

  // Delete a ticket
  const handleDeleteTicket = async (ticketId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8080/tickets/${ticketId}`);
      if (response.status === 200) {
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
        setTicketCount((prevCount) => prevCount - 1); // Decrease ticket count
        alert("Ticket deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 relative">
      {/* Created Tickets Section */}
      <TicketList
        tickets={tickets}
        ticketCount={ticketCount}
        onGetTicketDetails={setTicketDetails}
        onDeleteTicket={handleDeleteTicket}
        onEditTicket={(ticket) => {
          setSelectedTicket(ticket);
          setIsUpdateModalOpen(true);
        }}
      />

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
    </div>
  );
}

export default App;
