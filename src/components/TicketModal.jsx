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
    timeSpent: '',
    expectedStartDate: '',
    expectedEndDate: '',
    attachFiles: {
      files: [],
      screenshots: [],
    },
    workLog: '', // New field for work log
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
      time_spent: formData.timeSpent,
      expected_start_date: formData.expectedStartDate,
      expected_end_date: formData.expectedEndDate,
      attachments: formData.attachFiles,
      work_log: formData.workLog, // Sending work log data
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
      timeSpent: '',
      expectedStartDate: '',
      expectedEndDate: '',
      attachFiles: {
        files: [],
        screenshots: [],
      },
      workLog: '', // Resetting work log field
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-40 z-50 flex items-center justify-center">
  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-2xl w-full md:w-96 max-w-lg max-h-[100vh] overflow-y-auto transform transition-all">
    <h2 className="text-2xl font-extrabold text-white mb-6 text-center">
      {ticketDetails ? 'Ticket Details' : 'Create New Ticket'}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Task Input */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Task</label>
        <input
          type="text"
          name="task"
          value={formData.task}
          onChange={handleChange}
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
          rows="3"
        ></textarea>
      </div>

      {/* Assigned To */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Assigned To</label>
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
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
        <label className="block text-sm font-medium text-white mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
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
        <label className="block text-sm font-medium text-white mb-1">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
        >
          <option value="">Select Type</option>
          <option value="Bug">Bug</option>
          <option value="Feature">Feature</option>
          <option value="Task">Task</option>
        </select>
      </div>

      {/* Expected Start Date */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Expected Start Date</label>
        <input
          type="date"
          name="expectedStartDate"
          value={formData.expectedStartDate}
          onChange={handleChange}
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
        />
      </div>

      {/* Expected End Date */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Expected End Date</label>
        <input
          type="date"
          name="expectedEndDate"
          value={formData.expectedEndDate}
          onChange={handleChange}
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
        />
      </div>

      {/* Estimated Time */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Original Estimated Time</label>
        <input
          type="text"
          name="estimatedTime"
          value={formData.estimatedTime}
          onChange={handleChange}
          placeholder="Enter estimated time (e.g., 5h, 1d)"
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
        />
      </div>

      {/* Time Spent Input */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Time Spent</label>
        <input
          type="text"
          name="timeSpent"
          value={formData.timeSpent}
          onChange={handleChange}
          placeholder="Enter time spent (e.g., 3h, 2d)"
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
        />
      </div>

      {/* Work Log */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Work Log</label>
        <textarea
          name="workLog"
          value={formData.workLog}
          onChange={handleChange}
          placeholder="Add work log here..."
          className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-3 py-2 text-sm"
          rows="4"
        />
      </div>

      {/* Attachments (if any) */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">Attach Files</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileUpload(e, 'files')}
          className="w-full text-sm"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white px-6 py-2 rounded-md text-sm hover:bg-red-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-md text-sm hover:from-pink-600 hover:to-yellow-600 transition-all"
        >
          Save Ticket
        </button>
      </div>
    </form>

    {/* Success/Error Message */}
    {message && (
      <div className="mt-4 text-center text-sm text-green-500">{message}</div>
    )}
  </div>
</div>


  )}  

export default TicketModal;
