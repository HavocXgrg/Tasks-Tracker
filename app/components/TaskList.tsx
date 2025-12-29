import React from 'react'
import { useTaskStore } from '../store/taskStore';
interface TaskListProps {
  onEdit: (id: number) => void;
}
const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const tasks = useTaskStore((state) => state.tasks)
  const filter = useTaskStore((state) => state.filter)
  const sort = useTaskStore((state) => state.sort)
  const search = useTaskStore((state) => state.search)
  const removeTask = useTaskStore((state) => state.removeTask)
  const editTask = useTaskStore((state) => state.editTask)

  const sortedTasks = tasks
    //  Filter
    .filter(task =>
      (filter === 'All' || task.status === filter) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    // Sort
    .sort((a, b) => {
      if (sort === 'name') return a.title.localeCompare(b.title);
      if (sort === 'date') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return 0;
    });
  return (
    <div className="flex flex-col">
      {sortedTasks.map((task) => (
        <div key={task.id} className="flex justify-between p-4 border-b border-white/8 hover:bg-white/5">
          <div className='flex flex-col text-left leading-6'>
            <h3 className={task.status === 'Completed' ? 'line-through text-gray-500' : 'text-white'}>{task.title}</h3>
            <p className={task.status === 'Completed' ? 'line-through text-gray-500 text-xs' : 'text-gray-400 text-xs '}  >Due Date: {task.dueDate}</p>
          </div>
          <div className="flex gap-4 md:gap-8 ">
            <button onClick={() => editTask({ ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' })} className="text-green-400 text-sm  cursor-pointer">
              {task.status === 'Pending' ? 'Done' : 'Undo'}
            </button>
            <button onClick={() => onEdit(task.id)} className="text-blue-400 text-sm cursor-pointer "> ✏️ Edit</button>
            <button onClick={() => removeTask(task.id)} className="text-red-400 text-sm cursor-pointer">🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList