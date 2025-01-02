import React, { useState, useEffect } from 'react';

const TicketModal = ({ isOpen, onClose, onSubmit, ticketDetails }) => {
  const [formData, setFormData] = useState({
    task: '',
    description: '',
    assignedTo: '',
    status: '',
    priority: '',
    type: '',
    estimatedTime: '',
    timeSpent: '',  // New field for Time Spent 
    expectedStartDate: '',
    expectedEndDate: '',
    attachFiles: {
      files: [],
      screenshots: [],
    },
  });

  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState('');

  // Fetching employee and status data when modal is opened
  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:8080/employees')
        .then((response) => response.json())
        .then((data) => setEmployees(data))
        .catch((error) => console.error('Error fetching employees:', error));

      fetch('http://localhost:8080/statuses')
        .then((response) => response.json())
        .then((data) => setStatuses(data))
        .catch((error) => console.error('Error fetching statuses:', error));
    }
  }, [isOpen]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file uploads
  const handleFileUpload = (e, type) => {
    const uploadedFiles = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      attachFiles: {
        ...prevState.attachFiles,
        [type]: [...prevState.attachFiles[type], ...uploadedFiles],
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.assignedTo || !formData.status || !formData.priority || !formData.type) {
      setMessage('Please fill in all fields!');
      return;
    }

    const payload = {
      title: formData.task,
      description: formData.description,
      assigned_to: parseInt(formData.assignedTo, 10),
      status_id: parseInt(formData.status, 10),
      priority: formData.priority,
      type: formData.type,
      estimated_time: formData.estimatedTime,
      time_spent: formData.timeSpent,  // Sending the time spent data
      expected_start_date: formData.expectedStartDate,
      expected_end_date: formData.expectedEndDate,
      attachments: formData.attachFiles,
    };

    onSubmit(payload); // Submitting the ticket

    // Reset form fields after successful submission
    setFormData({
      task: '',
      description: '',
      assignedTo: '',
      status: '',
      priority: '',
      type: '',
      estimatedTime: '',
      timeSpent: '', // Resetting the time spent field
      expectedStartDate: '',
      expectedEndDate: '',
      attachFiles: {
        files: [],
        screenshots: [],
      },
    });

    // Display success message
    setMessage('Ticket created successfully!');

    // Close the modal after a short delay
    setTimeout(() => {
      onClose(); // Close the modal
      setMessage(''); // Reset the message
    }, 2000);
  };

  // If modal is not open, don't render
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg w-80 md:w-96 max-w-md max-h-[90vh] overflow-y-auto"style={{ fontSize: "0.875rem" }}>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
          {ticketDetails ? 'Ticket Details' : 'Create New Ticket'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Task Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
            <input
              type="text"
              name="task"
              value={formData.task}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
              rows="3"
            ></textarea>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Assigned To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            >
              <option value="">Select Type</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Task">Task</option>
            </select>
          </div>

          {/* Expected Start Date */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Expected Start Date</label>
            <input
              type="date"
              name="expectedStartDate"
              value={formData.expectedStartDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            />
          </div>

          {/* Expected End Date */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Expected End Date</label>
            <input
              type="date"
              name="expectedEndDate"
              value={formData.expectedEndDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            />
          </div>

            {/* Estimated Time */}
            <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Original Estimated Time</label>
            <input
              type="text"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              placeholder="Enter estimated time (e.g., 5h, 1d)"
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            />
          </div>

          {/* Time Spent Input */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Time Spent</label>
            <input
              type="text"
              name="timeSpent"
              value={formData.timeSpent}
              onChange={handleChange}
              placeholder="Enter time spent (e.g., 30m, 2h, 1d)"
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            />
          </div>

          {/* File Attachments */}
          <div>
            <h3 className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Attach Files or Screenshot</h3>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(e, 'files')}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'screenshots')}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-blue-600 text-sm md:text-base"
            >
              {ticketDetails ? 'Update Ticket' : 'Create Ticket'}
            </button>
          </div>
        </form>

        {/* Success/Failure message */}
        {message && <p className="mt-3 text-xs text-green-600">{message}</p>}

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-3 w-full bg-red-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-red-600 text-sm md:text-base"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TicketModal;
