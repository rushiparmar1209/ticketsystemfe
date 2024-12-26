import React, { useState, useEffect } from 'react';

const TicketModal = ({ isOpen, onClose, onSubmit }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Ticket</h2>
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
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

          {message && (
            <div className="text-center mt-4">
              <p className={`text-lg font-semibold ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
