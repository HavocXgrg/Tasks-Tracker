'use client'

import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { SortType, FilterType } from '../utils/type';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
}

const TaskCard = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const sort = useTaskStore((state) => state.sort);
  const setFilter = useTaskStore((state) => state.setFilter);
  const setSort = useTaskStore((state) => state.setSort);
  const setSearch = useTaskStore((state) => state.setSearch);
  const loadTask = useTaskStore((state) => state.loadTask);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<number | null>(null);
  const [localSearch, setLocalSearch] = useState("");

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };
  // 3. Logic & Effects
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]); // Syncs search after 300ms

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  const openModal = (id: number | null = null) => {
    setTaskToEdit(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };
  return (
    <section className="flex justify-center min-h-screen bg-black text-white font-sans">
      <div className="w-full max-w-4xl border-x border-white/10 flex flex-col items-center pt-20">

        <div className="w-full max-w-3xl p-4 ">
          {/* HEADER SECTION */}
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl tracking-wider font-semibold">Task Tracker</h1>
            <button className="flex items-center px-4 py-1 text-sm bg-blue-600 rounded-xl cursor-pointer transition-transform hover:scale-105 active:scale-95"
              onClick={() => openModal(null)}>
              <span className="mr-2 text-xl">+</span> Add task
            </button>
          </header>
          {/* MAIN CONTENT */}
          <main className="bg-[#1e1f23] min-h-[50vh] rounded-xl overflow-hidden shadow-2xl border border-white/5">

            <div className="flex flex-col md:flex-row justify-between box-content md:p-4 p-2 text-sm bg-white/5 rounded-t-xl border-b border-white/10 gap-3 md:gap-0">

              <div className="flex-1 max-w-sm">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full bg-transparent border px-4 py-1 border-white/20 focus:outline-none focus:border-blue-500 rounded-md transition-colors"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Sort:</span>
                  <select
                    className="bg-gray-700 rounded-md px-2 py-1 shadow focus:outline-none cursor-pointer"
                    value={sort || ""}
                    onChange={(e) => setSort((e.target.value as SortType) || null)}
                  >
                    <option value="">Default</option>
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Filter:</span>
                  <select
                    className="bg-gray-700 rounded-md px-2 py-1 shadow focus:outline-none cursor-pointer"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                  >
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Task List renders here */}
            <div className="p-6 text-gray-500 text-center">
              {
                tasks.length === 0 ? (
                  <p className="text-center text-gray-100 py-4 capitalize tracking-wider">
                    Start adding your tasks:
                  </p>) : (
                  <TaskList onEdit={openModal} />
                )
              }

            </div>
            {/* MODAL */}
            {isModalOpen && (
              <TaskForm
                isOpen={isModalOpen}
                onClose={closeModal}
                editTaskId={taskToEdit}
              />
            )}

          </main>
        </div>
      </div>
    </section>
  )
}

export default TaskCard