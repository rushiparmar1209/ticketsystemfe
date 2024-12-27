import React, { useState, useEffect } from "react";

const UpdateTicketModal = ({ isOpen, onClose, ticket, onSubmit }) => {
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    assignedTo: "",
    status: "",
  });
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState("");  // State for success/error message

  useEffect(() => {
    if (isOpen) {
      // Fetch employees
      fetch("http://localhost:8080/employees")
        .then((response) => response.json())
        .then((data) => setEmployees(data))
        .catch((error) => console.error("Error fetching employees:", error));

      // Fetch statuses
      fetch("http://localhost:8080/statuses")
        .then((response) => response.json())
        .then((data) => setStatuses(data))
        .catch((error) => console.error("Error fetching statuses:", error));

      // Pre-fill the form with the current ticket's data
      setFormData({
        task: ticket.title,
        description: ticket.description,
        assignedTo: ticket.assigned_to,
        status: ticket.status_id,
      });
    }
  }, [isOpen, ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTicket = {
      title: formData.task,
      description: formData.description,
      assigned_to: parseInt(formData.assignedTo, 10),
      status_id: parseInt(formData.status, 10),
    };

    // Call the onSubmit function passed from parent component
    onSubmit(ticket.id, updatedTicket);

    // Reset form and show success message
    setFormData({
      task: "",
      description: "",
      assignedTo: "",
      status: "",
    });
    setMessage("Ticket updated successfully!");
    setTimeout(() => {
      onClose();
      setMessage("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
            <input
              type="text"
              name="task"
              value={formData.task}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
            >
              Update Ticket
            </button>
          </div>
        </form>

        {/* Success/Error Message */}
        {message && (
          <div className="mt-4 text-green-500 text-center font-medium">{message}</div>
        )}
      </div>
    </div>
  );
};

export default UpdateTicketModal;
