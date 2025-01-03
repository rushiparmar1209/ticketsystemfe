import React, { useState, useEffect } from "react";

const UpdateTicketModal = ({ isOpen, onClose, ticket, onSubmit }) => {
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    assignedTo: "",
    status: "",
    priority: "",
    type: "",
    estimatedTime: "",
    expectedStartDate: "",
    expectedEndDate: "",
    attachFiles: {
      files: [],
      screenshots: [],
    },
  });
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState("");

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
        task: ticket.title || "",
        description: ticket.description || "",
        assignedTo: ticket.assigned_to || "",
        status: ticket.status_id || "",
        priority: ticket.priority || "",
        type: ticket.type || "",
        estimatedTime: ticket.estimated_time || "",
        expectedStartDate: ticket.expected_start_date || "",
        expectedEndDate: ticket.expected_end_date || "",
        attachFiles: ticket.attachments || { files: [], screenshots: [] },
      });
    }
  }, [isOpen, ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.assignedTo || !formData.status || !formData.priority || !formData.type) {
      setMessage("Please fill in all fields!");
      return;
    }

    const updatedTicket = {
      title: formData.task,
      description: formData.description,
      assigned_to: parseInt(formData.assignedTo, 10),
      status_id: parseInt(formData.status, 10),
      priority: formData.priority,
      type: formData.type,
      estimated_time: formData.estimatedTime,
      expected_start_date: formData.expectedStartDate,
      expected_end_date: formData.expectedEndDate,
      attachments: formData.attachFiles,
    };

    // Call the onSubmit function passed from parent component
    onSubmit(ticket.id, updatedTicket);

    // Reset form and show success message
    setFormData({
      task: "",
      description: "",
      assignedTo: "",
      status: "",
      priority: "",
      type: "",
      estimatedTime: "",
      expectedStartDate: "",
      expectedEndDate: "",
      attachFiles: { files: [], screenshots: [] },
    });
    setMessage("Ticket updated successfully!");
    setTimeout(() => {
      onClose();
      setMessage("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-gray-800 bg-opacity-40 z-50 flex items-center justify-center">
  <div className="flex items-center justify-center w-full h-full">
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-2xl w-full md:w-96 max-w-lg max-h-[90vh] overflow-y-auto transition-all">
      <h2 className="text-2xl font-extrabold text-white mb-6 text-center">Update Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Task */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Task</label>
          <input
            type="text"
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
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
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
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
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
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
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
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
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
          >
            <option value="">Select Type</option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Task">Task</option>
          </select>
        </div>

        {/* Estimated Time */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Estimated Time</label>
          <input
            type="text"
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleChange}
            placeholder="Enter estimated time (e.g., 5 hours)"
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
          />
        </div>

        {/* Expected Start Date */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Expected Start Date</label>
          <input
            type="date"
            name="expectedStartDate"
            value={formData.expectedStartDate}
            onChange={handleChange}
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
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
            className="w-full border-2 border-transparent bg-white/80 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 px-3 py-2 text-sm"
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

        {/* Submit/Cancel Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-md hover:from-pink-600 hover:to-yellow-600 transition-all"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mt-4 p-2 text-center text-white rounded-md ${message === "Ticket updated successfully!" ? "bg-green-500" : "bg-red-500"}`}
        >
          {message}
        </div>
      )}
    </div>
  </div>
</div>



  );
};

export default UpdateTicketModal;
