import React, { useState } from 'react';

const TicketModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Create New Ticket</h2>
        <form>
          {/* Task */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Task</label>
            <textarea
              rows="1"
              placeholder="Enter description"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
            ></textarea>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Task Description</label>
            <textarea
              rows="4"
              placeholder="Enter description"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
            ></textarea>
          </div>

          {/* Assign */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Assign</label>
            <select
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
            >
              <option>Select Employee</option>
              <option>Rushi Parmar</option>
              <option>Satish Dilware</option>
              <option>Abhishek Shah</option>
            </select>
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Status</label>
            <select
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
            >
              <option>To Do</option>
              <option>Progress</option>
              <option>Code Review</option>
              <option>Done</option>
              <option>Deployed</option>
              <option>Compiled</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
