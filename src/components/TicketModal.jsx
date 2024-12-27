import React, { useState, useEffect } from 'react';

const TicketModal = ({ isOpen, onClose, onSubmit, ticketDetails }) => {
  const [formData, setFormData] = useState({
    task: '',
    description: '',
    assignedTo: '',
    status: '',
  });
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState('');  // State for success/error message

  useEffect(() => {
    if (isOpen) {
      // Fetch employees
      fetch('http://localhost:8080/employees')
        .then((response) => response.json())
        .then((data) => setEmployees(data))
        .catch((error) => console.error('Error fetching employees:', error));

      // Fetch statuses
      fetch('http://localhost:8080/statuses')
        .then((response) => response.json())
        .then((data) => setStatuses(data))
        .catch((error) => console.error('Error fetching statuses:', error));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.task,  // 'task' is being sent as 'title' in payload
      description: formData.description,
      assigned_to: parseInt(formData.assignedTo, 10),  // Converting employee id to integer
      status_id: parseInt(formData.status, 10),  // Converting status id to integer
    };

    // Call the onSubmit prop passed from the parent component (App.js)
    onSubmit(payload);  // This will call handleAddTicket from App.js
    
    // Reset form after submission
    setFormData({
      task: '',
      description: '',
      assignedTo: '',
      status: '',
    });

    setMessage('Ticket created successfully!');
    setTimeout(() => {
      onClose(); // Close modal after success
      setMessage('');
    }, 2000);
  };

  // Close ticket details modal
  const closeTicketDetails = () => {
    // This will reset ticketDetails state passed as prop
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {ticketDetails ? 'Ticket Details' : 'Create New Ticket'}
        </h2>

        {/* Display Ticket Details */}
        {ticketDetails ? (
          <div className="space-y-4">
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
              className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        ) : (
          // Ticket Creation Form
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

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Ticket
              </button>
            </div>
          </form>
        )}

        {/* Success/Error Message */}
        {message && (
          <div className="mt-4 text-green-500 text-center font-medium">{message}</div>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
