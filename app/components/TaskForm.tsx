import React, { useState } from 'react'
import { useTaskStore } from '../store/taskStore';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  editTaskId: number | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, editTaskId }) => {
  const addNewTask = useTaskStore((state) => state.addNewTask);
  const editTask = useTaskStore((state) => state.editTask);
  const tasks = useTaskStore((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    if (editTaskId) {
      // Edit Mode 
      const originalTask = tasks.find((t) => t.id === editTaskId);
      if (originalTask) {
        editTask({ ...originalTask, title, dueDate });
      }
    } else {

      addNewTask(title, dueDate);
    }

    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1e1f23] w-full max-w-md rounded-xl border border-white/10 shadow-2xl overflow-hidden p-6" role="dialog">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {editTaskId ? "Edit Task" : "New Task"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl cursor-pointer">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
              Title
            </label>
            <input
              value={title}
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              placeholder="e.g., Complete project report"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            {error && (
              <span className="text-red-500 text-xs mt-1 block">{error}</span>
            )}
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value)
                setError('')
              }}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors scheme-dark"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg shadow-blue-900/20 cursor-pointer">
              {editTaskId ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm