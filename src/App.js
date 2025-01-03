import React, { useState } from "react";
import "./App.css";
import AllTicketsWindow from "./components/AllTicketsWindow";
import TicketModal from "./components/TicketModal";
import UpdateTicketModal from "./components/UpdateTicketModal";
import TicketList from "./components/TicketList";
import SearchPanel from "./components/SearchPanel";
import FilterPanel from "./components/FilterPanel";
import ParentComponent from "./components/ParentComponent";
// import AllTicketsWindow from './components/AllTicketsWindow';
import Sidebar from "./components/Sidebar"; // Adjust path if necessary
import Dashboard from "./components/Dashboard"; // Adjust path if necessary

import axios from "axios";

function App() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Create New Ticket modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]); // State for tickets
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [ticketCount, setTicketCount] = useState(0); // Ticket count
  const [isSearchPanelVisible, setIsSearchPanelVisible] = useState(false);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  const onFilter = (selectedOptions) => {
    // Filter logic
    console.log("Filtering tickets with: ", selectedOptions);
    setIsFilterActive(true);
    // Example: Apply filter logic
    setSearchResults([]); // Replace with actual filter results
  };

  const onSearch = (selectedOptions) => {
    // Search logic
    console.log("Searching tickets with: ", selectedOptions);
    setIsSearchActive(true);
    // Example: Apply search logic
    setSearchResults([]); // Replace with actual search results
  };

  // Fetch ticket details
  const handleGetTicketDetails = async (ticketId) => {
    try {
      const response = await axios.get(`http://localhost:8080/tickets/${ticketId}`);
      if (response.status === 200) {
        setTicketDetails(response.data); // Save ticket details in state
        alert("Ticket details fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      alert("Failed to fetch ticket details.");
    }
  };

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
      
      <div className="absolute bottom-16 right-36 transform -translate-x-1/2 flex space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300" onClick={() => setIsFilterPanelVisible(prev => !prev)}>Filter Tickets</button>
        <button className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition-colors duration-300" onClick={() => setIsSearchPanelVisible(prev => !prev)}>Search Tickets</button>
      </div>

      {isSearchPanelVisible && <SearchPanel onSearch={onSearch} />}
      {isFilterPanelVisible && <FilterPanel onFilter={onFilter} />}

      {/* Ticket List and Actions */}
      {tickets.length > 0 && (
        <div className="mt-6">
          {/* Ticket List */}
          <TicketList
            tickets={tickets}
            ticketCount={ticketCount}
            onGetTicketDetails={(ticket) => setSelectedTicket(ticket)}
            onDeleteTicket={handleDeleteTicket}
            onEditTicket={(ticket) => {
              setSelectedTicket(ticket);
              setIsUpdateModalOpen(true);
            }}
          />
        </div>
      )}

<div className="absolute bottom-16 left-80 transform -translate-x-1/2 flex space-x-4">
      {/* Modals */}
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTicket} />
      {selectedTicket && (
        <UpdateTicketModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          ticket={selectedTicket}
          onSubmit={handleUpdateTicket}
        />
      )}

      {/* Buttons */}
      <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300">Create New Ticket</button>
      <button onClick={handleGetTickets} className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300">View All Tickets</button>
    </div>
    </div>
  );
}

export default App;
