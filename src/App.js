import React, { useState } from "react";
import "./App.css";
import TicketModal from "./components/TicketModal";
import UpdateTicketModal from "./components/UpdateTicketModal";
import axios from "axios";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Create New Ticket modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [ticketCount, setTicketCount] = useState(0); // State to store ticket count

  // Fetch all tickets
  const handleGetTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tickets");
      if (response.status === 200) {
        setTickets(response.data);
        setTicketCount(response.data.length); // Update the ticket count
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      alert("Failed to fetch tickets.");
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

  // Delete ticket
  const handleDeleteTicket = async (ticketId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8080/tickets/${ticketId}`);
      if (response.status === 200) {
        // Remove the deleted ticket from the local state
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
        setTicketCount((prevCount) => prevCount - 1); // Decrease ticket count
        alert("Ticket deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket.");
    }
  };

  // Get ticket details
  const handleGetTicketDetails = async (ticketId) => {
    try {
      const ticketResponse = await axios.get(`http://localhost:8080/tickets/${ticketId}`);
      const employeesResponse = await axios.get('http://localhost:8080/employees');
      const statusesResponse = await axios.get('http://localhost:8080/statuses');
  
      if (ticketResponse.status === 200 && employeesResponse.status === 200 && statusesResponse.status === 200) {
        const ticketData = ticketResponse.data;
        const employeesData = employeesResponse.data;
        const statusesData = statusesResponse.data;
  
        // Find assigned employee name and status name based on IDs
        const assignedToName = employeesData.find(
          (employee) => employee.id === ticketData.assigned_to
        )?.name;

        const statusName = statusesData.find(
          (status) => status.id === ticketData.status_id
        )?.name;

        setTicketDetails({
          ...ticketData,
          assigned_to_name: assignedToName || "N/A",
          status_name: statusName || "N/A",
        });
        setIsModalOpen(false); // Close the create new ticket modal
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      alert("Failed to fetch ticket details.");
    }
  };

  // Close ticket details modal
  const closeTicketDetails = () => {
    setTicketDetails(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 relative">
      {/* Created Tickets List */}
      <div className="absolute top-4 left-4 bg-white p-6 rounded-lg shadow-xl w-72 max-h-80 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Created Tickets</h3>
        {ticketCount > 0 ? (
          <ul className="space-y-4">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition"
              >
                <div className="font-medium text-gray-900">Ticket ID: {ticket.id}</div>
                <div className="text-xs text-gray-600">Created on: {ticket.timestamp}</div>
                <button
                  onClick={() => handleGetTicketDetails(ticket.id)}
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                >
                  Ticket Details
                </button>
                <button
                  onClick={() => {
                    setSelectedTicket(ticket); // Set the ticket to be updated
                    setIsUpdateModalOpen(true);
                  }}
                  className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTicket(ticket.id)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                >
                  Delete
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
      {ticketDetails && (
        <div className="absolute top-4 left-80 bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ticket Details</h3>
          <p className="text-sm text-gray-700">
            <strong>ID:</strong> {ticketDetails.id}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Task Name:</strong> {ticketDetails.title}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Description:</strong> {ticketDetails.description}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Assigned To:</strong> {ticketDetails.assigned_to_name}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Status:</strong> {ticketDetails.status_name}
          </p>
          <button
            onClick={closeTicketDetails}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
